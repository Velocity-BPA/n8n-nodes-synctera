/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
	IRequestOptions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';
import { SYNCTERA_ENVIRONMENTS, SYNCTERA_API_VERSION } from '../constants/endpoints';
import { generateIdempotencyKey } from '../utils/signatureUtils';

/**
 * Synctera API Client
 *
 * Handles all HTTP communication with the Synctera Banking-as-a-Service API.
 * Includes error handling, pagination, and retry logic.
 */

export interface SyncteraApiOptions {
	method: IHttpRequestMethods;
	endpoint: string;
	body?: IDataObject;
	query?: IDataObject;
	headers?: IDataObject;
	returnFullResponse?: boolean;
	useIdempotencyKey?: boolean;
	timeout?: number;
}

export interface SyncteraPaginationOptions {
	limit?: number;
	pageToken?: string;
	startDate?: string;
	endDate?: string;
}

export interface SyncteraApiResponse<T = IDataObject> {
	data: T;
	pagination?: {
		next_page_token?: string;
		total_count?: number;
	};
}

/**
 * Get the base URL based on credentials
 */
function getBaseUrl(credentials: IDataObject): string {
	const environment = credentials.environment as string || 'sandbox';

	if (environment === 'custom' && credentials.customApiUrl) {
		const customUrl = credentials.customApiUrl as string;
		return customUrl.endsWith('/') ? customUrl.slice(0, -1) : customUrl;
	}

	const baseUrl = SYNCTERA_ENVIRONMENTS[environment as keyof typeof SYNCTERA_ENVIRONMENTS]
		|| SYNCTERA_ENVIRONMENTS.sandbox;

	return `${baseUrl}/${SYNCTERA_API_VERSION}`;
}

/**
 * Make an authenticated request to the Synctera API
 */
export async function syncteraApiRequest(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<IDataObject> {
	const credentials = await this.getCredentials('syncteraApi');
	const baseUrl = getBaseUrl(credentials);

	// Normalize endpoint
	const normalizedEndpoint = endpoint.startsWith('/')
		? endpoint
		: `/${endpoint}`;

	const requestOptions: IHttpRequestOptions = {
		method,
		url: `${baseUrl}${normalizedEndpoint}`,
		headers: {
			'Authorization': `Bearer ${credentials.apiKey}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		json: true,
		returnFullResponse: false,
		timeout: 30000,
	};

	// Add partner ID header if configured
	if (credentials.partnerId) {
		(requestOptions.headers as IDataObject)['X-Partner-Id'] = credentials.partnerId;
	}

	// Add idempotency key for write operations
	if (['POST', 'PUT', 'PATCH'].includes(method)) {
		(requestOptions.headers as IDataObject)['Idempotency-Key'] = generateIdempotencyKey();
	}

	// Add query parameters
	if (qs && Object.keys(qs).length > 0) {
		requestOptions.qs = qs;
	}

	// Add body for POST/PUT/PATCH
	if (body && Object.keys(body).length > 0 && ['POST', 'PUT', 'PATCH'].includes(method)) {
		requestOptions.body = body;
	}

	try {
		const response = await this.helpers.httpRequest(requestOptions);
		return response as IDataObject;
	} catch (error: unknown) {
		throw handleApiError(this, error);
	}
}

/**
 * Make a paginated request that fetches all results
 */
export async function syncteraApiRequestAllItems(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	propertyName: string,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<IDataObject[]> {
	const allItems: IDataObject[] = [];
	let pageToken: string | undefined;
	const limit = 100;

	// Add initial query params
	const query: IDataObject = {
		...qs,
		limit,
	};

	do {
		if (pageToken) {
			query.page_token = pageToken;
		}

		const response = await syncteraApiRequest.call(this, method, endpoint, body, query);

		// Extract items from response
		const items = response[propertyName];
		if (Array.isArray(items)) {
			allItems.push(...(items as IDataObject[]));
		}

		// Get next page token
		pageToken = response.next_page_token as string | undefined;

	} while (pageToken);

	return allItems;
}

/**
 * Make a request with binary data (file upload)
 */
export async function syncteraApiRequestBinary(
	this: IExecuteFunctions,
	options: {
		method: IHttpRequestMethods;
		endpoint: string;
		binaryPropertyName: string;
		additionalFields?: IDataObject;
		itemIndex: number;
	},
): Promise<IDataObject> {
	const credentials = await this.getCredentials('syncteraApi');
	const baseUrl = getBaseUrl(credentials);

	const endpoint = options.endpoint.startsWith('/')
		? options.endpoint
		: `/${options.endpoint}`;

	const binaryData = this.helpers.assertBinaryData(options.itemIndex, options.binaryPropertyName);

	// Get the binary data buffer
	const dataBuffer = await this.helpers.getBinaryDataBuffer(options.itemIndex, options.binaryPropertyName);

	const formData: IDataObject = {
		file: {
			value: dataBuffer,
			options: {
				filename: binaryData.fileName ?? 'file',
				contentType: binaryData.mimeType,
			},
		},
	};

	// Add additional fields
	if (options.additionalFields) {
		for (const [key, value] of Object.entries(options.additionalFields)) {
			formData[key] = value;
		}
	}

	const requestOptions: IRequestOptions = {
		method: options.method,
		uri: `${baseUrl}${endpoint}`,
		headers: {
			'Authorization': `Bearer ${credentials.apiKey}`,
		},
		formData,
		json: true,
	};

	if (credentials.partnerId) {
		(requestOptions.headers as IDataObject)['X-Partner-Id'] = credentials.partnerId;
	}

	try {
		const response = await this.helpers.request(requestOptions);
		return typeof response === 'string' ? JSON.parse(response) : response;
	} catch (error: unknown) {
		throw handleApiError(this, error);
	}
}

/**
 * Download binary data (file download)
 */
export async function syncteraApiDownloadBinary(
	this: IExecuteFunctions,
	options: {
		endpoint: string;
		binaryPropertyName: string;
		fileName?: string;
		mimeType?: string;
		itemIndex: number;
	},
): Promise<IDataObject> {
	const credentials = await this.getCredentials('syncteraApi');
	const baseUrl = getBaseUrl(credentials);

	const endpoint = options.endpoint.startsWith('/')
		? options.endpoint
		: `/${options.endpoint}`;

	const requestOptions: IHttpRequestOptions = {
		method: 'GET',
		url: `${baseUrl}${endpoint}`,
		headers: {
			'Authorization': `Bearer ${credentials.apiKey}`,
		},
		encoding: 'arraybuffer',
		returnFullResponse: true,
	};

	if (credentials.partnerId) {
		(requestOptions.headers as IDataObject)['X-Partner-Id'] = credentials.partnerId;
	}

	try {
		const response = await this.helpers.httpRequest(requestOptions) as {
			body: Buffer;
			headers: Record<string, string>;
		};

		const contentType = response.headers?.['content-type'] || options.mimeType || 'application/octet-stream';
		const contentDisposition = response.headers?.['content-disposition'] || '';

		// Extract filename from content-disposition header
		let fileName = options.fileName || 'file';
		const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
		if (fileNameMatch) {
			fileName = fileNameMatch[1].replace(/['"]/g, '');
		}

		// Prepare binary data
		const binaryData = await this.helpers.prepareBinaryData(
			Buffer.from(response.body),
			fileName,
			contentType,
		);

		return {
			binary: {
				[options.binaryPropertyName]: binaryData,
			},
		};
	} catch (error: unknown) {
		throw handleApiError(this, error);
	}
}

/**
 * Handle API errors and convert to NodeApiError
 */
function handleApiError(
	context: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
	error: unknown,
): NodeApiError {
	const errorObj = error as {
		message?: string;
		response?: {
			body?: {
				message?: string;
				error?: string;
				detail?: string;
				errors?: Array<{ message?: string; field?: string }>;
			};
			statusCode?: number;
		};
		cause?: { code?: string };
	};

	let errorMessage = 'Unknown error occurred';
	let httpCode: string | undefined;

	if (errorObj.response?.body) {
		const body = errorObj.response.body;
		if (body.message) {
			errorMessage = body.message;
		} else if (body.error) {
			errorMessage = body.error;
		} else if (body.detail) {
			errorMessage = body.detail;
		} else if (body.errors && body.errors.length > 0) {
			errorMessage = body.errors.map(e => e.message || e.field).join(', ');
		}
		httpCode = errorObj.response.statusCode?.toString();
	} else if (errorObj.message) {
		errorMessage = errorObj.message;
	}

	// Create descriptive error messages based on status code
	if (httpCode) {
		switch (httpCode) {
			case '400':
				errorMessage = `Bad Request: ${errorMessage}`;
				break;
			case '401':
				errorMessage = 'Authentication failed. Please check your API key.';
				break;
			case '403':
				errorMessage = `Access denied: ${errorMessage}`;
				break;
			case '404':
				errorMessage = `Resource not found: ${errorMessage}`;
				break;
			case '409':
				errorMessage = `Conflict: ${errorMessage}`;
				break;
			case '422':
				errorMessage = `Validation error: ${errorMessage}`;
				break;
			case '429':
				errorMessage = 'Rate limit exceeded. Please wait before making more requests.';
				break;
			case '500':
				errorMessage = 'Synctera server error. Please try again later.';
				break;
			case '503':
				errorMessage = 'Synctera service temporarily unavailable.';
				break;
		}
	}

	return new NodeApiError(context.getNode(), { message: errorMessage } as unknown as JsonObject, {
		message: errorMessage,
		httpCode,
	});
}

/**
 * Check API health
 */
export async function checkApiHealth(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
): Promise<boolean> {
	try {
		await syncteraApiRequest.call(this, 'GET', '/banks');
		return true;
	} catch {
		return false;
	}
}

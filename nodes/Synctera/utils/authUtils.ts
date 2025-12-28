/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IHookFunctions, ILoadOptionsFunctions } from 'n8n-workflow';
import { SYNCTERA_ENVIRONMENTS, SYNCTERA_API_VERSION } from '../constants/endpoints';

/**
 * Authentication Utilities for Synctera API
 *
 * Handles API key authentication and endpoint configuration
 * for the Synctera Banking-as-a-Service platform.
 */

export interface SyncteraCredentials {
	environment: 'production' | 'sandbox' | 'custom';
	customApiUrl?: string;
	apiKey: string;
	webhookSecret?: string;
	partnerId?: string;
}

/**
 * Get the base URL for the Synctera API based on environment
 */
export function getBaseUrl(credentials: SyncteraCredentials): string {
	if (credentials.environment === 'custom' && credentials.customApiUrl) {
		return credentials.customApiUrl;
	}
	const baseUrl = SYNCTERA_ENVIRONMENTS[credentials.environment as keyof typeof SYNCTERA_ENVIRONMENTS]
		|| SYNCTERA_ENVIRONMENTS.sandbox;
	return `${baseUrl}/${SYNCTERA_API_VERSION}`;
}

/**
 * Get authentication headers for API requests
 */
export function getAuthHeaders(credentials: SyncteraCredentials): Record<string, string> {
	const headers: Record<string, string> = {
		'Authorization': `Bearer ${credentials.apiKey}`,
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	};

	if (credentials.partnerId) {
		headers['X-Partner-Id'] = credentials.partnerId;
	}

	return headers;
}

/**
 * Get credentials from the execution context
 */
export async function getSyncteraCredentials(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions,
): Promise<SyncteraCredentials> {
	const credentials = await this.getCredentials('syncteraApi') as SyncteraCredentials;
	return credentials;
}

/**
 * Build the full API URL for a given endpoint
 */
export function buildApiUrl(credentials: SyncteraCredentials, endpoint: string): string {
	const baseUrl = getBaseUrl(credentials);
	// Ensure endpoint starts with /
	const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
	return `${baseUrl}${normalizedEndpoint}`;
}

/**
 * Validate API key format
 */
export function isValidApiKey(apiKey: string): boolean {
	// Synctera API keys are typically UUIDs or long alphanumeric strings
	return typeof apiKey === 'string' && apiKey.length >= 20;
}

/**
 * Mask sensitive credential data for logging
 */
export function maskCredentials(credentials: SyncteraCredentials): Record<string, string> {
	return {
		environment: credentials.environment,
		apiKey: credentials.apiKey ? `${credentials.apiKey.substring(0, 8)}...` : 'not set',
		webhookSecret: credentials.webhookSecret ? '***' : 'not set',
		partnerId: credentials.partnerId || 'not set',
	};
}

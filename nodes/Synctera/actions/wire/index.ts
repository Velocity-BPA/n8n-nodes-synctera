/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties, IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { syncteraApiRequest, syncteraApiRequestAllItems } from '../../transport/syncteraClient';
import { ENDPOINTS } from '../../constants/endpoints';

export const wireOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['wire'],
			},
		},
		options: [
			{
				name: 'Cancel',
				value: 'cancel',
				description: 'Cancel a wire transfer',
				action: 'Cancel a wire transfer',
			},
			{
				name: 'Create Domestic',
				value: 'createDomestic',
				description: 'Create a domestic wire transfer',
				action: 'Create a domestic wire transfer',
			},
			{
				name: 'Create International',
				value: 'createInternational',
				description: 'Create an international wire transfer',
				action: 'Create an international wire transfer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a wire transfer',
				action: 'Get a wire transfer',
			},
			{
				name: 'Get Fees',
				value: 'getFees',
				description: 'Get wire transfer fees',
				action: 'Get wire transfer fees',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List wire transfers',
				action: 'List wire transfers',
			},
		],
		default: 'list',
	},
];

export const wireFields: INodeProperties[] = [
	// ----------------------------------
	//         wire:createDomestic
	// ----------------------------------
	{
		displayName: 'Source Account ID',
		name: 'sourceAccountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['wire'],
				operation: ['createDomestic', 'createInternational'],
			},
		},
		default: '',
		description: 'The ID of the source account for the wire',
	},
	{
		displayName: 'Amount (Cents)',
		name: 'amount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['wire'],
				operation: ['createDomestic', 'createInternational'],
			},
		},
		default: 0,
		description: 'Wire amount in cents (e.g., 100000 = $1,000.00)',
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['wire'],
				operation: ['createDomestic', 'createInternational'],
			},
		},
		default: 'USD',
		description: 'Currency code (ISO 4217)',
	},
	{
		displayName: 'Beneficiary Name',
		name: 'beneficiaryName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['wire'],
				operation: ['createDomestic', 'createInternational'],
			},
		},
		default: '',
		description: 'Name of the beneficiary receiving the wire',
	},
	{
		displayName: 'Beneficiary Account Number',
		name: 'beneficiaryAccountNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['wire'],
				operation: ['createDomestic', 'createInternational'],
			},
		},
		default: '',
		description: 'Account number of the beneficiary',
	},
	{
		displayName: 'Beneficiary Bank Routing Number',
		name: 'beneficiaryRoutingNumber',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['wire'],
				operation: ['createDomestic'],
			},
		},
		default: '',
		description: 'ABA routing number of the beneficiary bank (9 digits)',
	},
	// ----------------------------------
	//         wire:createInternational additional
	// ----------------------------------
	{
		displayName: 'Beneficiary Bank SWIFT Code',
		name: 'beneficiarySwiftCode',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['wire'],
				operation: ['createInternational'],
			},
		},
		default: '',
		description: 'SWIFT/BIC code of the beneficiary bank',
	},
	{
		displayName: 'Beneficiary Country',
		name: 'beneficiaryCountry',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['wire'],
				operation: ['createInternational'],
			},
		},
		default: '',
		description: 'Country code of the beneficiary (ISO 3166-1 alpha-2)',
	},
	{
		displayName: 'Beneficiary Address',
		name: 'beneficiaryAddress',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: false,
		},
		displayOptions: {
			show: {
				resource: ['wire'],
				operation: ['createInternational'],
			},
		},
		default: {},
		options: [
			{
				name: 'addressFields',
				displayName: 'Address',
				values: [
					{
						displayName: 'Address Line 1',
						name: 'addressLine1',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Address Line 2',
						name: 'addressLine2',
						type: 'string',
						default: '',
					},
					{
						displayName: 'City',
						name: 'city',
						type: 'string',
						default: '',
					},
					{
						displayName: 'State/Province',
						name: 'state',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Postal Code',
						name: 'postalCode',
						type: 'string',
						default: '',
					},
				],
			},
		],
		description: 'Address of the beneficiary',
	},
	// ----------------------------------
	//         wire:common additional fields
	// ----------------------------------
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['wire'],
				operation: ['createDomestic', 'createInternational'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Customer ID',
				name: 'customerId',
				type: 'string',
				default: '',
				description: 'ID of the customer initiating the wire',
			},
			{
				displayName: 'Purpose',
				name: 'purpose',
				type: 'options',
				options: [
					{ name: 'Business Payment', value: 'BUSINESS_PAYMENT' },
					{ name: 'Personal Payment', value: 'PERSONAL_PAYMENT' },
					{ name: 'Investment', value: 'INVESTMENT' },
					{ name: 'Real Estate', value: 'REAL_ESTATE' },
					{ name: 'Loan Payment', value: 'LOAN_PAYMENT' },
					{ name: 'Other', value: 'OTHER' },
				],
				default: 'BUSINESS_PAYMENT',
				description: 'Purpose of the wire transfer',
			},
			{
				displayName: 'Reference',
				name: 'reference',
				type: 'string',
				default: '',
				description: 'Reference information for the wire',
			},
			{
				displayName: 'Memo',
				name: 'memo',
				type: 'string',
				default: '',
				description: 'Internal memo for the wire',
			},
			{
				displayName: 'Originator to Beneficiary Info',
				name: 'otbInfo',
				type: 'string',
				default: '',
				description: 'Information from originator to beneficiary',
			},
			{
				displayName: 'Idempotency Key',
				name: 'idempotencyKey',
				type: 'string',
				default: '',
				description: 'Unique key to prevent duplicate wires',
			},
			{
				displayName: 'Beneficiary Bank Name',
				name: 'beneficiaryBankName',
				type: 'string',
				default: '',
				description: 'Name of the beneficiary bank',
			},
			{
				displayName: 'Intermediary Bank Routing',
				name: 'intermediaryBankRouting',
				type: 'string',
				default: '',
				description: 'Routing number of intermediary bank if needed',
			},
		],
	},
	// ----------------------------------
	//         wire:get / cancel
	// ----------------------------------
	{
		displayName: 'Wire ID',
		name: 'wireId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['wire'],
				operation: ['get', 'cancel'],
			},
		},
		default: '',
		description: 'The ID of the wire transfer',
	},
	// ----------------------------------
	//         wire:getFees
	// ----------------------------------
	{
		displayName: 'Wire Type',
		name: 'wireType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['wire'],
				operation: ['getFees'],
			},
		},
		options: [
			{ name: 'Domestic', value: 'DOMESTIC' },
			{ name: 'International', value: 'INTERNATIONAL' },
		],
		default: 'DOMESTIC',
		description: 'Type of wire to get fees for',
	},
	{
		displayName: 'Amount (Cents)',
		name: 'feeAmount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['wire'],
				operation: ['getFees'],
			},
		},
		default: 0,
		description: 'Wire amount in cents to calculate fees',
	},
	// ----------------------------------
	//         wire:list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['wire'],
				operation: ['list'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['wire'],
				operation: ['list'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		displayOptions: {
			show: {
				resource: ['wire'],
				operation: ['list'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Account ID',
				name: 'accountId',
				type: 'string',
				default: '',
				description: 'Filter by account ID',
			},
			{
				displayName: 'Customer ID',
				name: 'customerId',
				type: 'string',
				default: '',
				description: 'Filter by customer ID',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				options: [
					{ name: 'Pending', value: 'PENDING' },
					{ name: 'Processing', value: 'PROCESSING' },
					{ name: 'Sent', value: 'SENT' },
					{ name: 'Completed', value: 'COMPLETED' },
					{ name: 'Canceled', value: 'CANCELED' },
					{ name: 'Failed', value: 'FAILED' },
				],
				default: [],
				description: 'Filter by status',
			},
			{
				displayName: 'Wire Type',
				name: 'wireType',
				type: 'options',
				options: [
					{ name: 'Domestic', value: 'DOMESTIC' },
					{ name: 'International', value: 'INTERNATIONAL' },
				],
				default: 'DOMESTIC',
				description: 'Filter by wire type',
			},
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'string',
				default: '',
				description: 'Filter wires created after this date (YYYY-MM-DD)',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'string',
				default: '',
				description: 'Filter wires created before this date (YYYY-MM-DD)',
			},
		],
	},
];

export async function executeWireOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	let responseData;

	if (operation === 'createDomestic' || operation === 'createInternational') {
		const sourceAccountId = this.getNodeParameter('sourceAccountId', i) as string;
		const amount = this.getNodeParameter('amount', i) as number;
		const currency = this.getNodeParameter('currency', i) as string;
		const beneficiaryName = this.getNodeParameter('beneficiaryName', i) as string;
		const beneficiaryAccountNumber = this.getNodeParameter('beneficiaryAccountNumber', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as Record<string, unknown>;

		const body: Record<string, unknown> = {
			originating_account_id: sourceAccountId,
			amount,
			currency,
			beneficiary_name: beneficiaryName,
			beneficiary_account_number: beneficiaryAccountNumber,
		};

		if (operation === 'createDomestic') {
			body.wire_type = 'DOMESTIC';
			body.beneficiary_routing_number = this.getNodeParameter('beneficiaryRoutingNumber', i) as string;
		} else {
			body.wire_type = 'INTERNATIONAL';
			body.beneficiary_swift_code = this.getNodeParameter('beneficiarySwiftCode', i) as string;
			body.beneficiary_country = this.getNodeParameter('beneficiaryCountry', i) as string;
			
			const beneficiaryAddress = this.getNodeParameter('beneficiaryAddress', i) as {
				addressFields?: {
					addressLine1?: string;
					addressLine2?: string;
					city?: string;
					state?: string;
					postalCode?: string;
				};
			};
			
			if (beneficiaryAddress.addressFields) {
				body.beneficiary_address = {
					address_line_1: beneficiaryAddress.addressFields.addressLine1,
					address_line_2: beneficiaryAddress.addressFields.addressLine2,
					city: beneficiaryAddress.addressFields.city,
					state: beneficiaryAddress.addressFields.state,
					postal_code: beneficiaryAddress.addressFields.postalCode,
				};
			}
		}

		if (additionalFields.customerId) body.customer_id = additionalFields.customerId;
		if (additionalFields.purpose) body.purpose = additionalFields.purpose;
		if (additionalFields.reference) body.reference = additionalFields.reference;
		if (additionalFields.memo) body.memo = additionalFields.memo;
		if (additionalFields.otbInfo) body.originator_to_beneficiary_info = additionalFields.otbInfo;
		if (additionalFields.beneficiaryBankName) body.beneficiary_bank_name = additionalFields.beneficiaryBankName;
		if (additionalFields.intermediaryBankRouting) body.intermediary_bank_routing = additionalFields.intermediaryBankRouting;

		responseData = await syncteraApiRequest.call(this, 'POST', ENDPOINTS.wires, body as IDataObject);
	} else if (operation === 'get') {
		const wireId = this.getNodeParameter('wireId', i) as string;
		responseData = await syncteraApiRequest.call(this, 'GET', ENDPOINTS.wireById(wireId));
	} else if (operation === 'cancel') {
		const wireId = this.getNodeParameter('wireId', i) as string;
		responseData = await syncteraApiRequest.call(this, 'POST', ENDPOINTS.wireCancel(wireId));
	} else if (operation === 'getFees') {
		const wireType = this.getNodeParameter('wireType', i) as string;
		const feeAmount = this.getNodeParameter('feeAmount', i) as number;
		responseData = await syncteraApiRequest.call(this, 'GET', ENDPOINTS.wireFees, {}, {
			wire_type: wireType,
			amount: feeAmount,
		});
	} else if (operation === 'list') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as Record<string, unknown>;

		const qs: IDataObject = {};
		if (filters.accountId) qs.account_id = filters.accountId;
		if (filters.customerId) qs.customer_id = filters.customerId;
		if (filters.status && (filters.status as string[]).length > 0) qs.status = (filters.status as string[]).join(',');
		if (filters.wireType) qs.wire_type = filters.wireType;
		if (filters.fromDate) qs.from_date = filters.fromDate;
		if (filters.toDate) qs.to_date = filters.toDate;

		if (returnAll) {
			responseData = await syncteraApiRequestAllItems.call(this, 'wires', 'GET', ENDPOINTS.wires, {}, qs);
		} else {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
			const result = await syncteraApiRequest.call(this, 'GET', ENDPOINTS.wires, {}, qs);
			responseData = (result as IDataObject).wires || [];
		}
	}

	return [{ json: responseData as IDataObject }];
}

/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties, IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { syncteraApiRequest, syncteraApiRequestAllItems } from '../../transport/syncteraClient';
import { ENDPOINTS } from '../../constants/endpoints';

export const achOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['ach'],
			},
		},
		options: [
			{
				name: 'Cancel',
				value: 'cancel',
				description: 'Cancel an ACH transfer',
				action: 'Cancel an ACH transfer',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create an ACH transfer',
				action: 'Create an ACH transfer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an ACH transfer',
				action: 'Get an ACH transfer',
			},
			{
				name: 'Get Addenda',
				value: 'getAddenda',
				description: 'Get ACH addenda records',
				action: 'Get ACH addenda',
			},
			{
				name: 'Get NOC',
				value: 'getNoc',
				description: 'Get ACH Notification of Change',
				action: 'Get ACH NOC',
			},
			{
				name: 'Get Return',
				value: 'getReturn',
				description: 'Get ACH return details',
				action: 'Get ACH return',
			},
			{
				name: 'Handle Return',
				value: 'handleReturn',
				description: 'Handle an ACH return',
				action: 'Handle an ACH return',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List ACH transfers',
				action: 'List ACH transfers',
			},
		],
		default: 'list',
	},
];

export const achFields: INodeProperties[] = [
	// ----------------------------------
	//         ach:create
	// ----------------------------------
	{
		displayName: 'Source Account ID',
		name: 'sourceAccountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ach'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the source account for the transfer',
	},
	{
		displayName: 'Destination Account ID',
		name: 'destinationAccountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ach'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the destination account (can be external account)',
	},
	{
		displayName: 'Amount (Cents)',
		name: 'amount',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['ach'],
				operation: ['create'],
			},
		},
		default: 0,
		description: 'Transfer amount in cents (e.g., 1000 = $10.00)',
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ach'],
				operation: ['create'],
			},
		},
		default: 'USD',
		description: 'Currency code (ISO 4217)',
	},
	{
		displayName: 'DC Sign',
		name: 'dcSign',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['ach'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Credit', value: 'CREDIT' },
			{ name: 'Debit', value: 'DEBIT' },
		],
		default: 'CREDIT',
		description: 'Whether this is a credit or debit from the perspective of the originating account',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['ach'],
				operation: ['create'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'SEC Code',
				name: 'secCode',
				type: 'options',
				options: [
					{ name: 'PPD - Prearranged Payment & Deposit', value: 'PPD' },
					{ name: 'CCD - Corporate Credit or Debit', value: 'CCD' },
					{ name: 'WEB - Internet-Initiated Entry', value: 'WEB' },
					{ name: 'TEL - Telephone-Initiated Entry', value: 'TEL' },
					{ name: 'CTX - Corporate Trade Exchange', value: 'CTX' },
					{ name: 'IAT - International ACH Transaction', value: 'IAT' },
				],
				default: 'PPD',
				description: 'Standard Entry Class code for the ACH transaction',
			},
			{
				displayName: 'Company Entry Description',
				name: 'companyEntryDescription',
				type: 'string',
				default: '',
				description: 'Description that appears on bank statement (max 10 chars)',
			},
			{
				displayName: 'Company Name',
				name: 'companyName',
				type: 'string',
				default: '',
				description: 'Originating company name (max 16 chars)',
			},
			{
				displayName: 'Individual Name',
				name: 'individualName',
				type: 'string',
				default: '',
				description: 'Name of the individual for the transaction',
			},
			{
				displayName: 'Effective Date',
				name: 'effectiveDate',
				type: 'string',
				default: '',
				description: 'Requested settlement date (YYYY-MM-DD)',
			},
			{
				displayName: 'Same Day',
				name: 'sameDay',
				type: 'boolean',
				default: false,
				description: 'Whether to use same-day ACH processing',
			},
			{
				displayName: 'Memo',
				name: 'memo',
				type: 'string',
				default: '',
				description: 'Internal memo for the transfer',
			},
			{
				displayName: 'Addenda',
				name: 'addenda',
				type: 'string',
				default: '',
				description: 'ACH addenda record (max 80 chars)',
			},
			{
				displayName: 'Idempotency Key',
				name: 'idempotencyKey',
				type: 'string',
				default: '',
				description: 'Unique key to prevent duplicate transactions',
			},
			{
				displayName: 'Customer ID',
				name: 'customerId',
				type: 'string',
				default: '',
				description: 'ID of the customer initiating the transfer',
			},
		],
	},
	// ----------------------------------
	//         ach:get / cancel / getReturn / getNoc / getAddenda
	// ----------------------------------
	{
		displayName: 'ACH Transfer ID',
		name: 'achId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ach'],
				operation: ['get', 'cancel', 'getReturn', 'getNoc', 'getAddenda'],
			},
		},
		default: '',
		description: 'The ID of the ACH transfer',
	},
	// ----------------------------------
	//         ach:handleReturn
	// ----------------------------------
	{
		displayName: 'ACH Transfer ID',
		name: 'achId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['ach'],
				operation: ['handleReturn'],
			},
		},
		default: '',
		description: 'The ID of the ACH transfer with a return',
	},
	{
		displayName: 'Return Action',
		name: 'returnAction',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['ach'],
				operation: ['handleReturn'],
			},
		},
		options: [
			{ name: 'Accept', value: 'ACCEPT' },
			{ name: 'Contest', value: 'CONTEST' },
			{ name: 'Resubmit', value: 'RESUBMIT' },
		],
		default: 'ACCEPT',
		description: 'How to handle the ACH return',
	},
	// ----------------------------------
	//         ach:list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['ach'],
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
				resource: ['ach'],
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
				resource: ['ach'],
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
					{ name: 'Returned', value: 'RETURNED' },
					{ name: 'Canceled', value: 'CANCELED' },
					{ name: 'Failed', value: 'FAILED' },
				],
				default: [],
				description: 'Filter by status',
			},
			{
				displayName: 'DC Sign',
				name: 'dcSign',
				type: 'options',
				options: [
					{ name: 'Credit', value: 'CREDIT' },
					{ name: 'Debit', value: 'DEBIT' },
				],
				default: 'CREDIT',
				description: 'Filter by credit or debit',
			},
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'string',
				default: '',
				description: 'Filter transfers created after this date (YYYY-MM-DD)',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'string',
				default: '',
				description: 'Filter transfers created before this date (YYYY-MM-DD)',
			},
		],
	},
];

export async function executeAchOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	let responseData;

	if (operation === 'create') {
		const sourceAccountId = this.getNodeParameter('sourceAccountId', i) as string;
		const destinationAccountId = this.getNodeParameter('destinationAccountId', i) as string;
		const amount = this.getNodeParameter('amount', i) as number;
		const currency = this.getNodeParameter('currency', i) as string;
		const dcSign = this.getNodeParameter('dcSign', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as {
			secCode?: string;
			companyEntryDescription?: string;
			companyName?: string;
			individualName?: string;
			effectiveDate?: string;
			sameDay?: boolean;
			memo?: string;
			addenda?: string;
			idempotencyKey?: string;
			customerId?: string;
		};

		const body: Record<string, unknown> = {
			originating_account_id: sourceAccountId,
			receiving_account_id: destinationAccountId,
			amount,
			currency,
			dc_sign: dcSign,
		};

		if (additionalFields.secCode) body.sec_code = additionalFields.secCode;
		if (additionalFields.companyEntryDescription) body.company_entry_description = additionalFields.companyEntryDescription;
		if (additionalFields.companyName) body.company_name = additionalFields.companyName;
		if (additionalFields.individualName) body.individual_name = additionalFields.individualName;
		if (additionalFields.effectiveDate) body.effective_date = additionalFields.effectiveDate;
		if (additionalFields.sameDay !== undefined) body.same_day = additionalFields.sameDay;
		if (additionalFields.memo) body.memo = additionalFields.memo;
		if (additionalFields.addenda) body.addenda = additionalFields.addenda;
		if (additionalFields.customerId) body.customer_id = additionalFields.customerId;

		const options: Record<string, unknown> = {};
		if (additionalFields.idempotencyKey) {
			options.headers = { 'Idempotency-Key': additionalFields.idempotencyKey };
		}

		responseData = await syncteraApiRequest.call(this, 'POST', ENDPOINTS.achTransfers, body as IDataObject);
	} else if (operation === 'get') {
		const achId = this.getNodeParameter('achId', i) as string;
		responseData = await syncteraApiRequest.call(this, 'GET', ENDPOINTS.achTransferById(achId));
	} else if (operation === 'cancel') {
		const achId = this.getNodeParameter('achId', i) as string;
		responseData = await syncteraApiRequest.call(this, 'POST', ENDPOINTS.achTransferCancel(achId));
	} else if (operation === 'getReturn') {
		const achId = this.getNodeParameter('achId', i) as string;
		responseData = await syncteraApiRequest.call(this, 'GET', `${ENDPOINTS.achTransferById(achId)}/return`);
	} else if (operation === 'getNoc') {
		const achId = this.getNodeParameter('achId', i) as string;
		responseData = await syncteraApiRequest.call(this, 'GET', `${ENDPOINTS.achTransferById(achId)}/noc`);
	} else if (operation === 'getAddenda') {
		const achId = this.getNodeParameter('achId', i) as string;
		responseData = await syncteraApiRequest.call(this, 'GET', ENDPOINTS.achAddenda(achId));
	} else if (operation === 'handleReturn') {
		const achId = this.getNodeParameter('achId', i) as string;
		const returnAction = this.getNodeParameter('returnAction', i) as string;
		responseData = await syncteraApiRequest.call(this, 'POST', `${ENDPOINTS.achTransferById(achId)}/return`, {
			action: returnAction,
		});
	} else if (operation === 'list') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as {
			accountId?: string;
			customerId?: string;
			status?: string[];
			dcSign?: string;
			fromDate?: string;
			toDate?: string;
		};

		const qs: IDataObject = {};
		if (filters.accountId) qs.account_id = filters.accountId;
		if (filters.customerId) qs.customer_id = filters.customerId;
		if (filters.status && filters.status.length > 0) qs.status = filters.status.join(',');
		if (filters.dcSign) qs.dc_sign = filters.dcSign;
		if (filters.fromDate) qs.from_date = filters.fromDate;
		if (filters.toDate) qs.to_date = filters.toDate;

		if (returnAll) {
			responseData = await syncteraApiRequestAllItems.call(this, 'ach_transfers', 'GET', ENDPOINTS.achTransfers, {}, qs);
		} else {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
			const result = await syncteraApiRequest.call(this, 'GET', ENDPOINTS.achTransfers, {}, qs);
			responseData = (result as IDataObject).ach_transfers || [];
		}
	}

	return [{ json: responseData as IDataObject }];
}

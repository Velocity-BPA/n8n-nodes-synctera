/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const transactionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['transaction'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a transaction by ID',
				action: 'Get transaction',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List transactions',
				action: 'List transactions',
			},
			{
				name: 'Get Pending',
				value: 'getPending',
				description: 'Get pending transactions',
				action: 'Get pending transactions',
			},
			{
				name: 'Get Posted',
				value: 'getPosted',
				description: 'Get posted transactions',
				action: 'Get posted transactions',
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search transactions with advanced filters',
				action: 'Search transactions',
			},
			{
				name: 'Patch',
				value: 'patch',
				description: 'Update transaction metadata',
				action: 'Patch transaction',
			},
			{
				name: 'Get Enhanced Data',
				value: 'getEnhancedData',
				description: 'Get enhanced transaction data (merchant info, category)',
				action: 'Get enhanced data',
			},
		],
		default: 'list',
	},
];

export const transactionFields: INodeProperties[] = [
	// ----------------------------------
	//       transaction: get
	// ----------------------------------
	{
		displayName: 'Transaction ID',
		name: 'transactionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['get', 'patch', 'getEnhancedData'],
			},
		},
		description: 'UUID of the transaction',
	},

	// ----------------------------------
	//       transaction: patch
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['patch'],
			},
		},
		options: [
			{
				displayName: 'Memo',
				name: 'memo',
				type: 'string',
				default: '',
				description: 'Update transaction memo/note',
			},
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				description: 'Custom category for the transaction',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Custom metadata as JSON object',
			},
		],
	},

	// ----------------------------------
	//       transaction: list/search
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['list', 'getPending', 'getPosted', 'search'],
			},
		},
		description: 'Whether to return all results or limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['list', 'getPending', 'getPosted', 'search'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['list', 'getPending', 'getPosted'],
			},
		},
		options: [
			{
				displayName: 'Account ID',
				name: 'account_id',
				type: 'string',
				default: '',
				description: 'Filter by account UUID',
			},
			{
				displayName: 'Customer ID',
				name: 'customer_id',
				type: 'string',
				default: '',
				description: 'Filter by customer UUID',
			},
			{
				displayName: 'Transaction Type',
				name: 'type',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'ACH', value: 'ACH' },
					{ name: 'Wire', value: 'WIRE' },
					{ name: 'Card', value: 'CARD' },
					{ name: 'Internal Transfer', value: 'INTERNAL_TRANSFER' },
					{ name: 'Fee', value: 'FEE' },
					{ name: 'Interest', value: 'INTEREST' },
					{ name: 'Adjustment', value: 'ADJUSTMENT' },
				],
				description: 'Filter by transaction type',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Pending', value: 'PENDING' },
					{ name: 'Posted', value: 'POSTED' },
					{ name: 'Declined', value: 'DECLINED' },
					{ name: 'Reversed', value: 'REVERSED' },
				],
				description: 'Filter by transaction status',
			},
			{
				displayName: 'From Date',
				name: 'from_date',
				type: 'dateTime',
				default: '',
				description: 'Filter transactions from this date',
			},
			{
				displayName: 'To Date',
				name: 'to_date',
				type: 'dateTime',
				default: '',
				description: 'Filter transactions to this date',
			},
			{
				displayName: 'Min Amount (Cents)',
				name: 'min_amount',
				type: 'number',
				default: 0,
				description: 'Minimum transaction amount in cents',
			},
			{
				displayName: 'Max Amount (Cents)',
				name: 'max_amount',
				type: 'number',
				default: 0,
				description: 'Maximum transaction amount in cents',
			},
		],
	},

	// ----------------------------------
	//       transaction: search
	// ----------------------------------
	{
		displayName: 'Search Criteria',
		name: 'searchCriteria',
		type: 'collection',
		placeholder: 'Add Search Criteria',
		default: {},
		displayOptions: {
			show: {
				resource: ['transaction'],
				operation: ['search'],
			},
		},
		options: [
			{
				displayName: 'Account IDs',
				name: 'account_ids',
				type: 'string',
				default: '',
				description: 'Comma-separated list of account UUIDs',
			},
			{
				displayName: 'Customer IDs',
				name: 'customer_ids',
				type: 'string',
				default: '',
				description: 'Comma-separated list of customer UUIDs',
			},
			{
				displayName: 'Transaction Types',
				name: 'types',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'ACH', value: 'ACH' },
					{ name: 'Wire', value: 'WIRE' },
					{ name: 'Card', value: 'CARD' },
					{ name: 'Internal Transfer', value: 'INTERNAL_TRANSFER' },
					{ name: 'Fee', value: 'FEE' },
					{ name: 'Interest', value: 'INTEREST' },
				],
				description: 'Filter by transaction types',
			},
			{
				displayName: 'Description Contains',
				name: 'description_contains',
				type: 'string',
				default: '',
				description: 'Search transactions where description contains this text',
			},
			{
				displayName: 'Merchant Name Contains',
				name: 'merchant_name_contains',
				type: 'string',
				default: '',
				description: 'Search by merchant name (for card transactions)',
			},
			{
				displayName: 'Start Date',
				name: 'start_date',
				type: 'dateTime',
				default: '',
				description: 'Start of date range',
			},
			{
				displayName: 'End Date',
				name: 'end_date',
				type: 'dateTime',
				default: '',
				description: 'End of date range',
			},
			{
				displayName: 'Min Amount (Cents)',
				name: 'min_amount',
				type: 'number',
				default: 0,
				description: 'Minimum transaction amount',
			},
			{
				displayName: 'Max Amount (Cents)',
				name: 'max_amount',
				type: 'number',
				default: 0,
				description: 'Maximum transaction amount',
			},
			{
				displayName: 'Include Pending',
				name: 'include_pending',
				type: 'boolean',
				default: true,
				description: 'Whether to include pending transactions',
			},
		],
	},
];

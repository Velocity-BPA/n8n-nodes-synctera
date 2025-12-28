/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

/**
 * Account Resource Operations
 *
 * Accounts in Synctera represent deposit accounts (checking, savings) or
 * credit accounts held at the sponsor bank. Accounts are linked to customers
 * and support various transaction types.
 */

export const accountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		options: [
			{
				name: 'Close',
				value: 'close',
				description: 'Close an account',
				action: 'Close account',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new account',
				action: 'Create account',
			},
			{
				name: 'Freeze',
				value: 'freeze',
				description: 'Freeze an account',
				action: 'Freeze account',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an account by ID',
				action: 'Get account',
			},
			{
				name: 'Get Account Number',
				value: 'getAccountNumber',
				description: 'Get the account number',
				action: 'Get account number',
			},
			{
				name: 'Get Balance',
				value: 'getBalance',
				description: 'Get account balance',
				action: 'Get account balance',
			},
			{
				name: 'Get Routing Number',
				value: 'getRoutingNumber',
				description: 'Get the routing number',
				action: 'Get routing number',
			},
			{
				name: 'Get Statement',
				value: 'getStatement',
				description: 'Get account statement',
				action: 'Get account statement',
			},
			{
				name: 'Get Transactions',
				value: 'getTransactions',
				description: 'Get account transactions',
				action: 'Get account transactions',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all accounts',
				action: 'List accounts',
			},
			{
				name: 'Unfreeze',
				value: 'unfreeze',
				description: 'Unfreeze an account',
				action: 'Unfreeze account',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an account',
				action: 'Update account',
			},
		],
		default: 'list',
	},
];

export const accountFields: INodeProperties[] = [
	// ----------------------------------
	//         account: create
	// ----------------------------------
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the customer who will own this account',
	},
	{
		displayName: 'Account Template ID',
		name: 'accountTemplateId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'The ID of the account template to use',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Account Alias',
				name: 'accountAlias',
				type: 'string',
				default: '',
				description: 'A friendly name for the account',
			},
			{
				displayName: 'Account Purpose',
				name: 'purpose',
				type: 'options',
				options: [
					{ name: 'FBO', value: 'FBO' },
					{ name: 'General', value: 'GENERAL' },
					{ name: 'Operating', value: 'OPERATING' },
					{ name: 'Payroll', value: 'PAYROLL' },
					{ name: 'Reserve', value: 'RESERVE' },
					{ name: 'Savings', value: 'SAVINGS' },
				],
				default: 'GENERAL',
				description: 'Purpose of the account',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: 'USD',
				description: 'Account currency (ISO 4217)',
			},
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
				description: 'Internal note about the account',
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
	//         account: get, update, close, freeze, unfreeze, getBalance, etc.
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['get', 'update', 'close', 'freeze', 'unfreeze', 'getBalance', 'getAccountNumber', 'getRoutingNumber', 'getTransactions', 'getStatement'],
			},
		},
		default: '',
		description: 'The ID of the account',
	},

	// ----------------------------------
	//         account: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Account Alias',
				name: 'accountAlias',
				type: 'string',
				default: '',
				description: 'Updated friendly name',
			},
			{
				displayName: 'Note',
				name: 'note',
				type: 'string',
				default: '',
				description: 'Updated internal note',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Updated custom metadata',
			},
		],
	},

	// ----------------------------------
	//         account: close
	// ----------------------------------
	{
		displayName: 'Close Reason',
		name: 'closeReason',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['close'],
			},
		},
		options: [
			{ name: 'Account Holder Request', value: 'ACCOUNT_HOLDER_REQUEST' },
			{ name: 'Bank Initiated', value: 'BANK_INITIATED' },
			{ name: 'Fraud', value: 'FRAUD' },
			{ name: 'Inactive', value: 'INACTIVE' },
			{ name: 'Other', value: 'OTHER' },
		],
		default: 'ACCOUNT_HOLDER_REQUEST',
		description: 'Reason for closing the account',
	},

	// ----------------------------------
	//         account: freeze/unfreeze
	// ----------------------------------
	{
		displayName: 'Freeze Reason',
		name: 'freezeReason',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['freeze'],
			},
		},
		default: '',
		description: 'Reason for freezing the account',
	},

	// ----------------------------------
	//         account: getTransactions
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getTransactions', 'list'],
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
				resource: ['account'],
				operation: ['getTransactions', 'list'],
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
		displayName: 'Transaction Filters',
		name: 'transactionFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getTransactions'],
			},
		},
		options: [
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'Filter transactions after this date',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'Filter transactions before this date',
			},
			{
				displayName: 'Transaction Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'ACH Credit', value: 'ACH_CREDIT' },
					{ name: 'ACH Debit', value: 'ACH_DEBIT' },
					{ name: 'Card Purchase', value: 'CARD_PURCHASE' },
					{ name: 'Fee', value: 'FEE' },
					{ name: 'Internal Transfer', value: 'INTERNAL_TRANSFER' },
					{ name: 'Wire Incoming', value: 'WIRE_INCOMING' },
					{ name: 'Wire Outgoing', value: 'WIRE_OUTGOING' },
				],
				default: '',
				description: 'Filter by transaction type',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Pending', value: 'PENDING' },
					{ name: 'Posted', value: 'POSTED' },
					{ name: 'Reversed', value: 'REVERSED' },
				],
				default: '',
				description: 'Filter by transaction status',
			},
			{
				displayName: 'Min Amount',
				name: 'minAmount',
				type: 'number',
				default: 0,
				description: 'Minimum transaction amount',
			},
			{
				displayName: 'Max Amount',
				name: 'maxAmount',
				type: 'number',
				default: 0,
				description: 'Maximum transaction amount (0 = no limit)',
			},
		],
	},

	// ----------------------------------
	//         account: getStatement
	// ----------------------------------
	{
		displayName: 'Statement Period',
		name: 'statementPeriod',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getStatement'],
			},
		},
		options: [
			{ name: 'Current Month', value: 'current' },
			{ name: 'Previous Month', value: 'previous' },
			{ name: 'Custom Date Range', value: 'custom' },
		],
		default: 'current',
		description: 'Statement period to retrieve',
	},
	{
		displayName: 'Start Date',
		name: 'statementStartDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getStatement'],
				statementPeriod: ['custom'],
			},
		},
		default: '',
		description: 'Statement period start date',
	},
	{
		displayName: 'End Date',
		name: 'statementEndDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getStatement'],
				statementPeriod: ['custom'],
			},
		},
		default: '',
		description: 'Statement period end date',
	},

	// ----------------------------------
	//         account: list
	// ----------------------------------
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Customer ID',
				name: 'customerId',
				type: 'string',
				default: '',
				description: 'Filter by customer ID',
			},
			{
				displayName: 'Account Type',
				name: 'accountType',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Checking', value: 'CHECKING' },
					{ name: 'Savings', value: 'SAVINGS' },
					{ name: 'Money Market', value: 'MONEY_MARKET' },
				],
				default: '',
				description: 'Filter by account type',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Closed', value: 'CLOSED' },
					{ name: 'Frozen', value: 'FROZEN' },
					{ name: 'Pending', value: 'PENDING' },
				],
				default: '',
				description: 'Filter by account status',
			},
		],
	},
];

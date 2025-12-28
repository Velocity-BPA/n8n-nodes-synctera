/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const authorizationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['authorization'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get an authorization by ID',
				action: 'Get authorization',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List authorizations',
				action: 'List authorizations',
			},
			{
				name: 'Simulate',
				value: 'simulate',
				description: 'Simulate a card authorization (sandbox only)',
				action: 'Simulate authorization',
			},
			{
				name: 'Clear',
				value: 'clear',
				description: 'Clear/settle an authorization (sandbox only)',
				action: 'Clear authorization',
			},
			{
				name: 'Reverse',
				value: 'reverse',
				description: 'Reverse an authorization (sandbox only)',
				action: 'Reverse authorization',
			},
		],
		default: 'list',
	},
];

export const authorizationFields: INodeProperties[] = [
	// ----------------------------------
	//       authorization: get
	// ----------------------------------
	{
		displayName: 'Authorization ID',
		name: 'authorizationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['authorization'],
				operation: ['get', 'clear', 'reverse'],
			},
		},
		description: 'UUID of the authorization',
	},

	// ----------------------------------
	//       authorization: simulate
	// ----------------------------------
	{
		displayName: 'Card ID',
		name: 'cardId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['authorization'],
				operation: ['simulate'],
			},
		},
		description: 'UUID of the card to simulate authorization for',
	},
	{
		displayName: 'Amount (Cents)',
		name: 'amount',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['authorization'],
				operation: ['simulate'],
			},
		},
		description: 'Authorization amount in cents',
	},
	{
		displayName: 'Merchant Name',
		name: 'merchantName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['authorization'],
				operation: ['simulate'],
			},
		},
		description: 'Name of the merchant',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['authorization'],
				operation: ['simulate'],
			},
		},
		options: [
			{
				displayName: 'Merchant Category Code',
				name: 'mcc',
				type: 'string',
				default: '5411',
				description: 'Merchant Category Code (4-digit)',
			},
			{
				displayName: 'Merchant City',
				name: 'merchantCity',
				type: 'string',
				default: '',
				description: 'City where merchant is located',
			},
			{
				displayName: 'Merchant State',
				name: 'merchantState',
				type: 'string',
				default: '',
				description: 'State code where merchant is located',
			},
			{
				displayName: 'Merchant Country',
				name: 'merchantCountry',
				type: 'string',
				default: 'US',
				description: 'Country code where merchant is located',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: 'USD',
				description: 'Currency code (ISO 4217)',
			},
			{
				displayName: 'Transaction Type',
				name: 'transactionType',
				type: 'options',
				default: 'PURCHASE',
				options: [
					{ name: 'Purchase', value: 'PURCHASE' },
					{ name: 'ATM Withdrawal', value: 'ATM_WITHDRAWAL' },
					{ name: 'Cash Advance', value: 'CASH_ADVANCE' },
					{ name: 'Refund', value: 'REFUND' },
				],
				description: 'Type of transaction',
			},
			{
				displayName: 'Entry Mode',
				name: 'entryMode',
				type: 'options',
				default: 'CHIP',
				options: [
					{ name: 'Chip', value: 'CHIP' },
					{ name: 'Swipe', value: 'SWIPE' },
					{ name: 'Manual', value: 'MANUAL' },
					{ name: 'Contactless', value: 'CONTACTLESS' },
					{ name: 'E-commerce', value: 'ECOMMERCE' },
				],
				description: 'Card entry mode',
			},
			{
				displayName: 'PIN Entered',
				name: 'pinEntered',
				type: 'boolean',
				default: false,
				description: 'Whether PIN was entered',
			},
		],
	},

	// ----------------------------------
	//       authorization: clear
	// ----------------------------------
	{
		displayName: 'Clear Amount (Cents)',
		name: 'clearAmount',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['authorization'],
				operation: ['clear'],
			},
		},
		description: 'Amount to clear (if different from authorization amount). Leave 0 to clear full amount.',
	},

	// ----------------------------------
	//       authorization: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['authorization'],
				operation: ['list'],
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
				resource: ['authorization'],
				operation: ['list'],
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
				resource: ['authorization'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Card ID',
				name: 'card_id',
				type: 'string',
				default: '',
				description: 'Filter by card UUID',
			},
			{
				displayName: 'Account ID',
				name: 'account_id',
				type: 'string',
				default: '',
				description: 'Filter by account UUID',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Pending', value: 'PENDING' },
					{ name: 'Approved', value: 'APPROVED' },
					{ name: 'Declined', value: 'DECLINED' },
					{ name: 'Cleared', value: 'CLEARED' },
					{ name: 'Reversed', value: 'REVERSED' },
					{ name: 'Expired', value: 'EXPIRED' },
				],
				description: 'Filter by authorization status',
			},
			{
				displayName: 'From Date',
				name: 'from_date',
				type: 'dateTime',
				default: '',
				description: 'Filter authorizations from this date',
			},
			{
				displayName: 'To Date',
				name: 'to_date',
				type: 'dateTime',
				default: '',
				description: 'Filter authorizations to this date',
			},
		],
	},
];

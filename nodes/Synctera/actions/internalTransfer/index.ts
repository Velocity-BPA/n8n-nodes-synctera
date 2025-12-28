/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const internalTransferOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['internalTransfer'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an internal transfer between accounts',
				action: 'Create internal transfer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an internal transfer by ID',
				action: 'Get internal transfer',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List internal transfers',
				action: 'List internal transfers',
			},
			{
				name: 'Get Status',
				value: 'getStatus',
				description: 'Get the status of an internal transfer',
				action: 'Get transfer status',
			},
		],
		default: 'create',
	},
];

export const internalTransferFields: INodeProperties[] = [
	// ----------------------------------
	//       internalTransfer: create
	// ----------------------------------
	{
		displayName: 'Source Account ID',
		name: 'sourceAccountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['internalTransfer'],
				operation: ['create'],
			},
		},
		description: 'UUID of the source account to transfer from',
	},
	{
		displayName: 'Target Account ID',
		name: 'targetAccountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['internalTransfer'],
				operation: ['create'],
			},
		},
		description: 'UUID of the target account to transfer to',
	},
	{
		displayName: 'Amount (Cents)',
		name: 'amount',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['internalTransfer'],
				operation: ['create'],
			},
		},
		description: 'Transfer amount in cents (e.g., 1000 = $10.00)',
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'options',
		required: true,
		default: 'USD',
		displayOptions: {
			show: {
				resource: ['internalTransfer'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'USD', value: 'USD' },
			{ name: 'EUR', value: 'EUR' },
			{ name: 'GBP', value: 'GBP' },
		],
		description: 'Currency code for the transfer',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['internalTransfer'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the transfer',
			},
			{
				displayName: 'Memo',
				name: 'memo',
				type: 'string',
				default: '',
				description: 'Memo for the transfer (appears on statements)',
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
	//       internalTransfer: get
	// ----------------------------------
	{
		displayName: 'Transfer ID',
		name: 'transferId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['internalTransfer'],
				operation: ['get', 'getStatus'],
			},
		},
		description: 'UUID of the internal transfer',
	},

	// ----------------------------------
	//       internalTransfer: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['internalTransfer'],
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
				resource: ['internalTransfer'],
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
				resource: ['internalTransfer'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Source Account ID',
				name: 'source_account_id',
				type: 'string',
				default: '',
				description: 'Filter by source account UUID',
			},
			{
				displayName: 'Target Account ID',
				name: 'target_account_id',
				type: 'string',
				default: '',
				description: 'Filter by target account UUID',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: '',
				options: [
					{ name: 'Pending', value: 'PENDING' },
					{ name: 'Processing', value: 'PROCESSING' },
					{ name: 'Completed', value: 'COMPLETED' },
					{ name: 'Failed', value: 'FAILED' },
					{ name: 'Canceled', value: 'CANCELED' },
				],
				description: 'Filter by transfer status',
			},
			{
				displayName: 'From Date',
				name: 'from_date',
				type: 'dateTime',
				default: '',
				description: 'Filter transfers from this date',
			},
			{
				displayName: 'To Date',
				name: 'to_date',
				type: 'dateTime',
				default: '',
				description: 'Filter transfers to this date',
			},
		],
	},
];

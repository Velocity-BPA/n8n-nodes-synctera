/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

/**
 * Hold operations for Synctera
 * Manages account holds (temporary freezes on funds)
 */
export const holdOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['hold'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a hold on an account',
				action: 'Create a hold',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a hold by ID',
				action: 'Get a hold',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List holds for an account',
				action: 'List holds',
			},
			{
				name: 'Release',
				value: 'release',
				description: 'Release (remove) a hold',
				action: 'Release a hold',
			},
		],
		default: 'list',
	},
];

export const holdFields: INodeProperties[] = [
	// ----------------------------------
	//         hold:create
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['hold'],
				operation: ['create', 'list'],
			},
		},
		description: 'The account ID to place the hold on',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				resource: ['hold'],
				operation: ['create'],
			},
		},
		description: 'Amount to hold in cents',
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'options',
		required: true,
		default: 'USD',
		options: [
			{ name: 'USD', value: 'USD' },
			{ name: 'EUR', value: 'EUR' },
			{ name: 'GBP', value: 'GBP' },
			{ name: 'CAD', value: 'CAD' },
		],
		displayOptions: {
			show: {
				resource: ['hold'],
				operation: ['create'],
			},
		},
		description: 'Currency for the hold',
	},
	{
		displayName: 'Hold Type',
		name: 'holdType',
		type: 'options',
		required: true,
		default: 'AUTHORIZATION',
		options: [
			{
				name: 'Authorization',
				value: 'AUTHORIZATION',
				description: 'Card authorization hold',
			},
			{
				name: 'ACH',
				value: 'ACH',
				description: 'ACH transfer hold',
			},
			{
				name: 'Check',
				value: 'CHECK',
				description: 'Check deposit hold',
			},
			{
				name: 'Dispute',
				value: 'DISPUTE',
				description: 'Dispute investigation hold',
			},
			{
				name: 'Fraud',
				value: 'FRAUD',
				description: 'Fraud investigation hold',
			},
			{
				name: 'Legal',
				value: 'LEGAL',
				description: 'Legal/garnishment hold',
			},
			{
				name: 'Regulatory',
				value: 'REGULATORY',
				description: 'Regulatory compliance hold',
			},
			{
				name: 'Wire',
				value: 'WIRE',
				description: 'Wire transfer hold',
			},
			{
				name: 'Other',
				value: 'OTHER',
				description: 'Custom hold type',
			},
		],
		displayOptions: {
			show: {
				resource: ['hold'],
				operation: ['create'],
			},
		},
		description: 'Type of hold to place',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['hold'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the hold reason',
			},
			{
				displayName: 'Expiration Date',
				name: 'expirationDate',
				type: 'dateTime',
				default: '',
				description: 'When the hold automatically expires',
			},
			{
				displayName: 'Related Transaction ID',
				name: 'relatedTransactionId',
				type: 'string',
				default: '',
				description: 'Transaction ID that triggered the hold',
			},
			{
				displayName: 'Related Authorization ID',
				name: 'relatedAuthorizationId',
				type: 'string',
				default: '',
				description: 'Card authorization ID for auth holds',
			},
			{
				displayName: 'Case Number',
				name: 'caseNumber',
				type: 'string',
				default: '',
				description: 'Case or reference number for investigation holds',
			},
			{
				displayName: 'Legal Reference',
				name: 'legalReference',
				type: 'string',
				default: '',
				description: 'Legal document reference for legal holds',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'Low', value: 'LOW' },
					{ name: 'Normal', value: 'NORMAL' },
					{ name: 'High', value: 'HIGH' },
					{ name: 'Critical', value: 'CRITICAL' },
				],
				default: 'NORMAL',
				description: 'Priority level of the hold',
			},
			{
				displayName: 'Notify Customer',
				name: 'notifyCustomer',
				type: 'boolean',
				default: false,
				description: 'Whether to notify the customer about the hold',
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Internal notes about the hold',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Additional metadata as JSON',
			},
		],
	},

	// ----------------------------------
	//         hold:get
	// ----------------------------------
	{
		displayName: 'Hold ID',
		name: 'holdId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['hold'],
				operation: ['get', 'release'],
			},
		},
		description: 'The unique identifier of the hold',
	},

	// ----------------------------------
	//         hold:list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['hold'],
				operation: ['list'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
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
				resource: ['hold'],
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
				resource: ['hold'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Hold Type',
				name: 'holdType',
				type: 'multiOptions',
				options: [
					{ name: 'Authorization', value: 'AUTHORIZATION' },
					{ name: 'ACH', value: 'ACH' },
					{ name: 'Check', value: 'CHECK' },
					{ name: 'Dispute', value: 'DISPUTE' },
					{ name: 'Fraud', value: 'FRAUD' },
					{ name: 'Legal', value: 'LEGAL' },
					{ name: 'Regulatory', value: 'REGULATORY' },
					{ name: 'Wire', value: 'WIRE' },
					{ name: 'Other', value: 'OTHER' },
				],
				default: [],
				description: 'Filter by hold type',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Released', value: 'RELEASED' },
					{ name: 'Expired', value: 'EXPIRED' },
					{ name: 'Converted', value: 'CONVERTED' },
				],
				default: [],
				description: 'Filter by hold status',
			},
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
				description: 'Filter holds created after this date',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'dateTime',
				default: '',
				description: 'Filter holds created before this date',
			},
			{
				displayName: 'Minimum Amount',
				name: 'minAmount',
				type: 'number',
				default: 0,
				description: 'Minimum hold amount in cents',
			},
			{
				displayName: 'Maximum Amount',
				name: 'maxAmount',
				type: 'number',
				default: 0,
				description: 'Maximum hold amount in cents',
			},
			{
				displayName: 'Include Released',
				name: 'includeReleased',
				type: 'boolean',
				default: false,
				description: 'Whether to include released holds',
			},
			{
				displayName: 'Include Expired',
				name: 'includeExpired',
				type: 'boolean',
				default: false,
				description: 'Whether to include expired holds',
			},
		],
	},

	// ----------------------------------
	//         hold:release
	// ----------------------------------
	{
		displayName: 'Release Reason',
		name: 'releaseReason',
		type: 'options',
		required: true,
		default: 'COMPLETED',
		options: [
			{
				name: 'Completed',
				value: 'COMPLETED',
				description: 'Transaction completed successfully',
			},
			{
				name: 'Cancelled',
				value: 'CANCELLED',
				description: 'Transaction was cancelled',
			},
			{
				name: 'Expired',
				value: 'EXPIRED',
				description: 'Hold expired naturally',
			},
			{
				name: 'Investigation Complete',
				value: 'INVESTIGATION_COMPLETE',
				description: 'Investigation concluded',
			},
			{
				name: 'Funds Cleared',
				value: 'FUNDS_CLEARED',
				description: 'Funds have cleared',
			},
			{
				name: 'Customer Request',
				value: 'CUSTOMER_REQUEST',
				description: 'Released at customer request',
			},
			{
				name: 'Bank Error',
				value: 'BANK_ERROR',
				description: 'Hold was placed in error',
			},
			{
				name: 'Other',
				value: 'OTHER',
				description: 'Other reason (specify in notes)',
			},
		],
		displayOptions: {
			show: {
				resource: ['hold'],
				operation: ['release'],
			},
		},
		description: 'Reason for releasing the hold',
	},
	{
		displayName: 'Release Fields',
		name: 'releaseFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['hold'],
				operation: ['release'],
			},
		},
		options: [
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Notes about the release',
			},
			{
				displayName: 'Partial Release Amount',
				name: 'partialAmount',
				type: 'number',
				default: 0,
				description: 'Amount to release if partial (in cents, 0 = full release)',
			},
			{
				displayName: 'Convert to Transaction',
				name: 'convertToTransaction',
				type: 'boolean',
				default: false,
				description: 'Whether to convert the hold to a transaction',
			},
			{
				displayName: 'Transaction Amount',
				name: 'transactionAmount',
				type: 'number',
				default: 0,
				description: 'Amount for the transaction if converting (in cents)',
			},
			{
				displayName: 'Reference Number',
				name: 'referenceNumber',
				type: 'string',
				default: '',
				description: 'External reference for the release',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Additional metadata as JSON',
			},
		],
	},
];

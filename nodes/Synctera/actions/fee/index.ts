/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

/**
 * Fee operations for Synctera
 * Manages fee assessment, reversal, and fee schedules for accounts
 */
export const feeOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['fee'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create (assess) a fee on an account',
				action: 'Create a fee',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a fee by ID',
				action: 'Get a fee',
			},
			{
				name: 'Get Schedule',
				value: 'getSchedule',
				description: 'Get the fee schedule for an account',
				action: 'Get fee schedule',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List fees for an account',
				action: 'List fees',
			},
			{
				name: 'Reverse',
				value: 'reverse',
				description: 'Reverse (refund) a fee',
				action: 'Reverse a fee',
			},
		],
		default: 'list',
	},
];

export const feeFields: INodeProperties[] = [
	// ----------------------------------
	//         fee:create
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['fee'],
				operation: ['create', 'list', 'getSchedule'],
			},
		},
		description: 'The account ID to assess the fee on',
	},
	{
		displayName: 'Fee Type',
		name: 'feeType',
		type: 'options',
		required: true,
		default: 'MAINTENANCE',
		options: [
			{
				name: 'Account Maintenance',
				value: 'MAINTENANCE',
				description: 'Monthly account maintenance fee',
			},
			{
				name: 'ATM Fee',
				value: 'ATM',
				description: 'ATM withdrawal fee',
			},
			{
				name: 'Card Replacement',
				value: 'CARD_REPLACEMENT',
				description: 'Card replacement fee',
			},
			{
				name: 'Chargeback',
				value: 'CHARGEBACK',
				description: 'Chargeback fee',
			},
			{
				name: 'Expedited Delivery',
				value: 'EXPEDITED_DELIVERY',
				description: 'Expedited card/check delivery fee',
			},
			{
				name: 'Foreign Transaction',
				value: 'FOREIGN_TRANSACTION',
				description: 'International transaction fee',
			},
			{
				name: 'Inactivity',
				value: 'INACTIVITY',
				description: 'Account inactivity fee',
			},
			{
				name: 'Minimum Balance',
				value: 'MINIMUM_BALANCE',
				description: 'Below minimum balance fee',
			},
			{
				name: 'NSF / Overdraft',
				value: 'NSF',
				description: 'Non-sufficient funds fee',
			},
			{
				name: 'Paper Statement',
				value: 'PAPER_STATEMENT',
				description: 'Paper statement fee',
			},
			{
				name: 'Return Item',
				value: 'RETURN_ITEM',
				description: 'Returned item (check, ACH) fee',
			},
			{
				name: 'Stop Payment',
				value: 'STOP_PAYMENT',
				description: 'Stop payment request fee',
			},
			{
				name: 'Wire Fee',
				value: 'WIRE',
				description: 'Wire transfer fee',
			},
			{
				name: 'Other',
				value: 'OTHER',
				description: 'Custom fee type',
			},
		],
		displayOptions: {
			show: {
				resource: ['fee'],
				operation: ['create'],
			},
		},
		description: 'Type of fee to assess',
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
				resource: ['fee'],
				operation: ['create'],
			},
		},
		description: 'Fee amount in cents',
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
				resource: ['fee'],
				operation: ['create'],
			},
		},
		description: 'Currency for the fee',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['fee'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the fee',
			},
			{
				displayName: 'Custom Fee Name',
				name: 'customFeeName',
				type: 'string',
				default: '',
				description: 'Custom name for "Other" fee types',
			},
			{
				displayName: 'Related Transaction ID',
				name: 'relatedTransactionId',
				type: 'string',
				default: '',
				description: 'Transaction ID that triggered the fee',
			},
			{
				displayName: 'Waive Fee',
				name: 'waive',
				type: 'boolean',
				default: false,
				description: 'Whether to record the fee but waive collection',
			},
			{
				displayName: 'Waiver Reason',
				name: 'waiverReason',
				type: 'string',
				default: '',
				description: 'Reason for waiving the fee',
			},
			{
				displayName: 'Effective Date',
				name: 'effectiveDate',
				type: 'dateTime',
				default: '',
				description: 'Date when the fee should be assessed (defaults to now)',
			},
			{
				displayName: 'Reference Number',
				name: 'referenceNumber',
				type: 'string',
				default: '',
				description: 'External reference number for the fee',
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
	//         fee:get
	// ----------------------------------
	{
		displayName: 'Fee ID',
		name: 'feeId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['fee'],
				operation: ['get', 'reverse'],
			},
		},
		description: 'The unique identifier of the fee',
	},

	// ----------------------------------
	//         fee:list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['fee'],
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
				resource: ['fee'],
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
				resource: ['fee'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Fee Type',
				name: 'feeType',
				type: 'multiOptions',
				options: [
					{ name: 'Account Maintenance', value: 'MAINTENANCE' },
					{ name: 'ATM Fee', value: 'ATM' },
					{ name: 'Card Replacement', value: 'CARD_REPLACEMENT' },
					{ name: 'Chargeback', value: 'CHARGEBACK' },
					{ name: 'Expedited Delivery', value: 'EXPEDITED_DELIVERY' },
					{ name: 'Foreign Transaction', value: 'FOREIGN_TRANSACTION' },
					{ name: 'Inactivity', value: 'INACTIVITY' },
					{ name: 'Minimum Balance', value: 'MINIMUM_BALANCE' },
					{ name: 'NSF / Overdraft', value: 'NSF' },
					{ name: 'Paper Statement', value: 'PAPER_STATEMENT' },
					{ name: 'Return Item', value: 'RETURN_ITEM' },
					{ name: 'Stop Payment', value: 'STOP_PAYMENT' },
					{ name: 'Wire Fee', value: 'WIRE' },
					{ name: 'Other', value: 'OTHER' },
				],
				default: [],
				description: 'Filter by fee type',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				options: [
					{ name: 'Pending', value: 'PENDING' },
					{ name: 'Posted', value: 'POSTED' },
					{ name: 'Waived', value: 'WAIVED' },
					{ name: 'Reversed', value: 'REVERSED' },
				],
				default: [],
				description: 'Filter by fee status',
			},
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
				description: 'Filter fees from this date',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'dateTime',
				default: '',
				description: 'Filter fees until this date',
			},
			{
				displayName: 'Minimum Amount',
				name: 'minAmount',
				type: 'number',
				default: 0,
				description: 'Minimum fee amount in cents',
			},
			{
				displayName: 'Maximum Amount',
				name: 'maxAmount',
				type: 'number',
				default: 0,
				description: 'Maximum fee amount in cents',
			},
			{
				displayName: 'Include Waived',
				name: 'includeWaived',
				type: 'boolean',
				default: true,
				description: 'Whether to include waived fees in results',
			},
			{
				displayName: 'Include Reversed',
				name: 'includeReversed',
				type: 'boolean',
				default: true,
				description: 'Whether to include reversed fees in results',
			},
		],
	},

	// ----------------------------------
	//         fee:reverse
	// ----------------------------------
	{
		displayName: 'Reversal Reason',
		name: 'reversalReason',
		type: 'options',
		required: true,
		default: 'CUSTOMER_REQUEST',
		options: [
			{
				name: 'Bank Error',
				value: 'BANK_ERROR',
				description: 'Fee was assessed in error',
			},
			{
				name: 'Customer Request',
				value: 'CUSTOMER_REQUEST',
				description: 'Customer requested fee reversal',
			},
			{
				name: 'Courtesy',
				value: 'COURTESY',
				description: 'Courtesy reversal for good customer',
			},
			{
				name: 'Duplicate Fee',
				value: 'DUPLICATE',
				description: 'Fee was assessed twice',
			},
			{
				name: 'Regulatory',
				value: 'REGULATORY',
				description: 'Required by regulation',
			},
			{
				name: 'Other',
				value: 'OTHER',
				description: 'Other reason (specify in notes)',
			},
		],
		displayOptions: {
			show: {
				resource: ['fee'],
				operation: ['reverse'],
			},
		},
		description: 'Reason for reversing the fee',
	},
	{
		displayName: 'Additional Reversal Fields',
		name: 'reversalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['fee'],
				operation: ['reverse'],
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
				description: 'Additional notes about the reversal',
			},
			{
				displayName: 'Partial Amount',
				name: 'partialAmount',
				type: 'number',
				default: 0,
				description: 'Amount to reverse if not full fee (in cents, 0 = full reversal)',
			},
			{
				displayName: 'Reference Number',
				name: 'referenceNumber',
				type: 'string',
				default: '',
				description: 'External reference for the reversal',
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
	//         fee:getSchedule
	// ----------------------------------
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['fee'],
				operation: ['getSchedule'],
			},
		},
		options: [
			{
				displayName: 'Include Waivers',
				name: 'includeWaivers',
				type: 'boolean',
				default: true,
				description: 'Whether to include waiver eligibility information',
			},
			{
				displayName: 'Include History',
				name: 'includeHistory',
				type: 'boolean',
				default: false,
				description: 'Whether to include fee schedule change history',
			},
			{
				displayName: 'Effective Date',
				name: 'effectiveDate',
				type: 'dateTime',
				default: '',
				description: 'Get fee schedule as of this date',
			},
		],
	},
];

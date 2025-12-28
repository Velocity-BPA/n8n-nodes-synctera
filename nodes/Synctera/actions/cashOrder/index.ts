/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

/**
 * Cash Order operations for Synctera
 * Enables currency ordering for cash management at branch locations
 */
export const cashOrderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['cashOrder'],
			},
		},
		options: [
			{
				name: 'Cancel',
				value: 'cancel',
				description: 'Cancel a pending cash order',
				action: 'Cancel a cash order',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new cash order',
				action: 'Create a cash order',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a cash order by ID',
				action: 'Get a cash order',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all cash orders',
				action: 'List cash orders',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a cash order',
				action: 'Update a cash order',
			},
		],
		default: 'create',
	},
];

export const cashOrderFields: INodeProperties[] = [
	// ----------------------------------
	//         cashOrder:create
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['cashOrder'],
				operation: ['create'],
			},
		},
		description: 'The account ID to fund the cash order from',
	},
	{
		displayName: 'Order Type',
		name: 'orderType',
		type: 'options',
		required: true,
		default: 'BUY',
		options: [
			{
				name: 'Buy',
				value: 'BUY',
				description: 'Order cash to be delivered',
			},
			{
				name: 'Sell',
				value: 'SELL',
				description: 'Deposit excess cash',
			},
		],
		displayOptions: {
			show: {
				resource: ['cashOrder'],
				operation: ['create'],
			},
		},
		description: 'Type of cash order - buy (receive cash) or sell (deposit cash)',
	},
	{
		displayName: 'Total Amount',
		name: 'totalAmount',
		type: 'number',
		required: true,
		default: 0,
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				resource: ['cashOrder'],
				operation: ['create'],
			},
		},
		description: 'Total amount of cash to order in cents',
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
				resource: ['cashOrder'],
				operation: ['create'],
			},
		},
		description: 'Currency for the cash order',
	},
	{
		displayName: 'Delivery Date',
		name: 'deliveryDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['cashOrder'],
				operation: ['create'],
			},
		},
		description: 'Requested delivery date for the cash order',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['cashOrder'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Denomination Breakdown',
				name: 'denominations',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: false,
				},
				options: [
					{
						displayName: 'Bills',
						name: 'bills',
						values: [
							{
								displayName: 'Hundreds ($100)',
								name: 'hundreds',
								type: 'number',
								default: 0,
								description: 'Number of $100 bills',
							},
							{
								displayName: 'Fifties ($50)',
								name: 'fifties',
								type: 'number',
								default: 0,
								description: 'Number of $50 bills',
							},
							{
								displayName: 'Twenties ($20)',
								name: 'twenties',
								type: 'number',
								default: 0,
								description: 'Number of $20 bills',
							},
							{
								displayName: 'Tens ($10)',
								name: 'tens',
								type: 'number',
								default: 0,
								description: 'Number of $10 bills',
							},
							{
								displayName: 'Fives ($5)',
								name: 'fives',
								type: 'number',
								default: 0,
								description: 'Number of $5 bills',
							},
							{
								displayName: 'Ones ($1)',
								name: 'ones',
								type: 'number',
								default: 0,
								description: 'Number of $1 bills',
							},
						],
					},
				],
				description: 'Specific denomination breakdown for the order',
			},
			{
				displayName: 'Coin Breakdown',
				name: 'coins',
				type: 'fixedCollection',
				default: {},
				typeOptions: {
					multipleValues: false,
				},
				options: [
					{
						displayName: 'Coins',
						name: 'coinValues',
						values: [
							{
								displayName: 'Quarters (Rolls)',
								name: 'quarterRolls',
								type: 'number',
								default: 0,
								description: 'Number of quarter rolls ($10 each)',
							},
							{
								displayName: 'Dimes (Rolls)',
								name: 'dimeRolls',
								type: 'number',
								default: 0,
								description: 'Number of dime rolls ($5 each)',
							},
							{
								displayName: 'Nickels (Rolls)',
								name: 'nickelRolls',
								type: 'number',
								default: 0,
								description: 'Number of nickel rolls ($2 each)',
							},
							{
								displayName: 'Pennies (Rolls)',
								name: 'pennyRolls',
								type: 'number',
								default: 0,
								description: 'Number of penny rolls ($0.50 each)',
							},
						],
					},
				],
				description: 'Coin rolls to include in the order',
			},
			{
				displayName: 'Delivery Location',
				name: 'deliveryLocation',
				type: 'string',
				default: '',
				description: 'Location ID or address for cash delivery',
			},
			{
				displayName: 'Contact Name',
				name: 'contactName',
				type: 'string',
				default: '',
				description: 'Name of person to contact for delivery',
			},
			{
				displayName: 'Contact Phone',
				name: 'contactPhone',
				type: 'string',
				default: '',
				description: 'Phone number for delivery contact',
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Special instructions or notes for the order',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'Standard', value: 'STANDARD' },
					{ name: 'Rush', value: 'RUSH' },
					{ name: 'Emergency', value: 'EMERGENCY' },
				],
				default: 'STANDARD',
				description: 'Priority level for the cash order',
			},
			{
				displayName: 'Reference Number',
				name: 'referenceNumber',
				type: 'string',
				default: '',
				description: 'External reference number for tracking',
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
	//         cashOrder:get
	// ----------------------------------
	{
		displayName: 'Cash Order ID',
		name: 'cashOrderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['cashOrder'],
				operation: ['get', 'update', 'cancel'],
			},
		},
		description: 'The unique identifier of the cash order',
	},

	// ----------------------------------
	//         cashOrder:list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['cashOrder'],
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
				resource: ['cashOrder'],
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
				resource: ['cashOrder'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Account ID',
				name: 'accountId',
				type: 'string',
				default: '',
				description: 'Filter by account ID',
			},
			{
				displayName: 'Order Type',
				name: 'orderType',
				type: 'options',
				options: [
					{ name: 'Buy', value: 'BUY' },
					{ name: 'Sell', value: 'SELL' },
				],
				default: 'BUY',
				description: 'Filter by order type',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				options: [
					{ name: 'Pending', value: 'PENDING' },
					{ name: 'Approved', value: 'APPROVED' },
					{ name: 'Processing', value: 'PROCESSING' },
					{ name: 'Shipped', value: 'SHIPPED' },
					{ name: 'Delivered', value: 'DELIVERED' },
					{ name: 'Completed', value: 'COMPLETED' },
					{ name: 'Cancelled', value: 'CANCELLED' },
					{ name: 'Failed', value: 'FAILED' },
				],
				default: [],
				description: 'Filter by order status',
			},
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
				description: 'Filter orders created after this date',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'dateTime',
				default: '',
				description: 'Filter orders created before this date',
			},
			{
				displayName: 'Delivery Location',
				name: 'deliveryLocation',
				type: 'string',
				default: '',
				description: 'Filter by delivery location',
			},
		],
	},

	// ----------------------------------
	//         cashOrder:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['cashOrder'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Delivery Date',
				name: 'deliveryDate',
				type: 'dateTime',
				default: '',
				description: 'Updated delivery date',
			},
			{
				displayName: 'Delivery Location',
				name: 'deliveryLocation',
				type: 'string',
				default: '',
				description: 'Updated delivery location',
			},
			{
				displayName: 'Contact Name',
				name: 'contactName',
				type: 'string',
				default: '',
				description: 'Updated contact name',
			},
			{
				displayName: 'Contact Phone',
				name: 'contactPhone',
				type: 'string',
				default: '',
				description: 'Updated contact phone',
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Updated notes or instructions',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				options: [
					{ name: 'Standard', value: 'STANDARD' },
					{ name: 'Rush', value: 'RUSH' },
					{ name: 'Emergency', value: 'EMERGENCY' },
				],
				default: 'STANDARD',
				description: 'Updated priority level',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Updated metadata as JSON',
			},
		],
	},

	// ----------------------------------
	//         cashOrder:cancel
	// ----------------------------------
	{
		displayName: 'Cancellation Reason',
		name: 'cancellationReason',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['cashOrder'],
				operation: ['cancel'],
			},
		},
		description: 'Reason for cancelling the cash order',
	},
];

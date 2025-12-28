/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const cardOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['card'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Issue a new card',
				action: 'Create card',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a card by ID',
				action: 'Get card',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List cards',
				action: 'List cards',
			},
			{
				name: 'Activate',
				value: 'activate',
				description: 'Activate a card',
				action: 'Activate card',
			},
			{
				name: 'Suspend',
				value: 'suspend',
				description: 'Suspend a card temporarily',
				action: 'Suspend card',
			},
			{
				name: 'Unsuspend',
				value: 'unsuspend',
				description: 'Unsuspend a suspended card',
				action: 'Unsuspend card',
			},
			{
				name: 'Terminate',
				value: 'terminate',
				description: 'Permanently terminate a card',
				action: 'Terminate card',
			},
			{
				name: 'Reissue',
				value: 'reissue',
				description: 'Reissue a card with new number',
				action: 'Reissue card',
			},
			{
				name: 'Get Token',
				value: 'getToken',
				description: 'Get card token for digital wallets',
				action: 'Get card token',
			},
			{
				name: 'Get Image',
				value: 'getImage',
				description: 'Get card image/artwork',
				action: 'Get card image',
			},
			{
				name: 'Update PIN',
				value: 'updatePin',
				description: 'Update card PIN',
				action: 'Update PIN',
			},
			{
				name: 'Get Limits',
				value: 'getLimits',
				description: 'Get card spending limits',
				action: 'Get card limits',
			},
			{
				name: 'Update Limits',
				value: 'updateLimits',
				description: 'Update card spending limits',
				action: 'Update card limits',
			},
		],
		default: 'create',
	},
];

export const cardFields: INodeProperties[] = [
	// ----------------------------------
	//       card: create
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['create'],
			},
		},
		description: 'UUID of the account to issue the card for',
	},
	{
		displayName: 'Card Product ID',
		name: 'cardProductId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['create'],
			},
		},
		description: 'UUID of the card product (determines card design, features)',
	},
	{
		displayName: 'Card Type',
		name: 'cardType',
		type: 'options',
		required: true,
		default: 'PHYSICAL',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Physical', value: 'PHYSICAL' },
			{ name: 'Virtual', value: 'VIRTUAL' },
		],
		description: 'Type of card to issue',
	},
	{
		displayName: 'Cardholder Name',
		name: 'cardholderName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['create'],
			},
		},
		description: 'Name to emboss on the card',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Expiration Month',
				name: 'expirationMonth',
				type: 'number',
				default: 12,
				typeOptions: {
					minValue: 1,
					maxValue: 12,
				},
				description: 'Card expiration month (1-12)',
			},
			{
				displayName: 'Expiration Year',
				name: 'expirationYear',
				type: 'number',
				default: 2027,
				description: 'Card expiration year (4 digits)',
			},
			{
				displayName: 'Shipping Address - Line 1',
				name: 'shippingAddressLine1',
				type: 'string',
				default: '',
				description: 'Street address for card delivery',
			},
			{
				displayName: 'Shipping Address - Line 2',
				name: 'shippingAddressLine2',
				type: 'string',
				default: '',
				description: 'Apartment, suite, unit number',
			},
			{
				displayName: 'Shipping City',
				name: 'shippingCity',
				type: 'string',
				default: '',
				description: 'City for card delivery',
			},
			{
				displayName: 'Shipping State',
				name: 'shippingState',
				type: 'string',
				default: '',
				description: 'State code (e.g., CA, NY)',
			},
			{
				displayName: 'Shipping Postal Code',
				name: 'shippingPostalCode',
				type: 'string',
				default: '',
				description: 'ZIP/postal code for delivery',
			},
			{
				displayName: 'Shipping Country',
				name: 'shippingCountry',
				type: 'string',
				default: 'US',
				description: 'Country code (ISO 3166-1 alpha-2)',
			},
			{
				displayName: 'Expedited Shipping',
				name: 'expeditedShipping',
				type: 'boolean',
				default: false,
				description: 'Whether to use expedited shipping',
			},
			{
				displayName: 'PIN',
				name: 'pin',
				type: 'string',
				default: '',
				description: 'Initial PIN for the card (if supported)',
				typeOptions: {
					password: true,
				},
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
	//       card: get/update operations
	// ----------------------------------
	{
		displayName: 'Card ID',
		name: 'cardId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['get', 'activate', 'suspend', 'unsuspend', 'terminate', 'reissue', 'getToken', 'getImage', 'updatePin', 'getLimits', 'updateLimits'],
			},
		},
		description: 'UUID of the card',
	},

	// ----------------------------------
	//       card: activate
	// ----------------------------------
	{
		displayName: 'Last Four Digits',
		name: 'lastFourDigits',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['activate'],
			},
		},
		description: 'Last 4 digits of the card number for verification',
	},

	// ----------------------------------
	//       card: suspend/terminate
	// ----------------------------------
	{
		displayName: 'Reason',
		name: 'reason',
		type: 'options',
		required: true,
		default: 'LOST',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['suspend', 'terminate'],
			},
		},
		options: [
			{ name: 'Lost', value: 'LOST' },
			{ name: 'Stolen', value: 'STOLEN' },
			{ name: 'Fraud', value: 'FRAUD' },
			{ name: 'Customer Request', value: 'CUSTOMER_REQUEST' },
			{ name: 'Account Closure', value: 'ACCOUNT_CLOSURE' },
		],
		description: 'Reason for suspending/terminating the card',
	},

	// ----------------------------------
	//       card: reissue
	// ----------------------------------
	{
		displayName: 'Reissue Reason',
		name: 'reissueReason',
		type: 'options',
		required: true,
		default: 'DAMAGED',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['reissue'],
			},
		},
		options: [
			{ name: 'Damaged', value: 'DAMAGED' },
			{ name: 'Lost', value: 'LOST' },
			{ name: 'Stolen', value: 'STOLEN' },
			{ name: 'Expiring', value: 'EXPIRING' },
			{ name: 'Name Change', value: 'NAME_CHANGE' },
		],
		description: 'Reason for reissuing the card',
	},

	// ----------------------------------
	//       card: updatePin
	// ----------------------------------
	{
		displayName: 'New PIN',
		name: 'newPin',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['updatePin'],
			},
		},
		typeOptions: {
			password: true,
		},
		description: 'New 4-digit PIN for the card',
	},

	// ----------------------------------
	//       card: updateLimits
	// ----------------------------------
	{
		displayName: 'Limits',
		name: 'limits',
		type: 'collection',
		placeholder: 'Add Limit',
		default: {},
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['updateLimits'],
			},
		},
		options: [
			{
				displayName: 'Daily Spend Limit (Cents)',
				name: 'dailySpendLimit',
				type: 'number',
				default: 0,
				description: 'Maximum daily spending in cents',
			},
			{
				displayName: 'Monthly Spend Limit (Cents)',
				name: 'monthlySpendLimit',
				type: 'number',
				default: 0,
				description: 'Maximum monthly spending in cents',
			},
			{
				displayName: 'Transaction Limit (Cents)',
				name: 'transactionLimit',
				type: 'number',
				default: 0,
				description: 'Maximum per-transaction amount in cents',
			},
			{
				displayName: 'Daily ATM Limit (Cents)',
				name: 'dailyAtmLimit',
				type: 'number',
				default: 0,
				description: 'Maximum daily ATM withdrawal in cents',
			},
			{
				displayName: 'Monthly ATM Limit (Cents)',
				name: 'monthlyAtmLimit',
				type: 'number',
				default: 0,
				description: 'Maximum monthly ATM withdrawal in cents',
			},
		],
	},

	// ----------------------------------
	//       card: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['card'],
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
				resource: ['card'],
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
				resource: ['card'],
				operation: ['list'],
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
				displayName: 'Card Type',
				name: 'card_type',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Physical', value: 'PHYSICAL' },
					{ name: 'Virtual', value: 'VIRTUAL' },
				],
				description: 'Filter by card type',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Inactive', value: 'INACTIVE' },
					{ name: 'Pending', value: 'PENDING' },
					{ name: 'Suspended', value: 'SUSPENDED' },
					{ name: 'Terminated', value: 'TERMINATED' },
					{ name: 'Expired', value: 'EXPIRED' },
				],
				description: 'Filter by card status',
			},
			{
				displayName: 'Card Product ID',
				name: 'card_product_id',
				type: 'string',
				default: '',
				description: 'Filter by card product UUID',
			},
			{
				displayName: 'Last Four Digits',
				name: 'last_four',
				type: 'string',
				default: '',
				description: 'Filter by last 4 digits of card number',
			},
		],
	},
];

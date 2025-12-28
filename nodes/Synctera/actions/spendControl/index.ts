/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const spendControlOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['spendControl'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a spend control rule',
				action: 'Create spend control',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a spend control by ID',
				action: 'Get spend control',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a spend control',
				action: 'Update spend control',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a spend control',
				action: 'Delete spend control',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List spend controls',
				action: 'List spend controls',
			},
		],
		default: 'list',
	},
];

export const spendControlFields: INodeProperties[] = [
	// ----------------------------------
	//       spendControl: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['spendControl'],
				operation: ['create'],
			},
		},
		description: 'Name of the spend control rule',
	},
	{
		displayName: 'Apply To',
		name: 'applyTo',
		type: 'options',
		required: true,
		default: 'CARD',
		displayOptions: {
			show: {
				resource: ['spendControl'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Card', value: 'CARD' },
			{ name: 'Account', value: 'ACCOUNT' },
			{ name: 'Customer', value: 'CUSTOMER' },
		],
		description: 'What this spend control applies to',
	},
	{
		displayName: 'Entity ID',
		name: 'entityId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['spendControl'],
				operation: ['create'],
			},
		},
		description: 'UUID of the card, account, or customer',
	},
	{
		displayName: 'Control Type',
		name: 'controlType',
		type: 'options',
		required: true,
		default: 'VELOCITY',
		displayOptions: {
			show: {
				resource: ['spendControl'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Velocity (Spending Limit)', value: 'VELOCITY' },
			{ name: 'MCC Control', value: 'MCC' },
			{ name: 'Geographic', value: 'GEOGRAPHIC' },
			{ name: 'Time Based', value: 'TIME_BASED' },
		],
		description: 'Type of spend control',
	},
	{
		displayName: 'Velocity Settings',
		name: 'velocitySettings',
		type: 'collection',
		placeholder: 'Add Setting',
		default: {},
		displayOptions: {
			show: {
				resource: ['spendControl'],
				operation: ['create'],
				controlType: ['VELOCITY'],
			},
		},
		options: [
			{
				displayName: 'Amount Limit (Cents)',
				name: 'amountLimit',
				type: 'number',
				default: 0,
				description: 'Maximum spending amount in cents',
			},
			{
				displayName: 'Count Limit',
				name: 'countLimit',
				type: 'number',
				default: 0,
				description: 'Maximum number of transactions',
			},
			{
				displayName: 'Time Period',
				name: 'timePeriod',
				type: 'options',
				default: 'DAILY',
				options: [
					{ name: 'Per Transaction', value: 'TRANSACTION' },
					{ name: 'Daily', value: 'DAILY' },
					{ name: 'Weekly', value: 'WEEKLY' },
					{ name: 'Monthly', value: 'MONTHLY' },
				],
				description: 'Time period for the limit',
			},
		],
	},
	{
		displayName: 'MCC Settings',
		name: 'mccSettings',
		type: 'collection',
		placeholder: 'Add Setting',
		default: {},
		displayOptions: {
			show: {
				resource: ['spendControl'],
				operation: ['create'],
				controlType: ['MCC'],
			},
		},
		options: [
			{
				displayName: 'Action',
				name: 'action',
				type: 'options',
				default: 'BLOCK',
				options: [
					{ name: 'Block', value: 'BLOCK' },
					{ name: 'Allow', value: 'ALLOW' },
				],
				description: 'Whether to block or allow these MCCs',
			},
			{
				displayName: 'MCCs',
				name: 'mccs',
				type: 'string',
				default: '',
				description: 'Comma-separated list of MCCs (e.g., 5411,5812,5813)',
			},
			{
				displayName: 'MCC Groups',
				name: 'mccGroups',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Gambling', value: 'GAMBLING' },
					{ name: 'Adult Entertainment', value: 'ADULT' },
					{ name: 'Alcohol', value: 'ALCOHOL' },
					{ name: 'Tobacco', value: 'TOBACCO' },
					{ name: 'Gas Stations', value: 'GAS' },
					{ name: 'Restaurants', value: 'RESTAURANTS' },
					{ name: 'Travel', value: 'TRAVEL' },
					{ name: 'ATM', value: 'ATM' },
				],
				description: 'Predefined MCC groups',
			},
		],
	},
	{
		displayName: 'Geographic Settings',
		name: 'geoSettings',
		type: 'collection',
		placeholder: 'Add Setting',
		default: {},
		displayOptions: {
			show: {
				resource: ['spendControl'],
				operation: ['create'],
				controlType: ['GEOGRAPHIC'],
			},
		},
		options: [
			{
				displayName: 'Action',
				name: 'action',
				type: 'options',
				default: 'BLOCK',
				options: [
					{ name: 'Block', value: 'BLOCK' },
					{ name: 'Allow', value: 'ALLOW' },
				],
				description: 'Whether to block or allow these locations',
			},
			{
				displayName: 'Countries',
				name: 'countries',
				type: 'string',
				default: '',
				description: 'Comma-separated list of country codes (e.g., US,CA,MX)',
			},
			{
				displayName: 'Block International',
				name: 'blockInternational',
				type: 'boolean',
				default: false,
				description: 'Whether to block all international transactions',
			},
		],
	},

	// ----------------------------------
	//       spendControl: get/update/delete
	// ----------------------------------
	{
		displayName: 'Spend Control ID',
		name: 'spendControlId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['spendControl'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'UUID of the spend control',
	},

	// ----------------------------------
	//       spendControl: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['spendControl'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Update the name',
			},
			{
				displayName: 'Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Whether the control is active',
			},
			{
				displayName: 'Amount Limit (Cents)',
				name: 'amountLimit',
				type: 'number',
				default: 0,
				description: 'Update spending limit',
			},
			{
				displayName: 'Count Limit',
				name: 'countLimit',
				type: 'number',
				default: 0,
				description: 'Update transaction count limit',
			},
		],
	},

	// ----------------------------------
	//       spendControl: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['spendControl'],
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
				resource: ['spendControl'],
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
				resource: ['spendControl'],
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
				displayName: 'Customer ID',
				name: 'customer_id',
				type: 'string',
				default: '',
				description: 'Filter by customer UUID',
			},
			{
				displayName: 'Control Type',
				name: 'control_type',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Velocity', value: 'VELOCITY' },
					{ name: 'MCC', value: 'MCC' },
					{ name: 'Geographic', value: 'GEOGRAPHIC' },
					{ name: 'Time Based', value: 'TIME_BASED' },
				],
				description: 'Filter by control type',
			},
			{
				displayName: 'Active Only',
				name: 'is_active',
				type: 'boolean',
				default: true,
				description: 'Whether to show only active controls',
			},
		],
	},
];

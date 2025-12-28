/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const cardProductOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['cardProduct'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new card product',
				action: 'Create card product',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a card product by ID',
				action: 'Get card product',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List card products',
				action: 'List card products',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a card product',
				action: 'Update card product',
			},
		],
		default: 'list',
	},
];

export const cardProductFields: INodeProperties[] = [
	// ----------------------------------
	//       cardProduct: create
	// ----------------------------------
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['cardProduct'],
				operation: ['create'],
			},
		},
		description: 'Name of the card product',
	},
	{
		displayName: 'Card Brand',
		name: 'cardBrand',
		type: 'options',
		required: true,
		default: 'VISA',
		displayOptions: {
			show: {
				resource: ['cardProduct'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Visa', value: 'VISA' },
			{ name: 'Mastercard', value: 'MASTERCARD' },
		],
		description: 'Card network brand',
	},
	{
		displayName: 'Card Category',
		name: 'cardCategory',
		type: 'options',
		required: true,
		default: 'DEBIT',
		displayOptions: {
			show: {
				resource: ['cardProduct'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Debit', value: 'DEBIT' },
			{ name: 'Prepaid', value: 'PREPAID' },
			{ name: 'Credit', value: 'CREDIT' },
		],
		description: 'Category of the card product',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['cardProduct'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the card product',
			},
			{
				displayName: 'Physical Card Enabled',
				name: 'physicalCardEnabled',
				type: 'boolean',
				default: true,
				description: 'Whether physical cards can be issued',
			},
			{
				displayName: 'Virtual Card Enabled',
				name: 'virtualCardEnabled',
				type: 'boolean',
				default: true,
				description: 'Whether virtual cards can be issued',
			},
			{
				displayName: 'ATM Enabled',
				name: 'atmEnabled',
				type: 'boolean',
				default: true,
				description: 'Whether ATM withdrawals are enabled',
			},
			{
				displayName: 'International Enabled',
				name: 'internationalEnabled',
				type: 'boolean',
				default: false,
				description: 'Whether international transactions are enabled',
			},
			{
				displayName: 'Contactless Enabled',
				name: 'contactlessEnabled',
				type: 'boolean',
				default: true,
				description: 'Whether contactless payments are enabled',
			},
			{
				displayName: 'Digital Wallet Enabled',
				name: 'digitalWalletEnabled',
				type: 'boolean',
				default: true,
				description: 'Whether Apple/Google Pay provisioning is enabled',
			},
			{
				displayName: 'Card Image URL',
				name: 'cardImageUrl',
				type: 'string',
				default: '',
				description: 'URL to card artwork image',
			},
			{
				displayName: 'BIN',
				name: 'bin',
				type: 'string',
				default: '',
				description: 'Bank Identification Number (first 6-8 digits)',
			},
		],
	},

	// ----------------------------------
	//       cardProduct: get/update
	// ----------------------------------
	{
		displayName: 'Card Product ID',
		name: 'cardProductId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['cardProduct'],
				operation: ['get', 'update'],
			},
		},
		description: 'UUID of the card product',
	},

	// ----------------------------------
	//       cardProduct: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['cardProduct'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Update product name',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Update description',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: '',
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Inactive', value: 'INACTIVE' },
				],
				description: 'Update product status',
			},
			{
				displayName: 'ATM Enabled',
				name: 'atmEnabled',
				type: 'boolean',
				default: true,
				description: 'Whether ATM withdrawals are enabled',
			},
			{
				displayName: 'International Enabled',
				name: 'internationalEnabled',
				type: 'boolean',
				default: false,
				description: 'Whether international transactions are enabled',
			},
		],
	},

	// ----------------------------------
	//       cardProduct: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['cardProduct'],
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
				resource: ['cardProduct'],
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
				resource: ['cardProduct'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Card Brand',
				name: 'card_brand',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Visa', value: 'VISA' },
					{ name: 'Mastercard', value: 'MASTERCARD' },
				],
				description: 'Filter by card brand',
			},
			{
				displayName: 'Card Category',
				name: 'card_category',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Debit', value: 'DEBIT' },
					{ name: 'Prepaid', value: 'PREPAID' },
					{ name: 'Credit', value: 'CREDIT' },
				],
				description: 'Filter by card category',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: '',
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Inactive', value: 'INACTIVE' },
				],
				description: 'Filter by status',
			},
		],
	},
];

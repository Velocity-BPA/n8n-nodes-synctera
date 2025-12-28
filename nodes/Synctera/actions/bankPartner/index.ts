/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const bankPartnerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['bankPartner'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a bank partner by ID',
				action: 'Get a bank partner',
			},
			{
				name: 'Get Limits',
				value: 'getLimits',
				description: 'Get limits for a bank partner',
				action: 'Get bank partner limits',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all bank partners',
				action: 'List bank partners',
			},
		],
		default: 'list',
	},
];

export const bankPartnerFields: INodeProperties[] = [
	// ----------------------------------
	//         bankPartner:get
	// ----------------------------------
	{
		displayName: 'Bank Partner ID',
		name: 'bankPartnerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['bankPartner'],
				operation: ['get', 'getLimits'],
			},
		},
		description: 'The unique identifier for the bank partner (sponsor bank)',
	},

	// ----------------------------------
	//         bankPartner:list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['bankPartner'],
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
				resource: ['bankPartner'],
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
				resource: ['bankPartner'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Is Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Whether to filter by active status',
			},
			{
				displayName: 'Partner Type',
				name: 'partnerType',
				type: 'options',
				options: [
					{
						name: 'Sponsor Bank',
						value: 'SPONSOR_BANK',
					},
					{
						name: 'Program Manager',
						value: 'PROGRAM_MANAGER',
					},
					{
						name: 'Issuing Partner',
						value: 'ISSUING_PARTNER',
					},
				],
				default: 'SPONSOR_BANK',
				description: 'The type of bank partner to filter by',
			},
		],
	},

	// ----------------------------------
	//         bankPartner:getLimits
	// ----------------------------------
	{
		displayName: 'Limit Type',
		name: 'limitType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['bankPartner'],
				operation: ['getLimits'],
			},
		},
		options: [
			{
				name: 'All Limits',
				value: 'all',
			},
			{
				name: 'ACH Limits',
				value: 'ach',
			},
			{
				name: 'Wire Limits',
				value: 'wire',
			},
			{
				name: 'Card Limits',
				value: 'card',
			},
			{
				name: 'Transfer Limits',
				value: 'transfer',
			},
		],
		default: 'all',
		description: 'The type of limits to retrieve',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['bankPartner'],
				operation: ['getLimits'],
			},
		},
		options: [
			{
				displayName: 'Include Daily Limits',
				name: 'includeDailyLimits',
				type: 'boolean',
				default: true,
				description: 'Whether to include daily transaction limits',
			},
			{
				displayName: 'Include Monthly Limits',
				name: 'includeMonthlyLimits',
				type: 'boolean',
				default: true,
				description: 'Whether to include monthly transaction limits',
			},
			{
				displayName: 'Include Per-Transaction Limits',
				name: 'includePerTransactionLimits',
				type: 'boolean',
				default: true,
				description: 'Whether to include per-transaction limits',
			},
			{
				displayName: 'Customer Type',
				name: 'customerType',
				type: 'options',
				options: [
					{
						name: 'Personal',
						value: 'PERSONAL',
					},
					{
						name: 'Business',
						value: 'BUSINESS',
					},
				],
				default: 'PERSONAL',
				description: 'Get limits specific to a customer type',
			},
		],
	},
];

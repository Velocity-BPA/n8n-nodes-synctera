/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const utilityOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['utility'],
			},
		},
		options: [
			{
				name: 'Get API Status',
				value: 'getApiStatus',
				description: 'Check the status of the Synctera API',
				action: 'Get API status',
			},
			{
				name: 'Get Supported Banks',
				value: 'getSupportedBanks',
				description: 'List supported partner banks',
				action: 'Get supported banks',
			},
			{
				name: 'Test Connection',
				value: 'testConnection',
				description: 'Test the API connection and credentials',
				action: 'Test connection',
			},
			{
				name: 'Validate Routing Number',
				value: 'validateRoutingNumber',
				description: 'Validate an ABA routing number',
				action: 'Validate routing number',
			},
		],
		default: 'testConnection',
	},
];

export const utilityFields: INodeProperties[] = [
	// ----------------------------------
	//         utility:validateRoutingNumber
	// ----------------------------------
	{
		displayName: 'Routing Number',
		name: 'routingNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['utility'],
				operation: ['validateRoutingNumber'],
			},
		},
		description: 'The 9-digit ABA routing number to validate',
		placeholder: '021000021',
	},
	{
		displayName: 'Validation Options',
		name: 'validationOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['utility'],
				operation: ['validateRoutingNumber'],
			},
		},
		options: [
			{
				displayName: 'Check ACH Support',
				name: 'checkAchSupport',
				type: 'boolean',
				default: true,
				description: 'Whether to verify the bank supports ACH transfers',
			},
			{
				displayName: 'Check Wire Support',
				name: 'checkWireSupport',
				type: 'boolean',
				default: true,
				description: 'Whether to verify the bank supports wire transfers',
			},
			{
				displayName: 'Include Bank Details',
				name: 'includeBankDetails',
				type: 'boolean',
				default: true,
				description: 'Whether to include detailed bank information in the response',
			},
		],
	},

	// ----------------------------------
	//         utility:getApiStatus
	// ----------------------------------
	{
		displayName: 'Status Options',
		name: 'statusOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['utility'],
				operation: ['getApiStatus'],
			},
		},
		options: [
			{
				displayName: 'Include Component Status',
				name: 'includeComponents',
				type: 'boolean',
				default: true,
				description: 'Whether to include status of individual API components',
			},
			{
				displayName: 'Include Maintenance Windows',
				name: 'includeMaintenanceWindows',
				type: 'boolean',
				default: false,
				description: 'Whether to include scheduled maintenance information',
			},
			{
				displayName: 'Include Rate Limit Info',
				name: 'includeRateLimits',
				type: 'boolean',
				default: true,
				description: 'Whether to include current rate limit status',
			},
		],
	},

	// ----------------------------------
	//         utility:getSupportedBanks
	// ----------------------------------
	{
		displayName: 'Bank Filters',
		name: 'bankFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['utility'],
				operation: ['getSupportedBanks'],
			},
		},
		options: [
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: 'US',
				description: 'Filter by country code (ISO 3166-1 alpha-2)',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'Filter by US state code',
			},
			{
				displayName: 'Supports ACH',
				name: 'supportsAch',
				type: 'boolean',
				default: false,
				description: 'Whether to filter to only banks supporting ACH',
			},
			{
				displayName: 'Supports Wire',
				name: 'supportsWire',
				type: 'boolean',
				default: false,
				description: 'Whether to filter to only banks supporting wire transfers',
			},
			{
				displayName: 'Supports RTP',
				name: 'supportsRtp',
				type: 'boolean',
				default: false,
				description: 'Whether to filter to only banks supporting Real-Time Payments',
			},
			{
				displayName: 'Search Term',
				name: 'searchTerm',
				type: 'string',
				default: '',
				description: 'Search banks by name',
			},
		],
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['utility'],
				operation: ['getSupportedBanks'],
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
			maxValue: 500,
		},
		displayOptions: {
			show: {
				resource: ['utility'],
				operation: ['getSupportedBanks'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},

	// ----------------------------------
	//         utility:testConnection
	// ----------------------------------
	{
		displayName: 'Test Options',
		name: 'testOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['utility'],
				operation: ['testConnection'],
			},
		},
		options: [
			{
				displayName: 'Verify Permissions',
				name: 'verifyPermissions',
				type: 'boolean',
				default: true,
				description: 'Whether to verify API key permissions',
			},
			{
				displayName: 'Check Environment',
				name: 'checkEnvironment',
				type: 'boolean',
				default: true,
				description: 'Whether to verify the correct environment (sandbox/production)',
			},
			{
				displayName: 'Include Account Info',
				name: 'includeAccountInfo',
				type: 'boolean',
				default: false,
				description: 'Whether to include information about the API account',
			},
			{
				displayName: 'Test Webhook Endpoint',
				name: 'testWebhookEndpoint',
				type: 'string',
				default: '',
				description: 'Optional webhook URL to verify connectivity',
			},
		],
	},
];

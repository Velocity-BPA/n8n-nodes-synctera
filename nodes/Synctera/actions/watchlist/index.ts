/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const watchlistOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['watchlist'],
			},
		},
		options: [
			{
				name: 'Screen Customer',
				value: 'screenCustomer',
				description: 'Screen a customer against watchlists (AML/OFAC)',
				action: 'Screen customer',
			},
			{
				name: 'Get Screening',
				value: 'getScreening',
				description: 'Get a screening result by ID',
				action: 'Get screening',
			},
			{
				name: 'List Screenings',
				value: 'listScreenings',
				description: 'List screening results',
				action: 'List screenings',
			},
			{
				name: 'Get Alert',
				value: 'getAlert',
				description: 'Get a watchlist alert by ID',
				action: 'Get alert',
			},
			{
				name: 'List Alerts',
				value: 'listAlerts',
				description: 'List watchlist alerts',
				action: 'List alerts',
			},
			{
				name: 'Suppress Alert',
				value: 'suppressAlert',
				description: 'Suppress a false positive alert',
				action: 'Suppress alert',
			},
			{
				name: 'Rescreen',
				value: 'rescreen',
				description: 'Trigger a new screening for existing customer',
				action: 'Rescreen customer',
			},
		],
		default: 'screenCustomer',
	},
];

export const watchlistFields: INodeProperties[] = [
	// ----------------------------------
	//       watchlist: screenCustomer
	// ----------------------------------
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['watchlist'],
				operation: ['screenCustomer', 'rescreen'],
			},
		},
		description: 'UUID of the customer to screen',
	},
	{
		displayName: 'Screening Options',
		name: 'screeningOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['watchlist'],
				operation: ['screenCustomer'],
			},
		},
		options: [
			{
				displayName: 'Watchlist Types',
				name: 'watchlistTypes',
				type: 'multiOptions',
				default: ['OFAC', 'PEP'],
				options: [
					{ name: 'OFAC (SDN List)', value: 'OFAC' },
					{ name: 'PEP (Politically Exposed Persons)', value: 'PEP' },
					{ name: 'Adverse Media', value: 'ADVERSE_MEDIA' },
					{ name: 'Sanctions', value: 'SANCTIONS' },
					{ name: 'FBI', value: 'FBI' },
					{ name: 'Interpol', value: 'INTERPOL' },
				],
				description: 'Which watchlists to screen against',
			},
			{
				displayName: 'Match Threshold',
				name: 'matchThreshold',
				type: 'number',
				default: 80,
				typeOptions: {
					minValue: 0,
					maxValue: 100,
				},
				description: 'Minimum match percentage to flag (0-100)',
			},
			{
				displayName: 'Force New Screening',
				name: 'forceNew',
				type: 'boolean',
				default: false,
				description: 'Whether to force a new screening even if recent one exists',
			},
		],
	},

	// ----------------------------------
	//       watchlist: getScreening
	// ----------------------------------
	{
		displayName: 'Screening ID',
		name: 'screeningId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['watchlist'],
				operation: ['getScreening'],
			},
		},
		description: 'UUID of the screening result',
	},

	// ----------------------------------
	//       watchlist: getAlert/suppressAlert
	// ----------------------------------
	{
		displayName: 'Alert ID',
		name: 'alertId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['watchlist'],
				operation: ['getAlert', 'suppressAlert'],
			},
		},
		description: 'UUID of the watchlist alert',
	},

	// ----------------------------------
	//       watchlist: suppressAlert
	// ----------------------------------
	{
		displayName: 'Suppression Reason',
		name: 'suppressionReason',
		type: 'options',
		required: true,
		default: 'FALSE_POSITIVE',
		displayOptions: {
			show: {
				resource: ['watchlist'],
				operation: ['suppressAlert'],
			},
		},
		options: [
			{ name: 'False Positive', value: 'FALSE_POSITIVE' },
			{ name: 'Different Person', value: 'DIFFERENT_PERSON' },
			{ name: 'Already Reviewed', value: 'ALREADY_REVIEWED' },
			{ name: 'Other', value: 'OTHER' },
		],
		description: 'Reason for suppressing the alert',
	},
	{
		displayName: 'Notes',
		name: 'suppressionNotes',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['watchlist'],
				operation: ['suppressAlert'],
			},
		},
		description: 'Additional notes explaining the suppression',
	},

	// ----------------------------------
	//       watchlist: listScreenings
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['watchlist'],
				operation: ['listScreenings', 'listAlerts'],
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
				resource: ['watchlist'],
				operation: ['listScreenings', 'listAlerts'],
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
				resource: ['watchlist'],
				operation: ['listScreenings'],
			},
		},
		options: [
			{
				displayName: 'Customer ID',
				name: 'customer_id',
				type: 'string',
				default: '',
				description: 'Filter by customer UUID',
			},
			{
				displayName: 'Result',
				name: 'result',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Clear', value: 'CLEAR' },
					{ name: 'Match', value: 'MATCH' },
					{ name: 'Potential Match', value: 'POTENTIAL_MATCH' },
					{ name: 'Pending Review', value: 'PENDING_REVIEW' },
				],
				description: 'Filter by screening result',
			},
		],
	},
	{
		displayName: 'Alert Filters',
		name: 'alertFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['watchlist'],
				operation: ['listAlerts'],
			},
		},
		options: [
			{
				displayName: 'Customer ID',
				name: 'customer_id',
				type: 'string',
				default: '',
				description: 'Filter by customer UUID',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Open', value: 'OPEN' },
					{ name: 'Reviewed', value: 'REVIEWED' },
					{ name: 'Suppressed', value: 'SUPPRESSED' },
					{ name: 'Escalated', value: 'ESCALATED' },
				],
				description: 'Filter by alert status',
			},
			{
				displayName: 'Watchlist Type',
				name: 'watchlist_type',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'OFAC', value: 'OFAC' },
					{ name: 'PEP', value: 'PEP' },
					{ name: 'Adverse Media', value: 'ADVERSE_MEDIA' },
					{ name: 'Sanctions', value: 'SANCTIONS' },
				],
				description: 'Filter by watchlist type',
			},
		],
	},
];

/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

/**
 * Interest operations for Synctera
 * Manages interest accrual, rates, and calculations for deposit accounts
 */
export const interestOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['interest'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get interest details for an account',
				action: 'Get interest details',
			},
			{
				name: 'Get Rate',
				value: 'getRate',
				description: 'Get the current interest rate for an account',
				action: 'Get interest rate',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List interest accruals for an account',
				action: 'List interest accruals',
			},
			{
				name: 'Update Rate',
				value: 'updateRate',
				description: 'Update the interest rate for an account',
				action: 'Update interest rate',
			},
		],
		default: 'get',
	},
];

export const interestFields: INodeProperties[] = [
	// ----------------------------------
	//         interest:get
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['interest'],
				operation: ['get', 'getRate', 'list', 'updateRate'],
			},
		},
		description: 'The account ID to get interest information for',
	},

	// ----------------------------------
	//         interest:list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['interest'],
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
				resource: ['interest'],
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
				resource: ['interest'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Accrual Type',
				name: 'accrualType',
				type: 'options',
				options: [
					{ name: 'Daily', value: 'DAILY' },
					{ name: 'Monthly', value: 'MONTHLY' },
					{ name: 'Quarterly', value: 'QUARTERLY' },
					{ name: 'Annual', value: 'ANNUAL' },
				],
				default: 'DAILY',
				description: 'Filter by accrual type',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				options: [
					{ name: 'Pending', value: 'PENDING' },
					{ name: 'Accrued', value: 'ACCRUED' },
					{ name: 'Posted', value: 'POSTED' },
					{ name: 'Reversed', value: 'REVERSED' },
				],
				default: [],
				description: 'Filter by accrual status',
			},
			{
				displayName: 'From Date',
				name: 'fromDate',
				type: 'dateTime',
				default: '',
				description: 'Filter accruals from this date',
			},
			{
				displayName: 'To Date',
				name: 'toDate',
				type: 'dateTime',
				default: '',
				description: 'Filter accruals until this date',
			},
			{
				displayName: 'Minimum Amount',
				name: 'minAmount',
				type: 'number',
				default: 0,
				description: 'Minimum interest amount in cents',
			},
			{
				displayName: 'Maximum Amount',
				name: 'maxAmount',
				type: 'number',
				default: 0,
				description: 'Maximum interest amount in cents',
			},
		],
	},

	// ----------------------------------
	//         interest:updateRate
	// ----------------------------------
	{
		displayName: 'Interest Rate',
		name: 'interestRate',
		type: 'number',
		required: true,
		default: 0,
		typeOptions: {
			minValue: 0,
			maxValue: 100,
			numberPrecision: 4,
		},
		displayOptions: {
			show: {
				resource: ['interest'],
				operation: ['updateRate'],
			},
		},
		description: 'The annual interest rate as a percentage (e.g., 2.5 for 2.5% APY)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['interest'],
				operation: ['updateRate'],
			},
		},
		options: [
			{
				displayName: 'Effective Date',
				name: 'effectiveDate',
				type: 'dateTime',
				default: '',
				description: 'Date when the new rate takes effect (defaults to immediately)',
			},
			{
				displayName: 'Rate Type',
				name: 'rateType',
				type: 'options',
				options: [
					{
						name: 'Fixed',
						value: 'FIXED',
						description: 'Fixed interest rate',
					},
					{
						name: 'Variable',
						value: 'VARIABLE',
						description: 'Variable interest rate tied to index',
					},
					{
						name: 'Tiered',
						value: 'TIERED',
						description: 'Tiered rate based on balance',
					},
				],
				default: 'FIXED',
				description: 'Type of interest rate',
			},
			{
				displayName: 'Index Name',
				name: 'indexName',
				type: 'options',
				options: [
					{ name: 'Fed Funds Rate', value: 'FED_FUNDS' },
					{ name: 'Prime Rate', value: 'PRIME' },
					{ name: 'SOFR', value: 'SOFR' },
					{ name: 'Treasury 1 Year', value: 'TREASURY_1Y' },
					{ name: 'Treasury 5 Year', value: 'TREASURY_5Y' },
				],
				default: 'FED_FUNDS',
				description: 'Index for variable rate calculation',
			},
			{
				displayName: 'Spread',
				name: 'spread',
				type: 'number',
				typeOptions: {
					numberPrecision: 4,
				},
				default: 0,
				description: 'Spread above/below index for variable rates (in percentage points)',
			},
			{
				displayName: 'Floor Rate',
				name: 'floorRate',
				type: 'number',
				typeOptions: {
					minValue: 0,
					numberPrecision: 4,
				},
				default: 0,
				description: 'Minimum interest rate floor (percentage)',
			},
			{
				displayName: 'Ceiling Rate',
				name: 'ceilingRate',
				type: 'number',
				typeOptions: {
					minValue: 0,
					numberPrecision: 4,
				},
				default: 0,
				description: 'Maximum interest rate ceiling (percentage)',
			},
			{
				displayName: 'Compounding Frequency',
				name: 'compoundingFrequency',
				type: 'options',
				options: [
					{ name: 'Daily', value: 'DAILY' },
					{ name: 'Monthly', value: 'MONTHLY' },
					{ name: 'Quarterly', value: 'QUARTERLY' },
					{ name: 'Semi-Annual', value: 'SEMI_ANNUAL' },
					{ name: 'Annual', value: 'ANNUAL' },
				],
				default: 'DAILY',
				description: 'How often interest is compounded',
			},
			{
				displayName: 'Accrual Method',
				name: 'accrualMethod',
				type: 'options',
				options: [
					{
						name: 'Actual/360',
						value: 'ACTUAL_360',
						description: 'Actual days / 360 day year',
					},
					{
						name: 'Actual/365',
						value: 'ACTUAL_365',
						description: 'Actual days / 365 day year',
					},
					{
						name: 'Actual/Actual',
						value: 'ACTUAL_ACTUAL',
						description: 'Actual days / actual days in year',
					},
					{
						name: '30/360',
						value: '30_360',
						description: '30 day months / 360 day year',
					},
				],
				default: 'ACTUAL_365',
				description: 'Method for calculating daily interest accrual',
			},
			{
				displayName: 'Tiered Rates',
				name: 'tieredRates',
				type: 'fixedCollection',
				typeOptions: {
					multipleValues: true,
				},
				default: {},
				options: [
					{
						displayName: 'Tier',
						name: 'tier',
						values: [
							{
								displayName: 'Minimum Balance',
								name: 'minBalance',
								type: 'number',
								default: 0,
								description: 'Minimum balance for this tier (in cents)',
							},
							{
								displayName: 'Maximum Balance',
								name: 'maxBalance',
								type: 'number',
								default: 0,
								description: 'Maximum balance for this tier (in cents, 0 = unlimited)',
							},
							{
								displayName: 'Rate',
								name: 'rate',
								type: 'number',
								typeOptions: {
									numberPrecision: 4,
								},
								default: 0,
								description: 'Interest rate for this tier (percentage)',
							},
						],
					},
				],
				description: 'Tiered rates based on account balance',
			},
			{
				displayName: 'Reason',
				name: 'reason',
				type: 'string',
				default: '',
				description: 'Reason for the rate change',
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
	//         interest:get - Additional options
	// ----------------------------------
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['interest'],
				operation: ['get'],
			},
		},
		options: [
			{
				displayName: 'Include Projections',
				name: 'includeProjections',
				type: 'boolean',
				default: false,
				description: 'Whether to include projected interest earnings',
			},
			{
				displayName: 'Projection Period',
				name: 'projectionPeriod',
				type: 'options',
				options: [
					{ name: '30 Days', value: '30' },
					{ name: '60 Days', value: '60' },
					{ name: '90 Days', value: '90' },
					{ name: '6 Months', value: '180' },
					{ name: '1 Year', value: '365' },
				],
				default: '30',
				description: 'Period for interest projection',
			},
			{
				displayName: 'Include History',
				name: 'includeHistory',
				type: 'boolean',
				default: false,
				description: 'Whether to include rate change history',
			},
			{
				displayName: 'Include YTD Summary',
				name: 'includeYtd',
				type: 'boolean',
				default: false,
				description: 'Whether to include year-to-date interest summary',
			},
		],
	},
];

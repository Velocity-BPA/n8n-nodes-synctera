/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const statementOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['statement'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a statement by ID',
				action: 'Get statement',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List statements for an account',
				action: 'List statements',
			},
			{
				name: 'Get PDF',
				value: 'getPdf',
				description: 'Download statement as PDF',
				action: 'Get statement PDF',
			},
		],
		default: 'list',
	},
];

export const statementFields: INodeProperties[] = [
	// ----------------------------------
	//       statement: get/getPdf
	// ----------------------------------
	{
		displayName: 'Statement ID',
		name: 'statementId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['statement'],
				operation: ['get', 'getPdf'],
			},
		},
		description: 'UUID of the statement',
	},

	// ----------------------------------
	//       statement: list
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['statement'],
				operation: ['list'],
			},
		},
		description: 'UUID of the account to list statements for',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['statement'],
				operation: ['list'],
			},
		},
		description: 'Whether to return all results or limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 12,
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		displayOptions: {
			show: {
				resource: ['statement'],
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
				resource: ['statement'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Year',
				name: 'year',
				type: 'number',
				default: 0,
				description: 'Filter by statement year',
			},
			{
				displayName: 'Month',
				name: 'month',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 1,
					maxValue: 12,
				},
				description: 'Filter by statement month (1-12)',
			},
			{
				displayName: 'From Date',
				name: 'from_date',
				type: 'dateTime',
				default: '',
				description: 'Filter statements from this date',
			},
			{
				displayName: 'To Date',
				name: 'to_date',
				type: 'dateTime',
				default: '',
				description: 'Filter statements to this date',
			},
		],
	},

	// ----------------------------------
	//       statement: getPdf options
	// ----------------------------------
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		default: 'data',
		displayOptions: {
			show: {
				resource: ['statement'],
				operation: ['getPdf'],
			},
		},
		description: 'Name of the binary property to store the PDF file',
	},
];

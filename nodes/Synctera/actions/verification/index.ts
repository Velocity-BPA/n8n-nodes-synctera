/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const verificationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['verification'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a verification request (KYC/KYB)',
				action: 'Create verification',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a verification by ID',
				action: 'Get verification',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List verifications',
				action: 'List verifications',
			},
			{
				name: 'Get Result',
				value: 'getResult',
				description: 'Get detailed verification result',
				action: 'Get verification result',
			},
			{
				name: 'Retry',
				value: 'retry',
				description: 'Retry a failed verification',
				action: 'Retry verification',
			},
		],
		default: 'list',
	},
];

export const verificationFields: INodeProperties[] = [
	// ----------------------------------
	//       verification: create
	// ----------------------------------
	{
		displayName: 'Entity Type',
		name: 'entityType',
		type: 'options',
		required: true,
		default: 'PERSONAL',
		displayOptions: {
			show: {
				resource: ['verification'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Personal (KYC)', value: 'PERSONAL' },
			{ name: 'Business (KYB)', value: 'BUSINESS' },
		],
		description: 'Type of entity to verify',
	},
	{
		displayName: 'Customer/Business ID',
		name: 'entityId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['verification'],
				operation: ['create'],
			},
		},
		description: 'UUID of the customer or business to verify',
	},
	{
		displayName: 'Verification Type',
		name: 'verificationType',
		type: 'options',
		required: true,
		default: 'IDENTITY',
		displayOptions: {
			show: {
				resource: ['verification'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Identity', value: 'IDENTITY' },
			{ name: 'Document', value: 'DOCUMENT' },
			{ name: 'Address', value: 'ADDRESS' },
			{ name: 'Phone', value: 'PHONE' },
			{ name: 'Email', value: 'EMAIL' },
			{ name: 'SSN', value: 'SSN' },
			{ name: 'EIN', value: 'EIN' },
			{ name: 'Watchlist', value: 'WATCHLIST' },
		],
		description: 'Type of verification to perform',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['verification'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Document ID',
				name: 'documentId',
				type: 'string',
				default: '',
				description: 'UUID of uploaded document for document verification',
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				description: 'Phone number for phone verification',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Email address for email verification',
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
	//       verification: get/getResult/retry
	// ----------------------------------
	{
		displayName: 'Verification ID',
		name: 'verificationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['verification'],
				operation: ['get', 'getResult', 'retry'],
			},
		},
		description: 'UUID of the verification',
	},

	// ----------------------------------
	//       verification: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['verification'],
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
				resource: ['verification'],
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
				resource: ['verification'],
				operation: ['list'],
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
				displayName: 'Business ID',
				name: 'business_id',
				type: 'string',
				default: '',
				description: 'Filter by business UUID',
			},
			{
				displayName: 'Verification Type',
				name: 'type',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Identity', value: 'IDENTITY' },
					{ name: 'Document', value: 'DOCUMENT' },
					{ name: 'Address', value: 'ADDRESS' },
					{ name: 'Watchlist', value: 'WATCHLIST' },
				],
				description: 'Filter by verification type',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Pending', value: 'PENDING' },
					{ name: 'In Progress', value: 'IN_PROGRESS' },
					{ name: 'Passed', value: 'PASSED' },
					{ name: 'Failed', value: 'FAILED' },
					{ name: 'Provisional', value: 'PROVISIONAL' },
					{ name: 'Review Required', value: 'REVIEW_REQUIRED' },
				],
				description: 'Filter by verification status',
			},
		],
	},
];

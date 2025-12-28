/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const relationshipOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['relationship'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a relationship between entities',
				action: 'Create relationship',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a relationship by ID',
				action: 'Get relationship',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List relationships',
				action: 'List relationships',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a relationship',
				action: 'Delete relationship',
			},
			{
				name: 'Get Types',
				value: 'getTypes',
				description: 'Get available relationship types',
				action: 'Get relationship types',
			},
		],
		default: 'list',
	},
];

export const relationshipFields: INodeProperties[] = [
	// ----------------------------------
	//       relationship: create
	// ----------------------------------
	{
		displayName: 'From Entity Type',
		name: 'fromEntityType',
		type: 'options',
		required: true,
		default: 'CUSTOMER',
		displayOptions: {
			show: {
				resource: ['relationship'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Customer', value: 'CUSTOMER' },
			{ name: 'Business', value: 'BUSINESS' },
		],
		description: 'Type of the source entity',
	},
	{
		displayName: 'From Entity ID',
		name: 'fromEntityId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['relationship'],
				operation: ['create'],
			},
		},
		description: 'UUID of the source entity',
	},
	{
		displayName: 'To Entity Type',
		name: 'toEntityType',
		type: 'options',
		required: true,
		default: 'BUSINESS',
		displayOptions: {
			show: {
				resource: ['relationship'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Customer', value: 'CUSTOMER' },
			{ name: 'Business', value: 'BUSINESS' },
			{ name: 'Account', value: 'ACCOUNT' },
		],
		description: 'Type of the target entity',
	},
	{
		displayName: 'To Entity ID',
		name: 'toEntityId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['relationship'],
				operation: ['create'],
			},
		},
		description: 'UUID of the target entity',
	},
	{
		displayName: 'Relationship Type',
		name: 'relationshipType',
		type: 'options',
		required: true,
		default: 'OWNER',
		displayOptions: {
			show: {
				resource: ['relationship'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Owner', value: 'OWNER' },
			{ name: 'Beneficial Owner', value: 'BENEFICIAL_OWNER' },
			{ name: 'Authorized Signer', value: 'AUTHORIZED_SIGNER' },
			{ name: 'Power of Attorney', value: 'POWER_OF_ATTORNEY' },
			{ name: 'Custodian', value: 'CUSTODIAN' },
			{ name: 'Trustee', value: 'TRUSTEE' },
			{ name: 'Officer', value: 'OFFICER' },
			{ name: 'Director', value: 'DIRECTOR' },
			{ name: 'Employee', value: 'EMPLOYEE' },
			{ name: 'Parent Company', value: 'PARENT_COMPANY' },
			{ name: 'Subsidiary', value: 'SUBSIDIARY' },
		],
		description: 'Type of relationship',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['relationship'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Ownership Percentage',
				name: 'ownershipPercentage',
				type: 'number',
				default: 0,
				typeOptions: {
					minValue: 0,
					maxValue: 100,
				},
				description: 'Ownership percentage (for beneficial owners)',
			},
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Title/role of the person (e.g., CEO, CFO)',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'dateTime',
				default: '',
				description: 'When the relationship started',
			},
			{
				displayName: 'End Date',
				name: 'endDate',
				type: 'dateTime',
				default: '',
				description: 'When the relationship ended (leave empty if ongoing)',
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
	//       relationship: get/delete
	// ----------------------------------
	{
		displayName: 'Relationship ID',
		name: 'relationshipId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['relationship'],
				operation: ['get', 'delete'],
			},
		},
		description: 'UUID of the relationship',
	},

	// ----------------------------------
	//       relationship: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['relationship'],
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
				resource: ['relationship'],
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
				resource: ['relationship'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'From Entity ID',
				name: 'from_entity_id',
				type: 'string',
				default: '',
				description: 'Filter by source entity UUID',
			},
			{
				displayName: 'To Entity ID',
				name: 'to_entity_id',
				type: 'string',
				default: '',
				description: 'Filter by target entity UUID',
			},
			{
				displayName: 'Relationship Type',
				name: 'relationship_type',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Owner', value: 'OWNER' },
					{ name: 'Beneficial Owner', value: 'BENEFICIAL_OWNER' },
					{ name: 'Authorized Signer', value: 'AUTHORIZED_SIGNER' },
					{ name: 'Officer', value: 'OFFICER' },
					{ name: 'Director', value: 'DIRECTOR' },
				],
				description: 'Filter by relationship type',
			},
			{
				displayName: 'Customer ID',
				name: 'customer_id',
				type: 'string',
				default: '',
				description: 'Filter by customer UUID (either side)',
			},
			{
				displayName: 'Business ID',
				name: 'business_id',
				type: 'string',
				default: '',
				description: 'Filter by business UUID (either side)',
			},
		],
	},
];

/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const noteOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['note'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a note',
				action: 'Create note',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a note by ID',
				action: 'Get note',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List notes',
				action: 'List notes',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a note',
				action: 'Update note',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a note',
				action: 'Delete note',
			},
		],
		default: 'list',
	},
];

export const noteFields: INodeProperties[] = [
	// ----------------------------------
	//       note: create
	// ----------------------------------
	{
		displayName: 'Related Entity Type',
		name: 'relatedEntityType',
		type: 'options',
		required: true,
		default: 'CUSTOMER',
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Customer', value: 'CUSTOMER' },
			{ name: 'Business', value: 'BUSINESS' },
			{ name: 'Account', value: 'ACCOUNT' },
			{ name: 'Transaction', value: 'TRANSACTION' },
			{ name: 'Card', value: 'CARD' },
		],
		description: 'Type of entity this note relates to',
	},
	{
		displayName: 'Related Entity ID',
		name: 'relatedEntityId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
		description: 'UUID of the related entity',
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
		typeOptions: {
			rows: 4,
		},
		description: 'Note content',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				default: 'GENERAL',
				options: [
					{ name: 'General', value: 'GENERAL' },
					{ name: 'Customer Service', value: 'CUSTOMER_SERVICE' },
					{ name: 'Compliance', value: 'COMPLIANCE' },
					{ name: 'Fraud', value: 'FRAUD' },
					{ name: 'Internal', value: 'INTERNAL' },
				],
				description: 'Type/category of note',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				default: 'NORMAL',
				options: [
					{ name: 'Low', value: 'LOW' },
					{ name: 'Normal', value: 'NORMAL' },
					{ name: 'High', value: 'HIGH' },
					{ name: 'Urgent', value: 'URGENT' },
				],
				description: 'Priority level of the note',
			},
			{
				displayName: 'Author',
				name: 'author',
				type: 'string',
				default: '',
				description: 'Name of the note author',
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
	//       note: get/update/delete
	// ----------------------------------
	{
		displayName: 'Note ID',
		name: 'noteId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['get', 'update', 'delete'],
			},
		},
		description: 'UUID of the note',
	},

	// ----------------------------------
	//       note: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Content',
				name: 'content',
				type: 'string',
				default: '',
				typeOptions: {
					rows: 4,
				},
				description: 'Update note content',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				default: '',
				options: [
					{ name: 'General', value: 'GENERAL' },
					{ name: 'Customer Service', value: 'CUSTOMER_SERVICE' },
					{ name: 'Compliance', value: 'COMPLIANCE' },
					{ name: 'Fraud', value: 'FRAUD' },
					{ name: 'Internal', value: 'INTERNAL' },
				],
				description: 'Update note type',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'options',
				default: '',
				options: [
					{ name: 'Low', value: 'LOW' },
					{ name: 'Normal', value: 'NORMAL' },
					{ name: 'High', value: 'HIGH' },
					{ name: 'Urgent', value: 'URGENT' },
				],
				description: 'Update priority',
			},
		],
	},

	// ----------------------------------
	//       note: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['note'],
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
				resource: ['note'],
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
				resource: ['note'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Related Entity Type',
				name: 'related_entity_type',
				type: 'options',
				default: '',
				options: [
					{ name: 'Customer', value: 'CUSTOMER' },
					{ name: 'Business', value: 'BUSINESS' },
					{ name: 'Account', value: 'ACCOUNT' },
					{ name: 'Transaction', value: 'TRANSACTION' },
				],
				description: 'Filter by related entity type',
			},
			{
				displayName: 'Related Entity ID',
				name: 'related_entity_id',
				type: 'string',
				default: '',
				description: 'Filter by related entity UUID',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'General', value: 'GENERAL' },
					{ name: 'Customer Service', value: 'CUSTOMER_SERVICE' },
					{ name: 'Compliance', value: 'COMPLIANCE' },
					{ name: 'Fraud', value: 'FRAUD' },
				],
				description: 'Filter by note type',
			},
			{
				displayName: 'Priority',
				name: 'priority',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Low', value: 'LOW' },
					{ name: 'Normal', value: 'NORMAL' },
					{ name: 'High', value: 'HIGH' },
					{ name: 'Urgent', value: 'URGENT' },
				],
				description: 'Filter by priority',
			},
		],
	},
];

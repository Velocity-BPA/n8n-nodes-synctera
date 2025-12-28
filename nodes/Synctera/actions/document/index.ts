/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const documentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['document'],
			},
		},
		options: [
			{
				name: 'Upload',
				value: 'upload',
				description: 'Upload a document',
				action: 'Upload document',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get document metadata by ID',
				action: 'Get document',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List documents',
				action: 'List documents',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a document',
				action: 'Delete document',
			},
			{
				name: 'Get Content',
				value: 'getContent',
				description: 'Download document content',
				action: 'Get document content',
			},
		],
		default: 'list',
	},
];

export const documentFields: INodeProperties[] = [
	// ----------------------------------
	//       document: upload
	// ----------------------------------
	{
		displayName: 'Related Entity Type',
		name: 'relatedEntityType',
		type: 'options',
		required: true,
		default: 'CUSTOMER',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['upload'],
			},
		},
		options: [
			{ name: 'Customer', value: 'CUSTOMER' },
			{ name: 'Business', value: 'BUSINESS' },
			{ name: 'Account', value: 'ACCOUNT' },
			{ name: 'Transaction', value: 'TRANSACTION' },
			{ name: 'Verification', value: 'VERIFICATION' },
		],
		description: 'Type of entity this document relates to',
	},
	{
		displayName: 'Related Entity ID',
		name: 'relatedEntityId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['upload'],
			},
		},
		description: 'UUID of the related entity',
	},
	{
		displayName: 'Document Type',
		name: 'documentType',
		type: 'options',
		required: true,
		default: 'OTHER',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['upload'],
			},
		},
		options: [
			{ name: 'Drivers License', value: 'DRIVERS_LICENSE' },
			{ name: 'Passport', value: 'PASSPORT' },
			{ name: 'State ID', value: 'STATE_ID' },
			{ name: 'Social Security Card', value: 'SOCIAL_SECURITY_CARD' },
			{ name: 'Utility Bill', value: 'UTILITY_BILL' },
			{ name: 'Bank Statement', value: 'BANK_STATEMENT' },
			{ name: 'Tax Return', value: 'TAX_RETURN' },
			{ name: 'Articles of Incorporation', value: 'ARTICLES_OF_INCORPORATION' },
			{ name: 'EIN Letter', value: 'EIN_LETTER' },
			{ name: 'W9', value: 'W9' },
			{ name: 'Voided Check', value: 'VOIDED_CHECK' },
			{ name: 'Other', value: 'OTHER' },
		],
		description: 'Type of document being uploaded',
	},
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		required: true,
		default: 'data',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['upload'],
			},
		},
		description: 'Name of the binary property containing the file',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['upload'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the document',
			},
			{
				displayName: 'File Name',
				name: 'fileName',
				type: 'string',
				default: '',
				description: 'Override file name (uses binary property name if not specified)',
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
	//       document: get/delete/getContent
	// ----------------------------------
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['get', 'delete', 'getContent'],
			},
		},
		description: 'UUID of the document',
	},

	// ----------------------------------
	//       document: getContent
	// ----------------------------------
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		default: 'data',
		displayOptions: {
			show: {
				resource: ['document'],
				operation: ['getContent'],
			},
		},
		description: 'Name of the binary property to store the downloaded file',
	},

	// ----------------------------------
	//       document: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['document'],
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
				resource: ['document'],
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
				resource: ['document'],
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
				displayName: 'Document Type',
				name: 'type',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Drivers License', value: 'DRIVERS_LICENSE' },
					{ name: 'Passport', value: 'PASSPORT' },
					{ name: 'State ID', value: 'STATE_ID' },
					{ name: 'Utility Bill', value: 'UTILITY_BILL' },
					{ name: 'Bank Statement', value: 'BANK_STATEMENT' },
					{ name: 'Other', value: 'OTHER' },
				],
				description: 'Filter by document type',
			},
		],
	},
];

/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

/**
 * Business Resource Operations
 *
 * Business entities in Synctera represent companies, organizations, or other
 * non-individual entities. Business management includes beneficial owner
 * tracking and business verification (KYB).
 */

export const businessOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['business'],
			},
		},
		options: [
			{
				name: 'Add Owner',
				value: 'addOwner',
				description: 'Add a beneficial owner to a business',
				action: 'Add business owner',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new business',
				action: 'Create business',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a business by ID',
				action: 'Get business',
			},
			{
				name: 'Get Owners',
				value: 'getOwners',
				description: 'Get all beneficial owners of a business',
				action: 'Get business owners',
			},
			{
				name: 'Get Verification',
				value: 'getVerification',
				description: 'Get business verification status',
				action: 'Get business verification',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all businesses',
				action: 'List businesses',
			},
			{
				name: 'Remove Owner',
				value: 'removeOwner',
				description: 'Remove a beneficial owner from a business',
				action: 'Remove business owner',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a business',
				action: 'Update business',
			},
		],
		default: 'list',
	},
];

export const businessFields: INodeProperties[] = [
	// ----------------------------------
	//         business: create
	// ----------------------------------
	{
		displayName: 'Legal Name',
		name: 'legalName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Legal name of the business',
	},
	{
		displayName: 'Business Type',
		name: 'entityType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Corporation', value: 'CORPORATION' },
			{ name: 'Government Entity', value: 'GOVERNMENT_ENTITY' },
			{ name: 'LLC', value: 'LLC' },
			{ name: 'Non-Profit', value: 'NON_PROFIT' },
			{ name: 'Other', value: 'OTHER' },
			{ name: 'Partnership', value: 'PARTNERSHIP' },
			{ name: 'Sole Proprietorship', value: 'SOLE_PROPRIETORSHIP' },
			{ name: 'Trust', value: 'TRUST' },
		],
		default: 'LLC',
		description: 'Type of business entity',
	},
	{
		displayName: 'EIN',
		name: 'ein',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: 'XX-XXXXXXX',
		description: 'Employer Identification Number',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'DBA Name',
				name: 'dbaName',
				type: 'string',
				default: '',
				description: 'Doing Business As name',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Business email address',
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				description: 'Business phone number',
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'Business website URL',
			},
			{
				displayName: 'Formation Date',
				name: 'formationDate',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'Date the business was formed',
			},
			{
				displayName: 'State of Formation',
				name: 'formationState',
				type: 'string',
				default: '',
				description: 'State where business was incorporated',
			},
			{
				displayName: 'Address Line 1',
				name: 'addressLine1',
				type: 'string',
				default: '',
				description: 'Business street address',
			},
			{
				displayName: 'Address Line 2',
				name: 'addressLine2',
				type: 'string',
				default: '',
				description: 'Suite, floor, etc.',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'City name',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'State code (e.g., CA)',
			},
			{
				displayName: 'Postal Code',
				name: 'postalCode',
				type: 'string',
				default: '',
				description: 'ZIP code',
			},
			{
				displayName: 'Country',
				name: 'country',
				type: 'string',
				default: 'US',
				description: 'Country code (ISO 3166-1 alpha-2)',
			},
			{
				displayName: 'Industry',
				name: 'industry',
				type: 'string',
				default: '',
				description: 'Business industry or NAICS code',
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
	//         business: get, update, getOwners, getVerification
	// ----------------------------------
	{
		displayName: 'Business ID',
		name: 'businessId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['get', 'update', 'getOwners', 'getVerification', 'addOwner'],
			},
		},
		default: '',
		description: 'The ID of the business',
	},

	// ----------------------------------
	//         business: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'DBA Name',
				name: 'dbaName',
				type: 'string',
				default: '',
				description: 'Updated DBA name',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Updated email address',
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				description: 'Updated phone number',
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'Updated website URL',
			},
			{
				displayName: 'Address Line 1',
				name: 'addressLine1',
				type: 'string',
				default: '',
				description: 'Updated street address',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'Updated city',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'string',
				default: '',
				description: 'Updated state code',
			},
			{
				displayName: 'Postal Code',
				name: 'postalCode',
				type: 'string',
				default: '',
				description: 'Updated ZIP code',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Frozen', value: 'FROZEN' },
					{ name: 'Inactive', value: 'INACTIVE' },
				],
				default: 'ACTIVE',
				description: 'Business status',
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
	//         business: addOwner
	// ----------------------------------
	{
		displayName: 'Owner First Name',
		name: 'ownerFirstName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['addOwner'],
			},
		},
		default: '',
		description: 'First name of the beneficial owner',
	},
	{
		displayName: 'Owner Last Name',
		name: 'ownerLastName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['addOwner'],
			},
		},
		default: '',
		description: 'Last name of the beneficial owner',
	},
	{
		displayName: 'Ownership Percentage',
		name: 'ownershipPercentage',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['addOwner'],
			},
		},
		typeOptions: {
			minValue: 0,
			maxValue: 100,
		},
		default: 0,
		description: 'Percentage of ownership (0-100)',
	},
	{
		displayName: 'Owner Additional Fields',
		name: 'ownerAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['addOwner'],
			},
		},
		options: [
			{
				displayName: 'Title',
				name: 'title',
				type: 'string',
				default: '',
				description: 'Job title',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Email address',
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				description: 'Phone number',
			},
			{
				displayName: 'Date of Birth',
				name: 'dateOfBirth',
				type: 'string',
				default: '',
				placeholder: 'YYYY-MM-DD',
				description: 'Date of birth',
			},
			{
				displayName: 'SSN',
				name: 'ssn',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Social Security Number',
			},
			{
				displayName: 'Is Control Person',
				name: 'isControlPerson',
				type: 'boolean',
				default: false,
				description: 'Whether this owner has control over the business',
			},
		],
	},

	// ----------------------------------
	//         business: removeOwner
	// ----------------------------------
	{
		displayName: 'Business ID',
		name: 'businessId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['removeOwner'],
			},
		},
		default: '',
		description: 'The ID of the business',
	},
	{
		displayName: 'Owner ID',
		name: 'ownerId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['removeOwner'],
			},
		},
		default: '',
		description: 'The ID of the owner to remove',
	},

	// ----------------------------------
	//         business: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['list', 'getOwners'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['business'],
				operation: ['list', 'getOwners'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
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
				resource: ['business'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Frozen', value: 'FROZEN' },
					{ name: 'Inactive', value: 'INACTIVE' },
				],
				default: '',
				description: 'Filter by status',
			},
			{
				displayName: 'Entity Type',
				name: 'entityType',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Corporation', value: 'CORPORATION' },
					{ name: 'LLC', value: 'LLC' },
					{ name: 'Partnership', value: 'PARTNERSHIP' },
					{ name: 'Sole Proprietorship', value: 'SOLE_PROPRIETORSHIP' },
				],
				default: '',
				description: 'Filter by entity type',
			},
		],
	},
];

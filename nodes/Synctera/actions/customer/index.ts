/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

/**
 * Customer Resource Operations
 *
 * Customers in Synctera represent account holders - either personal (individuals)
 * or business entities. Customer management includes KYC verification, account
 * relationships, and card issuance.
 */

export const customerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customer'],
			},
		},
		options: [
			{
				name: 'Create Personal Customer',
				value: 'createPersonal',
				description: 'Create a new personal (individual) customer',
				action: 'Create personal customer',
			},
			{
				name: 'Create Business Customer',
				value: 'createBusiness',
				description: 'Create a new business customer',
				action: 'Create business customer',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a customer',
				action: 'Delete customer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a customer by ID',
				action: 'Get customer',
			},
			{
				name: 'Get Accounts',
				value: 'getAccounts',
				description: 'Get all accounts for a customer',
				action: 'Get customer accounts',
			},
			{
				name: 'Get Cards',
				value: 'getCards',
				description: 'Get all cards for a customer',
				action: 'Get customer cards',
			},
			{
				name: 'Get Relationships',
				value: 'getRelationships',
				description: 'Get all relationships for a customer',
				action: 'Get customer relationships',
			},
			{
				name: 'Get Status',
				value: 'getStatus',
				description: 'Get the verification status of a customer',
				action: 'Get customer status',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all customers',
				action: 'List customers',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a customer',
				action: 'Update customer',
			},
			{
				name: 'Verify',
				value: 'verify',
				description: 'Initiate KYC verification for a customer',
				action: 'Verify customer',
			},
		],
		default: 'list',
	},
];

export const customerFields: INodeProperties[] = [
	// ----------------------------------
	//         customer: createPersonal
	// ----------------------------------
	{
		displayName: 'First Name',
		name: 'firstName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createPersonal'],
			},
		},
		default: '',
		description: 'Customer\'s first name',
	},
	{
		displayName: 'Last Name',
		name: 'lastName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createPersonal'],
			},
		},
		default: '',
		description: 'Customer\'s last name',
	},
	{
		displayName: 'Date of Birth',
		name: 'dateOfBirth',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createPersonal'],
			},
		},
		default: '',
		placeholder: 'YYYY-MM-DD',
		description: 'Customer\'s date of birth in YYYY-MM-DD format',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createPersonal'],
			},
		},
		default: '',
		description: 'Customer\'s email address',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createPersonal'],
			},
		},
		options: [
			{
				displayName: 'Middle Name',
				name: 'middleName',
				type: 'string',
				default: '',
				description: 'Customer\'s middle name',
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				description: 'Customer\'s phone number',
			},
			{
				displayName: 'SSN (Last 4)',
				name: 'ssnLast4',
				type: 'string',
				default: '',
				description: 'Last 4 digits of SSN',
			},
			{
				displayName: 'Full SSN',
				name: 'ssn',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description: 'Full 9-digit SSN (for KYC verification)',
			},
			{
				displayName: 'Address Line 1',
				name: 'addressLine1',
				type: 'string',
				default: '',
				description: 'Street address',
			},
			{
				displayName: 'Address Line 2',
				name: 'addressLine2',
				type: 'string',
				default: '',
				description: 'Apartment, suite, etc.',
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
				description: 'State code (e.g., CA, NY)',
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
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Custom metadata as JSON object',
			},
		],
	},

	// ----------------------------------
	//         customer: createBusiness
	// ----------------------------------
	{
		displayName: 'Business Name',
		name: 'businessName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createBusiness'],
			},
		},
		default: '',
		description: 'Legal business name',
	},
	{
		displayName: 'Business Type',
		name: 'businessType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createBusiness'],
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
				resource: ['customer'],
				operation: ['createBusiness'],
			},
		},
		default: '',
		placeholder: 'XX-XXXXXXX',
		description: 'Employer Identification Number',
	},
	{
		displayName: 'Business Email',
		name: 'businessEmail',
		type: 'string',
		placeholder: 'name@business.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createBusiness'],
			},
		},
		default: '',
		description: 'Business email address',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['createBusiness'],
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
				name: 'stateOfFormation',
				type: 'string',
				default: '',
				description: 'State where business was formed',
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
				description: 'State code',
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
				description: 'Country code',
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
	//         customer: get, delete, getStatus, verify
	// ----------------------------------
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['get', 'delete', 'getStatus', 'verify', 'update', 'getAccounts', 'getCards', 'getRelationships'],
			},
		},
		default: '',
		description: 'The ID of the customer',
	},

	// ----------------------------------
	//         customer: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['update'],
			},
		},
		options: [
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
				displayName: 'Address Line 1',
				name: 'addressLine1',
				type: 'string',
				default: '',
				description: 'Updated street address',
			},
			{
				displayName: 'Address Line 2',
				name: 'addressLine2',
				type: 'string',
				default: '',
				description: 'Updated apartment/suite',
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
				description: 'Customer status',
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
	//         customer: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['list'],
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
				resource: ['customer'],
				operation: ['list'],
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
				resource: ['customer'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Customer Type',
				name: 'customerType',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Business', value: 'BUSINESS' },
					{ name: 'Personal', value: 'PERSONAL' },
				],
				default: '',
				description: 'Filter by customer type',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Filter by email address',
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				description: 'Filter by phone number',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Frozen', value: 'FROZEN' },
					{ name: 'Inactive', value: 'INACTIVE' },
					{ name: 'Prospect', value: 'PROSPECT' },
				],
				default: '',
				description: 'Filter by customer status',
			},
			{
				displayName: 'Created After',
				name: 'createdAfter',
				type: 'dateTime',
				default: '',
				description: 'Filter customers created after this date',
			},
			{
				displayName: 'Created Before',
				name: 'createdBefore',
				type: 'dateTime',
				default: '',
				description: 'Filter customers created before this date',
			},
		],
	},

	// ----------------------------------
	//         customer: verify
	// ----------------------------------
	{
		displayName: 'Verification Options',
		name: 'verificationOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['verify'],
			},
		},
		options: [
			{
				displayName: 'Verification Type',
				name: 'verificationType',
				type: 'options',
				options: [
					{ name: 'Identity', value: 'IDENTITY' },
					{ name: 'Document', value: 'DOCUMENT' },
					{ name: 'Watchlist', value: 'WATCHLIST' },
				],
				default: 'IDENTITY',
				description: 'Type of verification to perform',
			},
			{
				displayName: 'Force Reverify',
				name: 'forceReverify',
				type: 'boolean',
				default: false,
				description: 'Whether to force re-verification even if already verified',
			},
		],
	},

	// ----------------------------------
	//         customer: getAccounts, getCards, getRelationships (pagination)
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['getAccounts', 'getCards', 'getRelationships'],
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
				resource: ['customer'],
				operation: ['getAccounts', 'getCards', 'getRelationships'],
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
];

/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const externalAccountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['externalAccount'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Link an external bank account',
				action: 'Create external account',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an external account by ID',
				action: 'Get external account',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an external account',
				action: 'Update external account',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an external account',
				action: 'Delete external account',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List external accounts',
				action: 'List external accounts',
			},
			{
				name: 'Verify',
				value: 'verify',
				description: 'Verify an external account with micro-deposits',
				action: 'Verify external account',
			},
			{
				name: 'Get Verification Status',
				value: 'getVerificationStatus',
				description: 'Get external account verification status',
				action: 'Get verification status',
			},
		],
		default: 'create',
	},
];

export const externalAccountFields: INodeProperties[] = [
	// ----------------------------------
	//       externalAccount: create
	// ----------------------------------
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['create'],
			},
		},
		description: 'UUID of the customer who owns this external account',
	},
	{
		displayName: 'Account Owner Name',
		name: 'accountOwnerName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['create'],
			},
		},
		description: 'Name of the account owner as it appears on the bank account',
	},
	{
		displayName: 'Routing Number',
		name: 'routingNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['create'],
			},
		},
		description: '9-digit ABA routing number',
	},
	{
		displayName: 'Account Number',
		name: 'accountNumber',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['create'],
			},
		},
		description: 'Bank account number',
	},
	{
		displayName: 'Account Type',
		name: 'accountType',
		type: 'options',
		required: true,
		default: 'CHECKING',
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Checking', value: 'CHECKING' },
			{ name: 'Savings', value: 'SAVINGS' },
			{ name: 'Money Market', value: 'MONEY_MARKET' },
		],
		description: 'Type of external bank account',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Nickname',
				name: 'nickname',
				type: 'string',
				default: '',
				description: 'Friendly name for the external account',
			},
			{
				displayName: 'Verification Method',
				name: 'verificationMethod',
				type: 'options',
				default: 'MICRO_DEPOSITS',
				options: [
					{ name: 'Micro Deposits', value: 'MICRO_DEPOSITS' },
					{ name: 'Plaid', value: 'PLAID' },
					{ name: 'Instant', value: 'INSTANT' },
				],
				description: 'Method to verify the external account',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: 'USD',
				description: 'Currency code (ISO 4217)',
			},
			{
				displayName: 'Bank Name',
				name: 'bankName',
				type: 'string',
				default: '',
				description: 'Name of the external bank',
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
	//       externalAccount: get/update/delete
	// ----------------------------------
	{
		displayName: 'External Account ID',
		name: 'externalAccountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['get', 'update', 'delete', 'verify', 'getVerificationStatus'],
			},
		},
		description: 'UUID of the external account',
	},

	// ----------------------------------
	//       externalAccount: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Nickname',
				name: 'nickname',
				type: 'string',
				default: '',
				description: 'Update the friendly name',
			},
			{
				displayName: 'Account Owner Name',
				name: 'accountOwnerName',
				type: 'string',
				default: '',
				description: 'Update the account owner name',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				default: '',
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Inactive', value: 'INACTIVE' },
				],
				description: 'Update the account status',
			},
			{
				displayName: 'Metadata',
				name: 'metadata',
				type: 'json',
				default: '{}',
				description: 'Update custom metadata',
			},
		],
	},

	// ----------------------------------
	//       externalAccount: verify
	// ----------------------------------
	{
		displayName: 'Deposit Amount 1 (Cents)',
		name: 'depositAmount1',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['verify'],
			},
		},
		description: 'First micro-deposit amount in cents',
	},
	{
		displayName: 'Deposit Amount 2 (Cents)',
		name: 'depositAmount2',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['externalAccount'],
				operation: ['verify'],
			},
		},
		description: 'Second micro-deposit amount in cents',
	},

	// ----------------------------------
	//       externalAccount: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['externalAccount'],
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
				resource: ['externalAccount'],
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
				resource: ['externalAccount'],
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
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Active', value: 'ACTIVE' },
					{ name: 'Inactive', value: 'INACTIVE' },
					{ name: 'Pending Verification', value: 'PENDING_VERIFICATION' },
					{ name: 'Verified', value: 'VERIFIED' },
				],
				description: 'Filter by account status',
			},
			{
				displayName: 'Account Type',
				name: 'account_type',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Checking', value: 'CHECKING' },
					{ name: 'Savings', value: 'SAVINGS' },
					{ name: 'Money Market', value: 'MONEY_MARKET' },
				],
				description: 'Filter by account type',
			},
			{
				displayName: 'Verification Status',
				name: 'verification_status',
				type: 'options',
				default: '',
				options: [
					{ name: 'Pending', value: 'PENDING' },
					{ name: 'Verified', value: 'VERIFIED' },
					{ name: 'Failed', value: 'FAILED' },
				],
				description: 'Filter by verification status',
			},
		],
	},
];

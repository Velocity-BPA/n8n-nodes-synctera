/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties, IExecuteFunctions, INodeExecutionData, IDataObject } from 'n8n-workflow';
import { syncteraApiRequest } from '../../transport/syncteraClient';
import { ENDPOINTS } from '../../constants/endpoints';

export const accountTemplateOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['accountTemplate'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create an account template',
				action: 'Create an account template',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an account template',
				action: 'Delete an account template',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an account template',
				action: 'Get an account template',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List account templates',
				action: 'List account templates',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an account template',
				action: 'Update an account template',
			},
		],
		default: 'list',
	},
];

export const accountTemplateFields: INodeProperties[] = [
	// ----------------------------------
	//         accountTemplate:create
	// ----------------------------------
	{
		displayName: 'Template Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['accountTemplate'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name for the account template',
	},
	{
		displayName: 'Account Type',
		name: 'accountType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['accountTemplate'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Checking', value: 'CHECKING' },
			{ name: 'Savings', value: 'SAVINGS' },
			{ name: 'Money Market', value: 'MONEY_MARKET' },
			{ name: 'Certificate of Deposit', value: 'CD' },
			{ name: 'Line of Credit', value: 'LINE_OF_CREDIT' },
		],
		default: 'CHECKING',
		description: 'Type of account this template creates',
	},
	{
		displayName: 'Bank Country',
		name: 'bankCountry',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['accountTemplate'],
				operation: ['create'],
			},
		},
		default: 'US',
		description: 'Country code for the bank (ISO 3166-1 alpha-2)',
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['accountTemplate'],
				operation: ['create'],
			},
		},
		default: 'USD',
		description: 'Currency for the account (ISO 4217)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['accountTemplate'],
				operation: ['create'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the account template',
			},
			{
				displayName: 'Is Enabled',
				name: 'isEnabled',
				type: 'boolean',
				default: true,
				description: 'Whether the template is enabled for use',
			},
			{
				displayName: 'Minimum Balance',
				name: 'minimumBalance',
				type: 'number',
				default: 0,
				description: 'Minimum balance required for the account',
			},
			{
				displayName: 'Interest Rate',
				name: 'interestRate',
				type: 'number',
				default: 0,
				description: 'Annual interest rate percentage',
			},
			{
				displayName: 'Fee Schedule ID',
				name: 'feeScheduleId',
				type: 'string',
				default: '',
				description: 'ID of the fee schedule to apply',
			},
			{
				displayName: 'Overdraft Limit',
				name: 'overdraftLimit',
				type: 'number',
				default: 0,
				description: 'Maximum overdraft allowed',
			},
			{
				displayName: 'Spend Control IDs',
				name: 'spendControlIds',
				type: 'string',
				default: '',
				description: 'Comma-separated list of spend control IDs',
			},
		],
	},
	// ----------------------------------
	//         accountTemplate:get
	// ----------------------------------
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['accountTemplate'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the account template',
	},
	// ----------------------------------
	//         accountTemplate:update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		displayOptions: {
			show: {
				resource: ['accountTemplate'],
				operation: ['update'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name for the account template',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the account template',
			},
			{
				displayName: 'Is Enabled',
				name: 'isEnabled',
				type: 'boolean',
				default: true,
				description: 'Whether the template is enabled for use',
			},
			{
				displayName: 'Minimum Balance',
				name: 'minimumBalance',
				type: 'number',
				default: 0,
				description: 'Minimum balance required for the account',
			},
			{
				displayName: 'Interest Rate',
				name: 'interestRate',
				type: 'number',
				default: 0,
				description: 'Annual interest rate percentage',
			},
			{
				displayName: 'Fee Schedule ID',
				name: 'feeScheduleId',
				type: 'string',
				default: '',
				description: 'ID of the fee schedule to apply',
			},
		],
	},
	// ----------------------------------
	//         accountTemplate:list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['accountTemplate'],
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
				resource: ['accountTemplate'],
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
		displayOptions: {
			show: {
				resource: ['accountTemplate'],
				operation: ['list'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Account Type',
				name: 'accountType',
				type: 'options',
				options: [
					{ name: 'Checking', value: 'CHECKING' },
					{ name: 'Savings', value: 'SAVINGS' },
					{ name: 'Money Market', value: 'MONEY_MARKET' },
					{ name: 'Certificate of Deposit', value: 'CD' },
					{ name: 'Line of Credit', value: 'LINE_OF_CREDIT' },
				],
				default: 'CHECKING',
				description: 'Filter by account type',
			},
			{
				displayName: 'Is Enabled',
				name: 'isEnabled',
				type: 'boolean',
				default: true,
				description: 'Filter by enabled status',
			},
		],
	},
];

export async function executeAccountTemplateOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<INodeExecutionData[]> {
	let responseData;

	if (operation === 'create') {
		const name = this.getNodeParameter('name', i) as string;
		const accountType = this.getNodeParameter('accountType', i) as string;
		const bankCountry = this.getNodeParameter('bankCountry', i) as string;
		const currency = this.getNodeParameter('currency', i) as string;
		const additionalFields = this.getNodeParameter('additionalFields', i) as {
			description?: string;
			isEnabled?: boolean;
			minimumBalance?: number;
			interestRate?: number;
			feeScheduleId?: string;
			overdraftLimit?: number;
			spendControlIds?: string;
		};

		const body: Record<string, unknown> = {
			name,
			account_type: accountType,
			bank_country: bankCountry,
			currency,
		};

		if (additionalFields.description) body.description = additionalFields.description;
		if (additionalFields.isEnabled !== undefined) body.is_enabled = additionalFields.isEnabled;
		if (additionalFields.minimumBalance !== undefined) body.minimum_balance = additionalFields.minimumBalance;
		if (additionalFields.interestRate !== undefined) body.interest_rate = additionalFields.interestRate;
		if (additionalFields.feeScheduleId) body.fee_schedule_id = additionalFields.feeScheduleId;
		if (additionalFields.overdraftLimit !== undefined) body.overdraft_limit = additionalFields.overdraftLimit;
		if (additionalFields.spendControlIds) {
			body.spend_control_ids = additionalFields.spendControlIds.split(',').map(id => id.trim());
		}

		responseData = await syncteraApiRequest.call(this, 'POST', ENDPOINTS.accountTemplates, body as IDataObject);
	} else if (operation === 'get') {
		const templateId = this.getNodeParameter('templateId', i) as string;
		responseData = await syncteraApiRequest.call(this, 'GET', ENDPOINTS.accountTemplateById(templateId));
	} else if (operation === 'update') {
		const templateId = this.getNodeParameter('templateId', i) as string;
		const updateFields = this.getNodeParameter('updateFields', i) as Record<string, unknown>;

		const body: IDataObject = {};
		if (updateFields.name) body.name = updateFields.name;
		if (updateFields.description) body.description = updateFields.description;
		if (updateFields.isEnabled !== undefined) body.is_enabled = updateFields.isEnabled;
		if (updateFields.minimumBalance !== undefined) body.minimum_balance = updateFields.minimumBalance;
		if (updateFields.interestRate !== undefined) body.interest_rate = updateFields.interestRate;
		if (updateFields.feeScheduleId) body.fee_schedule_id = updateFields.feeScheduleId;

		responseData = await syncteraApiRequest.call(this, 'PATCH', ENDPOINTS.accountTemplateById(templateId), body);
	} else if (operation === 'delete') {
		const templateId = this.getNodeParameter('templateId', i) as string;
		responseData = await syncteraApiRequest.call(this, 'DELETE', ENDPOINTS.accountTemplateById(templateId));
	} else if (operation === 'list') {
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as {
			accountType?: string;
			isEnabled?: boolean;
		};

		const qs: IDataObject = {};
		if (filters.accountType) qs.account_type = filters.accountType;
		if (filters.isEnabled !== undefined) qs.is_enabled = filters.isEnabled;

		if (returnAll) {
			responseData = await syncteraApiRequest.call(this, 'GET', ENDPOINTS.accountTemplates, {}, qs);
			responseData = (responseData as IDataObject).account_templates || [];
		} else {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
			responseData = await syncteraApiRequest.call(this, 'GET', ENDPOINTS.accountTemplates, {}, qs);
			responseData = (responseData as IDataObject).account_templates || [];
		}
	}

	return [{ json: responseData as IDataObject }];
}

/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const disclosureOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['disclosure'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create and send a disclosure to customer',
				action: 'Create disclosure',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a disclosure by ID',
				action: 'Get disclosure',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List disclosures',
				action: 'List disclosures',
			},
			{
				name: 'Accept',
				value: 'accept',
				description: 'Record customer acceptance of disclosure',
				action: 'Accept disclosure',
			},
			{
				name: 'Get Document',
				value: 'getDocument',
				description: 'Download disclosure document',
				action: 'Get disclosure document',
			},
		],
		default: 'list',
	},
];

export const disclosureFields: INodeProperties[] = [
	// ----------------------------------
	//       disclosure: create
	// ----------------------------------
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['disclosure'],
				operation: ['create'],
			},
		},
		description: 'UUID of the customer to send disclosure to',
	},
	{
		displayName: 'Disclosure Type',
		name: 'disclosureType',
		type: 'options',
		required: true,
		default: 'ACCOUNT_AGREEMENT',
		displayOptions: {
			show: {
				resource: ['disclosure'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Account Agreement', value: 'ACCOUNT_AGREEMENT' },
			{ name: 'Privacy Policy', value: 'PRIVACY_POLICY' },
			{ name: 'Terms of Service', value: 'TERMS_OF_SERVICE' },
			{ name: 'Fee Schedule', value: 'FEE_SCHEDULE' },
			{ name: 'Electronic Consent', value: 'E_SIGN_CONSENT' },
			{ name: 'Regulation E', value: 'REG_E' },
			{ name: 'Regulation DD', value: 'REG_DD' },
			{ name: 'Card Agreement', value: 'CARD_AGREEMENT' },
			{ name: 'ACH Authorization', value: 'ACH_AUTHORIZATION' },
		],
		description: 'Type of disclosure to send',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['disclosure'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Version',
				name: 'version',
				type: 'string',
				default: '',
				description: 'Version of the disclosure document',
			},
			{
				displayName: 'Account ID',
				name: 'accountId',
				type: 'string',
				default: '',
				description: 'UUID of related account (if applicable)',
			},
			{
				displayName: 'Delivery Method',
				name: 'deliveryMethod',
				type: 'options',
				default: 'ELECTRONIC',
				options: [
					{ name: 'Electronic', value: 'ELECTRONIC' },
					{ name: 'Mail', value: 'MAIL' },
				],
				description: 'How to deliver the disclosure',
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
	//       disclosure: get/accept/getDocument
	// ----------------------------------
	{
		displayName: 'Disclosure ID',
		name: 'disclosureId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['disclosure'],
				operation: ['get', 'accept', 'getDocument'],
			},
		},
		description: 'UUID of the disclosure',
	},

	// ----------------------------------
	//       disclosure: accept
	// ----------------------------------
	{
		displayName: 'Acceptance Details',
		name: 'acceptanceDetails',
		type: 'collection',
		placeholder: 'Add Detail',
		default: {},
		displayOptions: {
			show: {
				resource: ['disclosure'],
				operation: ['accept'],
			},
		},
		options: [
			{
				displayName: 'IP Address',
				name: 'ipAddress',
				type: 'string',
				default: '',
				description: "Customer's IP address at time of acceptance",
			},
			{
				displayName: 'User Agent',
				name: 'userAgent',
				type: 'string',
				default: '',
				description: "Customer's browser user agent",
			},
			{
				displayName: 'Acceptance Method',
				name: 'acceptanceMethod',
				type: 'options',
				default: 'ELECTRONIC_SIGNATURE',
				options: [
					{ name: 'Electronic Signature', value: 'ELECTRONIC_SIGNATURE' },
					{ name: 'Click Through', value: 'CLICK_THROUGH' },
					{ name: 'Physical Signature', value: 'PHYSICAL_SIGNATURE' },
				],
				description: 'How the customer accepted',
			},
		],
	},

	// ----------------------------------
	//       disclosure: getDocument
	// ----------------------------------
	{
		displayName: 'Binary Property',
		name: 'binaryProperty',
		type: 'string',
		default: 'data',
		displayOptions: {
			show: {
				resource: ['disclosure'],
				operation: ['getDocument'],
			},
		},
		description: 'Name of the binary property to store the document',
	},

	// ----------------------------------
	//       disclosure: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['disclosure'],
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
				resource: ['disclosure'],
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
				resource: ['disclosure'],
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
				displayName: 'Disclosure Type',
				name: 'type',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Account Agreement', value: 'ACCOUNT_AGREEMENT' },
					{ name: 'Privacy Policy', value: 'PRIVACY_POLICY' },
					{ name: 'Terms of Service', value: 'TERMS_OF_SERVICE' },
					{ name: 'Fee Schedule', value: 'FEE_SCHEDULE' },
					{ name: 'Electronic Consent', value: 'E_SIGN_CONSENT' },
				],
				description: 'Filter by disclosure type',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Pending', value: 'PENDING' },
					{ name: 'Sent', value: 'SENT' },
					{ name: 'Accepted', value: 'ACCEPTED' },
					{ name: 'Declined', value: 'DECLINED' },
					{ name: 'Expired', value: 'EXPIRED' },
				],
				description: 'Filter by disclosure status',
			},
		],
	},
];

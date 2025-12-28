/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const eventOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['event'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get an event by ID',
				action: 'Get event',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List events',
				action: 'List events',
			},
			{
				name: 'Resend',
				value: 'resend',
				description: 'Resend an event to webhooks',
				action: 'Resend event',
			},
			{
				name: 'Get Types',
				value: 'getTypes',
				description: 'Get all available event types',
				action: 'Get event types',
			},
		],
		default: 'list',
	},
];

export const eventFields: INodeProperties[] = [
	// ----------------------------------
	//       event: get/resend
	// ----------------------------------
	{
		displayName: 'Event ID',
		name: 'eventId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['get', 'resend'],
			},
		},
		description: 'UUID of the event',
	},

	// ----------------------------------
	//       event: resend
	// ----------------------------------
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['event'],
				operation: ['resend'],
			},
		},
		description: 'UUID of specific webhook to resend to (leave empty for all subscribed webhooks)',
	},

	// ----------------------------------
	//       event: list
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['event'],
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
				resource: ['event'],
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
				resource: ['event'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Event Type',
				name: 'type',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Customer Created', value: 'customer.created' },
					{ name: 'Customer Updated', value: 'customer.updated' },
					{ name: 'Customer Deleted', value: 'customer.deleted' },
					{ name: 'Account Created', value: 'account.created' },
					{ name: 'Account Updated', value: 'account.updated' },
					{ name: 'Account Closed', value: 'account.closed' },
					{ name: 'Transaction Created', value: 'transaction.created' },
					{ name: 'Transaction Posted', value: 'transaction.posted' },
					{ name: 'ACH Originated', value: 'ach.originated' },
					{ name: 'ACH Completed', value: 'ach.completed' },
					{ name: 'ACH Returned', value: 'ach.returned' },
					{ name: 'Wire Created', value: 'wire.created' },
					{ name: 'Wire Completed', value: 'wire.completed' },
					{ name: 'Card Created', value: 'card.created' },
					{ name: 'Card Activated', value: 'card.activated' },
				],
				description: 'Filter by event type',
			},
			{
				displayName: 'Resource Type',
				name: 'resource_type',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Customer', value: 'customer' },
					{ name: 'Account', value: 'account' },
					{ name: 'Transaction', value: 'transaction' },
					{ name: 'ACH', value: 'ach' },
					{ name: 'Wire', value: 'wire' },
					{ name: 'Card', value: 'card' },
					{ name: 'Verification', value: 'verification' },
				],
				description: 'Filter by resource type',
			},
			{
				displayName: 'Resource ID',
				name: 'resource_id',
				type: 'string',
				default: '',
				description: 'Filter by specific resource UUID',
			},
			{
				displayName: 'From Date',
				name: 'from_date',
				type: 'dateTime',
				default: '',
				description: 'Filter events from this date',
			},
			{
				displayName: 'To Date',
				name: 'to_date',
				type: 'dateTime',
				default: '',
				description: 'Filter events to this date',
			},
		],
	},
];

/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const webhookOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a webhook subscription',
				action: 'Create webhook',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a webhook by ID',
				action: 'Get webhook',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a webhook',
				action: 'Update webhook',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a webhook',
				action: 'Delete webhook',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List webhooks',
				action: 'List webhooks',
			},
			{
				name: 'Get Secret',
				value: 'getSecret',
				description: 'Get webhook signing secret',
				action: 'Get webhook secret',
			},
			{
				name: 'Rotate Secret',
				value: 'rotateSecret',
				description: 'Rotate webhook signing secret',
				action: 'Rotate secret',
			},
			{
				name: 'Test',
				value: 'test',
				description: 'Send a test event to webhook',
				action: 'Test webhook',
			},
			{
				name: 'Get Events',
				value: 'getEvents',
				description: 'Get events sent to this webhook',
				action: 'Get webhook events',
			},
		],
		default: 'list',
	},
];

export const webhookFields: INodeProperties[] = [
	// ----------------------------------
	//       webhook: create
	// ----------------------------------
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		placeholder: 'https://your-domain.com/webhook',
		description: 'URL to send webhook events to',
	},
	{
		displayName: 'Event Types',
		name: 'eventTypes',
		type: 'multiOptions',
		required: true,
		default: [],
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'All Events', value: '*' },
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
			{ name: 'Card Suspended', value: 'card.suspended' },
			{ name: 'Authorization Created', value: 'authorization.created' },
			{ name: 'Authorization Cleared', value: 'authorization.cleared' },
			{ name: 'Verification Completed', value: 'verification.completed' },
			{ name: 'Watchlist Alert', value: 'watchlist.alert' },
			{ name: 'Disclosure Accepted', value: 'disclosure.accepted' },
		],
		description: 'Event types to subscribe to',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the webhook',
			},
			{
				displayName: 'Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Whether the webhook is active',
			},
			{
				displayName: 'Secret',
				name: 'secret',
				type: 'string',
				default: '',
				typeOptions: {
					password: true,
				},
				description: 'Custom signing secret (auto-generated if not provided)',
			},
			{
				displayName: 'Headers',
				name: 'headers',
				type: 'json',
				default: '{}',
				description: 'Custom headers to include in webhook requests',
			},
		],
	},

	// ----------------------------------
	//       webhook: get/update/delete/getSecret/rotateSecret/test/getEvents
	// ----------------------------------
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['get', 'update', 'delete', 'getSecret', 'rotateSecret', 'test', 'getEvents'],
			},
		},
		description: 'UUID of the webhook',
	},

	// ----------------------------------
	//       webhook: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'URL',
				name: 'url',
				type: 'string',
				default: '',
				description: 'Update webhook URL',
			},
			{
				displayName: 'Event Types',
				name: 'eventTypes',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'All Events', value: '*' },
					{ name: 'Customer Created', value: 'customer.created' },
					{ name: 'Customer Updated', value: 'customer.updated' },
					{ name: 'Account Created', value: 'account.created' },
					{ name: 'Transaction Created', value: 'transaction.created' },
					{ name: 'ACH Completed', value: 'ach.completed' },
					{ name: 'Card Created', value: 'card.created' },
				],
				description: 'Update subscribed event types',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Update description',
			},
			{
				displayName: 'Active',
				name: 'isActive',
				type: 'boolean',
				default: true,
				description: 'Whether the webhook is active',
			},
		],
	},

	// ----------------------------------
	//       webhook: test
	// ----------------------------------
	{
		displayName: 'Test Event Type',
		name: 'testEventType',
		type: 'options',
		required: true,
		default: 'customer.created',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['test'],
			},
		},
		options: [
			{ name: 'Customer Created', value: 'customer.created' },
			{ name: 'Account Created', value: 'account.created' },
			{ name: 'Transaction Created', value: 'transaction.created' },
		],
		description: 'Type of test event to send',
	},

	// ----------------------------------
	//       webhook: getEvents
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['list', 'getEvents'],
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
				resource: ['webhook'],
				operation: ['list', 'getEvents'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Event Filters',
		name: 'eventFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['getEvents'],
			},
		},
		options: [
			{
				displayName: 'Status',
				name: 'status',
				type: 'multiOptions',
				default: [],
				options: [
					{ name: 'Pending', value: 'PENDING' },
					{ name: 'Delivered', value: 'DELIVERED' },
					{ name: 'Failed', value: 'FAILED' },
					{ name: 'Retrying', value: 'RETRYING' },
				],
				description: 'Filter by delivery status',
			},
			{
				displayName: 'Event Type',
				name: 'event_type',
				type: 'string',
				default: '',
				description: 'Filter by event type (e.g., customer.created)',
			},
			{
				displayName: 'From Date',
				name: 'from_date',
				type: 'dateTime',
				default: '',
				description: 'Filter events from this date',
			},
		],
	},
];

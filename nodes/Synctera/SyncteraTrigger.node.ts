/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IHookFunctions,
	IWebhookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
	IDataObject,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { syncteraApiRequest } from './transport/syncteraClient';
import { verifyWebhookSignature } from './utils/signatureUtils';

// Log licensing notice once on load
console.warn(`
[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.
`);

export class SyncteraTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Synctera Trigger',
		name: 'syncteraTrigger',
		icon: 'file:synctera.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Starts the workflow when Synctera events occur',
		defaults: {
			name: 'Synctera Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'syncteraApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				required: true,
				default: 'customer.created',
				options: [
					// Customer Events
					{
						name: 'Customer Created',
						value: 'customer.created',
						description: 'Triggered when a new customer is created',
					},
					{
						name: 'Customer Updated',
						value: 'customer.updated',
						description: 'Triggered when a customer is updated',
					},
					{
						name: 'Customer Deleted',
						value: 'customer.deleted',
						description: 'Triggered when a customer is deleted',
					},
					{
						name: 'Customer Verification Completed',
						value: 'customer.verification.completed',
						description: 'Triggered when customer verification completes',
					},
					{
						name: 'Customer Verification Failed',
						value: 'customer.verification.failed',
						description: 'Triggered when customer verification fails',
					},
					// Account Events
					{
						name: 'Account Created',
						value: 'account.created',
						description: 'Triggered when an account is created',
					},
					{
						name: 'Account Updated',
						value: 'account.updated',
						description: 'Triggered when an account is updated',
					},
					{
						name: 'Account Closed',
						value: 'account.closed',
						description: 'Triggered when an account is closed',
					},
					{
						name: 'Account Frozen',
						value: 'account.frozen',
						description: 'Triggered when an account is frozen',
					},
					{
						name: 'Account Balance Changed',
						value: 'account.balance.changed',
						description: 'Triggered when account balance changes',
					},
					// ACH Events
					{
						name: 'ACH Originated',
						value: 'ach.originated',
						description: 'Triggered when an ACH transfer is originated',
					},
					{
						name: 'ACH Completed',
						value: 'ach.completed',
						description: 'Triggered when an ACH transfer completes',
					},
					{
						name: 'ACH Returned',
						value: 'ach.returned',
						description: 'Triggered when an ACH transfer is returned',
					},
					{
						name: 'ACH Canceled',
						value: 'ach.canceled',
						description: 'Triggered when an ACH transfer is canceled',
					},
					{
						name: 'ACH NOC',
						value: 'ach.noc',
						description: 'Triggered when an ACH Notification of Change is received',
					},
					// Wire Events
					{
						name: 'Wire Created',
						value: 'wire.created',
						description: 'Triggered when a wire transfer is created',
					},
					{
						name: 'Wire Completed',
						value: 'wire.completed',
						description: 'Triggered when a wire transfer completes',
					},
					{
						name: 'Wire Failed',
						value: 'wire.failed',
						description: 'Triggered when a wire transfer fails',
					},
					{
						name: 'Wire Canceled',
						value: 'wire.canceled',
						description: 'Triggered when a wire transfer is canceled',
					},
					// Card Events
					{
						name: 'Card Created',
						value: 'card.created',
						description: 'Triggered when a card is created',
					},
					{
						name: 'Card Activated',
						value: 'card.activated',
						description: 'Triggered when a card is activated',
					},
					{
						name: 'Card Suspended',
						value: 'card.suspended',
						description: 'Triggered when a card is suspended',
					},
					{
						name: 'Card Terminated',
						value: 'card.terminated',
						description: 'Triggered when a card is terminated',
					},
					{
						name: 'Card Shipped',
						value: 'card.shipped',
						description: 'Triggered when a physical card is shipped',
					},
					// Transaction Events
					{
						name: 'Transaction Created',
						value: 'transaction.created',
						description: 'Triggered when a transaction is created',
					},
					{
						name: 'Transaction Posted',
						value: 'transaction.posted',
						description: 'Triggered when a transaction is posted',
					},
					{
						name: 'Transaction Reversed',
						value: 'transaction.reversed',
						description: 'Triggered when a transaction is reversed',
					},
					{
						name: 'Authorization Created',
						value: 'authorization.created',
						description: 'Triggered when a card authorization is created',
					},
					{
						name: 'Authorization Cleared',
						value: 'authorization.cleared',
						description: 'Triggered when a card authorization is cleared',
					},
					// Watchlist Events
					{
						name: 'Watchlist Screening Completed',
						value: 'watchlist.screening.completed',
						description: 'Triggered when watchlist screening completes',
					},
					{
						name: 'Watchlist Alert Created',
						value: 'watchlist.alert.created',
						description: 'Triggered when a watchlist alert is created',
					},
					{
						name: 'Watchlist Alert Suppressed',
						value: 'watchlist.alert.suppressed',
						description: 'Triggered when a watchlist alert is suppressed',
					},
					// Disclosure Events
					{
						name: 'Disclosure Sent',
						value: 'disclosure.sent',
						description: 'Triggered when a disclosure is sent',
					},
					{
						name: 'Disclosure Accepted',
						value: 'disclosure.accepted',
						description: 'Triggered when a disclosure is accepted',
					},
					// External Account Events
					{
						name: 'External Account Created',
						value: 'external_account.created',
						description: 'Triggered when an external account is created',
					},
					{
						name: 'External Account Verified',
						value: 'external_account.verified',
						description: 'Triggered when an external account is verified',
					},
					{
						name: 'External Account Verification Failed',
						value: 'external_account.verification.failed',
						description: 'Triggered when external account verification fails',
					},
					// Catch-all
					{
						name: 'All Events',
						value: '*',
						description: 'Triggered on any Synctera event',
					},
				],
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Verify Signature',
						name: 'verifySignature',
						type: 'boolean',
						default: true,
						description: 'Whether to verify the webhook signature for security',
					},
					{
						displayName: 'Filter by Customer ID',
						name: 'filterByCustomerId',
						type: 'string',
						default: '',
						description: 'Only trigger for events related to this customer ID',
					},
					{
						displayName: 'Filter by Account ID',
						name: 'filterByAccountId',
						type: 'string',
						default: '',
						description: 'Only trigger for events related to this account ID',
					},
					{
						displayName: 'Include Raw Payload',
						name: 'includeRawPayload',
						type: 'boolean',
						default: false,
						description: 'Whether to include the raw webhook payload in the output',
					},
				],
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const webhookData = this.getWorkflowStaticData('node');

				// Check if we already have a webhook ID stored
				if (webhookData.webhookId !== undefined) {
					// Verify the webhook still exists
					try {
						const endpoint = `/webhooks/${webhookData.webhookId}`;
						const webhook = await syncteraApiRequest.call(this, 'GET', endpoint);
						if (webhook && webhook.url === webhookUrl) {
							return true;
						}
					} catch (error) {
						// Webhook doesn't exist anymore, continue to create new one
					}
				}

				// Check if a webhook with this URL already exists
				try {
					const webhooks = await syncteraApiRequest.call(this, 'GET', '/webhooks');
					if (webhooks.result && Array.isArray(webhooks.result)) {
						for (const webhook of webhooks.result) {
							if (webhook.url === webhookUrl) {
								webhookData.webhookId = webhook.id;
								return true;
							}
						}
					}
				} catch (error) {
					// Unable to list webhooks
				}

				return false;
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const event = this.getNodeParameter('event') as string;
				const webhookData = this.getWorkflowStaticData('node');

				const enabledEvents = event === '*' ? ['*'] : [event];

				const body = {
					url: webhookUrl,
					enabled_events: enabledEvents,
					is_enabled: true,
				};

				try {
					const webhook = await syncteraApiRequest.call(this, 'POST', '/webhooks', body);
					webhookData.webhookId = webhook.id;
					webhookData.webhookSecret = webhook.secret;
					return true;
				} catch (error) {
					throw new NodeOperationError(
						this.getNode(),
						`Failed to create Synctera webhook: ${(error as Error).message}`,
					);
				}
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');

				if (webhookData.webhookId !== undefined) {
					try {
						await syncteraApiRequest.call(
							this,
							'DELETE',
							`/webhooks/${webhookData.webhookId}`,
						);
					} catch (error) {
						// Ignore errors on delete (webhook might already be deleted)
					}
					delete webhookData.webhookId;
					delete webhookData.webhookSecret;
				}

				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const body = this.getBodyData() as IDataObject;
		const event = this.getNodeParameter('event') as string;
		const options = this.getNodeParameter('options') as IDataObject;

		// Verify webhook signature if enabled
		if (options.verifySignature !== false) {
			const webhookData = this.getWorkflowStaticData('node');
			const secret = webhookData.webhookSecret as string;

			if (secret) {
				const signature = req.headers['synctera-signature'] as string || req.headers['x-synctera-signature'] as string;
				const timestamp = req.headers['x-synctera-timestamp'] as string || Date.now().toString();
				const rawBody = JSON.stringify(body);

				if (!verifyWebhookSignature(rawBody, signature, timestamp, secret)) {
					throw new NodeOperationError(
						this.getNode(),
						'Invalid webhook signature',
					);
				}
			}
		}

		// Check if event matches
		const receivedEvent = body.type as string;
		if (event !== '*' && receivedEvent !== event) {
			// Event doesn't match, ignore
			return {
				noWebhookResponse: true,
			};
		}

		// Apply filters
		if (options.filterByCustomerId) {
			const customerId = (body.data as IDataObject)?.customer_id || 
				(body.data as IDataObject)?.person_id ||
				(body.data as IDataObject)?.business_id;
			if (customerId !== options.filterByCustomerId) {
				return {
					noWebhookResponse: true,
				};
			}
		}

		if (options.filterByAccountId) {
			const accountId = (body.data as IDataObject)?.account_id;
			if (accountId !== options.filterByAccountId) {
				return {
					noWebhookResponse: true,
				};
			}
		}

		// Build output data
		const outputData: IDataObject = {
			event: receivedEvent,
			timestamp: body.created_at || new Date().toISOString(),
			data: body.data,
		};

		if (options.includeRawPayload) {
			outputData.rawPayload = body;
		}

		return {
			workflowData: [this.helpers.returnJsonArray([outputData])],
		};
	}
}

/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject, IWebhookFunctions } from 'n8n-workflow';
import { verifyWebhook, SIGNATURE_HEADERS } from '../utils/signatureUtils';
import { ALL_EVENTS } from '../constants/eventTypes';

/**
 * Webhook Handler for Synctera Events
 *
 * Handles incoming webhook events from Synctera, including
 * signature verification and event filtering.
 */

export interface SyncteraWebhookEvent {
	id: string;
	type: string;
	created_at: string;
	data: IDataObject;
	webhook_id?: string;
}

export interface WebhookProcessResult {
	success: boolean;
	event?: SyncteraWebhookEvent;
	error?: string;
}

/**
 * Process incoming webhook request
 */
export async function processWebhookRequest(
	this: IWebhookFunctions,
	verifySignature: boolean = true,
): Promise<WebhookProcessResult> {
	const req = this.getRequestObject();
	const body = this.getBodyData() as IDataObject;

	// Verify signature if webhook secret is configured
	if (verifySignature) {
		const credentials = await this.getCredentials('syncteraApi');

		if (credentials.webhookSecret) {
			const rawBody = JSON.stringify(body);
			const headers: Record<string, string | string[] | undefined> = {};

			// Copy headers
			for (const [key, value] of Object.entries(req.headers)) {
				headers[key] = value as string | string[] | undefined;
			}

			const verificationResult = verifyWebhook(
				rawBody,
				headers,
				credentials.webhookSecret as string,
			);

			if (!verificationResult.isValid) {
				return {
					success: false,
					error: verificationResult.error || 'Webhook signature verification failed',
				};
			}
		}
	}

	// Parse the event
	const event: SyncteraWebhookEvent = {
		id: body.id as string || '',
		type: body.type as string || '',
		created_at: body.created_at as string || new Date().toISOString(),
		data: body.data as IDataObject || body,
		webhook_id: req.headers[SIGNATURE_HEADERS.WEBHOOK_ID.toLowerCase()] as string,
	};

	return {
		success: true,
		event,
	};
}

/**
 * Filter events by type
 */
export function filterEventByType(
	event: SyncteraWebhookEvent,
	allowedTypes: string[],
): boolean {
	if (allowedTypes.length === 0 || allowedTypes.includes('*')) {
		return true;
	}
	return allowedTypes.includes(event.type);
}

/**
 * Get event category from event type
 */
export function getEventCategory(eventType: string): string {
	const parts = eventType.split('.');
	return parts[0] || 'unknown';
}

/**
 * Check if event type is valid
 */
export function isValidEventType(eventType: string): boolean {
	return Object.values(ALL_EVENTS).includes(eventType as typeof ALL_EVENTS[keyof typeof ALL_EVENTS]);
}

/**
 * Format webhook event for n8n output
 */
export function formatWebhookEvent(event: SyncteraWebhookEvent): IDataObject {
	return {
		eventId: event.id,
		eventType: event.type,
		eventCategory: getEventCategory(event.type),
		createdAt: event.created_at,
		webhookId: event.webhook_id,
		data: event.data,
	};
}

/**
 * Get all available event types for UI options
 */
export function getEventTypeOptions(): Array<{ name: string; value: string }> {
	const options: Array<{ name: string; value: string }> = [
		{ name: 'All Events', value: '*' },
	];

	for (const [key, value] of Object.entries(ALL_EVENTS)) {
		// Convert key to readable name
		const name = key
			.replace(/_/g, ' ')
			.toLowerCase()
			.replace(/\b\w/g, (char) => char.toUpperCase());

		options.push({ name, value });
	}

	return options;
}

/**
 * Build webhook URL for registration
 */
export function buildWebhookUrl(baseUrl: string, path: string): string {
	const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return `${normalizedBase}${normalizedPath}`;
}

/**
 * Webhook registration payload
 */
export interface WebhookRegistrationPayload {
	url: string;
	enabled_events: string[];
	secret?: string;
	is_enabled?: boolean;
}

/**
 * Build webhook registration payload
 */
export function buildWebhookRegistrationPayload(
	webhookUrl: string,
	eventTypes: string[],
	isEnabled: boolean = true,
): WebhookRegistrationPayload {
	const payload: WebhookRegistrationPayload = {
		url: webhookUrl,
		enabled_events: eventTypes.includes('*') ? ['*'] : eventTypes,
		is_enabled: isEnabled,
	};

	return payload;
}

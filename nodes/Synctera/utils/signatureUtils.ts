/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import * as crypto from 'crypto';

/**
 * Signature Utilities for Synctera Webhooks
 *
 * Handles webhook signature verification and generation
 * for secure event delivery from the Synctera platform.
 */

/**
 * Webhook signature header names used by Synctera
 */
export const SIGNATURE_HEADERS = {
	SIGNATURE: 'x-synctera-signature',
	TIMESTAMP: 'x-synctera-timestamp',
	WEBHOOK_ID: 'x-synctera-webhook-id',
} as const;

/**
 * Verify webhook signature from Synctera
 *
 * Synctera uses HMAC-SHA256 to sign webhook payloads.
 * The signature is computed over: timestamp.payload
 */
export function verifyWebhookSignature(
	payload: string | Buffer,
	signature: string,
	timestamp: string,
	secret: string,
): boolean {
	if (!payload || !signature || !timestamp || !secret) {
		return false;
	}

	try {
		// Construct the signed payload: timestamp.payload
		const signedPayload = `${timestamp}.${typeof payload === 'string' ? payload : payload.toString('utf8')}`;

		// Compute expected signature
		const expectedSignature = crypto
			.createHmac('sha256', secret)
			.update(signedPayload)
			.digest('hex');

		// Constant-time comparison to prevent timing attacks
		return crypto.timingSafeEqual(
			Buffer.from(signature),
			Buffer.from(expectedSignature),
		);
	} catch (error) {
		return false;
	}
}

/**
 * Generate webhook signature (for testing purposes)
 */
export function generateWebhookSignature(
	payload: string | Buffer,
	timestamp: string,
	secret: string,
): string {
	const signedPayload = `${timestamp}.${typeof payload === 'string' ? payload : payload.toString('utf8')}`;

	return crypto
		.createHmac('sha256', secret)
		.update(signedPayload)
		.digest('hex');
}

/**
 * Check if webhook timestamp is within acceptable window
 * Default tolerance is 5 minutes (300 seconds)
 */
export function isTimestampValid(
	timestamp: string,
	toleranceSeconds: number = 300,
): boolean {
	const webhookTime = parseInt(timestamp, 10);
	if (isNaN(webhookTime)) {
		return false;
	}

	const currentTime = Math.floor(Date.now() / 1000);
	const difference = Math.abs(currentTime - webhookTime);

	return difference <= toleranceSeconds;
}

/**
 * Parse and validate webhook headers
 */
export interface WebhookHeaders {
	signature: string;
	timestamp: string;
	webhookId?: string;
}

export function parseWebhookHeaders(
	headers: Record<string, string | string[] | undefined>,
): WebhookHeaders | null {
	const signature = getHeaderValue(headers, SIGNATURE_HEADERS.SIGNATURE);
	const timestamp = getHeaderValue(headers, SIGNATURE_HEADERS.TIMESTAMP);
	const webhookId = getHeaderValue(headers, SIGNATURE_HEADERS.WEBHOOK_ID);

	if (!signature || !timestamp) {
		return null;
	}

	return {
		signature,
		timestamp,
		webhookId,
	};
}

/**
 * Helper to get header value (case-insensitive)
 */
function getHeaderValue(
	headers: Record<string, string | string[] | undefined>,
	headerName: string,
): string | undefined {
	const lowerName = headerName.toLowerCase();

	for (const [key, value] of Object.entries(headers)) {
		if (key.toLowerCase() === lowerName) {
			return Array.isArray(value) ? value[0] : value;
		}
	}

	return undefined;
}

/**
 * Full webhook verification
 */
export interface WebhookVerificationResult {
	isValid: boolean;
	error?: string;
}

export function verifyWebhook(
	payload: string | Buffer,
	headers: Record<string, string | string[] | undefined>,
	secret: string,
	timestampToleranceSeconds: number = 300,
): WebhookVerificationResult {
	// Parse headers
	const webhookHeaders = parseWebhookHeaders(headers);
	if (!webhookHeaders) {
		return {
			isValid: false,
			error: 'Missing required webhook signature headers',
		};
	}

	// Verify timestamp is within acceptable window
	if (!isTimestampValid(webhookHeaders.timestamp, timestampToleranceSeconds)) {
		return {
			isValid: false,
			error: 'Webhook timestamp is outside acceptable window',
		};
	}

	// Verify signature
	const signatureValid = verifyWebhookSignature(
		payload,
		webhookHeaders.signature,
		webhookHeaders.timestamp,
		secret,
	);

	if (!signatureValid) {
		return {
			isValid: false,
			error: 'Invalid webhook signature',
		};
	}

	return { isValid: true };
}

/**
 * Generate idempotency key for requests
 */
export function generateIdempotencyKey(): string {
	return crypto.randomUUID();
}

/**
 * Hash sensitive data for logging
 */
export function hashForLogging(data: string): string {
	return crypto.createHash('sha256').update(data).digest('hex').substring(0, 16);
}

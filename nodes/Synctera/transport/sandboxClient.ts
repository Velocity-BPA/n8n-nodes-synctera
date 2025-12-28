/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import { syncteraApiRequest } from './syncteraClient';
import { ENDPOINTS } from '../constants/endpoints';

/**
 * Sandbox Client for Synctera Testing
 *
 * Provides simulation endpoints for testing ACH, wire transfers,
 * card transactions, and other banking operations in sandbox mode.
 *
 * IMPORTANT: These operations are only available in the sandbox environment
 * and should never be used in production.
 */

export interface AchSimulationOptions {
	achId: string;
	status: 'completed' | 'returned' | 'pending';
	returnCode?: string;
	returnReason?: string;
}

export interface CardSimulationOptions {
	cardId: string;
	amount: number;
	merchantName: string;
	merchantCategoryCode?: string;
	transactionType: 'authorization' | 'clearing' | 'reversal' | 'refund';
	currencyCode?: string;
}

export interface WireSimulationOptions {
	wireId: string;
	status: 'completed' | 'failed' | 'returned';
	failureReason?: string;
}

export interface FundAccountOptions {
	accountId: string;
	amount: number;
	description?: string;
}

/**
 * Simulate ACH transaction status change
 */
export async function simulateAchTransaction(
	this: IExecuteFunctions,
	options: AchSimulationOptions,
): Promise<IDataObject> {
	const body: IDataObject = {
		ach_id: options.achId,
		status: options.status.toUpperCase(),
	};

	if (options.status === 'returned') {
		body.return_code = options.returnCode || 'R01';
		body.return_reason = options.returnReason || 'Insufficient Funds';
	}

	return syncteraApiRequest.call(this, 'POST', ENDPOINTS.sandboxAch, body);
}

/**
 * Simulate card transaction
 */
export async function simulateCardTransaction(
	this: IExecuteFunctions,
	options: CardSimulationOptions,
): Promise<IDataObject> {
	const body: IDataObject = {
		card_id: options.cardId,
		amount: Math.round(options.amount * 100), // Convert to cents
		merchant_name: options.merchantName,
		transaction_type: options.transactionType.toUpperCase(),
		currency_code: options.currencyCode || 'USD',
	};

	if (options.merchantCategoryCode) {
		body.merchant_category_code = options.merchantCategoryCode;
	}

	return syncteraApiRequest.call(this, 'POST', ENDPOINTS.sandboxCard, body);
}

/**
 * Simulate wire transfer status change
 */
export async function simulateWireTransaction(
	this: IExecuteFunctions,
	options: WireSimulationOptions,
): Promise<IDataObject> {
	const body: IDataObject = {
		wire_id: options.wireId,
		status: options.status.toUpperCase(),
	};

	if (options.status === 'failed' && options.failureReason) {
		body.failure_reason = options.failureReason;
	}

	return syncteraApiRequest.call(this, 'POST', ENDPOINTS.sandboxWire, body);
}

/**
 * Fund an account (sandbox only)
 */
export async function fundAccount(
	this: IExecuteFunctions,
	options: FundAccountOptions,
): Promise<IDataObject> {
	const body: IDataObject = {
		account_id: options.accountId,
		amount: Math.round(options.amount * 100), // Convert to cents
		description: options.description || 'Sandbox funding',
	};

	return syncteraApiRequest.call(this, 'POST', ENDPOINTS.sandboxFund, body);
}

/**
 * Clear a pending authorization (sandbox only)
 */
export async function clearAuthorization(
	this: IExecuteFunctions,
	authorizationId: string,
	amount?: number,
): Promise<IDataObject> {
	const body: IDataObject = {
		authorization_id: authorizationId,
	};

	if (amount !== undefined) {
		body.amount = Math.round(amount * 100); // Convert to cents
	}

	return syncteraApiRequest.call(this, 'POST', ENDPOINTS.sandboxClearAuth, body);
}

/**
 * Simulate an incoming ACH credit
 */
export async function simulateIncomingAch(
	this: IExecuteFunctions,
	options: {
		accountId: string;
		amount: number;
		senderName: string;
		senderRoutingNumber: string;
		senderAccountNumber: string;
		description?: string;
	},
): Promise<IDataObject> {
	const body: IDataObject = {
		account_id: options.accountId,
		amount: Math.round(options.amount * 100),
		direction: 'CREDIT',
		sender_name: options.senderName,
		sender_routing_number: options.senderRoutingNumber,
		sender_account_number: options.senderAccountNumber,
		description: options.description || 'Incoming ACH credit',
	};

	return syncteraApiRequest.call(this, 'POST', ENDPOINTS.sandboxAch, body);
}

/**
 * Simulate a card authorization
 */
export async function simulateCardAuthorization(
	this: IExecuteFunctions,
	options: {
		cardId: string;
		amount: number;
		merchantName: string;
		merchantCategoryCode?: string;
		merchantCity?: string;
		merchantState?: string;
		merchantCountry?: string;
	},
): Promise<IDataObject> {
	const body: IDataObject = {
		card_id: options.cardId,
		amount: Math.round(options.amount * 100),
		transaction_type: 'AUTHORIZATION',
		merchant_name: options.merchantName,
		merchant_category_code: options.merchantCategoryCode || '5411',
		merchant_city: options.merchantCity || 'San Francisco',
		merchant_state: options.merchantState || 'CA',
		merchant_country: options.merchantCountry || 'US',
	};

	return syncteraApiRequest.call(this, 'POST', ENDPOINTS.sandboxCard, body);
}

/**
 * Check if we're in sandbox environment
 */
export async function isSandboxEnvironment(
	this: IExecuteFunctions,
): Promise<boolean> {
	const credentials = await this.getCredentials('syncteraApi');
	return credentials.environment === 'sandbox';
}

/**
 * Validate sandbox-only operation
 */
export async function validateSandboxOperation(
	this: IExecuteFunctions,
): Promise<void> {
	const isSandbox = await isSandboxEnvironment.call(this);
	if (!isSandbox) {
		throw new Error('This operation is only available in the sandbox environment');
	}
}

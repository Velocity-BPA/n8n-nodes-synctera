/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import { NodeOperationError } from 'n8n-workflow';
import type { INode } from 'n8n-workflow';

/**
 * Validation Utilities for Synctera API
 *
 * Provides input validation for Synctera-specific data types
 * including routing numbers, account numbers, and financial data.
 */

/**
 * Validate a US routing number using the checksum algorithm
 */
export function validateRoutingNumber(routingNumber: string): boolean {
	// Routing numbers must be exactly 9 digits
	if (!/^\d{9}$/.test(routingNumber)) {
		return false;
	}

	// Apply the ABA checksum algorithm
	const digits = routingNumber.split('').map(Number);
	const checksum =
		3 * (digits[0] + digits[3] + digits[6]) +
		7 * (digits[1] + digits[4] + digits[7]) +
		1 * (digits[2] + digits[5] + digits[8]);

	return checksum % 10 === 0;
}

/**
 * Validate account number format
 */
export function validateAccountNumber(accountNumber: string): boolean {
	// Account numbers are typically 4-17 digits
	return /^\d{4,17}$/.test(accountNumber);
}

/**
 * Validate amount is a positive number with max 2 decimal places
 */
export function validateAmount(amount: number): boolean {
	if (typeof amount !== 'number' || isNaN(amount)) {
		return false;
	}
	if (amount <= 0) {
		return false;
	}
	// Check decimal places
	const decimalStr = amount.toString().split('.')[1];
	return !decimalStr || decimalStr.length <= 2;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

/**
 * Validate phone number (US format)
 */
export function validatePhoneNumber(phone: string): boolean {
	// Remove non-digits
	const digits = phone.replace(/\D/g, '');
	// US phone numbers should have 10 or 11 digits (with country code)
	return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
}

/**
 * Validate SSN format (XXX-XX-XXXX or XXXXXXXXX)
 */
export function validateSSN(ssn: string): boolean {
	// Remove dashes
	const digits = ssn.replace(/-/g, '');
	// Must be exactly 9 digits
	if (!/^\d{9}$/.test(digits)) {
		return false;
	}
	// Cannot be all zeros or certain invalid patterns
	if (digits === '000000000' || digits.startsWith('000') || digits.startsWith('666')) {
		return false;
	}
	return true;
}

/**
 * Validate EIN format (XX-XXXXXXX or XXXXXXXXX)
 */
export function validateEIN(ein: string): boolean {
	const digits = ein.replace(/-/g, '');
	return /^\d{9}$/.test(digits);
}

/**
 * Validate date string (YYYY-MM-DD format)
 */
export function validateDateString(dateStr: string): boolean {
	const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
	if (!dateRegex.test(dateStr)) {
		return false;
	}
	const date = new Date(dateStr);
	return !isNaN(date.getTime());
}

/**
 * Validate UUID format
 */
export function validateUUID(uuid: string): boolean {
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidRegex.test(uuid);
}

/**
 * Validate ZIP code (US format)
 */
export function validateZipCode(zipCode: string): boolean {
	// 5 digits or 5+4 format
	return /^\d{5}(-\d{4})?$/.test(zipCode);
}

/**
 * Validate state code (US 2-letter abbreviation)
 */
export function validateStateCode(stateCode: string): boolean {
	const validStates = [
		'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
		'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
		'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
		'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
		'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
		'DC', 'PR', 'VI', 'GU', 'AS', 'MP',
	];
	return validStates.includes(stateCode.toUpperCase());
}

/**
 * Validate country code (ISO 3166-1 alpha-2)
 */
export function validateCountryCode(countryCode: string): boolean {
	return /^[A-Z]{2}$/.test(countryCode.toUpperCase());
}

/**
 * Validate currency code (ISO 4217)
 */
export function validateCurrencyCode(currencyCode: string): boolean {
	const validCurrencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CHF', 'CNY', 'INR', 'MXN'];
	return validCurrencies.includes(currencyCode.toUpperCase());
}

/**
 * Convert amount to cents (integer)
 */
export function amountToCents(amount: number): number {
	return Math.round(amount * 100);
}

/**
 * Convert cents to amount (decimal)
 */
export function centsToAmount(cents: number): number {
	return cents / 100;
}

/**
 * Format phone number to E.164 format
 */
export function formatPhoneToE164(phone: string, countryCode: string = '+1'): string {
	const digits = phone.replace(/\D/g, '');
	if (digits.length === 10) {
		return `${countryCode}${digits}`;
	}
	if (digits.length === 11 && digits.startsWith('1')) {
		return `+${digits}`;
	}
	return phone;
}

/**
 * Format SSN with dashes
 */
export function formatSSN(ssn: string): string {
	const digits = ssn.replace(/\D/g, '');
	if (digits.length !== 9) return ssn;
	return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
}

/**
 * Throw validation error with helpful message
 */
export function throwValidationError(
	node: INode,
	field: string,
	message: string,
	itemIndex?: number,
): never {
	throw new NodeOperationError(
		node,
		`Validation error for field "${field}": ${message}`,
		{ itemIndex },
	);
}

/**
 * Validate required fields
 */
export function validateRequiredFields(
	node: INode,
	data: Record<string, unknown>,
	requiredFields: string[],
	itemIndex?: number,
): void {
	for (const field of requiredFields) {
		const value = data[field];
		if (value === undefined || value === null || value === '') {
			throwValidationError(node, field, 'This field is required', itemIndex);
		}
	}
}

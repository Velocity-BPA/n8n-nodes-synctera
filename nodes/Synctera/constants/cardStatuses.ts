/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Synctera Card Types and Statuses
 *
 * Defines card-related enums and types for the Synctera BaaS platform.
 * Cards are issued through Synctera's card issuing program with partner banks.
 */

export const CARD_TYPES = {
	virtual: 'VIRTUAL',
	physical: 'PHYSICAL',
} as const;

export const CARD_BRANDS = {
	visa: 'VISA',
	mastercard: 'MASTERCARD',
} as const;

export const CARD_STATUSES = {
	active: 'ACTIVE',
	inactive: 'INACTIVE',
	suspended: 'SUSPENDED',
	terminated: 'TERMINATED',
	pending_activation: 'PENDING_ACTIVATION',
	lost: 'LOST',
	stolen: 'STOLEN',
	damaged: 'DAMAGED',
	expired: 'EXPIRED',
} as const;

export const CARD_FULFILLMENT_STATUSES = {
	created: 'CREATED',
	ordered: 'ORDERED',
	shipped: 'SHIPPED',
	delivered: 'DELIVERED',
	returned: 'RETURNED',
	rejected: 'REJECTED',
} as const;

export const CARD_FORM_FACTORS = {
	standard: 'STANDARD',
	mini: 'MINI',
	metal: 'METAL',
} as const;

export const PIN_STATUSES = {
	set: 'SET',
	not_set: 'NOT_SET',
	blocked: 'BLOCKED',
} as const;

export const CARD_TOKEN_STATUSES = {
	active: 'ACTIVE',
	suspended: 'SUSPENDED',
	deleted: 'DELETED',
} as const;

export const SPEND_CONTROL_DIRECTION = {
	credit: 'CREDIT',
	debit: 'DEBIT',
	both: 'BOTH',
} as const;

export const SPEND_CONTROL_TIME_RANGE = {
	daily: 'DAILY',
	weekly: 'WEEKLY',
	monthly: 'MONTHLY',
	yearly: 'YEARLY',
	lifetime: 'LIFETIME',
	per_transaction: 'PER_TRANSACTION',
} as const;

export const MERCHANT_CATEGORY_CODES = {
	airlines: '3000-3299',
	car_rental: '3351-3500',
	lodging: '3501-3999',
	transportation: '4000-4799',
	utilities: '4800-4999',
	retail_stores: '5000-5599',
	clothing_stores: '5600-5699',
	misc_stores: '5700-7299',
	business_services: '7300-7999',
	professional_services: '8000-8999',
	government_services: '9000-9999',
} as const;

export const AUTHORIZATION_TYPES = {
	advice: 'ADVICE',
	authorization: 'AUTHORIZATION',
	balance_inquiry: 'BALANCE_INQUIRY',
	original_credit: 'ORIGINAL_CREDIT',
	quasi_cash: 'QUASI_CASH',
	verification: 'VERIFICATION',
} as const;

export const AUTHORIZATION_STATUSES = {
	approved: 'APPROVED',
	declined: 'DECLINED',
	pending: 'PENDING',
	cleared: 'CLEARED',
	reversed: 'REVERSED',
	expired: 'EXPIRED',
} as const;

export const DECLINE_REASONS = {
	insufficient_funds: 'INSUFFICIENT_FUNDS',
	card_not_active: 'CARD_NOT_ACTIVE',
	card_expired: 'CARD_EXPIRED',
	card_suspended: 'CARD_SUSPENDED',
	spend_limit_exceeded: 'SPEND_LIMIT_EXCEEDED',
	invalid_cvv: 'INVALID_CVV',
	invalid_pin: 'INVALID_PIN',
	fraud_suspected: 'FRAUD_SUSPECTED',
	merchant_blocked: 'MERCHANT_BLOCKED',
	mcc_blocked: 'MCC_BLOCKED',
	country_blocked: 'COUNTRY_BLOCKED',
} as const;

export type CardType = typeof CARD_TYPES[keyof typeof CARD_TYPES];
export type CardBrand = typeof CARD_BRANDS[keyof typeof CARD_BRANDS];
export type CardStatus = typeof CARD_STATUSES[keyof typeof CARD_STATUSES];
export type CardFulfillmentStatus = typeof CARD_FULFILLMENT_STATUSES[keyof typeof CARD_FULFILLMENT_STATUSES];
export type CardFormFactor = typeof CARD_FORM_FACTORS[keyof typeof CARD_FORM_FACTORS];
export type PinStatus = typeof PIN_STATUSES[keyof typeof PIN_STATUSES];
export type CardTokenStatus = typeof CARD_TOKEN_STATUSES[keyof typeof CARD_TOKEN_STATUSES];
export type SpendControlDirection = typeof SPEND_CONTROL_DIRECTION[keyof typeof SPEND_CONTROL_DIRECTION];
export type SpendControlTimeRange = typeof SPEND_CONTROL_TIME_RANGE[keyof typeof SPEND_CONTROL_TIME_RANGE];
export type AuthorizationType = typeof AUTHORIZATION_TYPES[keyof typeof AUTHORIZATION_TYPES];
export type AuthorizationStatus = typeof AUTHORIZATION_STATUSES[keyof typeof AUTHORIZATION_STATUSES];
export type DeclineReason = typeof DECLINE_REASONS[keyof typeof DECLINE_REASONS];

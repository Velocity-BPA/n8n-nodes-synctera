/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Synctera Account Types and Statuses
 *
 * Defines account-related enums and types for the Synctera BaaS platform.
 */

export const ACCOUNT_TYPES = {
	checking: 'CHECKING',
	savings: 'SAVINGS',
	money_market: 'MONEY_MARKET',
	certificate_of_deposit: 'CERTIFICATE_OF_DEPOSIT',
	loan: 'LOAN',
	line_of_credit: 'LINE_OF_CREDIT',
	external: 'EXTERNAL',
} as const;

export const ACCOUNT_STATUSES = {
	active: 'ACTIVE',
	inactive: 'INACTIVE',
	frozen: 'FROZEN',
	closed: 'CLOSED',
	pending: 'PENDING',
	charged_off: 'CHARGED_OFF',
} as const;

export const ACCOUNT_ACCESS_STATUSES = {
	active: 'ACTIVE',
	frozen: 'FROZEN',
	closed: 'CLOSED',
} as const;

export const ACCOUNT_PURPOSE = {
	general: 'GENERAL',
	operating: 'OPERATING',
	savings: 'SAVINGS',
	payroll: 'PAYROLL',
	reserve: 'RESERVE',
	fbo: 'FBO',
} as const;

export const BALANCE_TYPES = {
	available: 'AVAILABLE',
	current: 'CURRENT',
	pending: 'PENDING',
	hold: 'HOLD',
} as const;

export const ACCOUNT_PRODUCT_TYPES = {
	checking: 'CHECKING',
	savings: 'SAVINGS',
	money_market: 'MONEY_MARKET',
	certificate_of_deposit: 'CERTIFICATE_OF_DEPOSIT',
} as const;

export const INTEREST_ACCRUAL_METHODS = {
	daily: 'DAILY',
	monthly: 'MONTHLY',
	quarterly: 'QUARTERLY',
	annually: 'ANNUALLY',
} as const;

export const INTEREST_PAYOUT_FREQUENCIES = {
	monthly: 'MONTHLY',
	quarterly: 'QUARTERLY',
	semi_annually: 'SEMI_ANNUALLY',
	annually: 'ANNUALLY',
	at_maturity: 'AT_MATURITY',
} as const;

export const EXTERNAL_ACCOUNT_TYPES = {
	checking: 'CHECKING',
	savings: 'SAVINGS',
} as const;

export const EXTERNAL_ACCOUNT_STATUSES = {
	active: 'ACTIVE',
	inactive: 'INACTIVE',
	pending_verification: 'PENDING_VERIFICATION',
	verification_failed: 'VERIFICATION_FAILED',
	deleted: 'DELETED',
} as const;

export const EXTERNAL_ACCOUNT_VERIFICATION_METHODS = {
	micro_deposits: 'MICRO_DEPOSITS',
	instant: 'INSTANT',
	manual: 'MANUAL',
} as const;

export type AccountType = typeof ACCOUNT_TYPES[keyof typeof ACCOUNT_TYPES];
export type AccountStatus = typeof ACCOUNT_STATUSES[keyof typeof ACCOUNT_STATUSES];
export type AccountAccessStatus = typeof ACCOUNT_ACCESS_STATUSES[keyof typeof ACCOUNT_ACCESS_STATUSES];
export type AccountPurpose = typeof ACCOUNT_PURPOSE[keyof typeof ACCOUNT_PURPOSE];
export type BalanceType = typeof BALANCE_TYPES[keyof typeof BALANCE_TYPES];
export type AccountProductType = typeof ACCOUNT_PRODUCT_TYPES[keyof typeof ACCOUNT_PRODUCT_TYPES];
export type InterestAccrualMethod = typeof INTEREST_ACCRUAL_METHODS[keyof typeof INTEREST_ACCRUAL_METHODS];
export type InterestPayoutFrequency = typeof INTEREST_PAYOUT_FREQUENCIES[keyof typeof INTEREST_PAYOUT_FREQUENCIES];
export type ExternalAccountType = typeof EXTERNAL_ACCOUNT_TYPES[keyof typeof EXTERNAL_ACCOUNT_TYPES];
export type ExternalAccountStatus = typeof EXTERNAL_ACCOUNT_STATUSES[keyof typeof EXTERNAL_ACCOUNT_STATUSES];
export type ExternalAccountVerificationMethod = typeof EXTERNAL_ACCOUNT_VERIFICATION_METHODS[keyof typeof EXTERNAL_ACCOUNT_VERIFICATION_METHODS];

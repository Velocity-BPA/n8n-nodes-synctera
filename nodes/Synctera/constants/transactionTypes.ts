/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Synctera Transaction Types
 *
 * Defines transaction-related enums and types for the Synctera BaaS platform.
 */

export const TRANSACTION_TYPES = {
	ach_credit: 'ACH_CREDIT',
	ach_debit: 'ACH_DEBIT',
	wire_incoming: 'WIRE_INCOMING',
	wire_outgoing: 'WIRE_OUTGOING',
	internal_transfer: 'INTERNAL_TRANSFER',
	card_purchase: 'CARD_PURCHASE',
	card_refund: 'CARD_REFUND',
	card_reversal: 'CARD_REVERSAL',
	card_withdrawal: 'CARD_WITHDRAWAL',
	fee: 'FEE',
	fee_reversal: 'FEE_REVERSAL',
	interest: 'INTEREST',
	adjustment: 'ADJUSTMENT',
	check_deposit: 'CHECK_DEPOSIT',
	check_withdrawal: 'CHECK_WITHDRAWAL',
	cash_deposit: 'CASH_DEPOSIT',
	cash_withdrawal: 'CASH_WITHDRAWAL',
	hold: 'HOLD',
	hold_release: 'HOLD_RELEASE',
} as const;

export const TRANSACTION_STATUSES = {
	pending: 'PENDING',
	posted: 'POSTED',
	declined: 'DECLINED',
	reversed: 'REVERSED',
	canceled: 'CANCELED',
	expired: 'EXPIRED',
} as const;

export const TRANSACTION_DIRECTIONS = {
	credit: 'CREDIT',
	debit: 'DEBIT',
} as const;

export const POSTING_TYPES = {
	real_time: 'REAL_TIME',
	batch: 'BATCH',
	memo: 'MEMO',
} as const;

// ACH Codes
export const ACH_SEC_CODES = {
	ARC: 'ARC', // Accounts Receivable Entry
	BOC: 'BOC', // Back Office Conversion
	CCD: 'CCD', // Corporate Credit or Debit
	CIE: 'CIE', // Customer Initiated Entry
	CTX: 'CTX', // Corporate Trade Exchange
	IAT: 'IAT', // International ACH Transaction
	POP: 'POP', // Point of Purchase
	POS: 'POS', // Point of Sale
	PPD: 'PPD', // Prearranged Payment and Deposit
	RCK: 'RCK', // Re-presented Check
	TEL: 'TEL', // Telephone-Initiated Entry
	WEB: 'WEB', // Internet-Initiated Entry
} as const;

export const ACH_TRANSACTION_TYPES = {
	credit: 'CREDIT',
	debit: 'DEBIT',
} as const;

export const ACH_STATUSES = {
	pending: 'PENDING',
	originated: 'ORIGINATED',
	completed: 'COMPLETED',
	returned: 'RETURNED',
	canceled: 'CANCELED',
	failed: 'FAILED',
} as const;

export const ACH_RETURN_CODES = {
	R01: { code: 'R01', description: 'Insufficient Funds' },
	R02: { code: 'R02', description: 'Account Closed' },
	R03: { code: 'R03', description: 'No Account/Unable to Locate Account' },
	R04: { code: 'R04', description: 'Invalid Account Number' },
	R05: { code: 'R05', description: 'Unauthorized Debit Entry' },
	R06: { code: 'R06', description: 'Returned per ODFI Request' },
	R07: { code: 'R07', description: 'Authorization Revoked' },
	R08: { code: 'R08', description: 'Payment Stopped' },
	R09: { code: 'R09', description: 'Uncollected Funds' },
	R10: { code: 'R10', description: 'Customer Advises Not Authorized' },
	R11: { code: 'R11', description: 'Check Truncation Entry Return' },
	R12: { code: 'R12', description: 'Branch Sold' },
	R13: { code: 'R13', description: 'RDFI Not Qualified to Participate' },
	R14: { code: 'R14', description: 'Representative Payee Deceased' },
	R15: { code: 'R15', description: 'Beneficiary Deceased' },
	R16: { code: 'R16', description: 'Account Frozen' },
	R17: { code: 'R17', description: 'File Record Edit Criteria' },
	R20: { code: 'R20', description: 'Non-Transaction Account' },
	R21: { code: 'R21', description: 'Invalid Company ID' },
	R22: { code: 'R22', description: 'Invalid Individual ID' },
	R23: { code: 'R23', description: 'Credit Entry Refused by Receiver' },
	R24: { code: 'R24', description: 'Duplicate Entry' },
	R29: { code: 'R29', description: 'Corporate Customer Advises Not Authorized' },
} as const;

export const WIRE_TYPES = {
	domestic: 'DOMESTIC',
	international: 'INTERNATIONAL',
} as const;

export const WIRE_STATUSES = {
	pending: 'PENDING',
	submitted: 'SUBMITTED',
	completed: 'COMPLETED',
	failed: 'FAILED',
	canceled: 'CANCELED',
	returned: 'RETURNED',
} as const;

export const WIRE_PURPOSES = {
	business: 'BUSINESS',
	personal: 'PERSONAL',
	investment: 'INVESTMENT',
	real_estate: 'REAL_ESTATE',
	payroll: 'PAYROLL',
	vendor_payment: 'VENDOR_PAYMENT',
	loan_payment: 'LOAN_PAYMENT',
	other: 'OTHER',
} as const;

export type TransactionType = typeof TRANSACTION_TYPES[keyof typeof TRANSACTION_TYPES];
export type TransactionStatus = typeof TRANSACTION_STATUSES[keyof typeof TRANSACTION_STATUSES];
export type TransactionDirection = typeof TRANSACTION_DIRECTIONS[keyof typeof TRANSACTION_DIRECTIONS];
export type PostingType = typeof POSTING_TYPES[keyof typeof POSTING_TYPES];
export type AchSecCode = typeof ACH_SEC_CODES[keyof typeof ACH_SEC_CODES];
export type AchTransactionType = typeof ACH_TRANSACTION_TYPES[keyof typeof ACH_TRANSACTION_TYPES];
export type AchStatus = typeof ACH_STATUSES[keyof typeof ACH_STATUSES];
export type WireType = typeof WIRE_TYPES[keyof typeof WIRE_TYPES];
export type WireStatus = typeof WIRE_STATUSES[keyof typeof WIRE_STATUSES];
export type WirePurpose = typeof WIRE_PURPOSES[keyof typeof WIRE_PURPOSES];

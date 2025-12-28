/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Synctera Event Types
 *
 * All webhook event types supported by the Synctera BaaS platform.
 * These events are triggered when actions occur in the Synctera system.
 */

// Customer Events
export const CUSTOMER_EVENTS = {
	CUSTOMER_CREATED: 'customer.created',
	CUSTOMER_UPDATED: 'customer.updated',
	CUSTOMER_DELETED: 'customer.deleted',
	CUSTOMER_VERIFICATION_COMPLETED: 'customer.verification.completed',
	CUSTOMER_VERIFICATION_FAILED: 'customer.verification.failed',
} as const;

// Business Events
export const BUSINESS_EVENTS = {
	BUSINESS_CREATED: 'business.created',
	BUSINESS_UPDATED: 'business.updated',
	BUSINESS_DELETED: 'business.deleted',
	BUSINESS_VERIFICATION_COMPLETED: 'business.verification.completed',
	BUSINESS_VERIFICATION_FAILED: 'business.verification.failed',
} as const;

// Account Events
export const ACCOUNT_EVENTS = {
	ACCOUNT_CREATED: 'account.created',
	ACCOUNT_UPDATED: 'account.updated',
	ACCOUNT_CLOSED: 'account.closed',
	ACCOUNT_FROZEN: 'account.frozen',
	ACCOUNT_UNFROZEN: 'account.unfrozen',
	ACCOUNT_BALANCE_CHANGED: 'account.balance.changed',
} as const;

// ACH Events
export const ACH_EVENTS = {
	ACH_ORIGINATED: 'ach.originated',
	ACH_COMPLETED: 'ach.completed',
	ACH_RETURNED: 'ach.returned',
	ACH_CANCELED: 'ach.canceled',
	ACH_NOC_RECEIVED: 'ach.noc.received',
	ACH_PENDING: 'ach.pending',
	ACH_FAILED: 'ach.failed',
} as const;

// Wire Events
export const WIRE_EVENTS = {
	WIRE_CREATED: 'wire.created',
	WIRE_COMPLETED: 'wire.completed',
	WIRE_FAILED: 'wire.failed',
	WIRE_CANCELED: 'wire.canceled',
	WIRE_PENDING: 'wire.pending',
} as const;

// Internal Transfer Events
export const INTERNAL_TRANSFER_EVENTS = {
	INTERNAL_TRANSFER_CREATED: 'internal_transfer.created',
	INTERNAL_TRANSFER_COMPLETED: 'internal_transfer.completed',
	INTERNAL_TRANSFER_FAILED: 'internal_transfer.failed',
} as const;

// Card Events
export const CARD_EVENTS = {
	CARD_CREATED: 'card.created',
	CARD_ACTIVATED: 'card.activated',
	CARD_SUSPENDED: 'card.suspended',
	CARD_UNSUSPENDED: 'card.unsuspended',
	CARD_TERMINATED: 'card.terminated',
	CARD_REISSUED: 'card.reissued',
	CARD_SHIPPED: 'card.shipped',
	CARD_DELIVERED: 'card.delivered',
	CARD_PIN_SET: 'card.pin.set',
	CARD_PIN_CHANGED: 'card.pin.changed',
} as const;

// Transaction Events
export const TRANSACTION_EVENTS = {
	TRANSACTION_CREATED: 'transaction.created',
	TRANSACTION_POSTED: 'transaction.posted',
	TRANSACTION_REVERSED: 'transaction.reversed',
	TRANSACTION_DISPUTED: 'transaction.disputed',
	AUTHORIZATION_CREATED: 'authorization.created',
	AUTHORIZATION_CLEARED: 'authorization.cleared',
	AUTHORIZATION_REVERSED: 'authorization.reversed',
	AUTHORIZATION_DECLINED: 'authorization.declined',
	AUTHORIZATION_EXPIRED: 'authorization.expired',
} as const;

// Watchlist Events
export const WATCHLIST_EVENTS = {
	SCREENING_COMPLETED: 'watchlist.screening.completed',
	ALERT_CREATED: 'watchlist.alert.created',
	ALERT_SUPPRESSED: 'watchlist.alert.suppressed',
	ALERT_REVIEWED: 'watchlist.alert.reviewed',
} as const;

// Disclosure Events
export const DISCLOSURE_EVENTS = {
	DISCLOSURE_SENT: 'disclosure.sent',
	DISCLOSURE_ACCEPTED: 'disclosure.accepted',
	DISCLOSURE_REJECTED: 'disclosure.rejected',
} as const;

// External Account Events
export const EXTERNAL_ACCOUNT_EVENTS = {
	EXTERNAL_ACCOUNT_CREATED: 'external_account.created',
	EXTERNAL_ACCOUNT_VERIFIED: 'external_account.verified',
	EXTERNAL_ACCOUNT_VERIFICATION_FAILED: 'external_account.verification.failed',
	EXTERNAL_ACCOUNT_DELETED: 'external_account.deleted',
} as const;

// Document Events
export const DOCUMENT_EVENTS = {
	DOCUMENT_UPLOADED: 'document.uploaded',
	DOCUMENT_PROCESSED: 'document.processed',
	DOCUMENT_REJECTED: 'document.rejected',
} as const;

// Statement Events
export const STATEMENT_EVENTS = {
	STATEMENT_GENERATED: 'statement.generated',
	STATEMENT_AVAILABLE: 'statement.available',
} as const;

// Hold Events
export const HOLD_EVENTS = {
	HOLD_CREATED: 'hold.created',
	HOLD_RELEASED: 'hold.released',
	HOLD_EXPIRED: 'hold.expired',
} as const;

// Fee Events
export const FEE_EVENTS = {
	FEE_CREATED: 'fee.created',
	FEE_REVERSED: 'fee.reversed',
} as const;

// Interest Events
export const INTEREST_EVENTS = {
	INTEREST_ACCRUED: 'interest.accrued',
	INTEREST_PAID: 'interest.paid',
} as const;

// All events combined
export const ALL_EVENTS = {
	...CUSTOMER_EVENTS,
	...BUSINESS_EVENTS,
	...ACCOUNT_EVENTS,
	...ACH_EVENTS,
	...WIRE_EVENTS,
	...INTERNAL_TRANSFER_EVENTS,
	...CARD_EVENTS,
	...TRANSACTION_EVENTS,
	...WATCHLIST_EVENTS,
	...DISCLOSURE_EVENTS,
	...EXTERNAL_ACCOUNT_EVENTS,
	...DOCUMENT_EVENTS,
	...STATEMENT_EVENTS,
	...HOLD_EVENTS,
	...FEE_EVENTS,
	...INTEREST_EVENTS,
} as const;

// Event categories for UI grouping
export const EVENT_CATEGORIES = {
	customer: Object.values(CUSTOMER_EVENTS),
	business: Object.values(BUSINESS_EVENTS),
	account: Object.values(ACCOUNT_EVENTS),
	ach: Object.values(ACH_EVENTS),
	wire: Object.values(WIRE_EVENTS),
	internalTransfer: Object.values(INTERNAL_TRANSFER_EVENTS),
	card: Object.values(CARD_EVENTS),
	transaction: Object.values(TRANSACTION_EVENTS),
	watchlist: Object.values(WATCHLIST_EVENTS),
	disclosure: Object.values(DISCLOSURE_EVENTS),
	externalAccount: Object.values(EXTERNAL_ACCOUNT_EVENTS),
	document: Object.values(DOCUMENT_EVENTS),
	statement: Object.values(STATEMENT_EVENTS),
	hold: Object.values(HOLD_EVENTS),
	fee: Object.values(FEE_EVENTS),
	interest: Object.values(INTEREST_EVENTS),
} as const;

export type CustomerEvent = typeof CUSTOMER_EVENTS[keyof typeof CUSTOMER_EVENTS];
export type BusinessEvent = typeof BUSINESS_EVENTS[keyof typeof BUSINESS_EVENTS];
export type AccountEvent = typeof ACCOUNT_EVENTS[keyof typeof ACCOUNT_EVENTS];
export type AchEvent = typeof ACH_EVENTS[keyof typeof ACH_EVENTS];
export type WireEvent = typeof WIRE_EVENTS[keyof typeof WIRE_EVENTS];
export type InternalTransferEvent = typeof INTERNAL_TRANSFER_EVENTS[keyof typeof INTERNAL_TRANSFER_EVENTS];
export type CardEvent = typeof CARD_EVENTS[keyof typeof CARD_EVENTS];
export type TransactionEvent = typeof TRANSACTION_EVENTS[keyof typeof TRANSACTION_EVENTS];
export type WatchlistEvent = typeof WATCHLIST_EVENTS[keyof typeof WATCHLIST_EVENTS];
export type DisclosureEvent = typeof DISCLOSURE_EVENTS[keyof typeof DISCLOSURE_EVENTS];
export type ExternalAccountEvent = typeof EXTERNAL_ACCOUNT_EVENTS[keyof typeof EXTERNAL_ACCOUNT_EVENTS];
export type DocumentEvent = typeof DOCUMENT_EVENTS[keyof typeof DOCUMENT_EVENTS];
export type StatementEvent = typeof STATEMENT_EVENTS[keyof typeof STATEMENT_EVENTS];
export type HoldEvent = typeof HOLD_EVENTS[keyof typeof HOLD_EVENTS];
export type FeeEvent = typeof FEE_EVENTS[keyof typeof FEE_EVENTS];
export type InterestEvent = typeof INTEREST_EVENTS[keyof typeof INTEREST_EVENTS];
export type AllEvents = typeof ALL_EVENTS[keyof typeof ALL_EVENTS];

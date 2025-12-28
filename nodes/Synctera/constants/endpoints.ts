/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Synctera API Endpoints
 *
 * All API endpoints for the Synctera Banking-as-a-Service platform.
 * API Version: v0
 */

export const SYNCTERA_API_VERSION = 'v0';

export const SYNCTERA_ENVIRONMENTS = {
	production: 'https://api.synctera.com',
	sandbox: 'https://api.synctera.com',
} as const;

export const ENDPOINTS = {
	// Customer endpoints
	customers: '/customers',
	customerById: (id: string) => `/customers/${id}`,
	customerVerify: (id: string) => `/customers/${id}/verify`,
	customerAccounts: (id: string) => `/customers/${id}/accounts`,
	customerCards: (id: string) => `/customers/${id}/cards`,
	customerRelationships: (id: string) => `/customers/${id}/relationships`,

	// Business endpoints
	businesses: '/businesses',
	businessById: (id: string) => `/businesses/${id}`,
	businessOwners: (id: string) => `/businesses/${id}/owners`,
	businessOwnerById: (businessId: string, ownerId: string) => `/businesses/${businessId}/owners/${ownerId}`,
	businessVerification: (id: string) => `/businesses/${id}/verification`,

	// Account endpoints
	accounts: '/accounts',
	accountById: (id: string) => `/accounts/${id}`,
	accountBalance: (id: string) => `/accounts/${id}/balance`,
	accountNumber: (id: string) => `/accounts/${id}/account_number`,
	accountRoutingNumber: (id: string) => `/accounts/${id}/routing_number`,
	accountTransactions: (id: string) => `/accounts/${id}/transactions`,
	accountStatements: (id: string) => `/accounts/${id}/statements`,
	accountFreeze: (id: string) => `/accounts/${id}/freeze`,
	accountUnfreeze: (id: string) => `/accounts/${id}/unfreeze`,
	accountClose: (id: string) => `/accounts/${id}/close`,

	// Account Template endpoints
	accountTemplates: '/account_templates',
	accountTemplateById: (id: string) => `/account_templates/${id}`,

	// ACH endpoints
	achTransfers: '/ach',
	achTransferById: (id: string) => `/ach/${id}`,
	achTransferCancel: (id: string) => `/ach/${id}/cancel`,
	achReturns: '/ach/returns',
	achReturnById: (id: string) => `/ach/returns/${id}`,
	achNocs: '/ach/nocs',
	achNocById: (id: string) => `/ach/nocs/${id}`,
	achAddenda: (id: string) => `/ach/${id}/addenda`,

	// Wire endpoints
	wires: '/wires',
	wireById: (id: string) => `/wires/${id}`,
	wireCancel: (id: string) => `/wires/${id}/cancel`,
	wireFees: '/wires/fees',

	// Internal Transfer endpoints
	internalTransfers: '/internal_transfers',
	internalTransferById: (id: string) => `/internal_transfers/${id}`,

	// External Account endpoints
	externalAccounts: '/external_accounts',
	externalAccountById: (id: string) => `/external_accounts/${id}`,
	externalAccountVerify: (id: string) => `/external_accounts/${id}/verify`,
	externalAccountVerificationStatus: (id: string) => `/external_accounts/${id}/verification_status`,

	// Card endpoints
	cards: '/cards',
	cardById: (id: string) => `/cards/${id}`,
	cardActivate: (id: string) => `/cards/${id}/activate`,
	cardSuspend: (id: string) => `/cards/${id}/suspend`,
	cardUnsuspend: (id: string) => `/cards/${id}/unsuspend`,
	cardTerminate: (id: string) => `/cards/${id}/terminate`,
	cardReissue: (id: string) => `/cards/${id}/reissue`,
	cardToken: (id: string) => `/cards/${id}/token`,
	cardImage: (id: string) => `/cards/${id}/image`,
	cardPin: (id: string) => `/cards/${id}/pin`,
	cardLimits: (id: string) => `/cards/${id}/limits`,

	// Card Product endpoints
	cardProducts: '/card_products',
	cardProductById: (id: string) => `/card_products/${id}`,

	// Transaction endpoints
	transactions: '/transactions',
	transactionById: (id: string) => `/transactions/${id}`,
	transactionsPending: '/transactions/pending',
	transactionsPosted: '/transactions/posted',
	transactionsSearch: '/transactions/search',
	transactionEnhancedData: (id: string) => `/transactions/${id}/enhanced_data`,

	// Authorization endpoints
	authorizations: '/authorizations',
	authorizationById: (id: string) => `/authorizations/${id}`,
	authorizationSimulate: '/authorizations/simulate',
	authorizationClear: (id: string) => `/authorizations/${id}/clear`,
	authorizationReverse: (id: string) => `/authorizations/${id}/reverse`,

	// Statement endpoints
	statements: '/statements',
	statementById: (id: string) => `/statements/${id}`,
	statementPdf: (id: string) => `/statements/${id}/pdf`,

	// Disclosure endpoints
	disclosures: '/disclosures',
	disclosureById: (id: string) => `/disclosures/${id}`,
	disclosureAccept: (id: string) => `/disclosures/${id}/accept`,
	disclosureDocument: (id: string) => `/disclosures/${id}/document`,

	// Document endpoints
	documents: '/documents',
	documentById: (id: string) => `/documents/${id}`,
	documentContent: (id: string) => `/documents/${id}/content`,

	// Verification endpoints
	verifications: '/verifications',
	verificationById: (id: string) => `/verifications/${id}`,
	verificationResult: (id: string) => `/verifications/${id}/result`,
	verificationRetry: (id: string) => `/verifications/${id}/retry`,

	// Watchlist endpoints
	watchlistScreenings: '/watchlist/screenings',
	watchlistScreeningById: (id: string) => `/watchlist/screenings/${id}`,
	watchlistAlerts: '/watchlist/alerts',
	watchlistAlertById: (id: string) => `/watchlist/alerts/${id}`,
	watchlistAlertSuppress: (id: string) => `/watchlist/alerts/${id}/suppress`,

	// Spend Control endpoints
	spendControls: '/spend_controls',
	spendControlById: (id: string) => `/spend_controls/${id}`,

	// Relationship endpoints
	relationships: '/relationships',
	relationshipById: (id: string) => `/relationships/${id}`,
	relationshipTypes: '/relationship_types',

	// Webhook endpoints
	webhooks: '/webhooks',
	webhookById: (id: string) => `/webhooks/${id}`,
	webhookSecret: (id: string) => `/webhooks/${id}/secret`,
	webhookRotateSecret: (id: string) => `/webhooks/${id}/rotate_secret`,
	webhookTest: (id: string) => `/webhooks/${id}/test`,
	webhookEvents: (id: string) => `/webhooks/${id}/events`,

	// Event endpoints
	events: '/events',
	eventById: (id: string) => `/events/${id}`,
	eventResend: (id: string) => `/events/${id}/resend`,
	eventTypes: '/event_types',

	// Note endpoints
	notes: '/notes',
	noteById: (id: string) => `/notes/${id}`,

	// Cash Order endpoints
	cashOrders: '/cash_orders',
	cashOrderById: (id: string) => `/cash_orders/${id}`,
	cashOrderCancel: (id: string) => `/cash_orders/${id}/cancel`,

	// Interest endpoints
	interest: '/interest',
	interestById: (id: string) => `/interest/${id}`,
	interestRates: '/interest_rates',
	interestRateById: (id: string) => `/interest_rates/${id}`,

	// Fee endpoints
	fees: '/fees',
	feeById: (id: string) => `/fees/${id}`,
	feeReverse: (id: string) => `/fees/${id}/reverse`,
	feeSchedules: '/fee_schedules',

	// Hold endpoints
	holds: '/holds',
	holdById: (id: string) => `/holds/${id}`,
	holdRelease: (id: string) => `/holds/${id}/release`,

	// Bank Partner endpoints
	banks: '/banks',
	bankById: (id: string) => `/banks/${id}`,
	bankLimits: (id: string) => `/banks/${id}/limits`,

	// Sandbox endpoints
	sandboxAch: '/sandbox/ach',
	sandboxCard: '/sandbox/card',
	sandboxWire: '/sandbox/wire',
	sandboxFund: '/sandbox/fund',
	sandboxClearAuth: '/sandbox/authorizations/clear',

	// Utility endpoints
	routingNumbers: '/routing_numbers',
	routingNumberValidate: '/routing_numbers/validate',
	apiStatus: '/status',
	supportedBanks: '/supported_banks',
} as const;

export type EndpointsType = typeof ENDPOINTS;

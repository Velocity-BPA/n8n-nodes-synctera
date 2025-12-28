/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const sandboxOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sandbox'],
			},
		},
		options: [
			{
				name: 'Clear Authorization',
				value: 'clearAuthorization',
				description: 'Clear a pending authorization in sandbox',
				action: 'Clear a sandbox authorization',
			},
			{
				name: 'Fund Account',
				value: 'fundAccount',
				description: 'Add test funds to an account in sandbox',
				action: 'Fund a sandbox account',
			},
			{
				name: 'Simulate ACH',
				value: 'simulateAch',
				description: 'Simulate an ACH transfer in sandbox',
				action: 'Simulate ACH transfer',
			},
			{
				name: 'Simulate Card Transaction',
				value: 'simulateCardTransaction',
				description: 'Simulate a card transaction in sandbox',
				action: 'Simulate card transaction',
			},
			{
				name: 'Simulate Wire',
				value: 'simulateWire',
				description: 'Simulate a wire transfer in sandbox',
				action: 'Simulate wire transfer',
			},
		],
		default: 'simulateAch',
	},
];

export const sandboxFields: INodeProperties[] = [
	// ----------------------------------
	//         sandbox:simulateAch
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['simulateAch', 'fundAccount'],
			},
		},
		description: 'The unique identifier for the account',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		default: 0,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['simulateAch', 'fundAccount'],
			},
		},
		description: 'Amount in cents (e.g., 1000 = $10.00)',
	},
	{
		displayName: 'ACH Simulation Type',
		name: 'achSimulationType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['simulateAch'],
			},
		},
		options: [
			{
				name: 'Incoming Credit',
				value: 'INCOMING_CREDIT',
				description: 'Simulate an incoming ACH credit',
			},
			{
				name: 'Incoming Debit',
				value: 'INCOMING_DEBIT',
				description: 'Simulate an incoming ACH debit',
			},
			{
				name: 'Return',
				value: 'RETURN',
				description: 'Simulate an ACH return',
			},
			{
				name: 'NOC (Notification of Change)',
				value: 'NOC',
				description: 'Simulate a Notification of Change',
			},
			{
				name: 'Settlement',
				value: 'SETTLEMENT',
				description: 'Settle a pending ACH transfer',
			},
		],
		default: 'INCOMING_CREDIT',
		description: 'The type of ACH simulation to perform',
	},
	{
		displayName: 'ACH Transfer ID',
		name: 'achTransferId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['simulateAch'],
				achSimulationType: ['RETURN', 'NOC', 'SETTLEMENT'],
			},
		},
		default: '',
		description: 'The ACH transfer ID (required for return, NOC, and settlement simulations)',
	},
	{
		displayName: 'Return Code',
		name: 'returnCode',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['simulateAch'],
				achSimulationType: ['RETURN'],
			},
		},
		options: [
			{
				name: 'R01 - Insufficient Funds',
				value: 'R01',
			},
			{
				name: 'R02 - Account Closed',
				value: 'R02',
			},
			{
				name: 'R03 - No Account/Unable to Locate',
				value: 'R03',
			},
			{
				name: 'R04 - Invalid Account Number',
				value: 'R04',
			},
			{
				name: 'R05 - Unauthorized Debit',
				value: 'R05',
			},
			{
				name: 'R06 - ODFI Requested Return',
				value: 'R06',
			},
			{
				name: 'R07 - Authorization Revoked',
				value: 'R07',
			},
			{
				name: 'R08 - Payment Stopped',
				value: 'R08',
			},
			{
				name: 'R09 - Uncollected Funds',
				value: 'R09',
			},
			{
				name: 'R10 - Customer Advises Not Authorized',
				value: 'R10',
			},
		],
		default: 'R01',
		description: 'The ACH return code to simulate',
	},
	{
		displayName: 'Additional Options',
		name: 'achOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['simulateAch'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description for the simulated ACH',
			},
			{
				displayName: 'External Account ID',
				name: 'externalAccountId',
				type: 'string',
				default: '',
				description: 'External account ID for the transfer',
			},
			{
				displayName: 'Originator Name',
				name: 'originatorName',
				type: 'string',
				default: '',
				description: 'Name of the originating entity',
			},
		],
	},

	// ----------------------------------
	//         sandbox:simulateCardTransaction
	// ----------------------------------
	{
		displayName: 'Card ID',
		name: 'cardId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['simulateCardTransaction'],
			},
		},
		description: 'The unique identifier for the card',
	},
	{
		displayName: 'Transaction Amount',
		name: 'transactionAmount',
		type: 'number',
		required: true,
		default: 0,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['simulateCardTransaction'],
			},
		},
		description: 'Transaction amount in cents (e.g., 1000 = $10.00)',
	},
	{
		displayName: 'Transaction Type',
		name: 'cardTransactionType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['simulateCardTransaction'],
			},
		},
		options: [
			{
				name: 'Authorization',
				value: 'AUTHORIZATION',
				description: 'Simulate a card authorization',
			},
			{
				name: 'Purchase',
				value: 'PURCHASE',
				description: 'Simulate a purchase transaction',
			},
			{
				name: 'ATM Withdrawal',
				value: 'ATM_WITHDRAWAL',
				description: 'Simulate an ATM withdrawal',
			},
			{
				name: 'Refund',
				value: 'REFUND',
				description: 'Simulate a refund',
			},
			{
				name: 'Reversal',
				value: 'REVERSAL',
				description: 'Simulate a reversal',
			},
			{
				name: 'Cash Back',
				value: 'CASH_BACK',
				description: 'Simulate a cash back transaction',
			},
		],
		default: 'AUTHORIZATION',
		description: 'The type of card transaction to simulate',
	},
	{
		displayName: 'Merchant Details',
		name: 'merchantDetails',
		type: 'collection',
		placeholder: 'Add Merchant Detail',
		default: {},
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['simulateCardTransaction'],
			},
		},
		options: [
			{
				displayName: 'Merchant Name',
				name: 'merchantName',
				type: 'string',
				default: 'Test Merchant',
				description: 'Name of the merchant',
			},
			{
				displayName: 'Merchant ID',
				name: 'merchantId',
				type: 'string',
				default: '',
				description: 'Unique merchant identifier',
			},
			{
				displayName: 'MCC (Merchant Category Code)',
				name: 'mcc',
				type: 'string',
				default: '5411',
				description: 'The 4-digit Merchant Category Code',
			},
			{
				displayName: 'Merchant City',
				name: 'merchantCity',
				type: 'string',
				default: '',
				description: 'City where the merchant is located',
			},
			{
				displayName: 'Merchant State',
				name: 'merchantState',
				type: 'string',
				default: '',
				description: 'State where the merchant is located',
			},
			{
				displayName: 'Merchant Country',
				name: 'merchantCountry',
				type: 'string',
				default: 'USA',
				description: 'Country where the merchant is located',
			},
		],
	},
	{
		displayName: 'Card Transaction Options',
		name: 'cardTransactionOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['simulateCardTransaction'],
			},
		},
		options: [
			{
				displayName: 'Entry Mode',
				name: 'entryMode',
				type: 'options',
				options: [
					{
						name: 'Chip',
						value: 'CHIP',
					},
					{
						name: 'Contactless',
						value: 'CONTACTLESS',
					},
					{
						name: 'Magnetic Stripe',
						value: 'MAG_STRIPE',
					},
					{
						name: 'Manual Entry',
						value: 'MANUAL',
					},
					{
						name: 'E-commerce',
						value: 'ECOMMERCE',
					},
				],
				default: 'CHIP',
				description: 'How the card was presented',
			},
			{
				displayName: 'PIN Entered',
				name: 'pinEntered',
				type: 'boolean',
				default: false,
				description: 'Whether a PIN was entered for the transaction',
			},
			{
				displayName: 'Currency Code',
				name: 'currencyCode',
				type: 'string',
				default: 'USD',
				description: 'The ISO 4217 currency code',
			},
			{
				displayName: 'Authorization ID',
				name: 'authorizationId',
				type: 'string',
				default: '',
				description: 'Authorization ID (for reversals and clearing)',
			},
			{
				displayName: 'Partial Approval Allowed',
				name: 'partialApprovalAllowed',
				type: 'boolean',
				default: false,
				description: 'Whether partial approval is allowed for this transaction',
			},
		],
	},

	// ----------------------------------
	//         sandbox:simulateWire
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['simulateWire'],
			},
		},
		description: 'The unique identifier for the account',
	},
	{
		displayName: 'Wire Amount',
		name: 'wireAmount',
		type: 'number',
		required: true,
		default: 0,
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['simulateWire'],
			},
		},
		description: 'Wire amount in cents (e.g., 100000 = $1,000.00)',
	},
	{
		displayName: 'Wire Type',
		name: 'wireType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['simulateWire'],
			},
		},
		options: [
			{
				name: 'Incoming Domestic',
				value: 'INCOMING_DOMESTIC',
				description: 'Simulate an incoming domestic wire',
			},
			{
				name: 'Incoming International',
				value: 'INCOMING_INTERNATIONAL',
				description: 'Simulate an incoming international wire',
			},
			{
				name: 'Settlement',
				value: 'SETTLEMENT',
				description: 'Settle a pending outgoing wire',
			},
			{
				name: 'Rejection',
				value: 'REJECTION',
				description: 'Simulate a wire rejection',
			},
		],
		default: 'INCOMING_DOMESTIC',
		description: 'The type of wire simulation to perform',
	},
	{
		displayName: 'Wire ID',
		name: 'wireId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['simulateWire'],
				wireType: ['SETTLEMENT', 'REJECTION'],
			},
		},
		default: '',
		description: 'The wire transfer ID (required for settlement and rejection simulations)',
	},
	{
		displayName: 'Wire Options',
		name: 'wireOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['simulateWire'],
			},
		},
		options: [
			{
				displayName: 'Originator Name',
				name: 'originatorName',
				type: 'string',
				default: '',
				description: 'Name of the sending party',
			},
			{
				displayName: 'Originator Bank Name',
				name: 'originatorBankName',
				type: 'string',
				default: '',
				description: 'Name of the originating bank',
			},
			{
				displayName: 'Originator Bank Routing Number',
				name: 'originatorBankRouting',
				type: 'string',
				default: '',
				description: 'ABA routing number of originating bank',
			},
			{
				displayName: 'Reference Number',
				name: 'referenceNumber',
				type: 'string',
				default: '',
				description: 'Wire reference number',
			},
			{
				displayName: 'Message',
				name: 'message',
				type: 'string',
				default: '',
				description: 'Wire transfer message or memo',
			},
			{
				displayName: 'Rejection Reason',
				name: 'rejectionReason',
				type: 'string',
				default: '',
				description: 'Reason for rejection (when simulating rejections)',
			},
		],
	},

	// ----------------------------------
	//         sandbox:fundAccount
	// ----------------------------------
	{
		displayName: 'Funding Description',
		name: 'fundingDescription',
		type: 'string',
		default: 'Test funding',
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['fundAccount'],
			},
		},
		description: 'Description for the funding transaction',
	},
	{
		displayName: 'Funding Type',
		name: 'fundingType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['fundAccount'],
			},
		},
		options: [
			{
				name: 'Direct Deposit',
				value: 'DIRECT_DEPOSIT',
			},
			{
				name: 'Wire Transfer',
				value: 'WIRE',
			},
			{
				name: 'ACH Credit',
				value: 'ACH',
			},
			{
				name: 'Check Deposit',
				value: 'CHECK',
			},
			{
				name: 'Internal Transfer',
				value: 'INTERNAL',
			},
		],
		default: 'DIRECT_DEPOSIT',
		description: 'The type of funding to simulate',
	},

	// ----------------------------------
	//         sandbox:clearAuthorization
	// ----------------------------------
	{
		displayName: 'Authorization ID',
		name: 'authorizationId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['clearAuthorization'],
			},
		},
		description: 'The unique identifier for the authorization to clear',
	},
	{
		displayName: 'Settlement Amount',
		name: 'settlementAmount',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['clearAuthorization'],
			},
		},
		description: 'Settlement amount in cents (leave 0 to use original authorization amount)',
	},
	{
		displayName: 'Clear Options',
		name: 'clearOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['clearAuthorization'],
			},
		},
		options: [
			{
				displayName: 'Force Clear',
				name: 'forceClear',
				type: 'boolean',
				default: false,
				description: 'Whether to force clearing even if conditions are not met',
			},
			{
				displayName: 'Settlement Date',
				name: 'settlementDate',
				type: 'dateTime',
				default: '',
				description: 'Date to use for settlement (defaults to now)',
			},
		],
	},
];

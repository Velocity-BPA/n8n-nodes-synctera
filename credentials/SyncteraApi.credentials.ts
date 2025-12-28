/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

/**
 * Synctera API Credentials
 *
 * Synctera is a Banking-as-a-Service (BaaS) platform that enables
 * companies to embed banking services into their products.
 *
 * This credential supports:
 * - Production environment
 * - Sandbox environment
 * - Custom endpoints
 */
export class SyncteraApi implements ICredentialType {
	name = 'syncteraApi';
	displayName = 'Synctera API';
	documentationUrl = 'https://dev.synctera.com/docs';
	properties: INodeProperties[] = [
		{
			displayName: 'Environment',
			name: 'environment',
			type: 'options',
			options: [
				{
					name: 'Production',
					value: 'production',
				},
				{
					name: 'Sandbox',
					value: 'sandbox',
				},
				{
					name: 'Custom',
					value: 'custom',
				},
			],
			default: 'sandbox',
			description: 'The Synctera environment to connect to',
		},
		{
			displayName: 'Custom API URL',
			name: 'customApiUrl',
			type: 'string',
			default: '',
			placeholder: 'https://api.custom.synctera.com',
			description: 'Custom API endpoint URL (only used when Environment is set to Custom)',
			displayOptions: {
				show: {
					environment: ['custom'],
				},
			},
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your Synctera API key. Found in the Synctera Dashboard under API Keys.',
		},
		{
			displayName: 'Webhook Secret',
			name: 'webhookSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Secret used to verify webhook signatures. Found in the Synctera Dashboard under Webhooks.',
		},
		{
			displayName: 'Partner ID',
			name: 'partnerId',
			type: 'string',
			default: '',
			description: 'Your Synctera Partner ID (optional). Used for partner-specific operations.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.environment === "production" ? "https://api.synctera.com/v0" : $credentials.environment === "sandbox" ? "https://api.synctera.com/v0" : $credentials.customApiUrl}}',
			url: '/banks',
			method: 'GET',
		},
	};
}

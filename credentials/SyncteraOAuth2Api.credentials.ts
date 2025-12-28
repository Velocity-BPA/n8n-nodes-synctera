/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

/**
 * Synctera OAuth2 Credentials
 *
 * OAuth2 authentication for Synctera API access.
 * Used for more secure, token-based authentication flows.
 */
export class SyncteraOAuth2Api implements ICredentialType {
	name = 'syncteraOAuth2Api';
	displayName = 'Synctera OAuth2 API';
	extends = ['oAuth2Api'];
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
			],
			default: 'sandbox',
			description: 'The Synctera environment to connect to',
		},
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'clientCredentials',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'string',
			default: 'https://auth.synctera.com/oauth/token',
			required: true,
			description: 'URL to obtain the access token',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
			description: 'OAuth2 Client ID from Synctera Dashboard',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'OAuth2 Client Secret from Synctera Dashboard',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'string',
			default: '',
			description: 'OAuth2 scopes (space-separated)',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'header',
		},
		{
			displayName: 'Webhook Secret',
			name: 'webhookSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			description: 'Secret used to verify webhook signatures',
		},
		{
			displayName: 'Partner ID',
			name: 'partnerId',
			type: 'string',
			default: '',
			description: 'Your Synctera Partner ID (optional)',
		},
	];
}

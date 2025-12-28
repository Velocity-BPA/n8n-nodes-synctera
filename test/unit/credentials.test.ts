/**
 * @file Unit tests for Synctera credentials
 * @copyright 2025 Velocity BPA
 * @license BSL-1.1
 */

import { SyncteraApi } from '../../credentials/SyncteraApi.credentials';
import { SyncteraOAuth2Api } from '../../credentials/SyncteraOAuth2Api.credentials';

describe('SyncteraApi Credentials', () => {
	let credentials: SyncteraApi;

	beforeEach(() => {
		credentials = new SyncteraApi();
	});

	describe('Structure', () => {
		it('should have correct name', () => {
			expect(credentials.name).toBe('syncteraApi');
		});

		it('should have correct display name', () => {
			expect(credentials.displayName).toBe('Synctera API');
		});

		it('should have required properties', () => {
			const props = credentials.properties;
			expect(props).toBeDefined();
			expect(Array.isArray(props)).toBe(true);
		});

		it('should have environment field', () => {
			const envField = credentials.properties.find((p) => p.name === 'environment');
			expect(envField).toBeDefined();
			expect(envField?.type).toBe('options');
		});

		it('should have apiKey field', () => {
			const apiKeyField = credentials.properties.find((p) => p.name === 'apiKey');
			expect(apiKeyField).toBeDefined();
			expect(apiKeyField?.type).toBe('string');
			expect(apiKeyField?.typeOptions?.password).toBe(true);
		});

		it('should have webhookSecret field', () => {
			const secretField = credentials.properties.find((p) => p.name === 'webhookSecret');
			expect(secretField).toBeDefined();
			expect(secretField?.type).toBe('string');
		});

		it('should have partnerId field', () => {
			const partnerField = credentials.properties.find((p) => p.name === 'partnerId');
			expect(partnerField).toBeDefined();
		});
	});

	describe('Environment Options', () => {
		it('should have production environment option', () => {
			const envField = credentials.properties.find((p) => p.name === 'environment');
			const options = envField?.options as Array<{ value: string }>;
			const prodOption = options?.find((o) => o.value === 'production');
			expect(prodOption).toBeDefined();
		});

		it('should have sandbox environment option', () => {
			const envField = credentials.properties.find((p) => p.name === 'environment');
			const options = envField?.options as Array<{ value: string }>;
			const sandboxOption = options?.find((o) => o.value === 'sandbox');
			expect(sandboxOption).toBeDefined();
		});

		it('should have custom environment option', () => {
			const envField = credentials.properties.find((p) => p.name === 'environment');
			const options = envField?.options as Array<{ value: string }>;
			const customOption = options?.find((o) => o.value === 'custom');
			expect(customOption).toBeDefined();
		});
	});

	describe('Custom URL Field', () => {
		it('should have customApiUrl field', () => {
			const customUrlField = credentials.properties.find((p) => p.name === 'customApiUrl');
			expect(customUrlField).toBeDefined();
		});

		it('should show customApiUrl only when environment is custom', () => {
			const customUrlField = credentials.properties.find((p) => p.name === 'customApiUrl');
			expect(customUrlField?.displayOptions?.show?.environment).toContain('custom');
		});
	});
});

describe('SyncteraOAuth2Api Credentials', () => {
	let credentials: SyncteraOAuth2Api;

	beforeEach(() => {
		credentials = new SyncteraOAuth2Api();
	});

	describe('Structure', () => {
		it('should have correct name', () => {
			expect(credentials.name).toBe('syncteraOAuth2Api');
		});

		it('should have correct display name', () => {
			expect(credentials.displayName).toBe('Synctera OAuth2 API');
		});

		it('should extend oAuth2Api', () => {
			expect(credentials.extends).toContain('oAuth2Api');
		});

		it('should have required properties', () => {
			const props = credentials.properties;
			expect(props).toBeDefined();
			expect(Array.isArray(props)).toBe(true);
		});
	});

	describe('OAuth2 Fields', () => {
		it('should have clientId field', () => {
			const clientIdField = credentials.properties.find((p) => p.name === 'clientId');
			expect(clientIdField).toBeDefined();
			expect(clientIdField?.type).toBe('string');
		});

		it('should have clientSecret field', () => {
			const clientSecretField = credentials.properties.find((p) => p.name === 'clientSecret');
			expect(clientSecretField).toBeDefined();
			expect(clientSecretField?.type).toBe('string');
			expect(clientSecretField?.typeOptions?.password).toBe(true);
		});

		it('should have accessTokenUrl field', () => {
			const tokenUrlField = credentials.properties.find((p) => p.name === 'accessTokenUrl');
			expect(tokenUrlField).toBeDefined();
		});

		it('should have scope field', () => {
			const scopeField = credentials.properties.find((p) => p.name === 'scope');
			expect(scopeField).toBeDefined();
		});
	});
});

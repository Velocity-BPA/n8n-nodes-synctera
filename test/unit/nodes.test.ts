/**
 * @file Unit tests for Synctera node
 * @copyright 2025 Velocity BPA
 * @license BSL-1.1
 */

import { Synctera } from '../../nodes/Synctera/Synctera.node';
import { SyncteraTrigger } from '../../nodes/Synctera/SyncteraTrigger.node';

describe('Synctera Node', () => {
	let node: Synctera;

	beforeEach(() => {
		node = new Synctera();
	});

	describe('Node Description', () => {
		it('should have correct name', () => {
			expect(node.description.name).toBe('synctera');
		});

		it('should have correct display name', () => {
			expect(node.description.displayName).toBe('Synctera');
		});

		it('should be in correct group', () => {
			expect(node.description.group).toContain('transform');
		});

		it('should have version 1', () => {
			expect(node.description.version).toBe(1);
		});

		it('should have correct subtitle', () => {
			expect(node.description.subtitle).toBeDefined();
		});

		it('should have icon', () => {
			expect(node.description.icon).toBeDefined();
		});

		it('should have credentials', () => {
			expect(node.description.credentials).toBeDefined();
			expect(Array.isArray(node.description.credentials)).toBe(true);
		});
	});

	describe('Resources', () => {
		const expectedResources = [
			'account',
			'accountTemplate',
			'ach',
			'authorization',
			'bankPartner',
			'business',
			'card',
			'cardProduct',
			'cashOrder',
			'customer',
			'disclosure',
			'document',
			'event',
			'externalAccount',
			'fee',
			'hold',
			'interest',
			'internalTransfer',
			'note',
			'relationship',
			'sandbox',
			'spendControl',
			'statement',
			'transaction',
			'utility',
			'verification',
			'watchlist',
			'webhook',
			'wire',
		];

		it('should have resource property', () => {
			const resourceProp = node.description.properties?.find((p) => p.name === 'resource');
			expect(resourceProp).toBeDefined();
			expect(resourceProp?.type).toBe('options');
		});

		it('should have all expected resources', () => {
			const resourceProp = node.description.properties?.find((p) => p.name === 'resource');
			const options = resourceProp?.options as Array<{ value: string }>;
			const resourceValues = options?.map((o) => o.value) || [];

			expectedResources.forEach((resource) => {
				expect(resourceValues).toContain(resource);
			});
		});

		it('should have 29 resources', () => {
			const resourceProp = node.description.properties?.find((p) => p.name === 'resource');
			const options = resourceProp?.options as Array<{ value: string }>;
			expect(options?.length).toBe(29);
		});
	});

	describe('Credentials', () => {
		it('should support Synctera API credentials', () => {
			const creds = node.description.credentials;
			const apiCred = creds?.find((c) => c.name === 'syncteraApi');
			expect(apiCred).toBeDefined();
		});

		it('should support Synctera OAuth2 credentials', () => {
			const creds = node.description.credentials;
			const oauthCred = creds?.find((c) => c.name === 'syncteraOAuth2Api');
			expect(oauthCred).toBeDefined();
		});
	});

	describe('Default Values', () => {
		it('should have default resource', () => {
			const resourceProp = node.description.properties?.find((p) => p.name === 'resource');
			expect(resourceProp?.default).toBeDefined();
		});
	});
});

describe('SyncteraTrigger Node', () => {
	let node: SyncteraTrigger;

	beforeEach(() => {
		node = new SyncteraTrigger();
	});

	describe('Node Description', () => {
		it('should have correct name', () => {
			expect(node.description.name).toBe('syncteraTrigger');
		});

		it('should have correct display name', () => {
			expect(node.description.displayName).toBe('Synctera Trigger');
		});

		it('should be a trigger node', () => {
			expect(node.description.group).toContain('trigger');
		});

		it('should have version 1', () => {
			expect(node.description.version).toBe(1);
		});

		it('should have icon', () => {
			expect(node.description.icon).toBeDefined();
		});
	});

	describe('Webhook Configuration', () => {
		it('should have webhooks defined', () => {
			expect(node.description.webhooks).toBeDefined();
			expect(Array.isArray(node.description.webhooks)).toBe(true);
		});

		it('should have default webhook', () => {
			const webhooks = node.description.webhooks;
			expect(webhooks?.length).toBeGreaterThan(0);
		});
	});

	describe('Event Types', () => {
		it('should have events property', () => {
			const eventsProp = node.description.properties?.find((p) => p.name === 'events');
			expect(eventsProp).toBeDefined();
			expect(eventsProp?.type).toBe('multiOptions');
		});

		it('should have customer events', () => {
			const eventsProp = node.description.properties?.find((p) => p.name === 'events');
			const options = eventsProp?.options as Array<{ value: string }>;
			const customerEvents = options?.filter((o) => o.value.startsWith('customer.'));
			expect(customerEvents?.length).toBeGreaterThan(0);
		});

		it('should have account events', () => {
			const eventsProp = node.description.properties?.find((p) => p.name === 'events');
			const options = eventsProp?.options as Array<{ value: string }>;
			const accountEvents = options?.filter((o) => o.value.startsWith('account.'));
			expect(accountEvents?.length).toBeGreaterThan(0);
		});

		it('should have transaction events', () => {
			const eventsProp = node.description.properties?.find((p) => p.name === 'events');
			const options = eventsProp?.options as Array<{ value: string }>;
			const txEvents = options?.filter((o) => o.value.startsWith('transaction.'));
			expect(txEvents?.length).toBeGreaterThan(0);
		});
	});

	describe('Options', () => {
		it('should have verifySignature option', () => {
			const optionsProp = node.description.properties?.find((p) => p.name === 'options');
			expect(optionsProp).toBeDefined();
		});
	});
});

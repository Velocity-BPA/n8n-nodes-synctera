/**
 * @file Integration tests for Synctera node
 * @copyright 2025 Velocity BPA
 * @license BSL-1.1
 *
 * These tests verify the node structure and configuration.
 * Full API integration tests require Synctera sandbox credentials.
 */

import * as path from 'path';
import * as fs from 'fs';

describe('Synctera Node Package Integration', () => {
	const projectRoot = path.resolve(__dirname, '../..');
	const nodesDir = path.join(projectRoot, 'nodes', 'Synctera');
	const credentialsDir = path.join(projectRoot, 'credentials');

	describe('Package Structure', () => {
		it('should have package.json', () => {
			const packagePath = path.join(projectRoot, 'package.json');
			expect(fs.existsSync(packagePath)).toBe(true);
		});

		it('should have valid package.json', () => {
			const packagePath = path.join(projectRoot, 'package.json');
			const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

			expect(packageJson.name).toBe('n8n-nodes-synctera');
			expect(packageJson.license).toBe('BUSL-1.1');
			expect(packageJson.n8n).toBeDefined();
		});

		it('should have n8n node configuration', () => {
			const packagePath = path.join(projectRoot, 'package.json');
			const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

			expect(packageJson.n8n.credentials).toBeDefined();
			expect(packageJson.n8n.nodes).toBeDefined();
		});

		it('should have tsconfig.json', () => {
			const tsconfigPath = path.join(projectRoot, 'tsconfig.json');
			expect(fs.existsSync(tsconfigPath)).toBe(true);
		});

		it('should have LICENSE file', () => {
			const licensePath = path.join(projectRoot, 'LICENSE');
			expect(fs.existsSync(licensePath)).toBe(true);
		});

		it('should have README.md', () => {
			const readmePath = path.join(projectRoot, 'README.md');
			expect(fs.existsSync(readmePath)).toBe(true);
		});
	});

	describe('Credentials Files', () => {
		it('should have credentials directory', () => {
			expect(fs.existsSync(credentialsDir)).toBe(true);
		});

		it('should have SyncteraApi.credentials.ts', () => {
			const credPath = path.join(credentialsDir, 'SyncteraApi.credentials.ts');
			expect(fs.existsSync(credPath)).toBe(true);
		});

		it('should have SyncteraOAuth2Api.credentials.ts', () => {
			const credPath = path.join(credentialsDir, 'SyncteraOAuth2Api.credentials.ts');
			expect(fs.existsSync(credPath)).toBe(true);
		});
	});

	describe('Node Files', () => {
		it('should have nodes directory', () => {
			expect(fs.existsSync(nodesDir)).toBe(true);
		});

		it('should have Synctera.node.ts', () => {
			const nodePath = path.join(nodesDir, 'Synctera.node.ts');
			expect(fs.existsSync(nodePath)).toBe(true);
		});

		it('should have SyncteraTrigger.node.ts', () => {
			const nodePath = path.join(nodesDir, 'SyncteraTrigger.node.ts');
			expect(fs.existsSync(nodePath)).toBe(true);
		});
	});

	describe('Action Directories', () => {
		const actionsDir = path.join(nodesDir, 'actions');

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

		it('should have actions directory', () => {
			expect(fs.existsSync(actionsDir)).toBe(true);
		});

		expectedResources.forEach((resource) => {
			it(`should have ${resource} action directory`, () => {
				const resourceDir = path.join(actionsDir, resource);
				expect(fs.existsSync(resourceDir)).toBe(true);
			});

			it(`should have ${resource}/index.ts file`, () => {
				const indexPath = path.join(actionsDir, resource, 'index.ts');
				expect(fs.existsSync(indexPath)).toBe(true);
			});
		});
	});

	describe('Transport Layer', () => {
		const transportDir = path.join(nodesDir, 'transport');

		it('should have transport directory', () => {
			expect(fs.existsSync(transportDir)).toBe(true);
		});

		it('should have index.ts', () => {
			const indexPath = path.join(transportDir, 'index.ts');
			expect(fs.existsSync(indexPath)).toBe(true);
		});
	});

	describe('Constants', () => {
		const constantsDir = path.join(nodesDir, 'constants');

		it('should have constants directory', () => {
			expect(fs.existsSync(constantsDir)).toBe(true);
		});

		const expectedConstants = [
			'endpoints.ts',
			'customerTypes.ts',
			'accountTypes.ts',
			'cardStatuses.ts',
			'eventTypes.ts',
			'transactionTypes.ts',
			'verificationTypes.ts',
		];

		expectedConstants.forEach((file) => {
			it(`should have ${file}`, () => {
				const filePath = path.join(constantsDir, file);
				expect(fs.existsSync(filePath)).toBe(true);
			});
		});
	});

	describe('Utilities', () => {
		const utilsDir = path.join(nodesDir, 'utils');

		it('should have utils directory', () => {
			expect(fs.existsSync(utilsDir)).toBe(true);
		});

		it('should have index.ts', () => {
			const indexPath = path.join(utilsDir, 'index.ts');
			expect(fs.existsSync(indexPath)).toBe(true);
		});
	});

	describe('Licensing Files', () => {
		it('should have COMMERCIAL_LICENSE.md', () => {
			const licensePath = path.join(projectRoot, 'COMMERCIAL_LICENSE.md');
			expect(fs.existsSync(licensePath)).toBe(true);
		});

		it('should have LICENSING_FAQ.md', () => {
			const faqPath = path.join(projectRoot, 'LICENSING_FAQ.md');
			expect(fs.existsSync(faqPath)).toBe(true);
		});
	});

	describe('README Content', () => {
		it('should contain licensing notice', () => {
			const readmePath = path.join(projectRoot, 'README.md');
			const content = fs.readFileSync(readmePath, 'utf8');

			expect(content).toContain('Business Source License 1.1');
			expect(content).toContain('Velocity BPA');
		});

		it('should contain installation instructions', () => {
			const readmePath = path.join(projectRoot, 'README.md');
			const content = fs.readFileSync(readmePath, 'utf8');

			expect(content).toContain('Installation');
			expect(content).toContain('npm');
		});

		it('should contain usage examples', () => {
			const readmePath = path.join(projectRoot, 'README.md');
			const content = fs.readFileSync(readmePath, 'utf8');

			expect(content).toContain('Usage Examples');
		});
	});

	describe('Package.json Content', () => {
		let packageJson: any;

		beforeAll(() => {
			const packagePath = path.join(projectRoot, 'package.json');
			packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
		});

		it('should have correct author', () => {
			expect(packageJson.author.name).toBe('Velocity BPA');
			expect(packageJson.author.email).toBe('licensing@velobpa.com');
		});

		it('should have repository URL', () => {
			expect(packageJson.repository).toBeDefined();
			expect(packageJson.repository.url).toContain('github.com');
		});

		it('should have required keywords', () => {
			expect(packageJson.keywords).toContain('n8n');
			expect(packageJson.keywords).toContain('n8n-community-node-package');
			expect(packageJson.keywords).toContain('synctera');
		});

		it('should have build script', () => {
			expect(packageJson.scripts.build).toBeDefined();
		});

		it('should have test script', () => {
			expect(packageJson.scripts.test).toBeDefined();
		});

		it('should have correct engine requirement', () => {
			expect(packageJson.engines.node).toBeDefined();
		});
	});
});

describe('Synctera API Workflow Tests', () => {
	// These tests outline expected API workflows
	// They serve as documentation and can be expanded with mocks

	describe('Customer Onboarding Workflow', () => {
		it('should outline personal customer creation flow', () => {
			const workflow = [
				{ step: 1, action: 'Create Personal Customer', resource: 'customer', operation: 'createPersonal' },
				{ step: 2, action: 'Verify Customer (KYC)', resource: 'verification', operation: 'create' },
				{ step: 3, action: 'Get Verification Result', resource: 'verification', operation: 'getResult' },
				{ step: 4, action: 'Accept Disclosure', resource: 'disclosure', operation: 'accept' },
				{ step: 5, action: 'Create Account', resource: 'account', operation: 'create' },
			];

			expect(workflow.length).toBe(5);
			expect(workflow[0].operation).toBe('createPersonal');
		});
	});

	describe('ACH Transfer Workflow', () => {
		it('should outline ACH transfer flow', () => {
			const workflow = [
				{ step: 1, action: 'Link External Account', resource: 'externalAccount', operation: 'create' },
				{ step: 2, action: 'Verify External Account', resource: 'externalAccount', operation: 'verify' },
				{ step: 3, action: 'Create ACH Transfer', resource: 'ach', operation: 'create' },
				{ step: 4, action: 'Monitor ACH Status', resource: 'ach', operation: 'get' },
			];

			expect(workflow.length).toBe(4);
			expect(workflow[2].resource).toBe('ach');
		});
	});

	describe('Card Issuance Workflow', () => {
		it('should outline card issuance flow', () => {
			const workflow = [
				{ step: 1, action: 'Get Card Product', resource: 'cardProduct', operation: 'get' },
				{ step: 2, action: 'Create Card', resource: 'card', operation: 'create' },
				{ step: 3, action: 'Activate Card', resource: 'card', operation: 'activate' },
				{ step: 4, action: 'Set Spend Controls', resource: 'spendControl', operation: 'create' },
			];

			expect(workflow.length).toBe(4);
			expect(workflow[2].operation).toBe('activate');
		});
	});

	describe('Compliance Workflow', () => {
		it('should outline watchlist screening flow', () => {
			const workflow = [
				{ step: 1, action: 'Screen Customer', resource: 'watchlist', operation: 'screen' },
				{ step: 2, action: 'Get Screening Result', resource: 'watchlist', operation: 'getResult' },
				{ step: 3, action: 'List Alerts', resource: 'watchlist', operation: 'listAlerts' },
				{ step: 4, action: 'Suppress False Positive', resource: 'watchlist', operation: 'suppress' },
			];

			expect(workflow.length).toBe(4);
			expect(workflow[0].resource).toBe('watchlist');
		});
	});
});

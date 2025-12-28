/**
 * @file Unit tests for Synctera constants
 * @copyright 2025 Velocity BPA
 * @license BSL-1.1
 */

import { SYNCTERA_API_ENDPOINTS, getApiBaseUrl } from '../../nodes/Synctera/constants/endpoints';
import { CUSTOMER_TYPES, CUSTOMER_STATUSES } from '../../nodes/Synctera/constants/customerTypes';
import { ACCOUNT_TYPES, ACCOUNT_STATUSES } from '../../nodes/Synctera/constants/accountTypes';
import { CARD_STATUSES, CARD_TYPES, CARD_FORM_FACTORS } from '../../nodes/Synctera/constants/cardStatuses';
import { SYNCTERA_EVENT_TYPES } from '../../nodes/Synctera/constants/eventTypes';
import { ACH_SEC_CODES, ACH_RETURN_CODES, WIRE_TYPES } from '../../nodes/Synctera/constants/transactionTypes';
import { VERIFICATION_TYPES, VERIFICATION_STATUSES } from '../../nodes/Synctera/constants/verificationTypes';

describe('Endpoints Constants', () => {
	describe('SYNCTERA_API_ENDPOINTS', () => {
		it('should have production endpoint', () => {
			expect(SYNCTERA_API_ENDPOINTS.production).toBeDefined();
			expect(SYNCTERA_API_ENDPOINTS.production).toContain('https://');
		});

		it('should have sandbox endpoint', () => {
			expect(SYNCTERA_API_ENDPOINTS.sandbox).toBeDefined();
			expect(SYNCTERA_API_ENDPOINTS.sandbox).toContain('https://');
		});
	});

	describe('getApiBaseUrl', () => {
		it('should return production URL for production environment', () => {
			const url = getApiBaseUrl('production');
			expect(url).toBe(SYNCTERA_API_ENDPOINTS.production);
		});

		it('should return sandbox URL for sandbox environment', () => {
			const url = getApiBaseUrl('sandbox');
			expect(url).toBe(SYNCTERA_API_ENDPOINTS.sandbox);
		});

		it('should return custom URL for custom environment', () => {
			const customUrl = 'https://custom.synctera.com/v0';
			const url = getApiBaseUrl('custom', customUrl);
			expect(url).toBe(customUrl);
		});

		it('should default to sandbox for unknown environment', () => {
			const url = getApiBaseUrl('unknown' as any);
			expect(url).toBe(SYNCTERA_API_ENDPOINTS.sandbox);
		});
	});
});

describe('Customer Types Constants', () => {
	describe('CUSTOMER_TYPES', () => {
		it('should have PERSONAL type', () => {
			expect(CUSTOMER_TYPES.PERSONAL).toBeDefined();
		});

		it('should have BUSINESS type', () => {
			expect(CUSTOMER_TYPES.BUSINESS).toBeDefined();
		});
	});

	describe('CUSTOMER_STATUSES', () => {
		it('should have ACTIVE status', () => {
			expect(CUSTOMER_STATUSES.ACTIVE).toBeDefined();
		});

		it('should have PENDING status', () => {
			expect(CUSTOMER_STATUSES.PENDING).toBeDefined();
		});

		it('should have FROZEN status', () => {
			expect(CUSTOMER_STATUSES.FROZEN).toBeDefined();
		});

		it('should have DECEASED status', () => {
			expect(CUSTOMER_STATUSES.DECEASED).toBeDefined();
		});
	});
});

describe('Account Types Constants', () => {
	describe('ACCOUNT_TYPES', () => {
		it('should have CHECKING type', () => {
			expect(ACCOUNT_TYPES.CHECKING).toBeDefined();
		});

		it('should have SAVINGS type', () => {
			expect(ACCOUNT_TYPES.SAVINGS).toBeDefined();
		});

		it('should have MONEY_MARKET type', () => {
			expect(ACCOUNT_TYPES.MONEY_MARKET).toBeDefined();
		});
	});

	describe('ACCOUNT_STATUSES', () => {
		it('should have ACTIVE status', () => {
			expect(ACCOUNT_STATUSES.ACTIVE).toBeDefined();
		});

		it('should have FROZEN status', () => {
			expect(ACCOUNT_STATUSES.FROZEN).toBeDefined();
		});

		it('should have CLOSED status', () => {
			expect(ACCOUNT_STATUSES.CLOSED).toBeDefined();
		});
	});
});

describe('Card Constants', () => {
	describe('CARD_STATUSES', () => {
		it('should have ACTIVE status', () => {
			expect(CARD_STATUSES.ACTIVE).toBeDefined();
		});

		it('should have SUSPENDED status', () => {
			expect(CARD_STATUSES.SUSPENDED).toBeDefined();
		});

		it('should have TERMINATED status', () => {
			expect(CARD_STATUSES.TERMINATED).toBeDefined();
		});

		it('should have INACTIVE status', () => {
			expect(CARD_STATUSES.INACTIVE).toBeDefined();
		});
	});

	describe('CARD_TYPES', () => {
		it('should have DEBIT type', () => {
			expect(CARD_TYPES.DEBIT).toBeDefined();
		});

		it('should have PREPAID type', () => {
			expect(CARD_TYPES.PREPAID).toBeDefined();
		});
	});

	describe('CARD_FORM_FACTORS', () => {
		it('should have PHYSICAL form factor', () => {
			expect(CARD_FORM_FACTORS.PHYSICAL).toBeDefined();
		});

		it('should have VIRTUAL form factor', () => {
			expect(CARD_FORM_FACTORS.VIRTUAL).toBeDefined();
		});
	});
});

describe('Event Types Constants', () => {
	describe('SYNCTERA_EVENT_TYPES', () => {
		it('should have customer events', () => {
			expect(SYNCTERA_EVENT_TYPES.CUSTOMER).toBeDefined();
			expect(SYNCTERA_EVENT_TYPES.CUSTOMER.CREATED).toBeDefined();
			expect(SYNCTERA_EVENT_TYPES.CUSTOMER.UPDATED).toBeDefined();
		});

		it('should have account events', () => {
			expect(SYNCTERA_EVENT_TYPES.ACCOUNT).toBeDefined();
			expect(SYNCTERA_EVENT_TYPES.ACCOUNT.CREATED).toBeDefined();
			expect(SYNCTERA_EVENT_TYPES.ACCOUNT.CLOSED).toBeDefined();
		});

		it('should have transaction events', () => {
			expect(SYNCTERA_EVENT_TYPES.TRANSACTION).toBeDefined();
			expect(SYNCTERA_EVENT_TYPES.TRANSACTION.CREATED).toBeDefined();
			expect(SYNCTERA_EVENT_TYPES.TRANSACTION.POSTED).toBeDefined();
		});

		it('should have ACH events', () => {
			expect(SYNCTERA_EVENT_TYPES.ACH).toBeDefined();
			expect(SYNCTERA_EVENT_TYPES.ACH.ORIGINATED).toBeDefined();
			expect(SYNCTERA_EVENT_TYPES.ACH.RETURNED).toBeDefined();
		});

		it('should have card events', () => {
			expect(SYNCTERA_EVENT_TYPES.CARD).toBeDefined();
			expect(SYNCTERA_EVENT_TYPES.CARD.CREATED).toBeDefined();
			expect(SYNCTERA_EVENT_TYPES.CARD.ACTIVATED).toBeDefined();
		});
	});
});

describe('Transaction Types Constants', () => {
	describe('ACH_SEC_CODES', () => {
		it('should have PPD code', () => {
			expect(ACH_SEC_CODES.PPD).toBeDefined();
		});

		it('should have CCD code', () => {
			expect(ACH_SEC_CODES.CCD).toBeDefined();
		});

		it('should have WEB code', () => {
			expect(ACH_SEC_CODES.WEB).toBeDefined();
		});

		it('should have TEL code', () => {
			expect(ACH_SEC_CODES.TEL).toBeDefined();
		});
	});

	describe('ACH_RETURN_CODES', () => {
		it('should have R01 code', () => {
			expect(ACH_RETURN_CODES.R01).toBeDefined();
		});

		it('should have R02 code', () => {
			expect(ACH_RETURN_CODES.R02).toBeDefined();
		});

		it('should have R03 code', () => {
			expect(ACH_RETURN_CODES.R03).toBeDefined();
		});
	});

	describe('WIRE_TYPES', () => {
		it('should have DOMESTIC type', () => {
			expect(WIRE_TYPES.DOMESTIC).toBeDefined();
		});

		it('should have INTERNATIONAL type', () => {
			expect(WIRE_TYPES.INTERNATIONAL).toBeDefined();
		});
	});
});

describe('Verification Types Constants', () => {
	describe('VERIFICATION_TYPES', () => {
		it('should have KYC type', () => {
			expect(VERIFICATION_TYPES.KYC).toBeDefined();
		});

		it('should have KYB type', () => {
			expect(VERIFICATION_TYPES.KYB).toBeDefined();
		});

		it('should have ID_VERIFICATION type', () => {
			expect(VERIFICATION_TYPES.ID_VERIFICATION).toBeDefined();
		});
	});

	describe('VERIFICATION_STATUSES', () => {
		it('should have PENDING status', () => {
			expect(VERIFICATION_STATUSES.PENDING).toBeDefined();
		});

		it('should have PASSED status', () => {
			expect(VERIFICATION_STATUSES.PASSED).toBeDefined();
		});

		it('should have FAILED status', () => {
			expect(VERIFICATION_STATUSES.FAILED).toBeDefined();
		});
	});
});

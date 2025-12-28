/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

/**
 * Synctera Customer Types and Statuses
 *
 * Defines customer-related enums and types for the Synctera BaaS platform.
 */

export const CUSTOMER_TYPES = {
	personal: 'PERSONAL',
	business: 'BUSINESS',
} as const;

export const CUSTOMER_STATUSES = {
	active: 'ACTIVE',
	inactive: 'INACTIVE',
	prospect: 'PROSPECT',
	frozen: 'FROZEN',
	sanctioned: 'SANCTIONED',
	deceased: 'DECEASED',
} as const;

export const CUSTOMER_KYC_STATUSES = {
	accepted: 'ACCEPTED',
	rejected: 'REJECTED',
	review: 'REVIEW',
	pending: 'PENDING',
	provider_failure: 'PROVIDER_FAILURE',
} as const;

export const BUSINESS_TYPES = {
	corporation: 'CORPORATION',
	llc: 'LLC',
	partnership: 'PARTNERSHIP',
	sole_proprietorship: 'SOLE_PROPRIETORSHIP',
	non_profit: 'NON_PROFIT',
	government_entity: 'GOVERNMENT_ENTITY',
	trust: 'TRUST',
	other: 'OTHER',
} as const;

export const BUSINESS_VERIFICATION_STATUSES = {
	accepted: 'ACCEPTED',
	rejected: 'REJECTED',
	review: 'REVIEW',
	pending: 'PENDING',
} as const;

export const ID_DOCUMENT_TYPES = {
	drivers_license: 'DRIVERS_LICENSE',
	passport: 'PASSPORT',
	state_id: 'STATE_ID',
	military_id: 'MILITARY_ID',
	green_card: 'GREEN_CARD',
	work_permit: 'WORK_PERMIT',
} as const;

export const RELATIONSHIP_TYPES = {
	authorized_user: 'AUTHORIZED_USER',
	beneficial_owner: 'BENEFICIAL_OWNER',
	control_person: 'CONTROL_PERSON',
	guarantor: 'GUARANTOR',
	joint_owner: 'JOINT_OWNER',
	power_of_attorney: 'POWER_OF_ATTORNEY',
	primary_owner: 'PRIMARY_OWNER',
	signatory: 'SIGNATORY',
} as const;

export const GENDER_OPTIONS = {
	male: 'MALE',
	female: 'FEMALE',
	other: 'OTHER',
	not_specified: 'NOT_SPECIFIED',
} as const;

export type CustomerType = typeof CUSTOMER_TYPES[keyof typeof CUSTOMER_TYPES];
export type CustomerStatus = typeof CUSTOMER_STATUSES[keyof typeof CUSTOMER_STATUSES];
export type CustomerKycStatus = typeof CUSTOMER_KYC_STATUSES[keyof typeof CUSTOMER_KYC_STATUSES];
export type BusinessType = typeof BUSINESS_TYPES[keyof typeof BUSINESS_TYPES];
export type BusinessVerificationStatus = typeof BUSINESS_VERIFICATION_STATUSES[keyof typeof BUSINESS_VERIFICATION_STATUSES];
export type IdDocumentType = typeof ID_DOCUMENT_TYPES[keyof typeof ID_DOCUMENT_TYPES];
export type RelationshipType = typeof RELATIONSHIP_TYPES[keyof typeof RELATIONSHIP_TYPES];
export type GenderOption = typeof GENDER_OPTIONS[keyof typeof GENDER_OPTIONS];

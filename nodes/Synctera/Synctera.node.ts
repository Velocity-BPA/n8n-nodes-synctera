/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	IHttpRequestMethods,
} from 'n8n-workflow';

import { syncteraApiRequest, syncteraApiRequestAllItems } from './transport/syncteraClient';

// Import all resource operations and fields
import { customerOperations, customerFields } from './actions/customer';
import { businessOperations, businessFields } from './actions/business';
import { accountOperations, accountFields } from './actions/account';
import { accountTemplateOperations, accountTemplateFields } from './actions/accountTemplate';
import { achOperations, achFields } from './actions/ach';
import { wireOperations, wireFields } from './actions/wire';
import { internalTransferOperations, internalTransferFields } from './actions/internalTransfer';
import { externalAccountOperations, externalAccountFields } from './actions/externalAccount';
import { cardOperations, cardFields } from './actions/card';
import { cardProductOperations, cardProductFields } from './actions/cardProduct';
import { transactionOperations, transactionFields } from './actions/transaction';
import { authorizationOperations, authorizationFields } from './actions/authorization';
import { statementOperations, statementFields } from './actions/statement';
import { disclosureOperations, disclosureFields } from './actions/disclosure';
import { documentOperations, documentFields } from './actions/document';
import { verificationOperations, verificationFields } from './actions/verification';
import { watchlistOperations, watchlistFields } from './actions/watchlist';
import { spendControlOperations, spendControlFields } from './actions/spendControl';
import { relationshipOperations, relationshipFields } from './actions/relationship';
import { webhookOperations, webhookFields } from './actions/webhook';
import { eventOperations, eventFields } from './actions/event';
import { noteOperations, noteFields } from './actions/note';
import { cashOrderOperations, cashOrderFields } from './actions/cashOrder';
import { interestOperations, interestFields } from './actions/interest';
import { feeOperations, feeFields } from './actions/fee';
import { holdOperations, holdFields } from './actions/hold';
import { bankPartnerOperations, bankPartnerFields } from './actions/bankPartner';
import { sandboxOperations, sandboxFields } from './actions/sandbox';
import { utilityOperations, utilityFields } from './actions/utility';

// Log licensing notice once on load
console.warn(`
[Velocity BPA Licensing Notice]

This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).

Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.

For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.
`);

export class Synctera implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Synctera',
		name: 'synctera',
		icon: 'file:synctera.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Synctera Banking-as-a-Service API',
		defaults: {
			name: 'Synctera',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'syncteraApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Account', value: 'account' },
					{ name: 'Account Template', value: 'accountTemplate' },
					{ name: 'ACH', value: 'ach' },
					{ name: 'Authorization', value: 'authorization' },
					{ name: 'Bank Partner', value: 'bankPartner' },
					{ name: 'Business', value: 'business' },
					{ name: 'Card', value: 'card' },
					{ name: 'Card Product', value: 'cardProduct' },
					{ name: 'Cash Order', value: 'cashOrder' },
					{ name: 'Customer', value: 'customer' },
					{ name: 'Disclosure', value: 'disclosure' },
					{ name: 'Document', value: 'document' },
					{ name: 'Event', value: 'event' },
					{ name: 'External Account', value: 'externalAccount' },
					{ name: 'Fee', value: 'fee' },
					{ name: 'Hold', value: 'hold' },
					{ name: 'Interest', value: 'interest' },
					{ name: 'Internal Transfer', value: 'internalTransfer' },
					{ name: 'Note', value: 'note' },
					{ name: 'Relationship', value: 'relationship' },
					{ name: 'Sandbox', value: 'sandbox' },
					{ name: 'Spend Control', value: 'spendControl' },
					{ name: 'Statement', value: 'statement' },
					{ name: 'Transaction', value: 'transaction' },
					{ name: 'Utility', value: 'utility' },
					{ name: 'Verification', value: 'verification' },
					{ name: 'Watchlist', value: 'watchlist' },
					{ name: 'Webhook', value: 'webhook' },
					{ name: 'Wire', value: 'wire' },
				],
				default: 'customer',
			},
			// Operations
			...customerOperations,
			...businessOperations,
			...accountOperations,
			...accountTemplateOperations,
			...achOperations,
			...wireOperations,
			...internalTransferOperations,
			...externalAccountOperations,
			...cardOperations,
			...cardProductOperations,
			...transactionOperations,
			...authorizationOperations,
			...statementOperations,
			...disclosureOperations,
			...documentOperations,
			...verificationOperations,
			...watchlistOperations,
			...spendControlOperations,
			...relationshipOperations,
			...webhookOperations,
			...eventOperations,
			...noteOperations,
			...cashOrderOperations,
			...interestOperations,
			...feeOperations,
			...holdOperations,
			...bankPartnerOperations,
			...sandboxOperations,
			...utilityOperations,
			// Fields
			...customerFields,
			...businessFields,
			...accountFields,
			...accountTemplateFields,
			...achFields,
			...wireFields,
			...internalTransferFields,
			...externalAccountFields,
			...cardFields,
			...cardProductFields,
			...transactionFields,
			...authorizationFields,
			...statementFields,
			...disclosureFields,
			...documentFields,
			...verificationFields,
			...watchlistFields,
			...spendControlFields,
			...relationshipFields,
			...webhookFields,
			...eventFields,
			...noteFields,
			...cashOrderFields,
			...interestFields,
			...feeFields,
			...holdFields,
			...bankPartnerFields,
			...sandboxFields,
			...utilityFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] = {};

				// Customer operations
				if (resource === 'customer') {
					responseData = await executeCustomerOperation.call(this, operation, i);
				}
				// Business operations
				else if (resource === 'business') {
					responseData = await executeBusinessOperation.call(this, operation, i);
				}
				// Account operations
				else if (resource === 'account') {
					responseData = await executeAccountOperation.call(this, operation, i);
				}
				// Account Template operations
				else if (resource === 'accountTemplate') {
					responseData = await executeAccountTemplateOperation.call(this, operation, i);
				}
				// ACH operations
				else if (resource === 'ach') {
					responseData = await executeAchOperation.call(this, operation, i);
				}
				// Wire operations
				else if (resource === 'wire') {
					responseData = await executeWireOperation.call(this, operation, i);
				}
				// Internal Transfer operations
				else if (resource === 'internalTransfer') {
					responseData = await executeInternalTransferOperation.call(this, operation, i);
				}
				// External Account operations
				else if (resource === 'externalAccount') {
					responseData = await executeExternalAccountOperation.call(this, operation, i);
				}
				// Card operations
				else if (resource === 'card') {
					responseData = await executeCardOperation.call(this, operation, i);
				}
				// Card Product operations
				else if (resource === 'cardProduct') {
					responseData = await executeCardProductOperation.call(this, operation, i);
				}
				// Transaction operations
				else if (resource === 'transaction') {
					responseData = await executeTransactionOperation.call(this, operation, i);
				}
				// Authorization operations
				else if (resource === 'authorization') {
					responseData = await executeAuthorizationOperation.call(this, operation, i);
				}
				// Statement operations
				else if (resource === 'statement') {
					responseData = await executeStatementOperation.call(this, operation, i);
				}
				// Disclosure operations
				else if (resource === 'disclosure') {
					responseData = await executeDisclosureOperation.call(this, operation, i);
				}
				// Document operations
				else if (resource === 'document') {
					responseData = await executeDocumentOperation.call(this, operation, i);
				}
				// Verification operations
				else if (resource === 'verification') {
					responseData = await executeVerificationOperation.call(this, operation, i);
				}
				// Watchlist operations
				else if (resource === 'watchlist') {
					responseData = await executeWatchlistOperation.call(this, operation, i);
				}
				// Spend Control operations
				else if (resource === 'spendControl') {
					responseData = await executeSpendControlOperation.call(this, operation, i);
				}
				// Relationship operations
				else if (resource === 'relationship') {
					responseData = await executeRelationshipOperation.call(this, operation, i);
				}
				// Webhook operations
				else if (resource === 'webhook') {
					responseData = await executeWebhookOperation.call(this, operation, i);
				}
				// Event operations
				else if (resource === 'event') {
					responseData = await executeEventOperation.call(this, operation, i);
				}
				// Note operations
				else if (resource === 'note') {
					responseData = await executeNoteOperation.call(this, operation, i);
				}
				// Cash Order operations
				else if (resource === 'cashOrder') {
					responseData = await executeCashOrderOperation.call(this, operation, i);
				}
				// Interest operations
				else if (resource === 'interest') {
					responseData = await executeInterestOperation.call(this, operation, i);
				}
				// Fee operations
				else if (resource === 'fee') {
					responseData = await executeFeeOperation.call(this, operation, i);
				}
				// Hold operations
				else if (resource === 'hold') {
					responseData = await executeHoldOperation.call(this, operation, i);
				}
				// Bank Partner operations
				else if (resource === 'bankPartner') {
					responseData = await executeBankPartnerOperation.call(this, operation, i);
				}
				// Sandbox operations
				else if (resource === 'sandbox') {
					responseData = await executeSandboxOperation.call(this, operation, i);
				}
				// Utility operations
				else if (resource === 'utility') {
					responseData = await executeUtilityOperation.call(this, operation, i);
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

// Customer operation executor
async function executeCustomerOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'createPersonal') {
		method = 'POST';
		endpoint = '/persons';
		body = {
			first_name: this.getNodeParameter('firstName', i) as string,
			last_name: this.getNodeParameter('lastName', i) as string,
			email: this.getNodeParameter('email', i) as string,
			status: this.getNodeParameter('status', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'createBusiness') {
		method = 'POST';
		endpoint = '/businesses';
		body = {
			legal_name: this.getNodeParameter('legalName', i) as string,
			entity_type: this.getNodeParameter('entityType', i) as string,
			status: this.getNodeParameter('status', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const customerId = this.getNodeParameter('customerId', i) as string;
		const customerType = this.getNodeParameter('customerType', i) as string;
		endpoint = customerType === 'personal' ? `/persons/${customerId}` : `/businesses/${customerId}`;
	} else if (operation === 'update') {
		method = 'PATCH';
		const customerId = this.getNodeParameter('customerId', i) as string;
		const customerType = this.getNodeParameter('customerType', i) as string;
		endpoint = customerType === 'personal' ? `/persons/${customerId}` : `/businesses/${customerId}`;
		body = this.getNodeParameter('updateFields', i) as IDataObject;
	} else if (operation === 'delete') {
		method = 'DELETE';
		const customerId = this.getNodeParameter('customerId', i) as string;
		const customerType = this.getNodeParameter('customerType', i) as string;
		endpoint = customerType === 'personal' ? `/persons/${customerId}` : `/businesses/${customerId}`;
	} else if (operation === 'list') {
		const customerType = this.getNodeParameter('customerType', i) as string;
		endpoint = customerType === 'personal' ? '/persons' : '/businesses';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'verify') {
		method = 'POST';
		const customerId = this.getNodeParameter('customerId', i) as string;
		endpoint = `/persons/${customerId}/verify`;
		body = this.getNodeParameter('verificationData', i) as IDataObject;
	} else if (operation === 'getStatus') {
		const customerId = this.getNodeParameter('customerId', i) as string;
		const customerType = this.getNodeParameter('customerType', i) as string;
		endpoint = customerType === 'personal' 
			? `/persons/${customerId}/status` 
			: `/businesses/${customerId}/status`;
	} else if (operation === 'getAccounts') {
		const customerId = this.getNodeParameter('customerId', i) as string;
		endpoint = `/accounts`;
		qs.customer_id = customerId;
	} else if (operation === 'getCards') {
		const customerId = this.getNodeParameter('customerId', i) as string;
		endpoint = `/cards`;
		qs.customer_id = customerId;
	} else if (operation === 'getRelationships') {
		const customerId = this.getNodeParameter('customerId', i) as string;
		endpoint = `/relationships`;
		qs.from_person_id = customerId;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Business operation executor
async function executeBusinessOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/businesses';
		body = {
			legal_name: this.getNodeParameter('legalName', i) as string,
			entity_type: this.getNodeParameter('entityType', i) as string,
			status: this.getNodeParameter('status', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const businessId = this.getNodeParameter('businessId', i) as string;
		endpoint = `/businesses/${businessId}`;
	} else if (operation === 'update') {
		method = 'PATCH';
		const businessId = this.getNodeParameter('businessId', i) as string;
		endpoint = `/businesses/${businessId}`;
		body = this.getNodeParameter('updateFields', i) as IDataObject;
	} else if (operation === 'list') {
		endpoint = '/businesses';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'addOwner') {
		method = 'POST';
		const businessId = this.getNodeParameter('businessId', i) as string;
		endpoint = `/businesses/${businessId}/owners`;
		body = this.getNodeParameter('ownerData', i) as IDataObject;
	} else if (operation === 'removeOwner') {
		method = 'DELETE';
		const businessId = this.getNodeParameter('businessId', i) as string;
		const ownerId = this.getNodeParameter('ownerId', i) as string;
		endpoint = `/businesses/${businessId}/owners/${ownerId}`;
	} else if (operation === 'getOwners') {
		const businessId = this.getNodeParameter('businessId', i) as string;
		endpoint = `/businesses/${businessId}/owners`;
	} else if (operation === 'getVerification') {
		const businessId = this.getNodeParameter('businessId', i) as string;
		endpoint = `/businesses/${businessId}/verifications`;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Account operation executor
async function executeAccountOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/accounts';
		body = {
			account_template_id: this.getNodeParameter('accountTemplateId', i) as string,
			customer_id: this.getNodeParameter('customerId', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const accountId = this.getNodeParameter('accountId', i) as string;
		endpoint = `/accounts/${accountId}`;
	} else if (operation === 'update') {
		method = 'PATCH';
		const accountId = this.getNodeParameter('accountId', i) as string;
		endpoint = `/accounts/${accountId}`;
		body = this.getNodeParameter('updateFields', i) as IDataObject;
	} else if (operation === 'list') {
		endpoint = '/accounts';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'close') {
		method = 'POST';
		const accountId = this.getNodeParameter('accountId', i) as string;
		endpoint = `/accounts/${accountId}/close`;
		const closeReason = this.getNodeParameter('closeReason', i) as string;
		body = { close_reason: closeReason };
	} else if (operation === 'freeze') {
		method = 'POST';
		const accountId = this.getNodeParameter('accountId', i) as string;
		endpoint = `/accounts/${accountId}/freeze`;
		const freezeReason = this.getNodeParameter('freezeReason', i) as string;
		body = { freeze_reason: freezeReason };
	} else if (operation === 'unfreeze') {
		method = 'POST';
		const accountId = this.getNodeParameter('accountId', i) as string;
		endpoint = `/accounts/${accountId}/unfreeze`;
	} else if (operation === 'getBalance') {
		const accountId = this.getNodeParameter('accountId', i) as string;
		endpoint = `/accounts/${accountId}/balance`;
	} else if (operation === 'getAccountNumber') {
		const accountId = this.getNodeParameter('accountId', i) as string;
		endpoint = `/accounts/${accountId}/account_number`;
	} else if (operation === 'getRoutingNumber') {
		const accountId = this.getNodeParameter('accountId', i) as string;
		endpoint = `/accounts/${accountId}/routing_number`;
	} else if (operation === 'getTransactions') {
		const accountId = this.getNodeParameter('accountId', i) as string;
		endpoint = `/transactions`;
		qs.account_id = accountId;
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'getStatement') {
		const accountId = this.getNodeParameter('accountId', i) as string;
		const statementId = this.getNodeParameter('statementId', i) as string;
		endpoint = `/accounts/${accountId}/statements/${statementId}`;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Account Template operation executor
async function executeAccountTemplateOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/account_templates';
		body = {
			name: this.getNodeParameter('name', i) as string,
			account_type: this.getNodeParameter('accountType', i) as string,
			bank_country: this.getNodeParameter('bankCountry', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const templateId = this.getNodeParameter('templateId', i) as string;
		endpoint = `/account_templates/${templateId}`;
	} else if (operation === 'list') {
		endpoint = '/account_templates';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'update') {
		method = 'PATCH';
		const templateId = this.getNodeParameter('templateId', i) as string;
		endpoint = `/account_templates/${templateId}`;
		body = this.getNodeParameter('updateFields', i) as IDataObject;
	} else if (operation === 'delete') {
		method = 'DELETE';
		const templateId = this.getNodeParameter('templateId', i) as string;
		endpoint = `/account_templates/${templateId}`;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// ACH operation executor
async function executeAchOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/ach';
		body = {
			amount: this.getNodeParameter('amount', i) as number,
			currency: this.getNodeParameter('currency', i) as string,
			originating_account_id: this.getNodeParameter('originatingAccountId', i) as string,
			receiving_account_id: this.getNodeParameter('receivingAccountId', i) as string,
			dc_sign: this.getNodeParameter('dcSign', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const achId = this.getNodeParameter('achId', i) as string;
		endpoint = `/ach/${achId}`;
	} else if (operation === 'list') {
		endpoint = '/ach';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'cancel') {
		method = 'POST';
		const achId = this.getNodeParameter('achId', i) as string;
		endpoint = `/ach/${achId}/cancel`;
	} else if (operation === 'getReturn') {
		const achId = this.getNodeParameter('achId', i) as string;
		endpoint = `/ach/${achId}/return`;
	} else if (operation === 'getNOC') {
		const achId = this.getNodeParameter('achId', i) as string;
		endpoint = `/ach/${achId}/noc`;
	} else if (operation === 'handleReturn') {
		method = 'POST';
		const achId = this.getNodeParameter('achId', i) as string;
		endpoint = `/ach/${achId}/handle_return`;
		body = this.getNodeParameter('returnData', i) as IDataObject;
	} else if (operation === 'getAddenda') {
		const achId = this.getNodeParameter('achId', i) as string;
		endpoint = `/ach/${achId}/addenda`;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Wire operation executor
async function executeWireOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'createDomestic') {
		method = 'POST';
		endpoint = '/wires';
		body = {
			amount: this.getNodeParameter('amount', i) as number,
			currency: this.getNodeParameter('currency', i) as string,
			originating_account_id: this.getNodeParameter('originatingAccountId', i) as string,
			receiving_account_id: this.getNodeParameter('receivingAccountId', i) as string,
			wire_type: 'DOMESTIC',
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'createInternational') {
		method = 'POST';
		endpoint = '/wires';
		body = {
			amount: this.getNodeParameter('amount', i) as number,
			currency: this.getNodeParameter('currency', i) as string,
			originating_account_id: this.getNodeParameter('originatingAccountId', i) as string,
			wire_type: 'INTERNATIONAL',
		};
		const internationalFields = this.getNodeParameter('internationalFields', i) as IDataObject;
		Object.assign(body, internationalFields);
	} else if (operation === 'get') {
		const wireId = this.getNodeParameter('wireId', i) as string;
		endpoint = `/wires/${wireId}`;
	} else if (operation === 'list') {
		endpoint = '/wires';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'cancel') {
		method = 'POST';
		const wireId = this.getNodeParameter('wireId', i) as string;
		endpoint = `/wires/${wireId}/cancel`;
	} else if (operation === 'getFees') {
		const wireId = this.getNodeParameter('wireId', i) as string;
		endpoint = `/wires/${wireId}/fees`;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Internal Transfer operation executor
async function executeInternalTransferOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/internal_transfers';
		body = {
			amount: this.getNodeParameter('amount', i) as number,
			currency: this.getNodeParameter('currency', i) as string,
			originating_account_id: this.getNodeParameter('originatingAccountId', i) as string,
			receiving_account_id: this.getNodeParameter('receivingAccountId', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const transferId = this.getNodeParameter('transferId', i) as string;
		endpoint = `/internal_transfers/${transferId}`;
	} else if (operation === 'list') {
		endpoint = '/internal_transfers';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'getStatus') {
		const transferId = this.getNodeParameter('transferId', i) as string;
		endpoint = `/internal_transfers/${transferId}/status`;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// External Account operation executor
async function executeExternalAccountOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/external_accounts';
		body = {
			account_number: this.getNodeParameter('accountNumber', i) as string,
			routing_number: this.getNodeParameter('routingNumber', i) as string,
			account_type: this.getNodeParameter('accountType', i) as string,
			customer_id: this.getNodeParameter('customerId', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const externalAccountId = this.getNodeParameter('externalAccountId', i) as string;
		endpoint = `/external_accounts/${externalAccountId}`;
	} else if (operation === 'update') {
		method = 'PATCH';
		const externalAccountId = this.getNodeParameter('externalAccountId', i) as string;
		endpoint = `/external_accounts/${externalAccountId}`;
		body = this.getNodeParameter('updateFields', i) as IDataObject;
	} else if (operation === 'delete') {
		method = 'DELETE';
		const externalAccountId = this.getNodeParameter('externalAccountId', i) as string;
		endpoint = `/external_accounts/${externalAccountId}`;
	} else if (operation === 'list') {
		endpoint = '/external_accounts';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'verify') {
		method = 'POST';
		const externalAccountId = this.getNodeParameter('externalAccountId', i) as string;
		endpoint = `/external_accounts/${externalAccountId}/verify`;
		body = this.getNodeParameter('verificationData', i) as IDataObject;
	} else if (operation === 'getVerificationStatus') {
		const externalAccountId = this.getNodeParameter('externalAccountId', i) as string;
		endpoint = `/external_accounts/${externalAccountId}/verification`;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Card operation executor
async function executeCardOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/cards';
		body = {
			card_product_id: this.getNodeParameter('cardProductId', i) as string,
			account_id: this.getNodeParameter('accountId', i) as string,
			customer_id: this.getNodeParameter('customerId', i) as string,
			type: this.getNodeParameter('cardType', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const cardId = this.getNodeParameter('cardId', i) as string;
		endpoint = `/cards/${cardId}`;
	} else if (operation === 'list') {
		endpoint = '/cards';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'activate') {
		method = 'POST';
		const cardId = this.getNodeParameter('cardId', i) as string;
		endpoint = `/cards/${cardId}/activate`;
	} else if (operation === 'suspend') {
		method = 'POST';
		const cardId = this.getNodeParameter('cardId', i) as string;
		endpoint = `/cards/${cardId}/suspend`;
		const suspendReason = this.getNodeParameter('suspendReason', i) as string;
		body = { reason: suspendReason };
	} else if (operation === 'unsuspend') {
		method = 'POST';
		const cardId = this.getNodeParameter('cardId', i) as string;
		endpoint = `/cards/${cardId}/unsuspend`;
	} else if (operation === 'terminate') {
		method = 'POST';
		const cardId = this.getNodeParameter('cardId', i) as string;
		endpoint = `/cards/${cardId}/terminate`;
		const terminateReason = this.getNodeParameter('terminateReason', i) as string;
		body = { reason: terminateReason };
	} else if (operation === 'reissue') {
		method = 'POST';
		const cardId = this.getNodeParameter('cardId', i) as string;
		endpoint = `/cards/${cardId}/reissue`;
		const reissueOptions = this.getNodeParameter('reissueOptions', i) as IDataObject;
		Object.assign(body, reissueOptions);
	} else if (operation === 'getToken') {
		method = 'POST';
		const cardId = this.getNodeParameter('cardId', i) as string;
		endpoint = `/cards/${cardId}/token`;
	} else if (operation === 'getImage') {
		const cardId = this.getNodeParameter('cardId', i) as string;
		endpoint = `/cards/${cardId}/image`;
	} else if (operation === 'updatePin') {
		method = 'POST';
		const cardId = this.getNodeParameter('cardId', i) as string;
		endpoint = `/cards/${cardId}/pin`;
		body = { pin: this.getNodeParameter('pin', i) as string };
	} else if (operation === 'getLimits') {
		const cardId = this.getNodeParameter('cardId', i) as string;
		endpoint = `/cards/${cardId}/limits`;
	} else if (operation === 'updateLimits') {
		method = 'PATCH';
		const cardId = this.getNodeParameter('cardId', i) as string;
		endpoint = `/cards/${cardId}/limits`;
		body = this.getNodeParameter('limitsData', i) as IDataObject;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Card Product operation executor
async function executeCardProductOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/card_products';
		body = {
			name: this.getNodeParameter('name', i) as string,
			card_brand: this.getNodeParameter('cardBrand', i) as string,
			card_category: this.getNodeParameter('cardCategory', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const cardProductId = this.getNodeParameter('cardProductId', i) as string;
		endpoint = `/card_products/${cardProductId}`;
	} else if (operation === 'list') {
		endpoint = '/card_products';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'update') {
		method = 'PATCH';
		const cardProductId = this.getNodeParameter('cardProductId', i) as string;
		endpoint = `/card_products/${cardProductId}`;
		body = this.getNodeParameter('updateFields', i) as IDataObject;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Transaction operation executor
async function executeTransactionOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'get') {
		const transactionId = this.getNodeParameter('transactionId', i) as string;
		endpoint = `/transactions/${transactionId}`;
	} else if (operation === 'list') {
		endpoint = '/transactions';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'getPending') {
		endpoint = '/transactions';
		qs.status = 'PENDING';
		const accountId = this.getNodeParameter('accountId', i) as string;
		if (accountId) {
			qs.account_id = accountId;
		}
	} else if (operation === 'getPosted') {
		endpoint = '/transactions';
		qs.status = 'POSTED';
		const accountId = this.getNodeParameter('accountId', i) as string;
		if (accountId) {
			qs.account_id = accountId;
		}
	} else if (operation === 'search') {
		endpoint = '/transactions';
		const searchFilters = this.getNodeParameter('searchFilters', i) as IDataObject;
		Object.assign(qs, searchFilters);
	} else if (operation === 'patch') {
		method = 'PATCH';
		const transactionId = this.getNodeParameter('transactionId', i) as string;
		endpoint = `/transactions/${transactionId}`;
		body = this.getNodeParameter('updateFields', i) as IDataObject;
	} else if (operation === 'getEnhancedData') {
		const transactionId = this.getNodeParameter('transactionId', i) as string;
		endpoint = `/transactions/${transactionId}/enhanced_data`;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Authorization operation executor
async function executeAuthorizationOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'get') {
		const authorizationId = this.getNodeParameter('authorizationId', i) as string;
		endpoint = `/authorizations/${authorizationId}`;
	} else if (operation === 'list') {
		endpoint = '/authorizations';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'simulate') {
		method = 'POST';
		endpoint = '/authorizations/simulate';
		body = this.getNodeParameter('simulationData', i) as IDataObject;
	} else if (operation === 'clear') {
		method = 'POST';
		const authorizationId = this.getNodeParameter('authorizationId', i) as string;
		endpoint = `/authorizations/${authorizationId}/clear`;
		const clearOptions = this.getNodeParameter('clearOptions', i) as IDataObject;
		Object.assign(body, clearOptions);
	} else if (operation === 'reverse') {
		method = 'POST';
		const authorizationId = this.getNodeParameter('authorizationId', i) as string;
		endpoint = `/authorizations/${authorizationId}/reverse`;
		const reverseOptions = this.getNodeParameter('reverseOptions', i) as IDataObject;
		Object.assign(body, reverseOptions);
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Statement operation executor
async function executeStatementOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'get') {
		const statementId = this.getNodeParameter('statementId', i) as string;
		endpoint = `/statements/${statementId}`;
	} else if (operation === 'list') {
		endpoint = '/statements';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'getPdf') {
		const statementId = this.getNodeParameter('statementId', i) as string;
		endpoint = `/statements/${statementId}/pdf`;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Disclosure operation executor
async function executeDisclosureOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/disclosures';
		body = {
			type: this.getNodeParameter('disclosureType', i) as string,
			customer_id: this.getNodeParameter('customerId', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const disclosureId = this.getNodeParameter('disclosureId', i) as string;
		endpoint = `/disclosures/${disclosureId}`;
	} else if (operation === 'list') {
		endpoint = '/disclosures';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'accept') {
		method = 'POST';
		const disclosureId = this.getNodeParameter('disclosureId', i) as string;
		endpoint = `/disclosures/${disclosureId}/accept`;
		body = this.getNodeParameter('acceptanceData', i) as IDataObject;
	} else if (operation === 'getDocument') {
		const disclosureId = this.getNodeParameter('disclosureId', i) as string;
		endpoint = `/disclosures/${disclosureId}/document`;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Document operation executor
async function executeDocumentOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'upload') {
		method = 'POST';
		endpoint = '/documents';
		body = {
			type: this.getNodeParameter('documentType', i) as string,
			customer_id: this.getNodeParameter('customerId', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const documentId = this.getNodeParameter('documentId', i) as string;
		endpoint = `/documents/${documentId}`;
	} else if (operation === 'list') {
		endpoint = '/documents';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'delete') {
		method = 'DELETE';
		const documentId = this.getNodeParameter('documentId', i) as string;
		endpoint = `/documents/${documentId}`;
	} else if (operation === 'getContent') {
		const documentId = this.getNodeParameter('documentId', i) as string;
		endpoint = `/documents/${documentId}/content`;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Verification operation executor
async function executeVerificationOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/verifications';
		body = {
			person_id: this.getNodeParameter('personId', i) as string,
			verification_type: this.getNodeParameter('verificationType', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const verificationId = this.getNodeParameter('verificationId', i) as string;
		endpoint = `/verifications/${verificationId}`;
	} else if (operation === 'list') {
		endpoint = '/verifications';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'getResult') {
		const verificationId = this.getNodeParameter('verificationId', i) as string;
		endpoint = `/verifications/${verificationId}/result`;
	} else if (operation === 'retry') {
		method = 'POST';
		const verificationId = this.getNodeParameter('verificationId', i) as string;
		endpoint = `/verifications/${verificationId}/retry`;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Watchlist operation executor
async function executeWatchlistOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'screenCustomer') {
		method = 'POST';
		endpoint = '/watchlist/screenings';
		body = {
			person_id: this.getNodeParameter('personId', i) as string,
		};
		const screeningOptions = this.getNodeParameter('screeningOptions', i) as IDataObject;
		Object.assign(body, screeningOptions);
	} else if (operation === 'getScreening') {
		const screeningId = this.getNodeParameter('screeningId', i) as string;
		endpoint = `/watchlist/screenings/${screeningId}`;
	} else if (operation === 'listScreenings') {
		endpoint = '/watchlist/screenings';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'getAlert') {
		const alertId = this.getNodeParameter('alertId', i) as string;
		endpoint = `/watchlist/alerts/${alertId}`;
	} else if (operation === 'listAlerts') {
		endpoint = '/watchlist/alerts';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'suppressAlert') {
		method = 'POST';
		const alertId = this.getNodeParameter('alertId', i) as string;
		endpoint = `/watchlist/alerts/${alertId}/suppress`;
		body = this.getNodeParameter('suppressionData', i) as IDataObject;
	} else if (operation === 'rescreen') {
		method = 'POST';
		const personId = this.getNodeParameter('personId', i) as string;
		endpoint = `/watchlist/screenings`;
		body = { person_id: personId, force_rescreen: true };
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Spend Control operation executor
async function executeSpendControlOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/spend_controls';
		body = {
			name: this.getNodeParameter('name', i) as string,
			control_type: this.getNodeParameter('controlType', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const spendControlId = this.getNodeParameter('spendControlId', i) as string;
		endpoint = `/spend_controls/${spendControlId}`;
	} else if (operation === 'update') {
		method = 'PATCH';
		const spendControlId = this.getNodeParameter('spendControlId', i) as string;
		endpoint = `/spend_controls/${spendControlId}`;
		body = this.getNodeParameter('updateFields', i) as IDataObject;
	} else if (operation === 'delete') {
		method = 'DELETE';
		const spendControlId = this.getNodeParameter('spendControlId', i) as string;
		endpoint = `/spend_controls/${spendControlId}`;
	} else if (operation === 'list') {
		endpoint = '/spend_controls';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Relationship operation executor
async function executeRelationshipOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/relationships';
		body = {
			from_person_id: this.getNodeParameter('fromPersonId', i) as string,
			to_business_id: this.getNodeParameter('toBusinessId', i) as string,
			relationship_type: this.getNodeParameter('relationshipType', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const relationshipId = this.getNodeParameter('relationshipId', i) as string;
		endpoint = `/relationships/${relationshipId}`;
	} else if (operation === 'list') {
		endpoint = '/relationships';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'delete') {
		method = 'DELETE';
		const relationshipId = this.getNodeParameter('relationshipId', i) as string;
		endpoint = `/relationships/${relationshipId}`;
	} else if (operation === 'getTypes') {
		endpoint = '/relationships/types';
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Webhook operation executor
async function executeWebhookOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/webhooks';
		body = {
			url: this.getNodeParameter('url', i) as string,
			enabled_events: this.getNodeParameter('enabledEvents', i) as string[],
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const webhookId = this.getNodeParameter('webhookId', i) as string;
		endpoint = `/webhooks/${webhookId}`;
	} else if (operation === 'update') {
		method = 'PATCH';
		const webhookId = this.getNodeParameter('webhookId', i) as string;
		endpoint = `/webhooks/${webhookId}`;
		body = this.getNodeParameter('updateFields', i) as IDataObject;
	} else if (operation === 'delete') {
		method = 'DELETE';
		const webhookId = this.getNodeParameter('webhookId', i) as string;
		endpoint = `/webhooks/${webhookId}`;
	} else if (operation === 'list') {
		endpoint = '/webhooks';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'getSecret') {
		const webhookId = this.getNodeParameter('webhookId', i) as string;
		endpoint = `/webhooks/${webhookId}/secret`;
	} else if (operation === 'rotateSecret') {
		method = 'POST';
		const webhookId = this.getNodeParameter('webhookId', i) as string;
		endpoint = `/webhooks/${webhookId}/secret/rotate`;
	} else if (operation === 'test') {
		method = 'POST';
		const webhookId = this.getNodeParameter('webhookId', i) as string;
		endpoint = `/webhooks/${webhookId}/test`;
	} else if (operation === 'getEvents') {
		const webhookId = this.getNodeParameter('webhookId', i) as string;
		endpoint = `/webhooks/${webhookId}/events`;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Event operation executor
async function executeEventOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'get') {
		const eventId = this.getNodeParameter('eventId', i) as string;
		endpoint = `/events/${eventId}`;
	} else if (operation === 'list') {
		endpoint = '/events';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'resend') {
		method = 'POST';
		const eventId = this.getNodeParameter('eventId', i) as string;
		endpoint = `/events/${eventId}/resend`;
	} else if (operation === 'getTypes') {
		endpoint = '/events/types';
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Note operation executor
async function executeNoteOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/notes';
		body = {
			content: this.getNodeParameter('content', i) as string,
			related_resource_type: this.getNodeParameter('relatedResourceType', i) as string,
			related_resource_id: this.getNodeParameter('relatedResourceId', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const noteId = this.getNodeParameter('noteId', i) as string;
		endpoint = `/notes/${noteId}`;
	} else if (operation === 'list') {
		endpoint = '/notes';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'update') {
		method = 'PATCH';
		const noteId = this.getNodeParameter('noteId', i) as string;
		endpoint = `/notes/${noteId}`;
		body = this.getNodeParameter('updateFields', i) as IDataObject;
	} else if (operation === 'delete') {
		method = 'DELETE';
		const noteId = this.getNodeParameter('noteId', i) as string;
		endpoint = `/notes/${noteId}`;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Cash Order operation executor
async function executeCashOrderOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/cash_orders';
		body = {
			account_id: this.getNodeParameter('accountId', i) as string,
			order_type: this.getNodeParameter('orderType', i) as string,
			amount: this.getNodeParameter('amount', i) as number,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const cashOrderId = this.getNodeParameter('cashOrderId', i) as string;
		endpoint = `/cash_orders/${cashOrderId}`;
	} else if (operation === 'list') {
		endpoint = '/cash_orders';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'update') {
		method = 'PATCH';
		const cashOrderId = this.getNodeParameter('cashOrderId', i) as string;
		endpoint = `/cash_orders/${cashOrderId}`;
		body = this.getNodeParameter('updateFields', i) as IDataObject;
	} else if (operation === 'cancel') {
		method = 'POST';
		const cashOrderId = this.getNodeParameter('cashOrderId', i) as string;
		endpoint = `/cash_orders/${cashOrderId}/cancel`;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Interest operation executor
async function executeInterestOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'get') {
		const accountId = this.getNodeParameter('accountId', i) as string;
		endpoint = `/accounts/${accountId}/interest`;
	} else if (operation === 'list') {
		endpoint = '/interest';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'getRate') {
		const accountId = this.getNodeParameter('accountId', i) as string;
		endpoint = `/accounts/${accountId}/interest/rate`;
	} else if (operation === 'updateRate') {
		method = 'PATCH';
		const accountId = this.getNodeParameter('accountId', i) as string;
		endpoint = `/accounts/${accountId}/interest/rate`;
		body = this.getNodeParameter('rateData', i) as IDataObject;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Fee operation executor
async function executeFeeOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/fees';
		body = {
			account_id: this.getNodeParameter('accountId', i) as string,
			fee_type: this.getNodeParameter('feeType', i) as string,
			amount: this.getNodeParameter('amount', i) as number,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const feeId = this.getNodeParameter('feeId', i) as string;
		endpoint = `/fees/${feeId}`;
	} else if (operation === 'list') {
		endpoint = '/fees';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'reverse') {
		method = 'POST';
		const feeId = this.getNodeParameter('feeId', i) as string;
		endpoint = `/fees/${feeId}/reverse`;
		const reversalReason = this.getNodeParameter('reversalReason', i) as string;
		body = { reason: reversalReason };
	} else if (operation === 'getSchedule') {
		const accountId = this.getNodeParameter('accountId', i) as string;
		endpoint = `/accounts/${accountId}/fee_schedule`;
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Hold operation executor
async function executeHoldOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'create') {
		method = 'POST';
		endpoint = '/holds';
		body = {
			account_id: this.getNodeParameter('accountId', i) as string,
			amount: this.getNodeParameter('amount', i) as number,
			hold_type: this.getNodeParameter('holdType', i) as string,
		};
		const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
		Object.assign(body, additionalFields);
	} else if (operation === 'get') {
		const holdId = this.getNodeParameter('holdId', i) as string;
		endpoint = `/holds/${holdId}`;
	} else if (operation === 'release') {
		method = 'POST';
		const holdId = this.getNodeParameter('holdId', i) as string;
		endpoint = `/holds/${holdId}/release`;
	} else if (operation === 'list') {
		endpoint = '/holds';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Bank Partner operation executor
async function executeBankPartnerOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'get') {
		const bankPartnerId = this.getNodeParameter('bankPartnerId', i) as string;
		endpoint = `/bank_partners/${bankPartnerId}`;
	} else if (operation === 'list') {
		endpoint = '/bank_partners';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const filters = this.getNodeParameter('filters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, filters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'getLimits') {
		const bankPartnerId = this.getNodeParameter('bankPartnerId', i) as string;
		endpoint = `/bank_partners/${bankPartnerId}/limits`;
		const limitType = this.getNodeParameter('limitType', i) as string;
		if (limitType !== 'all') {
			qs.type = limitType;
		}
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Sandbox operation executor
async function executeSandboxOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'POST';
	let endpoint = '';
	let body: IDataObject = {};
	const qs: IDataObject = {};

	if (operation === 'simulateAch') {
		endpoint = '/sandbox/ach';
		body = {
			account_id: this.getNodeParameter('accountId', i) as string,
			amount: this.getNodeParameter('amount', i) as number,
			simulation_type: this.getNodeParameter('achSimulationType', i) as string,
		};
		const achTransferId = this.getNodeParameter('achTransferId', i, '') as string;
		if (achTransferId) {
			body.ach_id = achTransferId;
		}
		const returnCode = this.getNodeParameter('returnCode', i, '') as string;
		if (returnCode) {
			body.return_code = returnCode;
		}
		const achOptions = this.getNodeParameter('achOptions', i) as IDataObject;
		Object.assign(body, achOptions);
	} else if (operation === 'simulateCardTransaction') {
		endpoint = '/sandbox/card_transactions';
		body = {
			card_id: this.getNodeParameter('cardId', i) as string,
			amount: this.getNodeParameter('transactionAmount', i) as number,
			type: this.getNodeParameter('cardTransactionType', i) as string,
		};
		const merchantDetails = this.getNodeParameter('merchantDetails', i) as IDataObject;
		if (Object.keys(merchantDetails).length > 0) {
			body.merchant = merchantDetails;
		}
		const cardTransactionOptions = this.getNodeParameter('cardTransactionOptions', i) as IDataObject;
		Object.assign(body, cardTransactionOptions);
	} else if (operation === 'simulateWire') {
		endpoint = '/sandbox/wires';
		body = {
			account_id: this.getNodeParameter('accountId', i) as string,
			amount: this.getNodeParameter('wireAmount', i) as number,
			wire_type: this.getNodeParameter('wireType', i) as string,
		};
		const wireId = this.getNodeParameter('wireId', i, '') as string;
		if (wireId) {
			body.wire_id = wireId;
		}
		const wireOptions = this.getNodeParameter('wireOptions', i) as IDataObject;
		Object.assign(body, wireOptions);
	} else if (operation === 'fundAccount') {
		endpoint = '/sandbox/fund_account';
		body = {
			account_id: this.getNodeParameter('accountId', i) as string,
			amount: this.getNodeParameter('amount', i) as number,
			description: this.getNodeParameter('fundingDescription', i) as string,
			type: this.getNodeParameter('fundingType', i) as string,
		};
	} else if (operation === 'clearAuthorization') {
		const authorizationId = this.getNodeParameter('authorizationId', i) as string;
		endpoint = `/sandbox/authorizations/${authorizationId}/clear`;
		const settlementAmount = this.getNodeParameter('settlementAmount', i) as number;
		if (settlementAmount > 0) {
			body.amount = settlementAmount;
		}
		const clearOptions = this.getNodeParameter('clearOptions', i) as IDataObject;
		Object.assign(body, clearOptions);
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

// Utility operation executor
async function executeUtilityOperation(
	this: IExecuteFunctions,
	operation: string,
	i: number,
): Promise<IDataObject | IDataObject[]> {
	let method: IHttpRequestMethods = 'GET';
	let endpoint = '';
	let body: IDataObject = {};
	let qs: IDataObject = {};

	if (operation === 'validateRoutingNumber') {
		endpoint = '/routing_numbers/validate';
		qs.routing_number = this.getNodeParameter('routingNumber', i) as string;
		const validationOptions = this.getNodeParameter('validationOptions', i) as IDataObject;
		Object.assign(qs, validationOptions);
	} else if (operation === 'getApiStatus') {
		endpoint = '/status';
		const statusOptions = this.getNodeParameter('statusOptions', i) as IDataObject;
		Object.assign(qs, statusOptions);
	} else if (operation === 'getSupportedBanks') {
		endpoint = '/banks';
		const returnAll = this.getNodeParameter('returnAll', i) as boolean;
		const bankFilters = this.getNodeParameter('bankFilters', i) as IDataObject;
		if (!returnAll) {
			const limit = this.getNodeParameter('limit', i) as number;
			qs.limit = limit;
		}
		Object.assign(qs, bankFilters);
		if (returnAll) {
			return await syncteraApiRequestAllItems.call(this, 'result', method, endpoint, body, qs);
		}
	} else if (operation === 'testConnection') {
		endpoint = '/ping';
		const testOptions = this.getNodeParameter('testOptions', i) as IDataObject;
		Object.assign(qs, testOptions);
	}

	return await syncteraApiRequest.call(this, method, endpoint, body, qs);
}

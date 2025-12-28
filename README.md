# n8n-nodes-synctera

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for the Synctera Banking-as-a-Service (BaaS) platform, providing complete access to banking, payments, card issuing, compliance, and customer management operations.

![n8n](https://img.shields.io/badge/n8n-community--node-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)
![Synctera API](https://img.shields.io/badge/Synctera-API%20v0-green)

## Features

- **Complete BaaS Operations**: Full access to Synctera's banking platform capabilities
- **Customer Management**: Create, verify, and manage personal and business customers
- **Account Operations**: Open, manage, and close deposit accounts with templates
- **Payment Processing**: ACH transfers, wire transfers, and internal transfers
- **Card Issuing**: Physical and virtual card creation, activation, and management
- **Compliance Tools**: KYC verification, watchlist screening, and disclosure management
- **Real-time Events**: Webhook triggers for account, transaction, and customer events
- **Sandbox Support**: Simulation tools for testing ACH, wire, and card transactions
- **Spend Controls**: Create and manage card spending rules and limits

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** → **Community Nodes**
3. Click **Install**
4. Enter `n8n-nodes-synctera`
5. Click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation
cd ~/.n8n

# Install the package
npm install n8n-nodes-synctera
```

### Development Installation

```bash
# Clone or extract the package
cd n8n-nodes-synctera

# Install dependencies
npm install

# Build the project
npm run build

# Create symlink to n8n custom nodes
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-synctera

# Restart n8n
n8n start
```

## Credentials Setup

### Synctera API Credentials

| Field | Description | Required |
|-------|-------------|----------|
| Environment | Production, Sandbox, or Custom | Yes |
| API Key | Your Synctera API key | Yes |
| Custom API URL | Custom endpoint URL (if Environment is Custom) | Conditional |
| Webhook Secret | Secret for validating webhook signatures | No |
| Partner ID | Your Synctera partner identifier | No |

### Synctera OAuth2 Credentials

| Field | Description | Required |
|-------|-------------|----------|
| Client ID | OAuth2 client identifier | Yes |
| Client Secret | OAuth2 client secret | Yes |
| Token URL | OAuth2 token endpoint | Yes |
| Scope | OAuth2 scopes (space-separated) | No |

## Resources & Operations

### Customer Resource
| Operation | Description |
|-----------|-------------|
| Create Personal | Create a new personal customer |
| Create Business | Create a new business customer |
| Get | Retrieve customer details |
| Update | Update customer information |
| List | List all customers with filters |
| Delete | Delete a customer |
| Get Status | Get customer verification status |
| Verify | Initiate customer verification |
| Get Accounts | List customer's accounts |
| Get Cards | List customer's cards |
| Get Relationships | List customer relationships |

### Business Resource
| Operation | Description |
|-----------|-------------|
| Create | Create a new business entity |
| Get | Retrieve business details |
| Update | Update business information |
| List | List all businesses |
| Get Owners | List beneficial owners |
| Add Owner | Add a beneficial owner |
| Remove Owner | Remove a beneficial owner |
| Get Verification | Get business verification status |

### Account Resource
| Operation | Description |
|-----------|-------------|
| Create | Create a new account |
| Get | Retrieve account details |
| Update | Update account information |
| List | List accounts with filters |
| Close | Close an account |
| Get Balance | Get current balance |
| Get Account Number | Retrieve account number |
| Get Routing Number | Retrieve routing number |
| Get Transactions | List account transactions |
| Get Statement | Get account statement |
| Freeze | Freeze account activity |
| Unfreeze | Unfreeze account activity |

### Account Template Resource
| Operation | Description |
|-----------|-------------|
| Create | Create account product template |
| Get | Retrieve template details |
| List | List all templates |
| Update | Update template configuration |
| Delete | Delete a template |

### ACH Resource
| Operation | Description |
|-----------|-------------|
| Create | Originate ACH transfer |
| Get | Retrieve ACH details |
| List | List ACH transfers |
| Cancel | Cancel pending ACH |
| Get Return | Get ACH return details |
| Get NOC | Get notification of change |
| Handle Return | Process ACH return |
| Get Addenda | Get ACH addenda records |

### Wire Resource
| Operation | Description |
|-----------|-------------|
| Create Domestic | Send domestic wire |
| Create International | Send international wire |
| Get | Retrieve wire details |
| List | List wire transfers |
| Cancel | Cancel pending wire |
| Get Fees | Get wire fee schedule |

### Internal Transfer Resource
| Operation | Description |
|-----------|-------------|
| Create | Transfer between accounts |
| Get | Retrieve transfer details |
| List | List internal transfers |
| Get Status | Get transfer status |

### External Account Resource
| Operation | Description |
|-----------|-------------|
| Create | Link external account |
| Get | Retrieve external account |
| Update | Update account details |
| Delete | Remove external account |
| List | List external accounts |
| Verify | Verify with micro-deposits |
| Get Verification Status | Check verification state |

### Card Resource
| Operation | Description |
|-----------|-------------|
| Create | Issue new card |
| Get | Retrieve card details |
| List | List cards |
| Activate | Activate a card |
| Suspend | Suspend card temporarily |
| Unsuspend | Reactivate suspended card |
| Terminate | Permanently close card |
| Reissue | Replace lost/stolen card |
| Get Token | Get digital wallet token |
| Get Image | Get card image |
| Update PIN | Change card PIN |
| Get Limits | Get spending limits |
| Update Limits | Modify spending limits |

### Card Product Resource
| Operation | Description |
|-----------|-------------|
| Create | Create card program |
| Get | Retrieve product details |
| List | List card products |
| Update | Update product configuration |

### Transaction Resource
| Operation | Description |
|-----------|-------------|
| Get | Retrieve transaction |
| List | List transactions |
| Get Pending | List pending transactions |
| Get Posted | List posted transactions |
| Search | Search with criteria |
| Patch | Update transaction |
| Get Enhanced Data | Get Level 2/3 data |

### Authorization Resource
| Operation | Description |
|-----------|-------------|
| Get | Retrieve authorization |
| List | List authorizations |
| Simulate | Test authorization (sandbox) |
| Clear | Complete authorization |
| Reverse | Reverse authorization |

### Statement Resource
| Operation | Description |
|-----------|-------------|
| Get | Retrieve statement |
| List | List statements |
| Get PDF | Download statement PDF |

### Disclosure Resource
| Operation | Description |
|-----------|-------------|
| Create | Create disclosure record |
| Get | Retrieve disclosure |
| List | List disclosures |
| Accept | Record acceptance |
| Get Document | Download disclosure document |

### Document Resource
| Operation | Description |
|-----------|-------------|
| Upload | Upload document |
| Get | Retrieve document metadata |
| List | List documents |
| Delete | Remove document |
| Get Content | Download document file |

### Verification Resource
| Operation | Description |
|-----------|-------------|
| Create | Initiate verification |
| Get | Retrieve verification |
| List | List verifications |
| Get Result | Get verification result |
| Retry | Retry failed verification |

### Watchlist Resource
| Operation | Description |
|-----------|-------------|
| Screen | Screen against watchlists |
| Get Result | Get screening result |
| List | List screenings |
| Get Alert | Retrieve alert details |
| List Alerts | List all alerts |
| Suppress | Suppress false positive |

### Spend Control Resource
| Operation | Description |
|-----------|-------------|
| Create | Create spending rule |
| Get | Retrieve spend control |
| Update | Modify spending rule |
| Delete | Remove spend control |
| List | List spend controls |

### Relationship Resource
| Operation | Description |
|-----------|-------------|
| Create | Create relationship |
| Get | Retrieve relationship |
| List | List relationships |
| Delete | Remove relationship |
| Get Types | List relationship types |

### Webhook Resource
| Operation | Description |
|-----------|-------------|
| Create | Register webhook |
| Get | Retrieve webhook |
| Update | Modify webhook |
| Delete | Remove webhook |
| List | List webhooks |
| Get Secret | Retrieve signing secret |
| Rotate Secret | Generate new secret |
| Test | Send test event |
| Get Events | List webhook events |

### Event Resource
| Operation | Description |
|-----------|-------------|
| Get | Retrieve event |
| List | List events |
| Resend | Replay event |
| Get Types | List event types |

### Note Resource
| Operation | Description |
|-----------|-------------|
| Create | Add note |
| Get | Retrieve note |
| List | List notes |
| Update | Modify note |
| Delete | Remove note |

### Cash Order Resource
| Operation | Description |
|-----------|-------------|
| Create | Order cash |
| Get | Retrieve order |
| List | List orders |
| Update | Modify order |
| Cancel | Cancel order |

### Interest Resource
| Operation | Description |
|-----------|-------------|
| Get | Retrieve interest record |
| List | List interest records |
| Get Rate | Get interest rate |
| Update Rate | Modify interest rate |

### Fee Resource
| Operation | Description |
|-----------|-------------|
| Create | Apply fee |
| Get | Retrieve fee |
| List | List fees |
| Reverse | Reverse fee |
| Get Schedule | Get fee schedule |

### Hold Resource
| Operation | Description |
|-----------|-------------|
| Create | Place hold |
| Get | Retrieve hold |
| Release | Remove hold |
| List | List holds |

### Bank Partner Resource
| Operation | Description |
|-----------|-------------|
| Get | Retrieve partner info |
| List | List bank partners |
| Get Limits | Get partner limits |

### Sandbox Resource (Testing)
| Operation | Description |
|-----------|-------------|
| Simulate ACH | Test ACH scenarios |
| Simulate Card | Test card transactions |
| Simulate Wire | Test wire transfers |
| Fund Account | Add test funds |
| Clear Authorization | Clear test auth |

### Utility Resource
| Operation | Description |
|-----------|-------------|
| Validate Routing | Validate routing number |
| Get API Status | Check API health |
| Get Banks | List supported banks |
| Test Connection | Verify connectivity |

## Trigger Node

The Synctera Trigger node receives real-time webhook events:

### Event Categories

| Category | Events |
|----------|--------|
| Customer | created, updated, deleted, verification.completed, verification.failed |
| Account | created, updated, closed, frozen, balance.changed |
| ACH | originated, completed, returned, canceled, noc |
| Wire | created, completed, failed, canceled |
| Card | created, activated, suspended, terminated, shipped |
| Transaction | created, posted, reversed |
| Authorization | created, cleared |
| Watchlist | screening.completed, alert.created, alert.suppressed |
| Disclosure | sent, accepted |
| External Account | created, verified, verification.failed |

### Trigger Options

| Option | Description |
|--------|-------------|
| Verify Signature | Validate webhook signatures (recommended) |
| Include Raw Payload | Include original payload in output |
| Customer ID Filter | Only trigger for specific customer |
| Account ID Filter | Only trigger for specific account |

## Usage Examples

### Create a Personal Customer

```javascript
// Synctera Node Configuration
Resource: Customer
Operation: Create Personal

// Parameters
First Name: John
Last Name: Doe
Email: john.doe@example.com
Phone: +14155551234
Date of Birth: 1985-03-15
SSN: 123-45-6789

// Address
Street: 123 Main St
City: San Francisco
State: CA
Postal Code: 94105
Country: US
```

### Open a Checking Account

```javascript
// Synctera Node Configuration
Resource: Account
Operation: Create

// Parameters
Account Template ID: [your-template-id]
Customer ID: [customer-id]
Account Type: CHECKING
Nickname: Primary Checking
```

### Initiate ACH Transfer

```javascript
// Synctera Node Configuration
Resource: ACH
Operation: Create

// Parameters
Originating Account ID: [account-id]
Receiving Account Number: 123456789
Receiving Routing Number: 021000021
Amount: 1000.00
Currency: USD
Direction: CREDIT
SEC Code: PPD
Description: Payment
```

### Send Domestic Wire

```javascript
// Synctera Node Configuration
Resource: Wire
Operation: Create Domestic

// Parameters
Originating Account ID: [account-id]
Beneficiary Name: Jane Smith
Beneficiary Account: 987654321
Beneficiary Routing: 021000089
Amount: 5000.00
Purpose: Business Payment
```

### Issue a Debit Card

```javascript
// Synctera Node Configuration
Resource: Card
Operation: Create

// Parameters
Customer ID: [customer-id]
Account ID: [account-id]
Card Product ID: [product-id]
Card Type: PHYSICAL
Shipping Method: STANDARD
```

### Screen Customer Against Watchlist

```javascript
// Synctera Node Configuration
Resource: Watchlist
Operation: Screen

// Parameters
Customer ID: [customer-id]
Provider: OFAC
Screening Type: INITIAL
```

### Create Spend Control

```javascript
// Synctera Node Configuration
Resource: Spend Control
Operation: Create

// Parameters
Name: Daily ATM Limit
Amount Limit: 500.00
Velocity Window: DAILY
Action On Limit: DECLINE
MCC Codes: 6010, 6011  // ATM codes
```

### Sandbox: Simulate ACH Return

```javascript
// Synctera Node Configuration
Resource: Sandbox
Operation: Simulate ACH

// Parameters
ACH ID: [ach-id]
Simulation Type: RETURN
Return Code: R01  // Insufficient Funds
```

### Webhook Trigger Workflow

```javascript
// SyncteraTrigger Node Configuration
Events: account.balance.changed, transaction.posted

// Filters
Account ID: [account-id]
Verify Signature: true

// Connect to downstream nodes for:
// - Balance alerts
// - Transaction notifications
// - Fraud detection
```

## Synctera BaaS Concepts

### Customer Types
- **Personal**: Individual account holders (KYC with SSN/ID)
- **Business**: Business entities (KYB with EIN/registration)

### Account Templates
Pre-configured account products defining:
- Interest rates
- Fee schedules
- Transaction limits
- Overdraft settings

### External Accounts
Linked accounts at other financial institutions for:
- ACH transfers
- Funding sources
- Payment destinations

### Spend Controls
Rules applied to card transactions:
- Amount limits (per transaction, daily, monthly)
- Merchant category restrictions
- Geographic restrictions
- Velocity controls

### Watchlist Screening
AML/KYC compliance screening against:
- OFAC SDN list
- Other government watchlists
- PEP databases

### Disclosures
Required legal documents:
- Account agreements
- Privacy policies
- Fee schedules
- Terms of service

### Bank Partners
Sponsor bank relationships providing:
- Banking charter
- FDIC insurance
- Regulatory compliance

## Environments

| Environment | Description | Use Case |
|-------------|-------------|----------|
| Production | Live banking operations | Real transactions |
| Sandbox | Test environment | Development & testing |
| Custom | Custom endpoint | Enterprise deployments |

## Error Handling

The node provides detailed error information:

| Error Type | Description |
|------------|-------------|
| Authentication | Invalid or expired API credentials |
| Validation | Invalid request parameters |
| Not Found | Resource doesn't exist |
| Rate Limit | Too many requests |
| Compliance | Blocked by compliance rules |
| Insufficient Funds | Account lacks funds |
| Account Frozen | Account is frozen |

### Error Response Format

```json
{
  "error": {
    "code": "INSUFFICIENT_FUNDS",
    "message": "Account has insufficient funds for this transaction",
    "details": {
      "available_balance": "50.00",
      "requested_amount": "100.00"
    }
  }
}
```

## Security Best Practices

1. **Secure Credentials**: Store API keys in n8n credentials, never in workflows
2. **Webhook Signatures**: Always verify webhook signatures in production
3. **PCI Compliance**: Never log or store full card numbers
4. **PII Handling**: Minimize exposure of customer SSN and personal data
5. **Audit Logging**: Enable logging for compliance requirements
6. **Rate Limiting**: Implement retry logic with exponential backoff
7. **Environment Separation**: Use sandbox for testing, production for live

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run in watch mode
npm run dev

# Run linting
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service,
or paid automation offering requires a commercial license.

For licensing inquiries:
**licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Support

- **Documentation**: [Synctera API Docs](https://dev.synctera.com)
- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-synctera/issues)
- **Email**: support@velobpa.com

## Acknowledgments

- [Synctera](https://synctera.com) for their comprehensive BaaS platform
- [n8n](https://n8n.io) for the workflow automation platform
- The n8n community for node development standards

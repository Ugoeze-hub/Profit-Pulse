# Node Backend API Documentation

This document is for the Node backend only (Express + Prisma) so the frontend team can integrate endpoints confidently.

## 1. Service Basics

- Service: Node API
- Framework: Express
- ORM: Prisma (PostgreSQL)
- Entry file: backend/node/src/server.js
- Default port: `process.env.PORT || 5000`
- Local base URL example: `http://localhost:5000`
- Global API prefix used in server: `/api`

## 2. Authentication

Protected endpoints use JWT Bearer auth.

### Header format

`Authorization: Bearer <token>`

### Where token comes from

- `POST /api/auth/signup`
- `POST /api/auth/login`

### Token details

- Signed with `JWT_SECRET_KEY`
- Payload includes: `userId`, `email`
- Expiry: `24h`

### Auth error responses

- Missing or malformed auth header:
```json
{ "error": "Access denied. Please log in first." }
```
Status: `401`

- Invalid/expired token:
```json
{ "error": "Your session has expired. Please log in again." }
```
Status: `403`

## 3. Standard Error Shape

Most controller errors are returned as:

```json
{
  "error": "Human-readable error message",
  "details": "Technical detail"
}
```

Common statuses:
- `200` success
- `201` created
- `400` validation/client error
- `401` unauthorized (no token)
- `403` forbidden (invalid/expired token)
- `404` not found or unauthorized ownership
- `500` server error

## 4. Endpoint Reference

## 4.1 Auth Routes

Base: `/api/auth`

### POST `/api/auth/signup`

Create account.

Auth: No

Body:
```json
{
  "fullName": "Jane Doe",
  "businessName": "Jane Stores",
  "email": "jane@example.com",
  "phone": "08012345678",
  "password": "secret123"
}
```

Required:
- `fullName`
- `businessName`
- `email`
- `password` (min 6 chars)

Success `201`:
```json
{
  "message": "Account created successfully!",
  "token": "<jwt>",
  "user": {
    "id": "uuid",
    "fullName": "Jane Doe",
    "businessName": "Jane Stores",
    "email": "jane@example.com",
    "balance": 0
  }
}
```

Possible errors:
- `400` missing fields
- `400` password too short
- `400` email already exists

### POST `/api/auth/login`

Log in user.

Auth: No

Body:
```json
{
  "email": "jane@example.com",
  "password": "secret123"
}
```

Success `200`:
```json
{
  "message": "Login successful",
  "token": "<jwt>",
  "user": {
    "id": "uuid",
    "fullName": "Jane Doe",
    "businessName": "Jane Stores",
    "email": "jane@example.com",
    "balance": 10000
  }
}
```

Possible errors:
- `400` missing email/password
- `400` invalid credentials

## 4.2 User Settings Routes

Base: `/api/user`

### GET `/api/user/settings`

Get current user settings.

Auth: Yes

Success `200`:
```json
{
  "businessName": "Jane Stores",
  "email": "jane@example.com",
  "phone": "08012345678",
  "currency": "NGN",
  "language": "english",
  "notifications": {
    "dailyPulse": true,
    "profitAlerts": true,
    "expenseWarnings": true,
    "marketingEmails": false
  }
}
```

Possible errors:
- `404` user not found

### PUT `/api/user/settings`

Update settings (partial update).

Auth: Yes

Body (all optional):
```json
{
  "businessName": "New Name",
  "email": "new@example.com",
  "phone": "08099999999",
  "currency": "NGN",
  "language": "english",
  "notifications": {
    "dailyPulse": false,
    "profitAlerts": true,
    "expenseWarnings": true,
    "marketingEmails": false
  }
}
```

Success `200`:
```json
{
  "message": "Settings saved successfully!",
  "settings": {
    "businessName": "New Name",
    "email": "new@example.com",
    "phone": "08099999999",
    "currency": "NGN",
    "language": "english",
    "notifications": {
      "dailyPulse": false,
      "profitAlerts": true,
      "expenseWarnings": true,
      "marketingEmails": false
    }
  }
}
```

Implementation note:
- Backend applies truthy checks for some fields; send full values you want persisted.

## 4.3 Transactions Routes

Base: `/api/transactions`

### POST `/api/transactions`

Create transaction and update user balance.

Auth: Yes

Body:
```json
{
  "type": "revenue",
  "amount": 15000,
  "category": "Stock",
  "description": "Sold rice",
  "date": "2026-06-13T10:00:00.000Z",
  "note": "Paid cash"
}
```

Required:
- `type`
- `amount` (positive number)
- `category`
- `description`

Success `201`:
```json
{
  "message": "Transaction saved successfully!",
  "transaction": {
    "id": "uuid",
    "userId": "uuid",
    "reference": "TXN-...",
    "type": "revenue",
    "amount": 15000,
    "category": "Stock",
    "description": "Sold rice",
    "date": "2026-06-13T10:00:00.000Z",
    "note": "Paid cash",
    "status": "completed",
    "createdAt": "2026-06-13T10:00:10.000Z"
  }
}
```

### GET `/api/transactions`

Get all current-user transactions.

Auth: Yes

Query params:
- `search` (optional): searches description/category (case-insensitive)
- `category` (optional)
- `type` (optional):
  - `income` maps to backend `revenue`
  - any non-`all` value other than `income` maps to `expense`

Success `200`:
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "reference": "TXN-...",
    "type": "expense",
    "amount": 3000,
    "category": "Transport",
    "description": "Delivery",
    "date": "2026-06-13T09:10:00.000Z",
    "note": null,
    "status": "completed",
    "createdAt": "2026-06-13T09:10:01.000Z"
  }
]
```

### GET `/api/transactions/:id`

Get one transaction by id (must belong to logged-in user).

Auth: Yes

Success `200`: transaction object

Possible errors:
- `404` not found or unauthorized

### PATCH `/api/transactions/:id`

Update transaction and rebalance user balance using old vs new values.

Auth: Yes

Body (all optional):
```json
{
  "type": "expense",
  "amount": 4500,
  "category": "Utilities",
  "description": "Generator fuel",
  "date": "2026-06-13T14:00:00.000Z",
  "note": "Afternoon refill"
}
```

Success `200`:
```json
{
  "message": "Transaction updated cleanly!",
  "transaction": { "...": "updated record" }
}
```

Possible errors:
- `404` not found or unauthorized

### DELETE `/api/transactions/:id`

Delete transaction and reverse its balance effect.

Auth: Yes

Success `200`:
```json
{
  "message": "Transaction deleted successfully, balance adjusted."
}
```

Possible errors:
- `404` not found or unauthorized

### GET `/api/transactions/summary`

Get aggregate summary for selected period.

Auth: Yes

Query params:
- `period`: `day` | `week` | default month window

Success `200`:
```json
{
  "summary": {
    "revenue": 50000,
    "revenueItems": 8,
    "expenses": 20000,
    "expenseItems": 5,
    "profit": 30000,
    "health": "Strong"
  }
}
```

## 4.4 Dashboard Routes

Base: `/api/dashboard`

### GET `/api/dashboard/overview`

Overview totals by period.

Auth: Yes

Query params:
- `period`: `day` | `week` | default month window

Success `200`:
```json
{
  "period": "week",
  "revenue": 45000,
  "expenses": 17000,
  "profit": 28000
}
```

### GET `/api/dashboard/recent-transactions`

Recent activity feed.

Auth: Yes

Query params:
- `limit` (optional, default `10`)

Success `200`:
```json
[
  {
    "id": "uuid",
    "type": "revenue",
    "description": "Sold rice",
    "amount": 12000,
    "date": "2026-06-13T08:00:00.000Z",
    "category": "Stock"
  }
]
```

### GET `/api/dashboard/trends`

Weekday chart values normalized to 0-100.

Auth: Yes

Query params:
- `period`: `day` | `week` | default month window

Success `200`:
```json
[
  { "label": "Sun", "value": 20 },
  { "label": "Mon", "value": 40 },
  { "label": "Tue", "value": 35 },
  { "label": "Wed", "value": 80 },
  { "label": "Thu", "value": 100 },
  { "label": "Fri", "value": 70 },
  { "label": "Sat", "value": 50 }
]
```

Implementation note:
- This endpoint sums all transaction amounts per day (revenue + expense) before normalization.

### GET `/api/dashboard/expense-breakdown`

Expense category percentages.

Auth: Yes

Query params:
- `period`: `day` | `week` | default month window

Success `200`:
```json
[
  { "name": "Transport", "value": 35, "color": "bg-[#fcd34d]" },
  { "name": "Stock", "value": 45, "color": "bg-[#f97316]" },
  { "name": "Other", "value": 20, "color": "bg-[#64748b]" }
]
```

### GET `/api/dashboard/insights`

Returns text insight blocks + today metrics.

Auth: Yes

Success `200`:
```json
{
  "metrics": {
    "revenue": 25000,
    "expenses": 9000,
    "profit": 16000
  },
  "messages": [
    {
      "role": "assistant",
      "text": "Good evening...",
      "type": "default"
    },
    {
      "role": "assistant",
      "text": "Revenue was led by ...",
      "type": "highlight"
    },
    {
      "role": "assistant",
      "text": "Expenses were managed...",
      "type": "warning"
    },
    {
      "role": "assistant",
      "text": "Recommended action...",
      "type": "recommendation"
    }
  ]
}
```

## 4.5 Invoice Routes

Base: `/api/invoices`

### POST `/api/invoices`

Create invoice with items.

Auth: Yes

Body:
```json
{
  "customer": "Abiola Ventures",
  "dueDate": "2026-06-20",
  "status": "draft",
  "items": [
    { "description": "Rice Bag", "quantity": 2, "price": 45000 },
    { "description": "Sugar", "quantity": 4, "price": 1500 }
  ]
}
```

Required:
- `customer`
- `dueDate`
- `items` (must contain at least one entry)

Success `201`:
```json
{
  "message": "Invoice saved successfully!",
  "invoice": {
    "id": "uuid",
    "userId": "uuid",
    "customer": "Abiola Ventures",
    "dueDate": "2026-06-20T00:00:00.000Z",
    "totalAmount": 96000,
    "status": "draft",
    "createdAt": "2026-06-13T09:00:00.000Z",
    "items": [
      {
        "id": "uuid",
        "invoiceId": "uuid",
        "description": "Rice Bag",
        "quantity": 2,
        "price": 45000
      }
    ]
  }
}
```

Implementation note:
- `totalAmount` is computed server-side from items.

### GET `/api/invoices`

List user invoices with items.

Auth: Yes

Success `200`: array of invoice objects.

### GET `/api/invoices/:id`

Get single invoice by id.

Auth: Yes

Success `200`: invoice object with items

Possible errors:
- `404` not found or unauthorized

### PATCH `/api/invoices/:id`

Update invoice.

Auth: Yes

Body (partial):
```json
{
  "customer": "Updated Customer",
  "dueDate": "2026-06-25",
  "status": "sent",
  "items": [
    { "description": "Beans", "quantity": 3, "price": 7000 }
  ]
}
```

Behavior:
- If non-empty `items` is sent, backend deletes old items and recreates from request.
- If `items` omitted, updates invoice fields only.

Success `200`:
```json
{
  "message": "Invoice updated cleanly!",
  "invoice": { "...": "updated invoice" }
}
```

Possible errors:
- `404` not found or unauthorized

### POST `/api/invoices/:id/send`

Placeholder send route.

Auth: Yes

Behavior:
- Sets invoice status to `sent`
- Does not send actual email yet

Success `200`:
```json
{
  "message": "Invoice successfully dispatched to customer. Status modified to 'sent'."
}
```

### GET `/api/invoices/:id/pdf`

Download invoice as PDF (currently mock PDF response).

Auth: Yes

Success `200`:
- `Content-Type: application/pdf`
- `Content-Disposition: attachment; filename=invoice_<id>.pdf`

Possible errors:
- `404` invoice not found

## 4.6 Inventory Routes

Base: `/api/inventory`

### POST `/api/inventory`

Add inventory item.

Auth: Yes

Body:
```json
{
  "name": "Indomie Carton",
  "quantity": 20,
  "price": 8000,
  "costPrice": 6500,
  "category": "Stock",
  "lowStockThresh": 5
}
```

Required:
- `name`
- `quantity`
- `price`

Defaults:
- `costPrice`: `0.0`
- `category`: `Other`
- `lowStockThresh`: `5`

Success `201`:
```json
{
  "message": "Inventory item added successfully!",
  "item": {
    "id": "uuid",
    "userId": "uuid",
    "name": "Indomie Carton",
    "quantity": 20,
    "price": 8000,
    "costPrice": 6500,
    "category": "Stock",
    "lowStockThresh": 5,
    "createdAt": "2026-06-13T09:30:00.000Z",
    "updatedAt": "2026-06-13T09:30:00.000Z"
  }
}
```

### GET `/api/inventory`

List user inventory, sorted by name.

Auth: Yes

Success `200`:
```json
[
  {
    "id": "uuid",
    "userId": "uuid",
    "name": "Indomie Carton",
    "quantity": 3,
    "price": 8000,
    "costPrice": 6500,
    "category": "Stock",
    "lowStockThresh": 5,
    "createdAt": "2026-06-13T09:30:00.000Z",
    "updatedAt": "2026-06-13T09:30:00.000Z",
    "isLowStock": true
  }
]
```

### PATCH `/api/inventory/:id`

Update inventory item.

Auth: Yes

Body (partial):
```json
{
  "quantity": 15,
  "price": 8500,
  "lowStockThresh": 4
}
```

Success `200`:
```json
{
  "message": "Stock item updated successfully!",
  "item": { "...": "updated item" }
}
```

Possible errors:
- `404` not found or unauthorized

### DELETE `/api/inventory/:id`

Delete inventory item.

Auth: Yes

Success `200`:
```json
{
  "message": "Item permanently deleted from inventory."
}
```

Possible errors:
- `404` not found or unauthorized

## 5. Data Models Frontend Should Expect

From Prisma schema:

### User
- `id`: uuid string
- `fullName`: string
- `businessName`: string
- `email`: unique string
- `phone`: string | null
- `balance`: number
- `currency`: string (`NGN` default)
- `language`: string (`english` default)
- `notifications`: JSON object

### Transaction
- `id`: uuid
- `reference`: unique string (`TXN-...` format generated at create)
- `type`: string (`revenue` or `expense` in code)
- `amount`: number
- `category`: string
- `description`: string
- `date`: datetime
- `note`: string | null
- `status`: string (`completed` default)

### Inventory
- `id`: uuid
- `name`: string
- `quantity`: integer
- `price`: number
- `costPrice`: number
- `category`: string
- `lowStockThresh`: integer

### Invoice
- `id`: uuid
- `customer`: string
- `dueDate`: datetime
- `totalAmount`: number
- `status`: string (`draft`, `sent`, `paid` expected by implementation)
- `items`: array of invoice items

## 6. Frontend Integration Checklist

1. Save JWT from signup/login and attach it to all protected requests.
2. On `401` or `403`, clear token and redirect user to login.
3. Use `type=income` for transaction filter requests from UI when you want revenue records.
4. Parse money fields as numbers and format them on the UI.
5. For `/api/invoices/:id/pdf`, handle as file download (blob).
6. For update endpoints (`PATCH`, `PUT`), send only fields you want changed.

## 7. Quick Request Examples

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"secret123"}'
```

### Fetch transactions
```bash
curl http://localhost:5000/api/transactions \
  -H "Authorization: Bearer <token>"
```

### Create invoice
```bash
curl -X POST http://localhost:5000/api/invoices \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "customer":"Abiola Ventures",
    "dueDate":"2026-06-20",
    "items":[{"description":"Rice Bag","quantity":2,"price":45000}]
  }'
```

## 8. Source Files Used (Node only)

- backend/node/src/server.js
- backend/node/src/middleware/authMiddleware.js
- backend/node/src/routes/authRoutes.js
- backend/node/src/routes/settingsRoutes.js
- backend/node/src/routes/transactionRoutes.js
- backend/node/src/routes/dashboardRoutes.js
- backend/node/src/routes/invoiceRoutes.js
- backend/node/src/routes/inventoryRoutes.js
- backend/node/src/controller/authController.js
- backend/node/src/controller/settingsController.js
- backend/node/src/controller/transactionController.js
- backend/node/src/controller/dashboardController.js
- backend/node/src/controller/invoiceController.js
- backend/node/src/controller/inventoryController.js
- backend/node/prisma/schema.prisma

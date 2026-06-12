/* eslint-disable no-console */
const crypto = require('crypto');

const BASE_URL = process.env.API_BASE_URL || 'http://localhost:3003';

const run = async () => {
  const stamp = Date.now();
  const random = crypto.randomBytes(3).toString('hex');
  const email = `apitest_${stamp}_${random}@example.com`;
  const password = 'Pass1234!';

  let token = null;
  let transactionId = null;
  let inventoryId = null;
  let invoiceId = null;

  const summary = [];

  const call = async ({ name, method, path, body, auth = false, expectJson = true }) => {
    const headers = { 'Content-Type': 'application/json' };
    if (auth && token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    let payload;
    if (expectJson) {
      try {
        payload = await response.json();
      } catch (_) {
        payload = null;
      }
    } else {
      payload = await response.text();
    }

    const result = {
      name,
      method,
      path,
      status: response.status,
      ok: response.ok,
      body: payload,
    };

    summary.push(result);
    const mark = response.ok ? 'PASS' : 'FAIL';
    console.log(`[${mark}] ${method} ${path} -> ${response.status}`);

    return result;
  };

  try {
    console.log(`Testing API at ${BASE_URL}`);

    const signup = await call({
      name: 'Signup',
      method: 'POST',
      path: '/api/auth/signup',
      body: {
        fullName: 'API Test User',
        businessName: 'API Test Shop',
        email,
        phone: '08030000000',
        password,
      },
    });

    if (signup.ok && signup.body && signup.body.token) {
      token = signup.body.token;
    }

    const login = await call({
      name: 'Login',
      method: 'POST',
      path: '/api/auth/login',
      body: { email, password },
    });

    if (!token && login.ok && login.body && login.body.token) {
      token = login.body.token;
    }

    if (!token) {
      console.log('No auth token acquired from signup/login. Protected routes will likely fail.');
    }

    await call({
      name: 'Get settings',
      method: 'GET',
      path: '/api/user/settings',
      auth: true,
      body: null,
    });

    await call({
      name: 'Update settings',
      method: 'PUT',
      path: '/api/user/settings',
      auth: true,
      body: {
        businessName: 'API Test Shop Updated',
        phone: '08031112222',
        currency: 'NGN',
        language: 'english',
        notifications: {
          dailyPulse: true,
          profitAlerts: true,
          expenseWarnings: true,
          marketingEmails: false,
        },
      },
    });

    const createTx = await call({
      name: 'Create transaction',
      method: 'POST',
      path: '/api/transactions',
      auth: true,
      body: {
        type: 'revenue',
        amount: 15000,
        category: 'Sales',
        description: 'Test sale for endpoint run',
        date: new Date().toISOString(),
        note: 'Automated API test',
      },
    });

    if (createTx.ok && createTx.body && createTx.body.transaction && createTx.body.transaction.id) {
      transactionId = createTx.body.transaction.id;
    }

    await call({
      name: 'List transactions',
      method: 'GET',
      path: '/api/transactions',
      auth: true,
    });

    await call({
      name: 'Summary transactions',
      method: 'GET',
      path: '/api/transactions/summary?period=week',
      auth: true,
    });

    if (transactionId) {
      await call({
        name: 'Get transaction by id',
        method: 'GET',
        path: `/api/transactions/${transactionId}`,
        auth: true,
      });

      await call({
        name: 'Update transaction',
        method: 'PATCH',
        path: `/api/transactions/${transactionId}`,
        auth: true,
        body: {
          amount: 12000,
          description: 'Updated test sale',
          note: 'Updated during API test',
        },
      });
    }

    const addInventory = await call({
      name: 'Add inventory item',
      method: 'POST',
      path: '/api/inventory',
      auth: true,
      body: {
        name: 'Indomie Carton',
        quantity: 20,
        price: 22000,
        costPrice: 18000,
        category: 'Stock',
        lowStockThresh: 5,
      },
    });

    if (addInventory.ok && addInventory.body && addInventory.body.item && addInventory.body.item.id) {
      inventoryId = addInventory.body.item.id;
    }

    await call({
      name: 'List inventory',
      method: 'GET',
      path: '/api/inventory',
      auth: true,
    });

    if (inventoryId) {
      await call({
        name: 'Update inventory item',
        method: 'PATCH',
        path: `/api/inventory/${inventoryId}`,
        auth: true,
        body: {
          quantity: 15,
          price: 23000,
          lowStockThresh: 4,
        },
      });
    }

    const createInvoice = await call({
      name: 'Create invoice',
      method: 'POST',
      path: '/api/invoices',
      auth: true,
      body: {
        customer: 'Ade Stores',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'draft',
        items: [
          { description: 'Rice Bag', quantity: 2, price: 55000 },
          { description: 'Beans Bag', quantity: 1, price: 42000 },
        ],
      },
    });

    if (createInvoice.ok && createInvoice.body && createInvoice.body.invoice && createInvoice.body.invoice.id) {
      invoiceId = createInvoice.body.invoice.id;
    }

    await call({
      name: 'List invoices',
      method: 'GET',
      path: '/api/invoices',
      auth: true,
    });

    if (invoiceId) {
      await call({
        name: 'Get invoice by id',
        method: 'GET',
        path: `/api/invoices/${invoiceId}`,
        auth: true,
      });

      await call({
        name: 'Update invoice',
        method: 'PATCH',
        path: `/api/invoices/${invoiceId}`,
        auth: true,
        body: {
          customer: 'Ade Stores Updated',
          status: 'draft',
          items: [
            { description: 'Rice Bag', quantity: 1, price: 56000 },
          ],
        },
      });

      await call({
        name: 'Send invoice',
        method: 'POST',
        path: `/api/invoices/${invoiceId}/send`,
        auth: true,
      });

      await call({
        name: 'Invoice PDF',
        method: 'GET',
        path: `/api/invoices/${invoiceId}/pdf`,
        auth: true,
        expectJson: false,
      });
    }

    await call({
      name: 'Dashboard overview',
      method: 'GET',
      path: '/api/dashboard/overview?period=week',
      auth: true,
    });

    await call({
      name: 'Dashboard recent transactions',
      method: 'GET',
      path: '/api/dashboard/recent-transactions?limit=5',
      auth: true,
    });

    await call({
      name: 'Dashboard trends',
      method: 'GET',
      path: '/api/dashboard/trends?period=week',
      auth: true,
    });

    await call({
      name: 'Dashboard expense breakdown',
      method: 'GET',
      path: '/api/dashboard/expense-breakdown?period=week',
      auth: true,
    });

    await call({
      name: 'Dashboard insights',
      method: 'GET',
      path: '/api/dashboard/insights',
      auth: true,
    });

    if (transactionId) {
      await call({
        name: 'Delete transaction',
        method: 'DELETE',
        path: `/api/transactions/${transactionId}`,
        auth: true,
      });
    }

    if (inventoryId) {
      await call({
        name: 'Delete inventory item',
        method: 'DELETE',
        path: `/api/inventory/${inventoryId}`,
        auth: true,
      });
    }

    const passed = summary.filter((s) => s.ok).length;
    const failed = summary.length - passed;

    console.log('\n===== API TEST SUMMARY =====');
    console.log(`Total: ${summary.length}`);
    console.log(`Passed: ${passed}`);
    console.log(`Failed: ${failed}`);

    if (failed > 0) {
      console.log('\nFailed endpoints:');
      summary
        .filter((s) => !s.ok)
        .forEach((s) => {
          const details =
            s.body && typeof s.body === 'object'
              ? JSON.stringify(s.body)
              : String(s.body || '');
          console.log(`- ${s.method} ${s.path} -> ${s.status} ${details}`);
        });
      process.exitCode = 1;
    }
  } catch (error) {
    console.error('Fatal test runner error:', error.message);
    process.exitCode = 1;
  }
};

run();

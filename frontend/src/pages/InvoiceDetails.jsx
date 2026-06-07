import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiSend, FiDownload } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import toast from 'react-hot-toast';

const InvoiceDetails = () => {
  const [invoice, setInvoice] = useState({
    customer: '',
    dueDate: '',
    items: [{ description: '', quantity: 1, price: 0 }],
    status: 'draft'
  });

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [...invoice.items, { description: '', quantity: 1, price: 0 }]
    });
  };

  const removeItem = (index) => {
    const newItems = invoice.items.filter((_, i) => i !== index);
    setInvoice({ ...invoice, items: newItems });
  };

  const updateItem = (index, field, value) => {
    const newItems = [...invoice.items];
    newItems[index][field] = field === 'price' || field === 'quantity' ? parseFloat(value) || 0 : value;
    setInvoice({ ...invoice, items: newItems });
  };

  const calculateTotal = () => {
    return invoice.items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
  };

  const sendInvoice = () => {
    if (!invoice.customer) {
      toast.error('Please add customer name');
      return;
    }
    toast.success('Invoice sent to customer!');
  };

  return (
    <DashboardLayout title="Invoices">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900">New Invoice</h3>
              <p className="text-sm text-gray-500 mt-1">Create and send professional invoices</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                <FiDownload size={20} />
              </button>
            </div>
          </div>

          {/* Customer Info */}
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
              <input
                type="text"
                value={invoice.customer}
                onChange={(e) => setInvoice({ ...invoice, customer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="Enter customer name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={invoice.dueDate}
                onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              />
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-semibold text-gray-900">Items</h4>
              <button
                onClick={addItem}
                className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
              >
                <FiPlus size={16} /> Add item
              </button>
            </div>
            <div className="space-y-3">
              {invoice.items.map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Description"
                    value={item.description}
                    onChange={(e) => updateItem(idx, 'description', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Qty"
                    value={item.quantity}
                    onChange={(e) => updateItem(idx, 'quantity', e.target.value)}
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={item.price}
                    onChange={(e) => updateItem(idx, 'price', e.target.value)}
                    className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                  {invoice.items.length > 1 && (
                    <button
                      onClick={() => removeItem(idx)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 pt-4 mb-6">
            <div className="flex justify-end">
              <div className="w-64">
                <div className="flex justify-between py-2">
                  <span className="font-medium">Subtotal:</span>
                  <span>₦{calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-green-700">₦{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={sendInvoice}
              className="flex-1 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <FiSend size={18} /> Send Invoice
            </button>
            <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Save Draft
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvoiceDetails;
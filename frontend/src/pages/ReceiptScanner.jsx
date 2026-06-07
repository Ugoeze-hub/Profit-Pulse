import React, { useState, useRef } from 'react';
import { FiCamera, FiUpload, FiCheck, FiX, FiImage } from 'react-icons/fi';
import DashboardLayout from '../components/DashboardLayout';
import toast from 'react-hot-toast';

const ReceiptScanner = () => {
  const [image, setImage] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [extractedData, setExtractedData] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        simulateScan();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setExtractedData({
        merchant: "Mama Chioma Provisions",
        date: "2026-06-06",
        total: "₦47,500",
        items: [
          { name: "Indomie Noodles (carton)", amount: "₦24,000" },
          { name: "Pure Water (20 packs)", amount: "₦8,000" },
          { name: "Transport", amount: "₦1,800" }
        ],
        category: "Inventory"
      });
      setScanning(false);
      toast.success('Receipt scanned successfully!');
    }, 2000);
  };

  const confirmTransaction = () => {
    toast.success('Transaction saved to your ledger');
    setImage(null);
    setExtractedData(null);
  };

  const cancelScan = () => {
    setImage(null);
    setExtractedData(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <DashboardLayout title="Receipt Scanner">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <FiCamera className="text-2xl text-green-700" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Scan Receipt</h3>
            <p className="text-sm text-gray-500">Upload or take a photo of your receipt, and AI will extract the details</p>
          </div>

          {!image ? (
            <div 
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-green-400 transition-colors"
            >
              <FiUpload className="text-3xl text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">Click to upload receipt</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img src={image} alt="Receipt" className="rounded-lg max-h-64 w-full object-contain bg-gray-50" />
                <button 
                  onClick={cancelScan}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <FiX size={16} />
                </button>
              </div>

              {scanning ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mb-3"></div>
                  <p className="text-gray-600">AI is analyzing your receipt...</p>
                </div>
              ) : extractedData && (
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-3">
                      <FiCheck className="text-green-600" />
                      <span className="font-medium text-green-900">Extracted Information</span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Merchant:</span>
                        <span className="font-medium">{extractedData.merchant}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span>{extractedData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-bold text-green-700">{extractedData.total}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span className="px-2 py-0.5 bg-green-200 rounded-full text-xs">{extractedData.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={confirmTransaction}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Confirm & Save
                    </button>
                    <button 
                      onClick={cancelScan}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bg-gray-50 rounded-xl p-4 text-center text-sm text-gray-600">
          <p>💡 Tip: For best results, ensure the receipt is well-lit and all text is visible</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReceiptScanner;
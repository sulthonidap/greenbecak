import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Receipt, ArrowLeft } from 'lucide-react';
import { useOrder } from '../context/OrderContext';

const PaymentPage: React.FC = () => {
  const { currentOrder, submitOrder, clearCurrentOrder } = useOrder();
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success'>('pending');
  const navigate = useNavigate();

  if (!currentOrder) {
    navigate('/pesan');
    return null;
  }

  const handlePayment = () => {
    setPaymentStatus('processing');
    
    setTimeout(() => {
      setPaymentStatus('success');
      submitOrder();
    }, 2000);
  };

  const handleBackToHome = () => {
    clearCurrentOrder();
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-800 p-6 text-white">
          <h1 className="text-2xl font-bold">Pembayaran</h1>
          <p className="text-green-50">Selesaikan pembayaran untuk pesanan Anda</p>
        </div>
        
        <div className="p-6">
          {paymentStatus !== 'success' && (
            <>
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Rincian Pesanan</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Kode Becak</span>
                    <span className="font-medium">{currentOrder.pedicabCode}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Jarak</span>
                    <span className="font-medium">{currentOrder.distanceOption.name} ({currentOrder.distanceOption.distance})</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600">Tanggal & Waktu</span>
                    <span className="font-medium">{currentOrder.timestamp.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between py-2 mt-2">
                    <span className="text-gray-800 font-semibold">Total Pembayaran</span>
                    <span className="text-green-600 font-bold text-xl">
                      Rp {currentOrder.distanceOption.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Metode Pembayaran</h2>
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <input
                      id="qris"
                      type="radio"
                      name="payment-method"
                      checked
                      readOnly
                      className="w-4 h-4 text-green-800 focus:ring-green-400"
                    />
                    <label htmlFor="qris" className="ml-2 block text-sm font-medium text-gray-700">
                      QRIS (OVO, GoPay, Dana, LinkAja, dll)
                    </label>
                  </div>
                  
                  <div className="flex justify-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-48 h-48 bg-white p-4 flex items-center justify-center border border-gray-300 rounded">
                      <div className="w-full h-full bg-gray-200 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">QR Code Pembayaran</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-sm text-gray-500 text-center">
                    Pindai QR code di atas menggunakan aplikasi e-wallet pilihan Anda
                  </p>
                </div>
              </div>
            </>
          )}
          
          {paymentStatus === 'pending' && (
            <button
              onClick={handlePayment}
              className="w-full bg-green-800 hover:bg-green-600 text-white font-medium rounded-lg text-sm px-5 py-3 text-center transition duration-300"
            >
              Bayar Sekarang
            </button>
          )}
          
          {paymentStatus === 'processing' && (
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mb-2"></div>
              <p className="text-blue-700 font-medium">Memproses pembayaran Anda...</p>
            </div>
          )}
          
          {paymentStatus === 'success' && (
            <div className="text-center">
              <div className="bg-green-50 rounded-lg p-6 mb-6">
                <CheckCircle size={48} className="mx-auto text-green-800 mb-4" />
                <h3 className="text-green-700 font-semibold text-2xl mb-2">Pembayaran Berhasil!</h3>
                <p className="text-green-600 mb-4">Pesanan Anda telah dikonfirmasi dan sedang diproses.</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold flex items-center">
                    <Receipt size={20} className="mr-2" />
                    Bukti Pembayaran
                  </h4>
                  <span className="text-sm text-gray-500">#{currentOrder.id}</span>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Status</span>
                    <span className="text-green-800 font-medium">Lunas</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Kode Becak</span>
                    <span className="font-medium">{currentOrder.pedicabCode}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Jarak</span>
                    <span className="font-medium">{currentOrder.distanceOption.name} ({currentOrder.distanceOption.distance})</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Tanggal & Waktu</span>
                    <span className="font-medium">{currentOrder.timestamp.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600">Metode Pembayaran</span>
                    <span className="font-medium">QRIS</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-800 font-semibold">Total Pembayaran</span>
                    <span className="text-green-600 font-bold text-xl">
                      Rp {currentOrder.distanceOption.price.toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBackToHome}
                className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg text-sm px-5 py-3 transition duration-300"
              >
                <ArrowLeft size={16} className="mr-2" />
                Kembali ke Beranda
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
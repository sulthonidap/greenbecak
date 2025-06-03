import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder, DistanceOption } from '../context/OrderContext';
import { MapPin, CheckCircle, Phone, CarFront, Bike, ArrowLeft } from 'lucide-react';

const OrderPage: React.FC = () => {
  const { distanceOptions, setOrder } = useOrder();
  const [pedicabCode, setPedicabCode] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [selectedOption, setSelectedOption] = useState<DistanceOption | null>(null);
  const [error, setError] = useState('');
  const [selectedTransport, setSelectedTransport] = useState<'becak' | 'delman' | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!pedicabCode.trim()) {
      setError(`${selectedTransport === 'becak' ? 'Kode Becak' : 'Kode Delman'} harus diisi!`);
      return;
    }
    
    if (!whatsappNumber.trim()) {
      setError('Nomor WhatsApp harus diisi!');
      return;
    }
    
    if (!selectedOption) {
      setError('Silahkan pilih jarak perjalanan!');
      return;
    }
    
    setOrder(pedicabCode, selectedOption, whatsappNumber);
    navigate('/pembayaran');
  };

  if (!selectedTransport) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-800 p-6 text-white">
            <h1 className="text-2xl font-bold">Pilih Transportasi</h1>
            <p className="text-green-50">Pilih jenis transportasi yang ingin Anda pesan</p>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedTransport('becak')}
                className="flex flex-col items-center p-6 border rounded-lg hover:bg-green-50 hover:border-green-800 transition-all"
              >
                <Bike size={48} className="text-green-800 mb-2" />
                <span className="font-medium">Becak Listrik</span>
              </button>
              <button
                onClick={() => setSelectedTransport('delman')}
                className="flex flex-col items-center p-6 border rounded-lg hover:bg-blue-50 hover:border-blue-800 transition-all"
              >
                <CarFront size={48} className="text-blue-800 mb-2" />
                <span className="font-medium">Delman</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isDelman = selectedTransport === 'delman';
  const themeColor = isDelman ? 'blue' : 'green';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className={`bg-${themeColor}-800 p-6 text-white relative`}>
          <button
            onClick={() => setSelectedTransport(null)}
            className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center text-white hover:text-gray-200 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            <span>Kembali</span>
          </button>
        </div>
          <div className=
          {`bg-${themeColor}-800 p-6 text-white relative`}
          >
            <h1 className="text-2xl font-bold">Pesan {isDelman ? 'Delman' : 'GreenBecak'}</h1>
            <p className="text-${themeColor}-50">Isi formulir di bawah untuk memesan perjalanan Anda</p>
          </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-500 rounded-md">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <label htmlFor="pedicabCode" className="block mb-2 text-sm font-medium text-gray-700">
              Kode {isDelman ? 'Delman' : 'Becak'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MapPin size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                id="pedicabCode"
                value={pedicabCode}
                onChange={(e) => {
                  setPedicabCode(e.target.value);
                  setError('');
                }}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${themeColor}-800 focus:border-${themeColor}-800 block w-full pl-10 p-2.5`}
                placeholder={`Masukkan kode ${isDelman ? 'delman' : 'becak'} (contoh: ${isDelman ? 'DL' : 'GT'}-123)`}
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Kode {isDelman ? 'delman' : 'becak'} terdapat pada bagian depan {isDelman ? 'delman' : 'becak'} atau bisa ditanyakan kepada pengemudi
            </p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="whatsappNumber" className="block mb-2 text-sm font-medium text-gray-700">
              Nomor WhatsApp
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Phone size={18} className="text-gray-400" />
              </div>
              <input
                type="tel"
                id="whatsappNumber"
                value={whatsappNumber}
                onChange={(e) => {
                  setWhatsappNumber(e.target.value);
                  setError('');
                }}
                className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-${themeColor}-800 focus:border-${themeColor}-800 block w-full pl-10 p-2.5`}
                placeholder="Masukkan nomor WhatsApp (contoh: 08123456789)"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Nomor WhatsApp akan digunakan untuk konfirmasi pesanan dan komunikasi dengan pengemudi
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="block mb-3 text-sm font-medium text-gray-700">
              Pilih Jarak Perjalanan
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {distanceOptions.map((option) => (
                <div 
                  key={option.id}
                  onClick={() => {
                    setSelectedOption(option);
                    setError('');
                  }}
                  className={`cursor-pointer border rounded-lg p-4 transition-all ${
                    selectedOption?.id === option.id 
                      ? `border-${themeColor}-800 bg-${themeColor}-50 ring-2 ring-${themeColor}-800`
                      : 'border-gray-200 hover:border-green-200 hover:bg-green-50'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-gray-900">{option.name}</h4>
                    {selectedOption?.id === option.id && (
                      <CheckCircle size={18} className={`text-${themeColor}-800`} />
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">{option.distance}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    Rp {option.price.toLocaleString('id-ID')}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">* {option.destination}</p>
                  
                </div>
              ))}
            </div>
          </div>
          
          <button
            type="submit"
            className={`w-full bg-${themeColor}-800 hover:bg-${themeColor}-600 text-white font-medium rounded-lg text-sm px-5 py-3 text-center transition duration-300`}
          >
            Lanjutkan ke Pembayaran
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;
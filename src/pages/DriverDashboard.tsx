import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  List, MapPin, User, Clock, LogOut, 
  AlertCircle, CheckCircle, X, ChevronDown, ChevronUp,
  Calendar, DollarSign
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrder, Order } from '../context/OrderContext';

const DriverHome: React.FC = () => {
  const { orders, acceptOrder, completeOrder, cancelOrder } = useOrder();
  const [isOnline, setIsOnline] = useState(true);
  const [driverId] = useState('driver1');
  
  const pendingOrders = orders.filter(order => order.status === 'pending');
  const myActiveOrders = orders.filter(
    order => order.status === 'accepted' && order.driverId === driverId
  );
  const completedOrders = orders.filter(
    order => order.status === 'completed' && order.driverId === driverId
  );
  
  const totalEarnings = completedOrders.reduce(
    (sum, order) => sum + order.distanceOption.price, 
    0
  );
  
  const handleAcceptOrder = (orderId: string) => {
    acceptOrder(orderId, driverId);
  };
  
  const handleCompleteOrder = (orderId: string) => {
    completeOrder(orderId);
  };
  
  const handleCancelOrder = (orderId: string) => {
    cancelOrder(orderId);
  };
  
  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };
  
  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Dashboard Driver</h1>
        <div className="flex items-center">
          <span className="mr-2 text-sm font-medium text-gray-700">Status:</span>
          <button
            onClick={toggleOnlineStatus}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              isOnline 
                ? 'bg-green-800 text-white hover:bg-green-600' 
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            {isOnline ? 'Online' : 'Offline'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Calendar className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Total Perjalanan</h3>
              <p className="text-3xl font-bold text-blue-600">{completedOrders.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <DollarSign className="w-8 h-8 text-green-800 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Total Pendapatan</h3>
              <p className="text-3xl font-bold text-green-600">
                Rp {totalEarnings.toLocaleString('id-ID')}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {!isOnline && (
        <div className="mb-6 p-4 bg-yellow-50 text-yellow-700 rounded-md flex items-center">
          <AlertCircle size={20} className="mr-2" />
          <span>Anda sedang offline. Aktifkan status online untuk menerima pesanan.</span>
        </div>
      )}
      
      {isOnline && (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Pesanan Aktif</h2>
            {myActiveOrders.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {myActiveOrders.map(order => (
                  <div key={order.id} className="bg-white p-5 rounded-lg shadow-md border-l-4 border-blue-500">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{order.pedicabCode}</h3>
                        <p className="text-gray-500 text-sm">{order.timestamp.toLocaleString('id-ID')}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">Aktif</span>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-700"><span className="font-medium">Jarak:</span> {order.distanceOption.name} ({order.distanceOption.distance})</p>
                      <p className="text-gray-700"><span className="font-medium">Biaya:</span> Rp {order.distanceOption.price.toLocaleString('id-ID')}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCompleteOrder(order.id)}
                        className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 font-medium py-2 px-4 rounded-md flex items-center justify-center"
                      >
                        <CheckCircle size={16} className="mr-1" />
                        Selesai
                      </button>
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 font-medium py-2 px-4 rounded-md flex items-center justify-center"
                      >
                        <X size={16} className="mr-1" />
                        Batalkan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <Clock size={48} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500">Anda belum memiliki pesanan aktif.</p>
              </div>
            )}
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Pesanan Tersedia</h2>
            {pendingOrders.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {pendingOrders.map(order => (
                  <div key={order.id} className="bg-white p-5 rounded-lg shadow-md border-l-4 border-yellow-500">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{order.pedicabCode}</h3>
                        <p className="text-gray-500 text-sm">{order.timestamp.toLocaleString('id-ID')}</p>
                      </div>
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded">Menunggu</span>
                    </div>
                    <div className="mb-4">
                      <p className="text-gray-700"><span className="font-medium">Jarak:</span> {order.distanceOption.name} ({order.distanceOption.distance})</p>
                      <p className="text-gray-700"><span className="font-medium">Biaya:</span> Rp {order.distanceOption.price.toLocaleString('id-ID')}</p>
                    </div>
                    <button
                      onClick={() => handleAcceptOrder(order.id)}
                      className="w-full bg-green-800 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md"
                    >
                      Terima Pesanan
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <Clock size={48} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500">Belum ada pesanan baru saat ini.</p>
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Riwayat Perjalanan</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kode Becak
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Jarak
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pendapatan
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {completedOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.timestamp.toLocaleString('id-ID')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.pedicabCode}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.distanceOption.name} ({order.distanceOption.distance})
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          Rp {order.distanceOption.price.toLocaleString('id-ID')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Total Pendapatan
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                        Rp {totalEarnings.toLocaleString('id-ID')}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              {completedOrders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Belum ada perjalanan yang diselesaikan
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Profile: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Profil Saya</h1>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 flex items-center border-b border-gray-200">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={32} className="text-gray-600" />
          </div>
          <div className="ml-6">
            <h2 className="text-xl font-semibold">Budi Santoso</h2>
            <p className="text-gray-500">ID: driver1</p>
          </div>
        </div>
        
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-medium mb-4">Informasi Pribadi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">budi.santoso@example.com</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nomor Telepon</p>
              <p className="font-medium">+62 812-3456-7890</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tanggal Bergabung</p>
              <p className="font-medium">01 Januari 2025</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="inline-flex items-center">
                <span className="w-2 h-2 bg-green-800 rounded-full mr-2"></span>
                <span className="font-medium">Aktif</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-lg font-medium mb-4">GreenBecak</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Kode Becak</p>
              <p className="font-medium">GT-001</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status Becak</p>
              <p className="inline-flex items-center">
                <span className="w-2 h-2 bg-green-800 rounded-full mr-2"></span>
                <span className="font-medium">Beroperasi</span>
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Kapasitas Baterai</p>
              <p className="font-medium">80%</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Jarak Tempuh Tersisa</p>
              <p className="font-medium">24 km</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DriverDashboard: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64 bg-blue-800">
          <div className="flex items-center h-16 px-4 bg-blue-900">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">GT</span>
              </div>
              <span className="ml-2 text-white text-lg font-semibold">Driver Panel</span>
            </div>
          </div>
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1">
              <Link to="/driver" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white bg-blue-900">
                <List className="mr-3 h-6 w-6 text-blue-300" />
                Dashboard
              </Link>
              <Link to="/driver/profile" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-blue-100 hover:bg-blue-700 hover:text-white">
                <User className="mr-3 h-6 w-6 text-blue-300" />
                Profil
              </Link>
              <button
                onClick={handleLogout}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-blue-100 hover:bg-blue-700 hover:text-white w-full text-left"
              >
                <LogOut className="mr-3 h-6 w-6 text-blue-300" />
                Keluar
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation for mobile */}
        <div className="md:hidden">
          <div className="flex items-center justify-between bg-blue-800 border-b border-blue-700 px-4 py-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">GT</span>
              </div>
              <span className="ml-2 text-white text-lg font-semibold">Driver</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-blue-200 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
          </div>
          
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="bg-blue-800 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/driver" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/driver/profile" 
                className="block px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-700 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profil
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-100 hover:bg-blue-700 hover:text-white"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <Routes>
            <Route path="/" element={<DriverHome />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default DriverDashboard;
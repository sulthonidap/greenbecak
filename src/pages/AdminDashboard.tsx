import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { 
  Users, Clock, CheckSquare, BarChart2, LogOut, 
  Settings, ChevronDown, ChevronUp, DollarSign
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrder, Order } from '../context/OrderContext';

interface DriverStatus {
  id: string;
  name: string;
  status: 'online' | 'offline';
  lastActive: Date;
  location: string;
  totalTrips: number;
  totalEarnings: number;
}

// Mock data
const drivers: DriverStatus[] = [
  { 
    id: 'D001', 
    name: 'Budi Santoso', 
    status: 'online', 
    lastActive: new Date(), 
    location: 'Jl. Malioboro',
    totalTrips: 156,
    totalEarnings: 3120000
  },
  { 
    id: 'D002', 
    name: 'Ahmad Reza', 
    status: 'online', 
    lastActive: new Date(), 
    location: 'Jl. Pasar Kembang',
    totalTrips: 143,
    totalEarnings: 2860000
  },
  { 
    id: 'D003', 
    name: 'Joko Widodo', 
    status: 'offline', 
    lastActive: new Date(Date.now() - 3600000), 
    location: 'Jl. Kaliurang',
    totalTrips: 98,
    totalEarnings: 1960000
  },
  { 
    id: 'D004', 
    name: 'Siti Rahma', 
    status: 'online', 
    lastActive: new Date(), 
    location: 'Jl. Magelang',
    totalTrips: 167,
    totalEarnings: 3340000
  },
  { 
    id: 'D005', 
    name: 'Dewi Lestari', 
    status: 'offline', 
    lastActive: new Date(Date.now() - 7200000), 
    location: 'Jl. Solo',
    totalTrips: 134,
    totalEarnings: 2680000
  },
];

const Dashboard: React.FC = () => {
  const { orders } = useOrder();
  
  const activeOrders = orders.filter(order => order.status === 'accepted');
  const completedOrders = orders.filter(order => order.status === 'completed');
  const onlineDrivers = drivers.filter(driver => driver.status === 'online');
  
  const totalSystemEarnings = drivers.reduce((sum, driver) => sum + driver.totalEarnings, 0);
  const totalSystemTrips = drivers.reduce((sum, driver) => sum + driver.totalTrips, 0);
  
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
              <Users size={24} className="text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-blue-500">Driver Online</p>
              <h3 className="text-2xl font-bold text-blue-700">{onlineDrivers.length}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-5 rounded-lg border border-green-100">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
              <Clock size={24} className="text-green-800" />
            </div>
            <div>
              <p className="text-sm text-green-800">Pesanan Aktif</p>
              <h3 className="text-2xl font-bold text-green-700">{activeOrders.length}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 p-5 rounded-lg border border-purple-100">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
              <CheckSquare size={24} className="text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-purple-500">Total Perjalanan</p>
              <h3 className="text-2xl font-bold text-purple-700">{totalSystemTrips}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-amber-50 p-5 rounded-lg border border-amber-100">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mr-4">
              <DollarSign size={24} className="text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-amber-500">Total Pendapatan</p>
              <h3 className="text-2xl font-bold text-amber-700">
                Rp {totalSystemEarnings.toLocaleString('id-ID')}
              </h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Pendapatan Driver</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Driver
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Perjalanan
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Pendapatan
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lokasi Terakhir
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {drivers.map((driver) => (
                  <tr key={driver.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {driver.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {driver.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        driver.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {driver.status === 'online' ? 'Online' : 'Offline'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {driver.totalTrips}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      Rp {driver.totalEarnings.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {driver.location}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Total Keseluruhan
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                    {totalSystemTrips}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                    Rp {totalSystemEarnings.toLocaleString('id-ID')}
                  </td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Pesanan Terbaru</h2>
        {orders.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID Pesanan
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kode Becak
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Jarak
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Harga
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Waktu
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.pedicabCode}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.distanceOption.name} ({order.distanceOption.distance})
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      Rp {order.distanceOption.price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'accepted' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status === 'pending' ? 'Menunggu' :
                         order.status === 'accepted' ? 'Diterima' :
                         order.status === 'completed' ? 'Selesai' :
                         'Dibatalkan'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.timestamp.toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            Belum ada pesanan yang dibuat.
          </div>
        )}
      </div>
    </div>
  );
};

const SettingsPage: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Pengaturan</h1>
      <div className="bg-white shadow rounded-lg divide-y divide-gray-200">
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900">Pengaturan Umum</h3>
          <p className="mt-1 text-sm text-gray-500">
            Pengaturan umum aplikasi GreenBecak.
          </p>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900">Pengaturan Tarif</h3>
          <p className="mt-1 text-sm text-gray-500">
            Atur tarif untuk berbagai jarak perjalanan.
          </p>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-medium text-gray-900">Pengaturan Notifikasi</h3>
          <p className="mt-1 text-sm text-gray-500">
            Atur notifikasi untuk admin dan pengemudi.
          </p>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
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
        <div className="flex flex-col w-64 bg-gray-800">
          <div className="flex items-center h-16 px-4 bg-gray-900">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-800 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">GT</span>
              </div>
              <span className="ml-2 text-white text-lg font-semibold">Admin Panel</span>
            </div>
          </div>
          <div className="flex flex-col flex-grow pt-5 overflow-y-auto">
            <nav className="flex-1 px-2 space-y-1">
              <Link to="/admin" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-white bg-gray-900">
                <BarChart2 className="mr-3 h-6 w-6 text-gray-300" />
                Dashboard
              </Link>
              <Link to="/admin/settings" className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white">
                <Settings className="mr-3 h-6 w-6 text-gray-400" />
                Pengaturan
              </Link>
              <button
                onClick={handleLogout}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
              >
                <LogOut className="mr-3 h-6 w-6 text-gray-400" />
                Keluar
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation for mobile */}
        <div className="md:hidden">
          <div className="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-4 py-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-800 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">GT</span>
              </div>
              <span className="ml-2 text-white text-lg font-semibold">Admin</span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isMobileMenuOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </button>
          </div>
          
          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="bg-gray-800 pt-2 pb-3 space-y-1 sm:px-3">
              <Link 
                to="/admin" 
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/admin/settings" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pengaturan
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
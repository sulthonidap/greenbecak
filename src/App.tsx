import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import OrderPage from './pages/OrderPage';
import PaymentPage from './pages/PaymentPage';
import AdminLogin from './pages/AdminLogin';
import DriverLogin from './pages/DriverLogin';
import AdminDashboard from './pages/AdminDashboard';
import DriverDashboard from './pages/DriverDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Komponen untuk menampilkan layout dengan atau tanpa Navbar dan Footer
const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Cek apakah path saat ini adalah dashboard admin atau driver
  const isDashboardPath = location.pathname.startsWith('/admin') || location.pathname.startsWith('/driver');
  
  // Tampilkan Navbar dan Footer hanya jika pengguna tidak terautentikasi atau tidak berada di halaman dashboard
  const showNavbarAndFooter = !isAuthenticated || !isDashboardPath;
  
  return (
    <div className="flex flex-col min-h-screen">
      {showNavbarAndFooter && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pesan" element={<OrderPage />} />
          <Route path="/pembayaran" element={<PaymentPage />} />
          <Route path="/login-admin" element={<AdminLogin />} />
          <Route path="/login-driver" element={<DriverLogin />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute userType="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/driver/*" 
            element={
              <ProtectedRoute userType="driver">
                <DriverDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      {showNavbarAndFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <OrderProvider>
          <AppLayout />
        </OrderProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
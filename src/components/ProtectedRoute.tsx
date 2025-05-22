import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  userType: 'admin' | 'driver';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, userType }) => {
  const { isAuthenticated, userType: currentUserType } = useAuth();

  if (!isAuthenticated || currentUserType !== userType) {
    return <Navigate to={userType === 'admin' ? '/login-admin' : '/login-driver'} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
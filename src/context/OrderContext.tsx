import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface DistanceOption {
  id: string;
  name: string;
  distance: string;
  price: number;
  destination: string;
}

export interface Order {
  id: string;
  pedicabCode: string;
  distanceOption: DistanceOption;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'completed' | 'cancelled';
  driverId?: string;
  whatsappNumber?: string;
}

interface OrderContextType {
  currentOrder: Order | null;
  orders: Order[];
  distanceOptions: DistanceOption[];
  setOrder: (pedicabCode: string, distanceOption: DistanceOption, whatsappNumber: string) => void;
  submitOrder: () => void;
  acceptOrder: (orderId: string, driverId: string) => void;
  completeOrder: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
  clearCurrentOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const distanceOptions: DistanceOption[] = [
  { id: 'dekat', name: 'Dekat', distance: '< 3 km', price: 10000, destination: 'Benteng vredeburg, Bank Indonesia' },
  { id: 'sedang', name: 'Sedang', distance: '3-7 km', price: 20000, destination: 'Taman Sari, Alun-Alun Selatan' },
  { id: 'jauh', name: 'Jauh', distance: '> 7 km', price: 30000, destination: 'Tugu Jogja, Stasiun Lempuyangan' }
];

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);

  const setOrder = (pedicabCode: string, distanceOption: DistanceOption, whatsappNumber: string) => {
    setCurrentOrder({
      id: `order-${Date.now()}`,
      pedicabCode,
      distanceOption,
      whatsappNumber,
      timestamp: new Date(),
      status: 'pending'
    });
  };

  const submitOrder = () => {
    if (currentOrder) {
      setOrders([...orders, currentOrder]);
    }
  };

  const acceptOrder = (orderId: string, driverId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'accepted', driverId } 
        : order
    ));
  };

  const completeOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'completed' } 
        : order
    ));
  };

  const cancelOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId 
        ? { ...order, status: 'cancelled' } 
        : order
    ));
  };

  const clearCurrentOrder = () => {
    setCurrentOrder(null);
  };

  return (
    <OrderContext.Provider value={{ 
      currentOrder, 
      orders, 
      distanceOptions,
      setOrder, 
      submitOrder, 
      acceptOrder, 
      completeOrder, 
      cancelOrder,
      clearCurrentOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
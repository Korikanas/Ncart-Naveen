import React, { useState } from 'react';
import { INR } from '../data/products';

export default function Orders({ orders, onGenerateInvoice, onUpdateStatus }) {
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleOrder = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Shipped': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Processing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="container-center my-6">
        <div className="rounded-xl border dark:border-gray-800 p-8 text-center">
          <h2 className="text-xl font-bold mb-2">No Orders Yet</h2>
          <p className="text-gray-600 dark:text-gray-400">Your orders will appear here once you make a purchase.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-center my-6">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-sm border dark:border-gray-800">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold">Order #{order.id}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(order.date).toLocaleDateString()} • {new Date(order.date).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
                <button 
                  onClick={() => onGenerateInvoice(order)}
                  className="px-3 py-1 rounded-xl border dark:border-gray-800 text-sm"
                >
                  Invoice
                </button>
                <button 
                  onClick={() => toggleOrder(order.id)}
                  className="p-1 rounded-lg border dark:border-gray-800"
                >
                  {expandedOrder === order.id ? '▲' : '▼'}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <div className="text-sm">
                <span className="font-medium">Total:</span> {INR.format(order.total)}
              </div>
              <div className="text-sm">
                <span className="font-medium">Payment:</span> {order.paymentMethod}
              </div>
            </div>

            {expandedOrder === order.id && (
              <div className="mt-4 pt-4 border-t dark:border-gray-800">
                <h4 className="font-medium mb-3">Items</h4>
                <div className="space-y-3 mb-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                      <div className="flex-grow">
                        <div className="font-medium text-sm">{item.name}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {INR.format(item.price)} × {item.qty}
                        </div>
                      </div>
                      <div className="font-medium">{INR.format(item.price * item.qty)}</div>
                    </div>
                  ))}
                </div>

                <h4 className="font-medium mb-3">Tracking</h4>
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    {order.tracking.steps.map((step, index) => (
                      <div key={index} className={`text-center w-1/5 ${index < order.tracking.steps.length - 1 ? 'relative' : ''}`}>
                        <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center ${
                          step.completed 
                            ? 'bg-green-500 text-white' 
                            : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="text-xs mt-1">{step.name}</div>
                        {step.date && (
                          <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {new Date(step.date).toLocaleDateString()}
                          </div>
                        )}
                        {index < order.tracking.steps.length - 1 && (
                          <div className={`absolute top-3 left-1/2 w-full h-0.5 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-700'
                          }`} style={{ transform: 'translateX(50%)' }}></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <h4 className="font-medium mb-2">Shipping Address</h4>
                <p className="text-sm mb-4">{order.address}</p>

                {/* Admin actions - would be hidden for regular users in a real app */}
                <div className="flex gap-2 mt-4 pt-4 border-t dark:border-gray-800">
                  <button 
                    onClick={() => onUpdateStatus(order.id, 'Processing')}
                    className="px-3 py-1 rounded-xl bg-yellow-600 text-white text-sm"
                  >
                    Processing
                  </button>
                  <button 
                    onClick={() => onUpdateStatus(order.id, 'Shipped')}
                    className="px-3 py-1 rounded-xl bg-blue-600 text-white text-sm"
                  >
                    Shipped
                  </button>
                  <button 
                    onClick={() => onUpdateStatus(order.id, 'Delivered')}
                    className="px-3 py-1 rounded-xl bg-green-600 text-white text-sm"
                  >
                    Delivered
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
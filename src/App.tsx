/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { LiveTracker } from './components/LiveTracker';
import { PurityLab } from './components/PurityLab';
import { WaterCalculator } from './components/WaterCalculator';
import { SubscriptionManager } from './components/SubscriptionManager';
import { CartDrawer } from './components/CartDrawer';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Footer } from './components/Footer';
import { CartItem, Product, DeliveryFrequency, Order, OrderStep } from './types';
import { PRODUCTS, INITIAL_ACTIVE_ORDER } from './data/waterProducts';
import { ShoppingBag, Truck, Droplets } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // 18.9L
      quantity: 4,
      frequency: 'weekly',
      hasEmptyGallonsToExchange: true,
      emptyGallonsCount: 4,
    },
  ]);

  const [activeOrder, setActiveOrder] = useState<Order>(INITIAL_ACTIVE_ORDER);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [completedOrderModal, setCompletedOrderModal] = useState<Order | null>(null);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (
    product: Product,
    quantity: number,
    frequency: DeliveryFrequency,
    hasEmptyExchange: boolean,
    emptyCount: number
  ) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.frequency === frequency
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        updated[existingIdx].hasEmptyGallonsToExchange = hasEmptyExchange;
        return updated;
      }

      return [
        ...prev,
        {
          product,
          quantity,
          frequency,
          hasEmptyGallonsToExchange: hasEmptyExchange,
          emptyGallonsCount: emptyCount,
        },
      ];
    });

    showToast(`เพิ่ม "${product.name}" ลงในตะกร้าเรียบร้อย`);
  };

  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('นำสินค้าออกจากตะกร้าแล้ว');
  };

  const handlePlaceOrder = (newOrder: Order) => {
    setActiveOrder(newOrder);
    setCart([]);
    setIsCartOpen(false);
    setCompletedOrderModal(newOrder);
  };

  const handleUpdateOrderStatus = (status: OrderStep) => {
    setActiveOrder(prev => ({
      ...prev,
      status,
    }));
    const statusText = 
      status === 'sanitizing' ? 'กำลังทำความสะอาดและบรรจุด้วย UV' :
      status === 'transit' ? 'ไรเดอร์กำลังเดินทางนำส่ง' : 'จัดส่งถึงที่หมายสำเร็จแล้ว';
    showToast(`อัปเดตสถานะออเดอร์: ${statusText}`);
  };

  const handleApplyCalculatedPlan = (product: Product, quantity: number, frequency: DeliveryFrequency) => {
    handleAddToCart(product, quantity, frequency, true, quantity);
    setIsCartOpen(true);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9ff] text-[#0b1c30]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 p-4 rounded-2xl bg-[#006194] text-white shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <Droplets className="w-5 h-5 text-sky-200" />
          <span className="text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      <main className="flex-1 pb-16">
        {/* Hero Section */}
        <Hero
          onOrderClick={() => scrollToSection('products')}
          onTrackClick={() => scrollToSection('tracker')}
        />

        {/* Product Catalog & Subscription Options */}
        <ProductCatalog onAddToCart={handleAddToCart} />

        {/* Smart Water Consumption Calculator */}
        <WaterCalculator onApplyPlan={handleApplyCalculatedPlan} />

        {/* Interactive Live Delivery Tracker */}
        <LiveTracker
          order={activeOrder}
          onUpdateOrderStatus={handleUpdateOrderStatus}
        />

        {/* Subscription Calendar & Skip Management */}
        <SubscriptionManager />

        {/* Water Purity & Lab Certificate */}
        <PurityLab />
      </main>

      {/* Bottom Floating Quick Actions for Mobile/Tablet */}
      <div className="md:hidden fixed bottom-3 left-4 right-4 z-30">
        <div className="glass-panel rounded-full p-1.5 shadow-xl flex items-center justify-between border border-sky-200">
          <button
            onClick={() => scrollToSection('tracker')}
            className="flex-1 py-2 px-3 rounded-full text-xs font-semibold text-sky-800 flex items-center justify-center gap-1.5 hover:bg-sky-50 transition-colors"
          >
            <Truck className="w-4 h-4 text-sky-600" />
            <span>เช็กสถานะส่ง</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex-1 py-2 px-4 rounded-full glow-btn-primary text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>ดูตะกร้า ({totalCartCount})</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onPlaceOrder={handlePlaceOrder}
      />

      {/* Order Placement Success Modal */}
      <OrderSuccessModal
        order={completedOrderModal}
        onClose={() => setCompletedOrderModal(null)}
        onGoToTracker={() => {
          setCompletedOrderModal(null);
          scrollToSection('tracker');
        }}
      />

    </div>
  );
}

// App.jsx (updated with payment, orders, tracking, invoice, and account features)
import React, { useMemo, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import Drawer from "./components/Drawer";
import Orders from "./components/Orders";
import Products from "./components/Products";
import Blog from "./components/blog";
import Account from "./components/Account"; // New account component
import Payment from "./components/Payment"; // New payment component
import { initialProducts, INR } from "./data/products";

export default function App() {
  const [dark, setDark] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("new");
  const [sort, setSort] = useState("default");
  const [cartOpen, setCartOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");
  const [showPayment, setShowPayment] = useState(false); // Payment modal state
  const [user, setUser] = useState({
  name: "korikana naveen",
  email: "naveen.korikanas@gmail.com",
  address: "123 Main St, City, Country",
  orders: 0,
  profileImage: null // Add this field
});

  const totalCount = cart.reduce((a, c) => a + c.qty, 0);
  const totalPrice = cart.reduce((a, c) => a + c.qty * c.price, 0);

  const homeProducts = useMemo(() => {
    let list = initialProducts.slice();

    // Filter by category for home page
    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    // Search
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => (p.name + " " + p.desc).toLowerCase().includes(q));
    }

    // Sort by price
    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [query, category, sort]);

  function addToCart(p) {
    setCart((prev) => {
      const idx = prev.findIndex((x) => x.id == p.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 };
        return copy;
      }
      return [...prev, { 
        id: p.id, 
        name: p.name, 
        price: p.price, 
        qty: 1, 
        image: p.img 
      }];
    });
  }

  function changeQty(id, d) {
    setCart((prev) =>
      prev
        .map((x) => (x.id === id ? { ...x, qty: Math.max(1, x.qty + d) } : x))
        .filter((x) => x.qty > 0)
    );
  }

  function removeItem(id) {
    setCart((prev) => prev.filter((x) => x.id !== id));
  }

  function handleCheckout() {
    if (cart.length === 0) return;
    setShowPayment(true);
  }

  function handlePaymentSuccess(paymentMethod) {
    const newOrder = {
      id: Date.now(),
      date: new Date().toISOString(),
      items: [...cart],
      total: totalPrice,
      status: "Processing",
      tracking: {
        status: "Processing",
        steps: [
          { name: "Order Placed", completed: true, date: new Date().toISOString() },
          { name: "Processing", completed: false, date: null },
          { name: "Shipped", completed: false, date: null },
          { name: "Out for Delivery", completed: false, date: null },
          { name: "Delivered", completed: false, date: null }
        ]
      },
      paymentMethod,
      address: user.address
    };
    
    setOrders(prev => [newOrder, ...prev]);
    setCart([]);
    setCartOpen(false);
    setShowPayment(false);
    
    // Update user order count
    setUser(prev => ({ ...prev, orders: prev.orders + 1 }));
  }

  function updateOrderStatus(orderId, status) {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedSteps = order.tracking.steps.map(step => {
          if (step.name === status) {
            return { ...step, completed: true, date: new Date().toISOString() };
          }
          return step;
        });
        
        return { 
          ...order, 
          status,
          tracking: { ...order.tracking, status, steps: updatedSteps }
        };
      }
      return order;
    }));
  }

  function generateInvoice(order) {
    // In a real app, this would generate a PDF or open a print dialog
    const invoiceWindow = window.open("", "_blank");
    invoiceWindow.document.write(`
      <html>
        <head>
          <title>Invoice #${order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            .header { text-align: center; margin-bottom: 30px; }
            .details { display: flex; justify-content: space-between; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .total { text-align: right; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>NCart Invoice</h1>
            <p>Invoice #${order.id}</p>
            <p>Date: ${new Date(order.date).toLocaleDateString()}</p>
          </div>
          <div class="details">
            <div>
              <h3>Shipping Address:</h3>
              <p>${user.name}</p>
              <p>${user.address}</p>
            </div>
            <div>
              <h3>Payment Method:</h3>
              <p>${order.paymentMethod}</p>
              <p>Status: ${order.status}</p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.qty}</td>
                  <td>${INR.format(item.price)}</td>
                  <td>${INR.format(item.price * item.qty)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">
            <p>Total Amount: ${INR.format(order.total)}</p>
          </div>
          <div style="margin-top: 40px; text-align: center;">
            <p>Thank you for shopping with NCart!</p>
          </div>
        </body>
      </html>
    `);
    invoiceWindow.document.close();
  }

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100">
        <Header 
          dark={dark} 
          setDark={setDark} 
          query={query} 
          setQuery={setQuery} 
          cartOpen={cartOpen} 
          setCartOpen={setCartOpen} 
          totalCount={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          user={user}
        />

        {currentPage === "home" ? (
          <>
            {/* Hero Banner */}
            <section className="container-center mt-6">
              <div className="rounded-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8 relative overflow-hidden">
                <h3 className="text-sm uppercase tracking-wider font-semibold">Ncart</h3>
                <h1 className="text-3xl md:text-5xl font-extrabold mt-1">Still Thinking?</h1>
                <p className="mt-2 opacity-90">Shop the latest technology available here in Ncart.</p>
                <p className="opacity-90">Best deals and discounts every day.</p>
                <button 
                  onClick={() => setCurrentPage("products")}
                  className="mt-4 px-4 py-2 rounded-xl bg-white text-gray-900 font-semibold hover:opacity-90"
                >
                  Shop Now
                </button>
              </div>
            </section>

            {/* Controls */}
            <section className="container-center mt-6">
              <div className="flex flex-col md:flex-row items-stretch gap-3">
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-900">
                  <option value="new">New Launches</option>
                  <option value="Mobiles">Mobiles</option>
                  <option value="Laptops">Laptops</option>
                  <option value="Gadgets">Gadgets</option>
                  <option value="all">All Categories</option>
                </select>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-900">
                  <option value="default">Sort by Price</option>
                  <option value="asc">Low to High</option>
                  <option value="desc">High to Low</option>
                </select>
              </div>
            </section>

            {/* Products */}
            <main className="container-center my-6">
              {homeProducts.length === 0 ? (
                <div className="rounded-xl border dark:border-gray-800 p-6 text-center text-sm">
                  ⚠️ No matching products
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {homeProducts.map((p) => (
                    <ProductCard key={p.id} p={p} onAdd={addToCart} onOpen={setDetail} />
                  ))}
                </div>
              )}
            </main>
          </>
        ) : currentPage === "products" ? (
          // Products Page
          <Products onAdd={addToCart} onOpen={setDetail} query={query} setQuery={setQuery} />
        ) : currentPage === "blog" ? (
          // Blog Page
          <Blog />
        ) : currentPage === "orders" ? (
          // Orders Page
          <Orders 
            orders={orders} 
            onGenerateInvoice={generateInvoice}
            onUpdateStatus={updateOrderStatus}
          />
        ) : currentPage === "account" ? (
          // Account Page
          <Account user={user} setUser={setUser} />
        ) : null}

        <Footer />

        {/* Product Detail Modal */}
        {detail && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/50" onClick={() => setDetail(null)} />
            <div className="absolute left-1/2 top-1/2 w-[92%] max-w-2xl -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <img src={detail.img} alt={detail.name} className="w-full md:w-1/2 h-64 object-cover" />
                <div className="p-5 md:w-1/2">
                  <h3 className="text-xl font-bold">{detail.name}</h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{detail.desc}</p>
                  <div className="mt-3 text-2xl font-extrabold text-rose-500">{INR.format(detail.price)}</div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => { addToCart(detail); setDetail(null); }} className="px-4 py-2 rounded-xl bg-blue-600 text-white">Add to Cart</button>
                    <button onClick={() => setDetail(null)} className="px-4 py-2 rounded-xl border dark:border-gray-800">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cart Drawer */}
        <Drawer open={cartOpen} onClose={() => setCartOpen(false)} title="Your Cart">
          {cart.length === 0 ? (
            <p className="text-sm">Your cart is empty.</p>
          ) : (
            <div className="flex flex-col gap-3 h-full">
              <div className="flex-grow overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-xl border dark:border-gray-800 p-3 mb-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-grow">
                      <div className="font-semibold text-sm">{item.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{INR.format(item.price)} each</div>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => changeQty(item.id, -1)} className="px-2 py-1 rounded-lg border dark:border-gray-800">-</button>
                        <div className="w-8 text-center">{item.qty}</div>
                        <button onClick={() => changeQty(item.id, +1)} className="px-2 py-1 rounded-lg border dark:border-gray-800">+</button>
                        <button onClick={() => removeItem(item.id)} className="ml-2 text-sm text-rose-600">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t dark:border-gray-800 pt-3">
                <div className="flex items-center justify-between text-sm mb-3">
                  <span>Total</span>
                  <strong className="text-lg">{INR.format(totalPrice)}</strong>
                </div>
                <button onClick={handleCheckout} className="w-full px-4 py-2 rounded-xl bg-green-600 text-white">Checkout</button>
              </div>
            </div>
          )}
        </Drawer>

        {/* Payment Modal */}
        {showPayment && (
          <Payment 
            total={totalPrice} 
            onSuccess={handlePaymentSuccess} 
            onClose={() => setShowPayment(false)} 
          />
        )}
      </div>
    </div>
  );
}

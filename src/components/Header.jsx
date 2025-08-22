// components/Header.jsx (updated with profile logo)
import React from "react";

export default function Header({ 
  dark, 
  setDark, 
  query, 
  setQuery, 
  cartOpen, 
  setCartOpen, 
  totalCount,
  currentPage,
  setCurrentPage,
  user
}) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-800">
      <div className="container-center flex items-center justify-between h-16">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold">Ncart</h1>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => setCurrentPage("home")} 
              className={`px-3 py-1 rounded-lg ${currentPage === "home" ? "bg-gray-200 dark:bg-gray-800" : ""}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentPage("products")} 
              className={`px-3 py-1 rounded-lg ${currentPage === "products" ? "bg-gray-200 dark:bg-gray-800" : ""}`}
            >
              Products
            </button>
            <button 
              onClick={() => setCurrentPage("blog")} 
              className={`px-3 py-1 rounded-lg ${currentPage === "blog" ? "bg-gray-200 dark:bg-gray-800" : ""}`}
            >
              Blog
            </button>
            <button 
              onClick={() => setCurrentPage("orders")} 
              className={`px-3 py-1 rounded-lg ${currentPage === "orders" ? "bg-gray-200 dark:bg-gray-800" : ""}`}
            >
              Orders
            </button>
          </nav>
        </div>

        <div className="flex-1 hidden md:block max-w-xl mx-4">
          <div className="flex">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 rounded-l-xl border dark:border-gray-800 px-3 py-2 outline-none bg-white dark:bg-gray-900"
            />
            <button className="rounded-r-xl px-3 py-2 bg-blue-600 text-white">Search</button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Dark mode toggle */}
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-xl border dark:border-gray-800"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          {/* Cart button */}
          <button
            onClick={() => setCartOpen(true)}
            className="p-2 rounded-xl border dark:border-gray-800 relative"
          >
            🛒
            {totalCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </button>

          {/* Profile logo/button */}
          <button
            onClick={() => setCurrentPage("account")}
            className="p-2 rounded-xl border dark:border-gray-800"
            title="My Account"
          >
            {user.profileImage ? (
              <img 
                src={user.profileImage} 
                alt="Profile" 
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t dark:border-gray-800">
        <div className="container-center py-2 flex justify-between">
          <button 
            onClick={() => setCurrentPage("home")} 
            className={`px-3 py-1 text-sm rounded-lg ${currentPage === "home" ? "bg-gray-200 dark:bg-gray-800" : ""}`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage("products")} 
            className={`px-3 py-1 text-sm rounded-lg ${currentPage === "products" ? "bg-gray-200 dark:bg-gray-800" : ""}`}
          >
            Products
          </button>
          <button 
            onClick={() => setCurrentPage("blog")} 
            className={`px-3 py-1 text-sm rounded-lg ${currentPage === "blog" ? "bg-gray-200 dark:bg-gray-800" : ""}`}
          >
            Blog
          </button>
          <button 
            onClick={() => setCurrentPage("orders")} 
            className={`px-3 py-1 text-sm rounded-lg ${currentPage === "orders" ? "bg-gray-200 dark:bg-gray-800" : ""}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setCurrentPage("account")} 
            className={`px-3 py-1 text-sm rounded-lg ${currentPage === "account" ? "bg-gray-200 dark:bg-gray-800" : ""}`}
          >
            Account
          </button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden container-center py-3 border-t dark:border-gray-800">
        <div className="flex">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 rounded-l-xl border dark:border-gray-800 px-3 py-2 outline-none bg-white dark:bg-gray-900 text-sm"
          />
          <button className="rounded-r-xl px-3 py-2 bg-blue-600 text-white text-sm">Search</button>
        </div>
      </div>
    </header>
  );
}
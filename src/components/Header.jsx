export default function Header({ 
  dark, 
  setDark, 
  query, 
  setQuery, 
  cartOpen, 
  setCartOpen, 
  totalCount 
}) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b dark:border-gray-800">
      <div className="container-center py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl font-black">Ncart</div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="hover:underline">Products</a>
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">Orders</a>
          </nav>
        </div>

        <div className="flex-1 hidden md:block max-w-xl">
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
          <button onClick={() => setCartOpen(true)} className="relative px-3 py-2 rounded-xl border dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
            🛒
            {totalCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-rose-600 text-white rounded-full px-1.5 py-0.5">
                {totalCount}
              </span>
            )}
          </button>
          <button onClick={() => setDark((d) => !d)} className="px-3 py-2 rounded-xl border dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800">
            {dark ? "🌙" : "🌞"}
          </button>
        </div>
      </div>

      {/* Mobile search */}
      <div className="md:hidden container-center pb-3">
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
    </header>
  );
}
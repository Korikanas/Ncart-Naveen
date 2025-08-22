// components/Products.jsx
import React, { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { initialProducts } from "../data/products";

export default function Products({ onAdd, onOpen, query, setQuery }) {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const products = useMemo(() => {
    let list = initialProducts.slice();

    // Filter by category
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

  // Get unique categories for filter
  const categories = ["all", ...new Set(initialProducts.map(p => p.category))];

  return (
    <div className="container-center my-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">All Products</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Browse our complete collection of tech products
        </p>
      </div>

      {/* Filters and Sorting */}
      <div className="flex flex-col md:flex-row items-stretch gap-3 mb-6">
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          className="rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-900"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === "all" ? "All Categories" : cat}
            </option>
          ))}
        </select>
        
        <select 
          value={sort} 
          onChange={(e) => setSort(e.target.value)} 
          className="rounded-xl border dark:border-gray-800 px-3 py-2 bg-white dark:bg-gray-900"
        >
          <option value="default">Sort by Price</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>

        <div className="flex-1 md:hidden">
          <div className="flex">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 rounded-xl border dark:border-gray-800 px-3 py-2 outline-none bg-white dark:bg-gray-900"
            />
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="rounded-xl border dark:border-gray-800 p-6 text-center text-sm">
          ⚠️ No matching products found
        </div>
      ) : (
        <>
          <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {products.length} product{products.length !== 1 ? 's' : ''}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} p={p} onAdd={onAdd} onOpen={onOpen} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
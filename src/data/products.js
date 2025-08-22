export const initialProducts = [
  // New
  { id: "p-s22", name: "SAMSUNG Galaxy S22 5G (8GB/128GB)", price: 59999, category: "new", img: "img/s22.jpg", rating: 5, reviews: 725, desc: "6.1” FHD+ | 50MP | 3700 mAh | Snapdragon 8 Gen 1" },
  { id: "p-airmax", name: "Apple AirPods Max (Sky Blue)", price: 59899, category: "new", img: "img/Airpods.webp", rating: 5, reviews: 70, desc: "Bluetooth | Smart Case | USB‑C to Lightning" },
  { id: "p-15pm", name: "iPhone 15 Pro Max (256 GB)", price: 139990, category: "new", img: "img/iPhone_15 - Copy.jpg", rating: 5, reviews: 1235, desc: "6.7” Super Retina XDR | A17 Pro | 48MP" },
  { id: "p-watch5", name: "Samsung Watch 5 Pro LTE", price: 49999, category: "new", img: "img/Samsung Watch.jpg", rating: 5, reviews: 75, desc: "AMOLED | LTE calling | GPS | Titanium" },

  // Mobiles
  { id: "m-s22", name: "SAMSUNG Galaxy S22 5G", price: 59999, category: "Mobiles", img: "img/s22.jpg", rating: 5, reviews: 725, desc: "6.1” FHD+ | 50MP | 3700 mAh" },
  { id: "m-15pm", name: "iPhone 15 Pro Max (256 GB)", price: 139990, category: "Mobiles", img: "img/iPhone_15.jpg", rating: 5, reviews: 1235, desc: "48MP + 12MP + 12MP | A17 Pro" },
  { id: "m-civi", name: "Xiaomi 14 CIVI (12/512)", price: 47999, category: "Mobiles", img: "img/Xiaomi14Civi.jpg", rating: 5, reviews: 127, desc: "6.55” | 50MP | 4700 mAh | 8s Gen 3" },
  { id: "m-11r", name: "OnePlus 11R 5G (16/256)", price: 38760, category: "Mobiles", img: "img/11-R.jpg", rating: 5, reviews: 122, desc: "6.7” | 50MP | 5000 mAh" },
  { id: "m-7a", name: "Google Pixel 7a (8/128)", price: 36999, category: "Mobiles", img: "img/google-pixel-7a.jpg", rating: 5, reviews: 201, desc: "6.1” FHD+ | 64MP OIS | Tensor G2" },

  // Laptops
  { id: "l-mbp-m3pro", name: "MacBook Pro (M3 Pro, 14\")", price: 187990, category: "Laptops", img: "img/macbook-pro.jpg", rating: 5, reviews: 7, desc: "18GB/512GB | macOS Sonoma" },
  { id: "l-galaxybook3", name: "Samsung Galaxy Book3 i5 (16\")", price: 131391, category: "Laptops", img: "img/book3.jpg", rating: 5, reviews: 123, desc: "16GB/512GB | Win 11 Home" },

  // Gadgets
  { id: "g-spigen-pb", name: "Spigen 10000 mAh MagSafe", price: 2399, category: "Gadgets", img: "img/Spigen.jpg", rating: 5, reviews: 764, desc: "20W Wireless | Ultra-compact" },
  { id: "g-buds3", name: "Samsung Galaxy Buds 3 (Silver)", price: 13850, category: "Gadgets", img: "img/buds.avif", rating: 4, reviews: 451, desc: "24-bit Hi-Fi | up to 36H | IP57" },
  { id: "g-dji-avata2", name: "DJI Avata 2 Fly More Combo", price: 139000, category: "Gadgets", img: "img/dji.jpg", rating: 5, reviews: 734, desc: "4K | Built‑in Prop Guard | POV" },
  { id: "g-meta-quest3", name: "Meta Quest 3 (512GB)", price: 64990, category: "Gadgets", img: "img/meta.jpg", rating: 4, reviews: 787, desc: "Mixed Reality | Quest+ Bundle" },
];

export const INR = new Intl.NumberFormat("en-IN", { 
  style: "currency", 
  currency: "INR", 
  maximumFractionDigits: 0 

});

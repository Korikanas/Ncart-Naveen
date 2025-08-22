export const initialProducts = [
  // New
  { id: "p-s22", name: "SAMSUNG Galaxy S22 5G (8GB/128GB)", price: 59999, category: "new", img: "img/s22.jpg", rating: 5, reviews: 725, desc: "6.1” FHD+ | 50MP | 3700 mAh | Snapdragon 8 Gen 1" },
  { id: "g-watch5", name: "Samsung Watch 5 Pro LTE", price: 49999, category: "Gadgets", img: "img/Samsung Watch.jpg", rating: 5, reviews: 75, desc: "AMOLED | LTE calling | GPS | Titanium" },

  // Mobiles
  {id: "m-s24u",name: "Samsung Galaxy S24 Ultra 5G (256 GB)",price: 129999,category: "Mobiles",img: "img/s24.jpg",rating: 4.9,reviews: 950,desc: "6.8\" QHD+ | Snapdragon 8 Gen 3 | 200MP + 50MP + 12MP + 10MP"},
{id: "m-16pm",name: "iPhone 16 Pro Max (256 GB)",price: 149990,category: "Mobiles",img: "img/16pro.webp",rating: 5,reviews: 1100,  desc: "48MP + 12MP + 12MP | A18 Pro | 6.9\" LTPO OLED"},

  { id: "m-civi", name: "Xiaomi 14 CIVI (12/512)", price: 47999, category: "Mobiles", img: "img/Xiaomi14Civi.jpg", rating: 5, reviews: 127, desc: "6.55” | 50MP | 4700 mAh | 8s Gen 3" },
  { id: "m-11r", name: "OnePlus 11R 5G (16/256)", price: 38760, category: "Mobiles", img: "img/11-R.jpg", rating: 5, reviews: 122, desc: "6.7” | 50MP | 5000 mAh" },
  { id: "m-7a", name: "Google Pixel 7a (8/128)", price: 36999, category: "Mobiles", img: "img/google-pixel-7a.jpg", rating: 5, reviews: 201, desc: "6.1” FHD+ | 64MP OIS | Tensor G2" },

  // Laptops
  { id: "l-mbp-m3pro", name: "MacBook Pro (M3 Pro, 14\")", price: 187990, category: "Laptops", img: "img/macbook-pro.jpg", rating: 5, reviews: 7, desc: "18GB/512GB | macOS Sonoma" },
  { id: "l-galaxybook3", name: "Samsung Galaxy Book3 i5 (16\")", price: 131391, category: "Laptops", img: "img/book3.jpg", rating: 5, reviews: 123, desc: "16GB/512GB | Win 11 Home" },

  // Gadgets
{id: "n-unitree-go2",name: "Unitree Go2 Robot Dog Quadruped Robotics", price: 899999,category: "new",img: "img/dog.jpg",rating: 4.8,reviews: 312, desc: "AI Mobility | 4D LIDAR | Autonomous Navigation"},
{id: "g-logi-k480", name: "Logitech K480 Multidevice Bluetooth Tablet Keyboard", price: 2999, category: "Gadgets", img: "img/keybord.jpg",rating: 4.5, reviews: 1485, desc: "Multi-Device | Easy-Switch Dial | Built-in Cradle"},
  { id: "p-15pm", name: "iPhone 15 Pro Max (256 GB)", price: 139990, category: "new", img: "img/iPhone_15.jpg", rating: 5, reviews: 1235, desc: "6.7” Super Retina XDR | A17 Pro | 48MP" },
{ id: "n-sony-fx6", name: "Sony FX6 Cinema Line Full-Frame Digital Zoom Camera", price: 499999, category: "new", img: "img/cam.jpg", rating: 4.9, reviews: 274, desc: "4K Full-Frame | Fast Hybrid AF | Professional Video"},
  { id: "g-spigen-pb", name: "Spigen 10000 mAh MagSafe", price: 2399, category: "Gadgets", img: "img/Spigen.jpg", rating: 5, reviews: 764, desc: "20W Wireless | Ultra-compact" },
  { id: "g-buds3", name: "Samsung Galaxy Buds 3 (Silver)", price: 13850, category: "new", img: "img/buds.avif", rating: 4, reviews: 451, desc: "24-bit Hi-Fi | up to 36H | IP57" },
  { id: "n-dji-avata2", name: "DJI Avata 2 Fly More Combo", price: 139000, category: "new", img: "img/dji.jpg", rating: 5, reviews: 734, desc: "4K | Built‑in Prop Guard | POV" },
  { id: "n-meta-quest3", name: "Meta Quest 3 (512GB)", price: 64990, category: "new", img: "img/meta.jpg", rating: 4, reviews: 787, desc: "Mixed Reality | Quest+ Bundle" },
    { id: "p-airmax", name: "Apple AirPods Max (Sky Blue)", price: 59899, category: "new", img: "img/Airpods.webp", rating: 5, reviews: 70, desc: "Bluetooth | Smart Case | USB‑C to Lightning" },
    
];

export const INR = new Intl.NumberFormat("en-IN", { 
  style: "currency", 
  currency: "INR", 
  maximumFractionDigits: 0 
});
export default function Footer() {
  return (
    <footer className="mt-12 border-t dark:border-gray-800">
      <div className="container-center py-8 grid md:grid-cols-3 gap-6 text-sm">
        <div>
          <p className="font-semibold">Follow me</p>
          <h4 className="text-lg font-bold">Naveen Korikanas</h4>
          <div className="flex items-center gap-3 mt-2">
            <a className="underline" href="https://www.linkedin.com/in/naveen-korikanas/" target="_blank">LinkedIn</a>
            <a className="underline" href="https://www.instagram.com/naveen_korikanas_7/" target="_blank">Instagram</a>
            <a className="underline" href="https://www.youtube.com/channel/UCZTi82unr7fQHUPfY3jmTNA" target="_blank">YouTube</a>
            <a className="underline" href="https://www.facebook.com/naveen.korikana.9" target="_blank">Facebook</a>
          </div>
          <p className="mt-4 text-xs">&copy; 2024 Ncart. All Rights Reserved - Korikanas</p>
        </div>
        <div>
          <h4 className="text-lg font-bold">Feedback</h4>
          <input className="mt-2 w-full rounded-xl border dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2" type="email" placeholder="Let's stay in touch" />
          <h4 className="text-lg font-bold mt-4">Contact</h4>
          <p>Mobile: 6305598421</p>
          <p>Email: Naveen.korikanas.gandhi@gmail.com</p>
          <p className="text-xs mt-1">Feel free to share your feedback</p>
        </div>
        <div>
          <p className="font-semibold">ABOUT US</p>
          <p>🌐 Vizag / India</p>
          <p className="mt-2">Welcome to Ncart, your one-stop destination for all your shopping needs! Whether you're looking for cutting-edge electronics and mobiles, we have something for everyone.</p>
          <p className="mt-2">Shop Anywhere, Anytime — Exclusive Deals Await.</p>
        </div>
      </div>
    </footer>
  );
}
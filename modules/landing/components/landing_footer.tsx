export default function LandingFooter() {
  return (
    <footer className="h-fit bg-secondary text-primary p-8">
      <div className="max-w-6xl mx-auto h-full flex flex-col justify-between">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info  */}
          <div className="space-y-4 col-span-2">
            <h3 className="text-xl font-semibold">Lumina</h3>
            <p className="text-sm opacity-90">
              Handcrafted wooden lamps that bring natural warmth and modern
              design to your space.
            </p>
          </div>

          {/*  Quick Links  */}
          <div className="space-y-4 col-span-1">
            <h4 className="text-lg font-medium">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:opacity-75 transition-opacity">
                  Home
                </a>
              </li>
              {/* <li><a href="#about" className="hover:opacity-75 transition-opacity">About</a></li> */}
              <li>
                <a
                  href="#playground"
                  className="hover:opacity-75 transition-opacity"
                >
                  Configurator
                </a>
              </li>
            </ul>
          </div>

          {/* Products */}
          {/* <div className="space-y-4 col"> */}
          {/* <h4 className="text-lg font-medium">Products</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:opacity-75 transition-opacity">Table Lamps</a></li>
            <li><a href="#" className="hover:opacity-75 transition-opacity">Floor Lamps</a></li>
            <li><a href="#" className="hover:opacity-75 transition-opacity">Pendant Lights</a></li>
            <li><a href="#" className="hover:opacity-75 transition-opacity">Custom Orders</a></li>
          </ul> */}
          {/* </div> */}

          {/*  Contact Info
        <div className="space-y-4">
          <h4 className="text-lg font-medium">Contact</h4>
          <div className="space-y-2 text-sm">
            <p>Email: info@luminacraftwood.com</p>
            <p>Phone: (555) 123-4567</p>
            <p>Address: 123 Craft Street<br>Woodville, WV 12345</p>
          </div>
        </div> */}
        </div>

        {/* <!-- Footer Bottom --> */}
        <div className="border-t border-primary border-opacity-20 mt-6">
          <div className="flex mt-3 flex-col md:flex-row justify-between items-center text-sm opacity-75">
            <p>{`${new Date().getFullYear()} Lumina.`}</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              {/*  <a href="#" className="hover:opacity-75 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-75 transition-opacity">Terms of Service</a>
            <a href="#" className="hover:opacity-75 transition-opacity">Cookie Policy</a> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

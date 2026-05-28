export default function Footer() {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant">
      <div className="w-full py-section-gap px-margin-mobile md:px-margin-desktop flex flex-col md:flex-row justify-between items-start max-w-container-max mx-auto">
        <div className="mb-12 md:mb-0 max-w-xs">
          <div className="flex items-center gap-stack-md mb-6">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-on-primary font-bold">
              M
            </div>
            <span className="text-headline-md font-headline-md font-black text-primary">Mikaelson</span>
          </div>
          <p className="font-body-md text-body-md text-on-secondary-container mb-8">
            Elevating humanity through leadership, technology, and community — one student at a time.
          </p>
          <div className="flex gap-4">
            <a className="text-on-secondary-container hover:text-primary transition-all duration-200 active:scale-95" href="#">
              🌐
            </a>
            <a className="text-on-secondary-container hover:text-primary transition-all duration-200 active:scale-95" href="#">
              ✉️
            </a>
            <a className="text-on-secondary-container hover:text-primary transition-all duration-200 active:scale-95" href="#">
              🤝
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 md:gap-24">
          <div>
            <h5 className="font-label-md text-label-md font-bold text-primary mb-6 uppercase tracking-widest">Club</h5>
            <ul className="space-y-4">
              <li>
                <a className="text-on-secondary-container hover:text-primary transition-all duration-200 font-body-md" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="text-on-secondary-container hover:text-primary transition-all duration-200 font-body-md" href="#">
                  Programs
                </a>
              </li>
              <li>
                <a className="text-on-secondary-container hover:text-primary transition-all duration-200 font-body-md" href="#">
                  Resources
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-label-md text-label-md font-bold text-primary mb-6 uppercase tracking-widest">Support</h5>
            <ul className="space-y-4">
              <li>
                <a className="text-on-secondary-container hover:text-primary transition-all duration-200 font-body-md" href="#">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="text-on-secondary-container hover:text-primary transition-all duration-200 font-body-md" href="#">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a className="text-on-secondary-container hover:text-primary transition-all duration-200 font-body-md" href="#">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-8 border-t border-outline-variant flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="font-body-md text-sm text-on-secondary-container">
          © 2024 Mikaelson School Club. Empowering African Youth through Habit & Leadership.
        </span>
        <span className="font-body-md text-sm text-on-secondary-container/60">Built for the next generation of African Leaders.</span>
      </div>
    </footer>
  );
}

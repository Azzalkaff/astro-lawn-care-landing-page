import { useState, useEffect } from 'react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Services', href: '/#services' },
  { name: 'Gallery', href: '/#gallery' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'FAQ', href: '/#faq' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 shadow-sm backdrop-blur-md' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">EverGreen Lawn Care</span>
            {/* Using text logo, replace with SVG later if needed */}
            <span className={`text-2xl font-bold tracking-tight transition-colors ${scrolled ? 'text-primary-700' : 'text-white'}`}>
              EverGreen
            </span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className={`text-sm font-semibold leading-6 transition-colors hover:text-primary-500 ${scrolled ? 'text-slate-900' : 'text-white'}`}
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a href="/#appointment" className={`text-sm font-semibold leading-6 px-4 py-2 rounded-md transition-colors ${scrolled ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-white text-primary-900 hover:bg-slate-100'}`}>
            Get a Quote <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-slate-900/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only">EverGreen Lawn Care</span>
                <span className="text-2xl font-bold tracking-tight text-primary-700">EverGreen</span>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-slate-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-slate-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50 hover:text-primary-600"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-slate-900 hover:bg-slate-50"
                  >
                    Get a Quote
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

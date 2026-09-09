import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { companyApi } from '../api/company';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const { data: company } = useQuery({
    queryKey: ['public-company'],
    queryFn: companyApi.getPublicProfile,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  const phone = company?.phone || '+91 98765 43210';
  const whatsapp = company?.whatsapp || '+91 98765 43210';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass-nav shadow-md py-3.5 border-b border-slate-200/80'
          : 'bg-slate-900/90 backdrop-blur-md py-5 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Chethan Construction Logo"
            className="w-10 h-10 object-contain rounded-xl shadow-md group-hover:scale-105 transition-transform bg-slate-900/60 p-0.5"
          />
          <div>
            <span
              className={`text-xl font-bold tracking-tight font-display transition-colors ${
                isScrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              {company?.companyName || 'CHETHAN'}
            </span>
            <span className="block text-[10px] tracking-widest uppercase font-semibold text-amber-500">
              Construction
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors relative py-1 ${
                  isActive
                    ? 'text-amber-600 font-semibold'
                    : isScrolled
                    ? 'text-slate-600 hover:text-slate-900'
                    : 'text-slate-200 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href={`tel:${phone.replace(/\s+/g, '')}`}
            className={`flex items-center gap-2 text-sm font-medium transition-colors ${
              isScrolled ? 'text-slate-700 hover:text-slate-900' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Phone className="w-4 h-4 text-amber-500" />
            <span>{phone}</span>
          </a>

          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-500 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
          }`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-white/10 px-4 pt-4 pb-6 space-y-4">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-200 hover:bg-white/10'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <a
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 text-slate-200 text-sm py-1"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>{phone}</span>
            </a>
            <a
              href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-emerald-400 text-sm py-1"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <Link
              to="/contact"
              className="w-full text-center py-2.5 px-4 bg-amber-600 text-white font-medium rounded-lg shadow"
            >
              Get a Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { companyApi } from '../api/company';

export const Footer: React.FC = () => {
  const { data: company } = useQuery({
    queryKey: ['public-company'],
    queryFn: companyApi.getPublicProfile,
  });

  const phone = company?.phone || '+91 98765 43210';
  const whatsapp = company?.whatsapp || '+91 98765 43210';
  const email = company?.email || 'contact@chethanconstruction.com';
  const address = company?.address || 'Bangalore, Karnataka, India';
  const serviceArea = company?.serviceArea || 'Bangalore, Mysore, and surrounding Karnataka districts';

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Chethan Construction Logo"
                className="w-10 h-10 object-contain rounded-xl shadow-md bg-slate-900 p-0.5"
              />
              <span className="text-xl font-bold tracking-tight text-white font-display">
                {company?.companyName || 'CHETHAN'}
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              {company?.shortDescription ||
                'Delivering enduring residential, commercial, and structural engineering projects with unwavering standards of quality, integrity, and client trust.'}
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Instant WhatsApp Inquiry</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-500 transition-colors">About Company</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-amber-500 transition-colors">Our Services</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-amber-500 transition-colors">Portfolio & Projects</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-500 transition-colors">Request a Quote</Link>
              </li>
            </ul>
          </div>

          {/* Services Quicklist */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Our Capabilities
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li className="hover:text-slate-300 transition-colors">Residential Construction</li>
              <li className="hover:text-slate-300 transition-colors">Commercial Developments</li>
              <li className="hover:text-slate-300 transition-colors">Structural Renovation</li>
              <li className="hover:text-slate-300 transition-colors">Civil Engineering Works</li>
              <li className="hover:text-slate-300 transition-colors">Waterproofing & Site Works</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Office & Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </li>
              <li className="pt-2 text-xs text-slate-500">
                Service Area: {serviceArea}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {company?.companyName || 'Chethan Construction'}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400">Quality Assured Construction</span>
            <Link to="/admin/login" className="hover:text-amber-500 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

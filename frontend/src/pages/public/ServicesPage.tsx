import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { servicesApi } from '../../api/services';
import { ServiceCard } from '../../components/ServiceCard';

export const ServicesPage: React.FC = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ['public-services'],
    queryFn: servicesApi.getPublicServices,
  });

  return (
    <div className="pt-28 pb-24 space-y-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
          Our Specializations
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mt-3 mb-6 font-display">
          End-to-End Construction Services
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          From architectural design consultation to structural execution, quality materials sourcing, and turnkey delivery.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : services && services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">Residential Construction</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Turnkey villas, duplex residences, and bespoke homes built according to exact architectural drawings.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">Commercial Construction</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Multi-level commercial buildings, corporate offices, and mixed-use real estate complexes.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">Structural Remodeling</h3>
              <p className="text-sm text-slate-600 leading-relaxed">Comprehensive renovation, floor additions, retrofitting, and interior civil redesigns.</p>
            </div>
          </div>
        )}
      </section>

      {/* Quality Process */}
      <section className="bg-slate-100/70 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Our Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-display">
              How We Execute Every Project
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-3xl font-extrabold text-amber-600 font-display block mb-2">01</span>
              <h4 className="font-bold text-slate-900 mb-2 font-display">Consultation & Site Review</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Initial site measurement, soil analysis, architectural requirements, and budget alignment.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-3xl font-extrabold text-amber-600 font-display block mb-2">02</span>
              <h4 className="font-bold text-slate-900 mb-2 font-display">BOQ & Plan Approval</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Detailed bill of quantities, structural drawings, contract finalization, and milestone scheduling.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-3xl font-extrabold text-amber-600 font-display block mb-2">03</span>
              <h4 className="font-bold text-slate-900 mb-2 font-display">Precision Construction</h4>
              <p className="text-xs text-slate-600 leading-relaxed">On-site structural execution, certified materials, regular engineering inspections, and progress updates.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
              <span className="text-3xl font-extrabold text-amber-600 font-display block mb-2">04</span>
              <h4 className="font-bold text-slate-900 mb-2 font-display">Finishing & Handover</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Deep snagging inspection, surface finishing, waterproofing test, and final key handover.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-white flex flex-col items-center">
          <h2 className="text-3xl font-bold font-display mb-4">Request a Customized Service Proposal</h2>
          <p className="text-slate-300 max-w-xl mb-8 text-sm sm:text-base">
            Tell us about your upcoming project and get an itemized estimate prepared by our civil engineers.
          </p>
          <Link
            to="/contact"
            className="px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Get a Free Quote
          </Link>
        </div>
      </section>
    </div>
  );
};

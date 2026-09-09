import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Shield, Target, MapPin } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { companyApi } from '../../api/company';

export const AboutPage: React.FC = () => {
  const { data: company } = useQuery({
    queryKey: ['public-company'],
    queryFn: companyApi.getPublicProfile,
  });

  return (
    <div className="pt-28 pb-24 space-y-20">
      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
          About Chethan Construction
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mt-3 mb-6 font-display">
          Crafting Solid Foundations & Architectural Landmarks
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {company?.fullDescription ||
            'Chethan Construction is a distinguished construction firm delivering modern residential structures, commercial developments, structural renovations, and civil contracting. We transform architectural blueprints into robust, sustainable, and aesthetically distinguished realities.'}
        </p>
      </section>

      {/* Story & Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-3xl overflow-hidden shadow-2xl bg-slate-900 aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"
              alt="Engineering blueprints and site plan"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-extrabold text-slate-900 font-display">
              Our Vision for Modern Construction
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We combine time-tested civil engineering principles with modern construction methods. Whether crafting bespoke private residences or executing complex commercial frameworks, our philosophy is anchored on structural integrity, meticulous material selection, and absolute accountability.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Every stage of construction undergoes rigorous milestone inspection. We keep our clients informed through transparent reporting, regular progress media, and clear communication from foundation to finishing.
            </p>

            <div className="pt-4 flex items-center gap-3 text-slate-700 font-medium">
              <MapPin className="w-5 h-5 text-amber-600 shrink-0" />
              <span>
                Operating across: <strong className="text-slate-900">{company?.serviceArea || 'Bangalore, Mysore, and surrounding Karnataka regions'}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="bg-slate-100/70 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Core Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-display">
              The Values That Guide Our Craft
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">Integrity & Quality</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We never compromise on material quality or engineering specifications. Every project is built to safely outlast generations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">Precision & Timeliness</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Through proactive planning and disciplined on-site logistics, we deliver committed milestones on schedule.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 font-display">Client Collaboration</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We prioritize clear communication, detailed cost breakdown transparency, and personalized attention for every homeowner and investor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-slate-900 rounded-3xl p-10 sm:p-14 text-white">
          <h2 className="text-3xl font-bold font-display mb-4">Have a Project in Mind?</h2>
          <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Discuss your design, site requirements, and timeline with our engineering specialists.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center px-8 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg transition-all"
          >
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

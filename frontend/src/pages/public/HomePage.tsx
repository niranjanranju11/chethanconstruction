import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Clock,
  Award,
  Layers,
  PhoneCall,
  CheckCircle,
  Star,
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '../../api/projects';
import { servicesApi } from '../../api/services';
import { testimonialsApi } from '../../api/testimonials';
import { companyApi } from '../../api/company';
import { ProjectCard } from '../../components/ProjectCard';
import { ServiceCard } from '../../components/ServiceCard';

export const HomePage: React.FC = () => {
  const { data: company } = useQuery({
    queryKey: ['public-company'],
    queryFn: companyApi.getPublicProfile,
  });

  const { data: featuredProjects, isLoading: loadingProjects } = useQuery({
    queryKey: ['featured-projects'],
    queryFn: projectsApi.getFeaturedProjects,
  });

  const { data: services, isLoading: loadingServices } = useQuery({
    queryKey: ['public-services'],
    queryFn: servicesApi.getPublicServices,
  });

  const { data: testimonials } = useQuery({
    queryKey: ['public-testimonials'],
    queryFn: testimonialsApi.getPublicTestimonials,
  });

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-slate-950 text-white overflow-hidden pt-20">
        {/* Background Image / Architectural Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=2000&q=80"
            alt="Architecture and construction"
            className="w-full h-full object-cover opacity-25 scale-105 animate-pulse duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center sm:text-left flex flex-col items-center sm:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wide uppercase mb-6 backdrop-blur-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>Architectural Engineering & Construction</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-4xl font-display leading-[1.1] mb-6">
            Building Architectural <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Excellence</span> That Endures.
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mb-10 leading-relaxed font-light">
            {company?.tagline ||
              'From premium residential estates to commercial complexes and precision renovations, Chethan Construction transforms ambitious designs into lasting reality.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg shadow-amber-600/30 hover:shadow-amber-600/50 transition-all text-center flex items-center justify-center gap-2 group"
            >
              <span>Get a Free Consultation</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/projects"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 transition-all text-center backdrop-blur-sm"
            >
              Explore Our Portfolio
            </Link>
          </div>

          {/* Pillars Strip */}
          <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 w-full text-left">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-500 shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-300">Grade-A Quality Materials</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6 text-amber-500 shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-300">Committed Timelines</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="w-6 h-6 text-amber-500 shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-300">Engineering Supervision</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-amber-500 shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-slate-300">Transparent Contracts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-display">
              Comprehensive Construction Services
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loadingServices ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : services && services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">Residential Construction</h3>
              <p className="text-sm text-slate-600">Turnkey individual houses, luxury villas, and multi-story apartments built with precision.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">Commercial Complexes</h3>
              <p className="text-sm text-slate-600">Modern office structures, retail outlets, and commercial buildings optimized for long-term utility.</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">Renovation & Civil Works</h3>
              <p className="text-sm text-slate-600">Structural remodeling, floor additions, retrofitting, and waterproofing solutions.</p>
            </div>
          </div>
        )}
      </section>

      {/* Featured Projects Portfolio */}
      <section className="bg-slate-100/70 py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
                Showcase Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 font-display">
                Featured Architectural Works
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loadingProjects ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-slate-200 animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : featuredProjects && featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center max-w-xl mx-auto">
              <Layers className="w-12 h-12 text-amber-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">
                Project Portfolio Updating
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                Our active and completed projects are currently being cataloged. Contact our engineering team for sample portfolios or custom site tours.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 text-white rounded-lg font-semibold text-sm hover:bg-amber-500"
              >
                Inquire Directly
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Why Partner With Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 mb-6 font-display">
              Uncompromising Quality in Every Structural Element
            </h2>
            <p className="text-base text-slate-600 mb-8 leading-relaxed">
              At Chethan Construction, we hold ourselves accountable to the highest structural standards. Every foundation poured, steel rebar tied, and finish applied is overseen by experienced civil engineering professionals.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">Structural Integrity Guaranteed</h3>
                  <p className="text-sm text-slate-600">Rigorous soil testing, concrete grade verification, and certified structural steel ensure resilience.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">Systematic Stage-Wise Milestones</h3>
                  <p className="text-sm text-slate-600">Detailed project schedules with transparent photo and video progress updates at every stage.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">Fixed & Transparent Costing</h3>
                  <p className="text-sm text-slate-600">Itemized bills of quantity with zero surprise surcharges or hidden line items.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
                alt="Construction engineer inspecting building"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-amber-600 text-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block">
              <span className="block text-2xl font-extrabold font-display">100%</span>
              <span className="text-xs font-medium uppercase tracking-wider text-amber-200">
                Commitment to Structural Standards & Timely Handover
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="bg-slate-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
              Client Satisfaction
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-2 mb-12 font-display">
              What Our Clients Say
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {testimonials.map((item) => (
                <div key={item.id} className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-8 flex flex-col justify-between">
                  <div className="mb-6">
                    <div className="flex items-center gap-1 text-amber-400 mb-4">
                      {Array.from({ length: item.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed italic">
                      "{item.quote}"
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base font-display">{item.customerName}</h3>
                    {item.customerRoleOrContext && (
                      <p className="text-xs text-amber-400">{item.customerRoleOrContext}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 sm:p-16 text-white text-center flex flex-col items-center border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl font-extrabold max-w-2xl mb-4 font-display">
            Ready to Begin Your Next Construction Project?
          </h2>
          <p className="text-slate-300 max-w-xl text-base sm:text-lg mb-8 leading-relaxed font-light">
            Contact our engineering team today for architectural planning, site assessment, and detailed cost estimates.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-lg shadow-amber-600/30 transition-all active:scale-95"
            >
              Request Free Estimate
            </Link>
            <a
              href={`tel:${company?.phone?.replace(/\s+/g, '') || '+919876543210'}`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 transition-all"
            >
              <PhoneCall className="w-5 h-5 text-amber-400" />
              <span>Call Us Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

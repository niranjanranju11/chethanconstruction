import React from 'react';
import { Hammer, CheckCircle2 } from 'lucide-react';
import type { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="group bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

      <div>
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
          <Hammer className="w-6 h-6" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-3 font-display group-hover:text-amber-600 transition-colors">
          {service.name}
        </h3>

        <p className="text-sm text-slate-600 leading-relaxed mb-6">
          {service.shortDescription || service.description || 'Specialized construction, engineering, and quality execution.'}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
        <span className="flex items-center gap-1.5 text-amber-600">
          <CheckCircle2 className="w-4 h-4" />
          <span>Full Quality Assurance</span>
        </span>
      </div>
    </div>
  );
};

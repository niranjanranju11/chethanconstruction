import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowRight, Layers } from 'lucide-react';
import type { ProjectSummary } from '../types';

interface ProjectCardProps {
  project: ProjectSummary;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const statusBadge = () => {
    switch (project.status) {
      case 'COMPLETED':
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/90 text-white backdrop-blur-sm shadow-sm">
            Completed
          </span>
        );
      case 'ONGOING':
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/90 text-white backdrop-blur-sm shadow-sm">
            In Progress
          </span>
        );
      case 'UPCOMING':
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-sky-500/90 text-white backdrop-blur-sm shadow-sm">
            Upcoming
          </span>
        );
      default:
        return null;
    }
  };

  const coverUrl = project.coverMedia?.publicUrl || project.coverMedia?.thumbnailUrl;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/80 flex flex-col h-full hover:-translate-y-1">
      {/* Cover Media Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 text-slate-500 p-4 text-center">
            <Layers className="w-10 h-10 mb-2 opacity-50" />
            <span className="text-xs uppercase tracking-wider font-semibold">Architectural Showcase</span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Status Badge */}
        <div className="absolute top-3 left-3 z-10">{statusBadge()}</div>

        {/* Media count */}
        {project.mediaCount > 0 && (
          <div className="absolute bottom-3 right-3 z-10 px-2 py-0.5 text-[11px] font-medium rounded bg-black/60 text-white backdrop-blur-sm">
            {project.mediaCount} {project.mediaCount === 1 ? 'Media' : 'Photos'}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 uppercase tracking-wider mb-2">
            <span>{project.projectType || 'General Construction'}</span>
            {project.area && (
              <>
                <span>•</span>
                <span>{project.area}</span>
              </>
            )}
          </div>

          <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-1 mb-2 font-display">
            {project.title}
          </h3>

          <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {project.shortDescription || 'High-specification structural execution by Chethan Construction.'}
          </p>
        </div>

        <div>
          {project.location && (
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{project.location}</span>
            </div>
          )}

          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 group-hover:text-amber-700 transition-colors"
          >
            <span>View Project Gallery</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

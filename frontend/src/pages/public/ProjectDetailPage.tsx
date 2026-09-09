import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '../../api/projects';
import { LightboxModal } from '../../components/LightboxModal';
import type { MediaStage } from '../../types';
import {
  MapPin,
  Calendar,
  Layers,
  ArrowLeft,
  Maximize2,
  Play,
} from 'lucide-react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [activeStage, setActiveStage] = useState<MediaStage | 'ALL'>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const { data: project, isLoading, error } = useQuery({
    queryKey: ['public-project-detail', slug],
    queryFn: () => projectsApi.getPublicProjectBySlug(slug!),
    enabled: !!slug,
  });

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <div className="h-6 w-32 bg-slate-200 rounded" />
        <div className="h-12 w-3/4 bg-slate-200 rounded" />
        <div className="aspect-[16/9] bg-slate-200 rounded-3xl" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="pt-36 pb-24 max-w-xl mx-auto px-4 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4 font-display">Project Not Found</h1>
        <p className="text-slate-600 mb-6">
          The requested project could not be located or may currently be unpublished.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-600 text-white font-semibold rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>
      </div>
    );
  }

  const filteredMedia =
    activeStage === 'ALL'
      ? project.media
      : project.media.filter((m) => m.stage === activeStage);

  const stageTabs: { label: string; value: MediaStage | 'ALL' }[] = [
    { label: 'All Media', value: 'ALL' },
    { label: 'Before', value: 'BEFORE' },
    { label: 'During Construction', value: 'DURING' },
    { label: 'After Handover', value: 'AFTER' },
  ];

  return (
    <div className="pt-28 pb-24 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-amber-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-8">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-amber-500/10 text-amber-700">
                {project.projectType || 'Construction Project'}
              </span>
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-slate-200 text-slate-800">
                Status: {project.status}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 font-display leading-tight">
              {project.title}
            </h1>
          </div>

          <Link
            to={`/contact?subject=Inquiry regarding ${encodeURIComponent(project.title)}`}
            className="inline-flex items-center justify-center px-6 py-3.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-md transition-all active:scale-95 shrink-0"
          >
            Inquire About Similar Project
          </Link>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-6">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Location
            </span>
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{project.location || 'Karnataka'}</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Total Built Area
            </span>
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
              <Layers className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{project.area || 'Architectural specs'}</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Project Timeline
            </span>
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-800">
              <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                {project.completionDate
                  ? `Completed ${project.completionDate}`
                  : project.startDate
                  ? `Started ${project.startDate}`
                  : 'On Schedule'}
              </span>
            </div>
          </div>

          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Media Assets
            </span>
            <span className="text-sm font-bold text-slate-800">
              {project.media.length} Photos & Videos
            </span>
          </div>
        </div>
      </section>

      {project.description && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-xs">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 font-display">
              Project Overview & Architecture
            </h2>
            <div className="text-slate-600 leading-relaxed text-base space-y-4 whitespace-pre-line">
              {project.description}
            </div>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
              Visual Documentation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1 font-display">
              Project Media & Stage Gallery
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {stageTabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveStage(tab.value)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeStage === tab.value
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredMedia.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map((item, index) => (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(index)}
                className="group relative bg-slate-900 rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {item.mediaType === 'VIDEO' ? (
                  <video
                    src={item.publicUrl}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <img
                    src={item.publicUrl}
                    alt={item.originalFilename || 'Project photo'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  {item.mediaType === 'VIDEO' ? (
                    <Play className="w-12 h-12 p-3 rounded-full bg-white/20 backdrop-blur-sm" />
                  ) : (
                    <Maximize2 className="w-8 h-8 p-1.5 rounded-full bg-white/20 backdrop-blur-sm" />
                  )}
                </div>

                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-black/60 text-white backdrop-blur-sm">
                    {item.stage}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 text-sm">
            No media recorded for the selected stage.
          </div>
        )}
      </section>

      {lightboxIndex !== null && (
        <LightboxModal
          mediaList={filteredMedia}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
};

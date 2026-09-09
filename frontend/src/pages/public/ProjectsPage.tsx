import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '../../api/projects';
import { ProjectCard } from '../../components/ProjectCard';
import type { ProjectStatus } from '../../types';
import { Search, Layers, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus | ''>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const pageSize = 9;

  const { data, isLoading } = useQuery({
    queryKey: ['public-projects', selectedStatus, searchQuery, page],
    queryFn: () =>
      projectsApi.getPublicProjects({
        status: selectedStatus ? selectedStatus : undefined,
        search: searchQuery ? searchQuery : undefined,
        page,
        size: pageSize,
      }),
  });

  const statusOptions: { label: string; value: ProjectStatus | '' }[] = [
    { label: 'All Projects', value: '' },
    { label: 'Completed', value: 'COMPLETED' },
    { label: 'In Progress', value: 'ONGOING' },
    { label: 'Upcoming', value: 'UPCOMING' },
  ];

  return (
    <div className="pt-28 pb-24 space-y-12">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
          Our Portfolio
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 mt-3 mb-6 font-display">
          Selected Projects & Architecture
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Browse our completed residential estates, ongoing commercial projects, and high-precision renovations.
        </p>
      </section>

      {/* Filter & Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {statusOptions.map((opt) => (
              <button
                key={opt.label}
                onClick={() => {
                  setSelectedStatus(opt.value);
                  setPage(0);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  selectedStatus === opt.value
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-slate-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : data && data.content.length > 0 ? (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.content.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>

            {data.totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-6">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-700" />
                </button>
                <span className="text-sm font-semibold text-slate-700">
                  Page {page + 1} of {data.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(data.totalPages - 1, p + 1))}
                  disabled={page >= data.totalPages - 1}
                  className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5 text-slate-700" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center max-w-lg mx-auto">
            <Layers className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2 font-display">No Projects Found</h3>
            <p className="text-sm text-slate-500 mb-6">
              There are no published projects matching your current filter criteria.
            </p>
            <button
              onClick={() => {
                setSelectedStatus('');
                setSearchQuery('');
              }}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-semibold hover:bg-amber-500"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

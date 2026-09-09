import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { projectsApi } from '../../api/projects';
import { AdminHeader } from '../../components/AdminHeader';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Inbox,
  Plus,
  ArrowRight,
  Eye,
  Building,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { data: summary, isLoading } = useQuery({
    queryKey: ['admin-dashboard-summary'],
    queryFn: projectsApi.getDashboardSummary,
  });

  return (
    <div>
      <AdminHeader
        title="Administrative Dashboard"
        subtitle="Real-time status overview of projects, media assets, and incoming leads"
        action={
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </Link>
        }
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-7xl mx-auto">
        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Total Projects
              </span>
              <span className="text-3xl font-extrabold text-slate-900 font-display mt-1 block">
                {isLoading ? '...' : summary?.totalProjects || 0}
              </span>
              <span className="text-xs text-slate-400 mt-1 block">
                {summary?.publishedProjects || 0} Published on website
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <FolderKanban className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Active Projects
              </span>
              <span className="text-3xl font-extrabold text-amber-600 font-display mt-1 block">
                {isLoading ? '...' : summary?.ongoingProjects || 0}
              </span>
              <span className="text-xs text-slate-400 mt-1 block">Currently in construction</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Completed Works
              </span>
              <span className="text-3xl font-extrabold text-emerald-600 font-display mt-1 block">
                {isLoading ? '...' : summary?.completedProjects || 0}
              </span>
              <span className="text-xs text-slate-400 mt-1 block">Finished structures</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                New Inquiries
              </span>
              <span className="text-3xl font-extrabold text-sky-600 font-display mt-1 block">
                {isLoading ? '...' : summary?.newEnquiries || 0}
              </span>
              <span className="text-xs text-slate-400 mt-1 block">
                {summary?.totalEnquiries || 0} Total customer leads
              </span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
              <Inbox className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Quick Access Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/admin/projects"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-500 transition-colors group"
          >
            <FolderKanban className="w-8 h-8 text-amber-600 mb-3" />
            <h3 className="font-bold text-slate-900 text-base font-display group-hover:text-amber-600 transition-colors">
              Manage Projects & Media
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Add new projects, upload high-res photos and videos directly to Cloudflare R2, organize stages.
            </p>
            <span className="text-xs font-semibold text-amber-600 inline-flex items-center gap-1">
              <span>Go to Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            to="/admin/enquiries"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-500 transition-colors group"
          >
            <Inbox className="w-8 h-8 text-sky-600 mb-3" />
            <h3 className="font-bold text-slate-900 text-base font-display group-hover:text-amber-600 transition-colors">
              Customer Lead Inquiries
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Review submitted project requirements, phone numbers, site locations, and update statuses.
            </p>
            <span className="text-xs font-semibold text-sky-600 inline-flex items-center gap-1">
              <span>View Inquiries Inbox</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>

          <Link
            to="/admin/company"
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-500 transition-colors group"
          >
            <Building className="w-8 h-8 text-slate-700 mb-3" />
            <h3 className="font-bold text-slate-900 text-base font-display group-hover:text-amber-600 transition-colors">
              Update Company Profile
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Edit public phone numbers, WhatsApp link, physical address, service areas, and brand description.
            </p>
            <span className="text-xs font-semibold text-slate-700 inline-flex items-center gap-1">
              <span>Edit Company Profile</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* Recent Projects Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 font-display">
              Recently Cataloged Projects
            </h2>
            <Link
              to="/admin/projects"
              className="text-xs font-semibold text-amber-600 hover:text-amber-700"
            >
              View All
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {summary?.recentProjects && summary.recentProjects.length > 0 ? (
              summary.recentProjects.map((proj) => (
                <div key={proj.id} className="p-4 sm:px-6 flex items-center justify-between gap-4 hover:bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-10 rounded-lg bg-slate-900 overflow-hidden shrink-0">
                      {proj.coverMedia?.publicUrl ? (
                        <img src={proj.coverMedia.publicUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600 text-[10px]">
                          No Media
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{proj.title}</h4>
                      <span className="text-xs text-slate-500">
                        {proj.projectType} • {proj.location || 'Karnataka'} • {proj.mediaCount} assets
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                        proj.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-150 text-slate-600'
                      }`}
                    >
                      {proj.published ? 'Published' : 'Draft'}
                    </span>
                    <Link
                      to={`/admin/projects/${proj.id}/edit`}
                      className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
                      title="Edit project"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-slate-500">
                No projects created yet. Click "New Project" to add your first construction showcase.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { servicesApi } from '../../api/services';
import { AdminHeader } from '../../components/AdminHeader';
import type { ServiceItem } from '../../types';
import { Plus, Edit2, Trash2, CheckCircle, XCircle, Save, X, Hammer } from 'lucide-react';

export const AdminServicesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [editingService, setEditingService] = useState<Partial<ServiceItem> | null>(null);

  const { data: services, isLoading } = useQuery({
    queryKey: ['admin-services'],
    queryFn: servicesApi.getAllAdminServices,
  });

  const saveMutation = useMutation({
    mutationFn: async (svc: Partial<ServiceItem>) => {
      if (svc.id) {
        return await servicesApi.updateService(svc.id, svc);
      } else {
        return await servicesApi.createService(svc);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      queryClient.invalidateQueries({ queryKey: ['public-services'] });
      setEditingService(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => servicesApi.deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-services'] });
      queryClient.invalidateQueries({ queryKey: ['public-services'] });
    },
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete service "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      <AdminHeader
        title="Services Management"
        subtitle="Configure construction capabilities and specializations displayed to visitors"
        action={
          <button
            onClick={() =>
              setEditingService({
                name: '',
                shortDescription: '',
                description: '',
                displayOrder: (services?.length || 0) + 1,
                published: true,
              })
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service</span>
          </button>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
        {editingService && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 font-display">
                  {editingService.id ? 'Edit Service' : 'Add New Service'}
                </h3>
                <button
                  onClick={() => setEditingService(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Service Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Commercial Construction"
                    value={editingService.name || ''}
                    onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Short Summary</label>
                  <input
                    type="text"
                    placeholder="Brief 1-line description"
                    value={editingService.shortDescription || ''}
                    onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Full Description</label>
                  <textarea
                    rows={3}
                    placeholder="Detailed scope of service..."
                    value={editingService.description || ''}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Display Order</label>
                    <input
                      type="number"
                      value={editingService.displayOrder ?? 0}
                      onChange={(e) => setEditingService({ ...editingService, displayOrder: parseInt(e.target.value) || 0 })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-5">
                    <input
                      type="checkbox"
                      id="pub-check"
                      checked={editingService.published ?? true}
                      onChange={(e) => setEditingService({ ...editingService, published: e.target.checked })}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <label htmlFor="pub-check" className="font-semibold text-slate-700 cursor-pointer">
                      Published
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={saveMutation.isPending || !editingService.name}
                  onClick={() => saveMutation.mutate(editingService)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Service</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="py-3.5 px-6">Service Name</th>
                <th className="py-3.5 px-4">Summary</th>
                <th className="py-3.5 px-4">Order</th>
                <th className="py-3.5 px-4">Published</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">Loading services...</td>
                </tr>
              ) : services && services.length > 0 ? (
                services.map((svc) => (
                  <tr key={svc.id} className="hover:bg-slate-50/80">
                    <td className="py-4 px-6 font-bold text-slate-900">{svc.name}</td>
                    <td className="py-4 px-4 text-xs text-slate-500 max-w-xs truncate">
                      {svc.shortDescription || '—'}
                    </td>
                    <td className="py-4 px-4 text-xs font-semibold text-slate-600">{svc.displayOrder}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          svc.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {svc.published ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <XCircle className="w-3.5 h-3.5" />}
                        <span>{svc.published ? 'Published' : 'Draft'}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditingService(svc)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-slate-100"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(svc.id, svc.name)}
                          className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <Hammer className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <span>No services cataloged yet. Click "Add Service" to create one.</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { testimonialsApi } from '../../api/testimonials';
import { AdminHeader } from '../../components/AdminHeader';
import type { TestimonialItem } from '../../types';
import { Plus, Edit2, Trash2, Star, MessageSquareQuote, X, Save } from 'lucide-react';

export const AdminTestimonialsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [editingItem, setEditingItem] = useState<Partial<TestimonialItem> | null>(null);

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['admin-testimonials'],
    queryFn: testimonialsApi.getAllAdminTestimonials,
  });

  const saveMutation = useMutation({
    mutationFn: async (item: Partial<TestimonialItem>) => {
      if (item.id) {
        return await testimonialsApi.updateTestimonial(item.id, item);
      } else {
        return await testimonialsApi.createTestimonial(item);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['public-testimonials'] });
      setEditingItem(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => testimonialsApi.deleteTestimonial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['public-testimonials'] });
    },
  });

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete testimonial from "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      <AdminHeader
        title="Testimonials & Reviews"
        subtitle="Manage approved customer statements and feedback displayed on public pages"
        action={
          <button
            onClick={() =>
              setEditingItem({
                customerName: '',
                customerRoleOrContext: '',
                quote: '',
                rating: 5,
                published: true,
                displayOrder: (testimonials?.length || 0) + 1,
              })
            }
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold rounded-lg shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Testimonial</span>
          </button>
        }
      />

      <div className="p-6 sm:p-8 max-w-6xl mx-auto space-y-6">
        {editingItem && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 font-display">
                  {editingItem.id ? 'Edit Testimonial' : 'Add Testimonial'}
                </h3>
                <button
                  onClick={() => setEditingItem(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Murthy"
                    value={editingItem.customerName || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, customerName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Role / Context</label>
                  <input
                    type="text"
                    placeholder="e.g. Villa Owner, Whitefield"
                    value={editingItem.customerRoleOrContext || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, customerRoleOrContext: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 uppercase mb-1">Quote Text *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Customer quote regarding work quality, timeliness, or materials..."
                    value={editingItem.quote || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, quote: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 uppercase mb-1">Rating (1 to 5)</label>
                    <select
                      value={editingItem.rating || 5}
                      onChange={(e) => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 font-medium"
                    >
                      <option value={5}>5 Stars (Exceptional)</option>
                      <option value={4}>4 Stars (Very Good)</option>
                      <option value={3}>3 Stars (Good)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="test-pub-check"
                      checked={editingItem.published ?? true}
                      onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
                      className="w-4 h-4 text-amber-600 rounded"
                    />
                    <label htmlFor="test-pub-check" className="font-semibold text-slate-700 cursor-pointer">
                      Published
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={saveMutation.isPending || !editingItem.customerName || !editingItem.quote}
                  onClick={() => saveMutation.mutate(editingItem)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Testimonial</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            <div className="col-span-2 py-12 text-center text-slate-400">Loading testimonials...</div>
          ) : testimonials && testimonials.length > 0 ? (
            testimonials.map((t) => (
              <div key={t.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-500">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-500" />
                      ))}
                    </div>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        t.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {t.published ? 'Live' : 'Draft'}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 italic mb-4 leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{t.customerName}</h4>
                    {t.customerRoleOrContext && (
                      <span className="text-xs text-slate-500">{t.customerRoleOrContext}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditingItem(t)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-slate-100"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(t.id, t.customerName)}
                      className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
              <MessageSquareQuote className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm">No testimonials added yet. Click "Add Testimonial" above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

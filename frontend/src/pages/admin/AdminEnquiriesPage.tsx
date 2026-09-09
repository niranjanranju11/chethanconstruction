import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { enquiriesApi } from '../../api/enquiries';
import { AdminHeader } from '../../components/AdminHeader';
import type { EnquiryItem, EnquiryStatus } from '../../types';
import {
  Inbox,
  Phone,
  Mail,
  MessageSquare,
  ChevronLeft,
  ChevronRight,
  FileText,
  X,
  Save,
} from 'lucide-react';

export const AdminEnquiriesPage: React.FC = () => {
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<EnquiryStatus | ''>('');
  const [page, setPage] = useState(0);
  const [activeEnquiry, setActiveEnquiry] = useState<EnquiryItem | null>(null);
  const [notesDraft, setNotesDraft] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-enquiries', selectedStatus, page],
    queryFn: () =>
      enquiriesApi.getAdminEnquiries(selectedStatus ? selectedStatus : undefined, page, 15),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: EnquiryStatus }) =>
      enquiriesApi.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin-dashboard-summary'] });
    },
  });

  const updateNotesMutation = useMutation({
    mutationFn: ({ id, notes }: { id: string; notes: string }) =>
      enquiriesApi.updateNotes(id, notes),
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['admin-enquiries'] });
      setActiveEnquiry(updated);
    },
  });

  const handleOpenNotes = (item: EnquiryItem) => {
    setActiveEnquiry(item);
    setNotesDraft(item.internalNotes || '');
  };

  const statusList: { label: string; value: EnquiryStatus | '' }[] = [
    { label: 'All Inquiries', value: '' },
    { label: 'New', value: 'NEW' },
    { label: 'Contacted', value: 'CONTACTED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
    { label: 'Spam', value: 'SPAM' },
  ];

  return (
    <div>
      <AdminHeader
        title="Customer Inquiries & Leads"
        subtitle="Manage website quote requests, lead status, notes, and direct customer contacts"
      />

      <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-6">
        {/* Status Filter Tabs */}
        <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-2 overflow-x-auto">
          {statusList.map((s) => (
            <button
              key={s.label}
              onClick={() => {
                setSelectedStatus(s.value);
                setPage(0);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedStatus === s.value
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Inquiries Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-semibold">
                <tr>
                  <th className="py-3.5 px-6">Customer / Contact</th>
                  <th className="py-3.5 px-4">Project Type</th>
                  <th className="py-3.5 px-4">Location / Budget</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Received</th>
                  <th className="py-3.5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">Loading inquiries...</td>
                  </tr>
                ) : data && data.content.length > 0 ? (
                  data.content.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80">
                      <td className="py-4 px-6">
                        <span className="font-bold text-slate-900 block">{item.name}</span>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <a
                            href={`tel:${item.phone.replace(/\s+/g, '')}`}
                            className="inline-flex items-center gap-1 text-amber-600 hover:underline"
                          >
                            <Phone className="w-3 h-3" />
                            <span>{item.phone}</span>
                          </a>
                          {item.email && (
                            <a
                              href={`mailto:${item.email}`}
                              className="inline-flex items-center gap-1 text-slate-500 hover:underline"
                            >
                              <Mail className="w-3 h-3" />
                              <span>{item.email}</span>
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-4 text-xs font-semibold text-slate-800">
                        {item.projectType || 'General'}
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-600">
                        {item.location && (
                          <span className="block truncate max-w-xs">{item.location}</span>
                        )}
                        {item.budget && (
                          <span className="text-[11px] text-amber-600 font-semibold block">
                            Budget: {item.budget}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            updateStatusMutation.mutate({
                              id: item.id,
                              status: e.target.value as EnquiryStatus,
                            })
                          }
                          className={`text-xs font-semibold rounded-lg px-2 py-1 border focus:outline-none ${
                            item.status === 'NEW'
                              ? 'bg-sky-50 text-sky-700 border-sky-200'
                              : item.status === 'CONTACTED'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : item.status === 'IN_PROGRESS'
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : item.status === 'CLOSED'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : 'bg-slate-100 text-slate-600 border-slate-200'
                          }`}
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="IN_PROGRESS">IN PROGRESS</option>
                          <option value="CLOSED">CLOSED</option>
                          <option value="SPAM">SPAM</option>
                        </select>
                      </td>
                      <td className="py-4 px-4 text-xs text-slate-400 whitespace-nowrap">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleOpenNotes(item)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-amber-600 hover:bg-slate-100"
                            title="View inquiry message & internal notes"
                          >
                            <FileText className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      <Inbox className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <span>No customer inquiries match this filter.</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data && data.totalPages > 1 && (
            <div className="p-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Showing {data.content.length} of {data.totalElements} inquiries
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-40"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold text-slate-700">
                  {page + 1} / {data.totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(data.totalPages - 1, p + 1))}
                  disabled={page >= data.totalPages - 1}
                  className="p-1.5 rounded border border-slate-200 hover:bg-slate-100 disabled:opacity-40"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Detail & Notes Modal */}
        {activeEnquiry && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Inquiry from {activeEnquiry.name}
                  </h3>
                  <span className="text-xs text-slate-500">{activeEnquiry.phone}</span>
                </div>
                <button
                  onClick={() => setActiveEnquiry(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase text-slate-400 mb-1">Customer Message</h4>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                  {activeEnquiry.message}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-700 mb-1">
                  Internal Team Notes
                </label>
                <textarea
                  rows={4}
                  placeholder="Record callback date, meeting notes, site visit outcomes, architect notes..."
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <a
                  href={`tel:${activeEnquiry.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-600"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Customer</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveEnquiry(null)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100"
                  >
                    Close
                  </button>
                  <button
                    onClick={() =>
                      updateNotesMutation.mutate({ id: activeEnquiry.id, notes: notesDraft })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-xs font-semibold"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Notes</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

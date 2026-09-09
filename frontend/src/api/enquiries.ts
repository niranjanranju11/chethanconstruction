import apiClient from './client';
import type { ApiResponse, EnquiryItem, EnquiryStatus, PageResponse } from '../types';

export const enquiriesApi = {
  submitEnquiry: async (data: {
    name: string;
    phone: string;
    email?: string;
    projectType?: string;
    location?: string;
    budget?: string;
    message: string;
  }): Promise<EnquiryItem> => {
    const res = await apiClient.post<ApiResponse<EnquiryItem>>('/enquiries', data);
    return res.data.data;
  },

  getAdminEnquiries: async (status?: EnquiryStatus, page = 0, size = 20): Promise<PageResponse<EnquiryItem>> => {
    const res = await apiClient.get<ApiResponse<PageResponse<EnquiryItem>>>('/admin/enquiries', {
      params: { status, page, size },
    });
    return res.data.data;
  },

  getEnquiryById: async (id: string): Promise<EnquiryItem> => {
    const res = await apiClient.get<ApiResponse<EnquiryItem>>(`/admin/enquiries/${id}`);
    return res.data.data;
  },

  updateStatus: async (id: string, status: EnquiryStatus): Promise<EnquiryItem> => {
    const res = await apiClient.patch<ApiResponse<EnquiryItem>>(`/admin/enquiries/${id}/status`, { status });
    return res.data.data;
  },

  updateNotes: async (id: string, internalNotes: string): Promise<EnquiryItem> => {
    const res = await apiClient.patch<ApiResponse<EnquiryItem>>(`/admin/enquiries/${id}/notes`, { internalNotes });
    return res.data.data;
  },
};

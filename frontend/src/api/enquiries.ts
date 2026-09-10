import apiClient from './client';
import type { ApiResponse, EnquiryItem, EnquiryStatus, PageResponse } from '../types';
import { mockStore } from '../data/mockFallback';

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
    try {
      const res = await apiClient.post<ApiResponse<EnquiryItem>>('/enquiries', data);
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        const newEnq: EnquiryItem = {
          id: `enq-${Date.now()}`,
          ...data,
          status: 'NEW',
          createdAt: new Date().toISOString(),
        };
        const current = mockStore.getEnquiries();
        mockStore.saveEnquiries([newEnq, ...current]);
        return newEnq;
      }
      throw err;
    }
  },

  getAdminEnquiries: async (status?: EnquiryStatus, page = 0, size = 20): Promise<PageResponse<EnquiryItem>> => {
    try {
      const res = await apiClient.get<ApiResponse<PageResponse<EnquiryItem>>>('/admin/enquiries', {
        params: { status, page, size },
      });
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        let items = mockStore.getEnquiries();
        if (status) {
          items = items.filter((e) => e.status === status);
        }
        return mockStore.toPageResponse(items, page, size);
      }
      throw err;
    }
  },

  getEnquiryById: async (id: string): Promise<EnquiryItem> => {
    try {
      const res = await apiClient.get<ApiResponse<EnquiryItem>>(`/admin/enquiries/${id}`);
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        const found = mockStore.getEnquiries().find((e) => e.id === id) || mockStore.getEnquiries()[0];
        return found;
      }
      throw err;
    }
  },

  updateStatus: async (id: string, status: EnquiryStatus): Promise<EnquiryItem> => {
    try {
      const res = await apiClient.patch<ApiResponse<EnquiryItem>>(`/admin/enquiries/${id}/status`, { status });
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        const current = mockStore.getEnquiries();
        const idx = current.findIndex((e) => e.id === id);
        if (idx !== -1) {
          current[idx].status = status;
          mockStore.saveEnquiries(current);
          return current[idx];
        }
      }
      throw err;
    }
  },

  updateNotes: async (id: string, internalNotes: string): Promise<EnquiryItem> => {
    try {
      const res = await apiClient.patch<ApiResponse<EnquiryItem>>(`/admin/enquiries/${id}/notes`, { internalNotes });
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        const current = mockStore.getEnquiries();
        const idx = current.findIndex((e) => e.id === id);
        if (idx !== -1) {
          current[idx].internalNotes = internalNotes;
          mockStore.saveEnquiries(current);
          return current[idx];
        }
      }
      throw err;
    }
  },
};


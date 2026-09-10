import apiClient from './client';
import type { ApiResponse, TestimonialItem } from '../types';
import { mockStore } from '../data/mockFallback';

export const testimonialsApi = {
  getPublicTestimonials: async (): Promise<TestimonialItem[]> => {
    try {
      const res = await apiClient.get<ApiResponse<TestimonialItem[]>>('/testimonials');
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        return mockStore.getTestimonials().filter((t) => t.published);
      }
      throw err;
    }
  },

  getAllAdminTestimonials: async (): Promise<TestimonialItem[]> => {
    try {
      const res = await apiClient.get<ApiResponse<TestimonialItem[]>>('/admin/testimonials');
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        return mockStore.getTestimonials();
      }
      throw err;
    }
  },

  createTestimonial: async (data: Partial<TestimonialItem>): Promise<TestimonialItem> => {
    try {
      const res = await apiClient.post<ApiResponse<TestimonialItem>>('/admin/testimonials', data);
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        const newT: TestimonialItem = {
          id: `t-${Date.now()}`,
          customerName: data.customerName || 'Happy Client',
          customerRoleOrContext: data.customerRoleOrContext,
          quote: data.quote || '',
          rating: data.rating || 5,
          published: data.published ?? true,
          displayOrder: data.displayOrder || 0,
          photoUrl: data.photoUrl,
          createdAt: new Date().toISOString(),
        };
        const current = mockStore.getTestimonials();
        mockStore.saveTestimonials([...current, newT]);
        return newT;
      }
      throw err;
    }
  },

  updateTestimonial: async (id: string, data: Partial<TestimonialItem>): Promise<TestimonialItem> => {
    try {
      const res = await apiClient.put<ApiResponse<TestimonialItem>>(`/admin/testimonials/${id}`, data);
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        const current = mockStore.getTestimonials();
        const idx = current.findIndex((t) => t.id === id);
        if (idx !== -1) {
          const updated = { ...current[idx], ...data };
          current[idx] = updated;
          mockStore.saveTestimonials(current);
          return updated;
        }
        return { ...data, id } as TestimonialItem;
      }
      throw err;
    }
  },

  deleteTestimonial: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/admin/testimonials/${id}`);
    } catch (err: any) {
      if (!err.response) {
        const current = mockStore.getTestimonials();
        mockStore.saveTestimonials(current.filter((t) => t.id !== id));
        return;
      }
      throw err;
    }
  },
};


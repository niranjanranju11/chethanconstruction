import apiClient from './client';
import type { ApiResponse, TestimonialItem } from '../types';

export const testimonialsApi = {
  getPublicTestimonials: async (): Promise<TestimonialItem[]> => {
    const res = await apiClient.get<ApiResponse<TestimonialItem[]>>('/testimonials');
    return res.data.data;
  },

  getAllAdminTestimonials: async (): Promise<TestimonialItem[]> => {
    const res = await apiClient.get<ApiResponse<TestimonialItem[]>>('/admin/testimonials');
    return res.data.data;
  },

  createTestimonial: async (data: Partial<TestimonialItem>): Promise<TestimonialItem> => {
    const res = await apiClient.post<ApiResponse<TestimonialItem>>('/admin/testimonials', data);
    return res.data.data;
  },

  updateTestimonial: async (id: string, data: Partial<TestimonialItem>): Promise<TestimonialItem> => {
    const res = await apiClient.put<ApiResponse<TestimonialItem>>(`/admin/testimonials/${id}`, data);
    return res.data.data;
  },

  deleteTestimonial: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/testimonials/${id}`);
  },
};

import apiClient from './client';
import type { ApiResponse, ServiceItem } from '../types';

export const servicesApi = {
  getPublicServices: async (): Promise<ServiceItem[]> => {
    const res = await apiClient.get<ApiResponse<ServiceItem[]>>('/services');
    return res.data.data;
  },

  getAllAdminServices: async (): Promise<ServiceItem[]> => {
    const res = await apiClient.get<ApiResponse<ServiceItem[]>>('/admin/services');
    return res.data.data;
  },

  createService: async (data: Partial<ServiceItem>): Promise<ServiceItem> => {
    const res = await apiClient.post<ApiResponse<ServiceItem>>('/admin/services', data);
    return res.data.data;
  },

  updateService: async (id: string, data: Partial<ServiceItem>): Promise<ServiceItem> => {
    const res = await apiClient.put<ApiResponse<ServiceItem>>(`/admin/services/${id}`, data);
    return res.data.data;
  },

  deleteService: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/services/${id}`);
  },
};

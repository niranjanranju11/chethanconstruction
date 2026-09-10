import apiClient from './client';
import type { ApiResponse, ServiceItem } from '../types';
import { mockStore } from '../data/mockFallback';

export const servicesApi = {
  getPublicServices: async (): Promise<ServiceItem[]> => {
    try {
      const res = await apiClient.get<ApiResponse<ServiceItem[]>>('/services');
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        return mockStore.getServices().filter((s) => s.published);
      }
      throw err;
    }
  },

  getAllAdminServices: async (): Promise<ServiceItem[]> => {
    try {
      const res = await apiClient.get<ApiResponse<ServiceItem[]>>('/admin/services');
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        return mockStore.getServices();
      }
      throw err;
    }
  },

  createService: async (data: Partial<ServiceItem>): Promise<ServiceItem> => {
    try {
      const res = await apiClient.post<ApiResponse<ServiceItem>>('/admin/services', data);
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        const newSrv: ServiceItem = {
          id: `srv-${Date.now()}`,
          name: data.name || 'New Service',
          slug: data.slug || `service-${Date.now()}`,
          shortDescription: data.shortDescription,
          description: data.description,
          imageUrl: data.imageUrl,
          displayOrder: data.displayOrder || 0,
          published: data.published ?? true,
          createdAt: new Date().toISOString(),
        };
        const current = mockStore.getServices();
        mockStore.saveServices([...current, newSrv]);
        return newSrv;
      }
      throw err;
    }
  },

  updateService: async (id: string, data: Partial<ServiceItem>): Promise<ServiceItem> => {
    try {
      const res = await apiClient.put<ApiResponse<ServiceItem>>(`/admin/services/${id}`, data);
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        const current = mockStore.getServices();
        const idx = current.findIndex((s) => s.id === id);
        if (idx !== -1) {
          const updated = { ...current[idx], ...data };
          current[idx] = updated;
          mockStore.saveServices(current);
          return updated;
        }
        return { ...data, id } as ServiceItem;
      }
      throw err;
    }
  },

  deleteService: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/admin/services/${id}`);
    } catch (err: any) {
      if (!err.response) {
        const current = mockStore.getServices();
        mockStore.saveServices(current.filter((s) => s.id !== id));
        return;
      }
      throw err;
    }
  },
};


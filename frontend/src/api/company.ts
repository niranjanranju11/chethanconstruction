import apiClient from './client';
import type { ApiResponse, CompanyProfile } from '../types';
import { mockStore } from '../data/mockFallback';

export const companyApi = {
  getPublicProfile: async (): Promise<CompanyProfile> => {
    try {
      const res = await apiClient.get<ApiResponse<CompanyProfile>>('/company');
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        return mockStore.getCompany();
      }
      throw err;
    }
  },

  getAdminProfile: async (): Promise<CompanyProfile> => {
    try {
      const res = await apiClient.get<ApiResponse<CompanyProfile>>('/admin/company');
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        return mockStore.getCompany();
      }
      throw err;
    }
  },

  updateProfile: async (data: Partial<CompanyProfile>): Promise<CompanyProfile> => {
    try {
      const res = await apiClient.put<ApiResponse<CompanyProfile>>('/admin/company', data);
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        const current = mockStore.getCompany();
        const updated = { ...current, ...data, updatedAt: new Date().toISOString() };
        mockStore.saveCompany(updated);
        return updated;
      }
      throw err;
    }
  },
};


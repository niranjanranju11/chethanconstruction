import apiClient from './client';
import type { ApiResponse, CompanyProfile } from '../types';

export const companyApi = {
  getPublicProfile: async (): Promise<CompanyProfile> => {
    const res = await apiClient.get<ApiResponse<CompanyProfile>>('/company');
    return res.data.data;
  },

  getAdminProfile: async (): Promise<CompanyProfile> => {
    const res = await apiClient.get<ApiResponse<CompanyProfile>>('/admin/company');
    return res.data.data;
  },

  updateProfile: async (data: Partial<CompanyProfile>): Promise<CompanyProfile> => {
    const res = await apiClient.put<ApiResponse<CompanyProfile>>('/admin/company', data);
    return res.data.data;
  },
};

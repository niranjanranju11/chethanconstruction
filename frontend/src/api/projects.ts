import axios from 'axios';
import apiClient from './client';
import type {
  ApiResponse,
  DashboardSummary,
  PageResponse,
  ProjectDetail,
  ProjectMediaItem,
  ProjectStatus,
  ProjectSummary,
  UploadIntentResponse,
} from '../types';

export interface ProjectFilterParams {
  status?: ProjectStatus;
  type?: string;
  featured?: boolean;
  search?: string;
  page?: number;
  size?: number;
}

export const projectsApi = {
  // Public
  getPublicProjects: async (params?: ProjectFilterParams): Promise<PageResponse<ProjectSummary>> => {
    const res = await apiClient.get<ApiResponse<PageResponse<ProjectSummary>>>('/projects', { params });
    return res.data.data;
  },

  getFeaturedProjects: async (): Promise<ProjectSummary[]> => {
    const res = await apiClient.get<ApiResponse<ProjectSummary[]>>('/projects/featured');
    return res.data.data;
  },

  getPublicProjectBySlug: async (slug: string): Promise<ProjectDetail> => {
    const res = await apiClient.get<ApiResponse<ProjectDetail>>(`/projects/${slug}`);
    return res.data.data;
  },

  // Admin Projects
  getAdminProjects: async (page = 0, size = 20): Promise<PageResponse<ProjectSummary>> => {
    const res = await apiClient.get<ApiResponse<PageResponse<ProjectSummary>>>('/admin/projects', {
      params: { page, size },
    });
    return res.data.data;
  },

  getAdminProjectById: async (id: string): Promise<ProjectDetail> => {
    const res = await apiClient.get<ApiResponse<ProjectDetail>>(`/admin/projects/${id}`);
    return res.data.data;
  },

  createProject: async (data: Partial<ProjectDetail>): Promise<ProjectDetail> => {
    const res = await apiClient.post<ApiResponse<ProjectDetail>>('/admin/projects', data);
    return res.data.data;
  },

  updateProject: async (id: string, data: Partial<ProjectDetail>): Promise<ProjectDetail> => {
    const res = await apiClient.put<ApiResponse<ProjectDetail>>(`/admin/projects/${id}`, data);
    return res.data.data;
  },

  togglePublish: async (id: string, published: boolean): Promise<ProjectDetail> => {
    const res = await apiClient.patch<ApiResponse<ProjectDetail>>(`/admin/projects/${id}/publish`, { published });
    return res.data.data;
  },

  deleteProject: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/projects/${id}`);
  },

  // Admin Dashboard
  getDashboardSummary: async (): Promise<DashboardSummary> => {
    const res = await apiClient.get<ApiResponse<DashboardSummary>>('/admin/dashboard');
    return res.data.data;
  },

  // Media & Cloudflare R2 Uploads
  createUploadIntent: async (
    projectId: string,
    fileData: { filename: string; contentType: string; sizeBytes: number; stage?: string }
  ): Promise<UploadIntentResponse> => {
    const res = await apiClient.post<ApiResponse<UploadIntentResponse>>(
      `/admin/projects/${projectId}/media/upload-intent`,
      fileData
    );
    return res.data.data;
  },

  uploadDirectlyToR2: async (
    signedUrl: string,
    file: File,
    onProgress?: (percentage: number) => void
  ): Promise<void> => {
    const url = signedUrl.startsWith('http://') || signedUrl.startsWith('https://')
      ? signedUrl
      : `http://localhost:8080${signedUrl.startsWith('/') ? '' : '/'}${signedUrl}`;

    await axios.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total && onProgress) {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percent);
        }
      },
    });
  },

  completeUpload: async (projectId: string, mediaId: string): Promise<ProjectMediaItem> => {
    const res = await apiClient.post<ApiResponse<ProjectMediaItem>>(
      `/admin/projects/${projectId}/media/${mediaId}/complete`
    );
    return res.data.data;
  },

  updateMedia: async (mediaId: string, data: { stage?: string; cover?: boolean; displayOrder?: number }): Promise<ProjectMediaItem> => {
    const res = await apiClient.put<ApiResponse<ProjectMediaItem>>(`/admin/media/${mediaId}`, data);
    return res.data.data;
  },

  reorderMedia: async (projectId: string, mediaIds: string[]): Promise<void> => {
    await apiClient.put(`/admin/projects/${projectId}/media/reorder`, { mediaIds });
  },

  deleteMedia: async (mediaId: string): Promise<void> => {
    await apiClient.delete(`/admin/media/${mediaId}`);
  },
};

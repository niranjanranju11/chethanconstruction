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

import { mockStore } from '../data/mockFallback';

export const projectsApi = {
  // Public
  getPublicProjects: async (params?: ProjectFilterParams): Promise<PageResponse<ProjectSummary>> => {
    try {
      const res = await apiClient.get<ApiResponse<PageResponse<ProjectSummary>>>('/projects', { params });
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        let projects = mockStore.getProjects().filter((p) => p.published);
        if (params?.status) {
          projects = projects.filter((p) => p.status === params.status);
        }
        if (params?.type) {
          projects = projects.filter((p) => p.projectType?.toLowerCase().includes(params.type!.toLowerCase()));
        }
        return mockStore.toPageResponse(projects, params?.page || 0, params?.size || 20);
      }
      throw err;
    }
  },

  getFeaturedProjects: async (): Promise<ProjectSummary[]> => {
    try {
      const res = await apiClient.get<ApiResponse<ProjectSummary[]>>('/projects/featured');
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        return mockStore.getProjects().filter((p) => p.published && p.featured);
      }
      throw err;
    }
  },

  getPublicProjectBySlug: async (slug: string): Promise<ProjectDetail> => {
    try {
      const res = await apiClient.get<ApiResponse<ProjectDetail>>(`/projects/${slug}`);
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        const found = mockStore.getProjects().find((p) => p.slug === slug) || mockStore.getProjects()[0];
        return found;
      }
      throw err;
    }
  },

  // Admin Projects
  getAdminProjects: async (page = 0, size = 20): Promise<PageResponse<ProjectSummary>> => {
    try {
      const res = await apiClient.get<ApiResponse<PageResponse<ProjectSummary>>>('/admin/projects', {
        params: { page, size },
      });
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        return mockStore.toPageResponse(mockStore.getProjects(), page, size);
      }
      throw err;
    }
  },

  getAdminProjectById: async (id: string): Promise<ProjectDetail> => {
    try {
      const res = await apiClient.get<ApiResponse<ProjectDetail>>(`/admin/projects/${id}`);
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        const found = mockStore.getProjects().find((p) => p.id === id) || mockStore.getProjects()[0];
        return found;
      }
      throw err;
    }
  },

  createProject: async (data: Partial<ProjectDetail>): Promise<ProjectDetail> => {
    try {
      const res = await apiClient.post<ApiResponse<ProjectDetail>>('/admin/projects', data);
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        const newProj: ProjectDetail = {
          id: `proj-${Date.now()}`,
          title: data.title || 'Untitled Project',
          slug: data.slug || `project-${Date.now()}`,
          shortDescription: data.shortDescription,
          description: data.description,
          location: data.location || 'Bengaluru, Karnataka',
          projectType: data.projectType || 'Residential',
          area: data.area,
          status: data.status || 'ONGOING',
          featured: !!data.featured,
          published: !!data.published,
          mediaCount: 0,
          media: [],
          createdAt: new Date().toISOString(),
        };
        const current = mockStore.getProjects();
        mockStore.saveProjects([newProj, ...current]);
        return newProj;
      }
      throw err;
    }
  },

  updateProject: async (id: string, data: Partial<ProjectDetail>): Promise<ProjectDetail> => {
    try {
      const res = await apiClient.put<ApiResponse<ProjectDetail>>(`/admin/projects/${id}`, data);
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        const current = mockStore.getProjects();
        const idx = current.findIndex((p) => p.id === id);
        if (idx !== -1) {
          const updated = { ...current[idx], ...data };
          current[idx] = updated;
          mockStore.saveProjects(current);
          return updated;
        }
        return { ...data, id } as ProjectDetail;
      }
      throw err;
    }
  },

  togglePublish: async (id: string, published: boolean): Promise<ProjectDetail> => {
    try {
      const res = await apiClient.patch<ApiResponse<ProjectDetail>>(`/admin/projects/${id}/publish`, { published });
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        const current = mockStore.getProjects();
        const idx = current.findIndex((p) => p.id === id);
        if (idx !== -1) {
          current[idx].published = published;
          mockStore.saveProjects(current);
          return current[idx];
        }
      }
      throw err;
    }
  },

  deleteProject: async (id: string): Promise<void> => {
    try {
      await apiClient.delete(`/admin/projects/${id}`);
    } catch (err: any) {
      if (!err.response) {
        const current = mockStore.getProjects();
        mockStore.saveProjects(current.filter((p) => p.id !== id));
        return;
      }
      throw err;
    }
  },

  // Admin Dashboard
  getDashboardSummary: async (): Promise<DashboardSummary> => {
    try {
      const res = await apiClient.get<ApiResponse<DashboardSummary>>('/admin/dashboard');
      return res.data.data;
    } catch (err: any) {
      if (!err.response) {
        return mockStore.getDashboardSummary();
      }
      throw err;
    }
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

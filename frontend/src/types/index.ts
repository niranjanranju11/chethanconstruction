export type ProjectStatus = 'UPCOMING' | 'ONGOING' | 'COMPLETED';
export type MediaType = 'IMAGE' | 'VIDEO';
export type MediaStage = 'BEFORE' | 'DURING' | 'AFTER' | 'GENERAL';
export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'CLOSED' | 'SPAM';
export type Role = 'ADMIN';

export interface User {
  id: string;
  email: string;
  role: Role;
  lastLoginAt?: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  expiresInSeconds: number;
  user: User;
}

export interface CompanyProfile {
  id?: string;
  companyName: string;
  tagline?: string;
  shortDescription?: string;
  fullDescription?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  serviceArea?: string;
  googleMapsUrl?: string;
  logoMediaId?: string;
  heroMediaId?: string;
  logoUrl?: string;
  heroUrl?: string;
  updatedAt?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  imageUrl?: string;
  displayOrder: number;
  published: boolean;
  createdAt?: string;
}

export interface ProjectMediaItem {
  id: string;
  projectId: string;
  storageKey: string;
  publicUrl: string;
  mediaType: MediaType;
  stage: MediaStage;
  originalFilename?: string;
  mimeType?: string;
  sizeBytes?: number;
  width?: number;
  height?: number;
  durationSeconds?: number;
  thumbnailUrl?: string;
  displayOrder: number;
  cover: boolean;
  createdAt: string;
}

export interface ProjectSummary {
  id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  location?: string;
  projectType?: string;
  area?: string;
  startDate?: string;
  completionDate?: string;
  status: ProjectStatus;
  featured: boolean;
  published: boolean;
  coverMedia?: ProjectMediaItem;
  mediaCount: number;
  createdAt: string;
}

export interface ProjectDetail extends ProjectSummary {
  description?: string;
  seoTitle?: string;
  seoDescription?: string;
  media: ProjectMediaItem[];
}

export interface TestimonialItem {
  id: string;
  customerName: string;
  customerRoleOrContext?: string;
  quote: string;
  photoUrl?: string;
  rating?: number;
  published: boolean;
  displayOrder: number;
  createdAt?: string;
}

export interface EnquiryItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  projectType?: string;
  location?: string;
  budget?: string;
  message: string;
  status: EnquiryStatus;
  internalNotes?: string;
  createdAt: string;
}

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

export interface UploadIntentResponse {
  mediaId: string;
  storageKey: string;
  uploadUrl: string;
  expiresInSeconds: number;
  publicUrl: string;
}

export interface DashboardSummary {
  totalProjects: number;
  publishedProjects: number;
  ongoingProjects: number;
  completedProjects: number;
  upcomingProjects: number;
  newEnquiries: number;
  totalEnquiries: number;
  recentProjects: ProjectSummary[];
}

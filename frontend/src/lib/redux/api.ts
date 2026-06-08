import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE,
  prepareHeaders: (headers) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('admin_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export interface ProjectData {
  id: string;
  title: string;
  titleAm?: string;
  description: string;
  descAm?: string;
  scope?: string;
  scopeAm?: string;
  achievement?: string;
  achievAm?: string;
  impact?: string;
  impactAm?: string;
  pillar: string;
  status: string;
  client?: string;
  clientAm?: string;
  location?: string;
  locationAm?: string;
  startYear?: number;
  endYear?: number;
  imageUrl?: string;
  kpis?: string;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectFormData {
  title: string;
  titleAm?: string;
  description: string;
  descAm?: string;
  scope?: string;
  scopeAm?: string;
  achievement?: string;
  achievAm?: string;
  impact?: string;
  impactAm?: string;
  pillar: string;
  status: string;
  client?: string;
  clientAm?: string;
  location?: string;
  locationAm?: string;
  startYear?: number;
  endYear?: number;
  imageUrl?: string;
  kpis?: string;
  featured?: boolean;
  sortOrder?: number;
}

export interface AboutSectionData {
  id: string;
  sectionKey: string;
  title: string;
  titleAm?: string;
  content: string;
  contentAm?: string;
  sortOrder: number;
  active: boolean;
}

export interface ServiceData {
  id: string;
  pillarKey: string;
  pillarTitle: string;
  pillarDescription: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  sortOrder: number;
  active: boolean;
}

export interface ContactSubmissionData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organization?: string;
  country?: string;
  inquiryType: string;
  subject: string;
  message: string;
  status: string;
  newsletterConsent: boolean;
  createdAt: string;
}

export interface HomeSectionData {
  id: string;
  sectionKey: string;
  title: string;
  titleAm?: string;
  content: string;
  contentAm?: string;
  sortOrder: number;
  active: boolean;
}

export interface NewsData {
  id: string;
  title: string;
  titleAm?: string;
  author?: string;
  authorAm?: string;
  tags?: string;
  sourceUrl?: string;
  excerpt: string;
  excerptAm?: string;
  content: string;
  contentAm?: string;
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
  active: boolean;
  featured: boolean;
  sortOrder: number;
  views: number;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryData {
  id: string;
  title: string;
  titleAm?: string;
  description?: string;
  descAm?: string;
  imageUrl?: string;
  active: boolean;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface UnansweredQueryData {
  id: string;
  query: string;
  lang: string;
  createdAt: string;
}

interface LoginResponse {
  token: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Projects', 'About', 'Home', 'Services', 'Contact', 'News', 'Gallery', 'UnansweredQueries'],
  endpoints: (builder) => ({
    sendChat: builder.mutation<{ reply: string; suggestions: string[] }, { message: string; lang: string }>({
      query: (body) => ({ url: '/chat', method: 'POST', body }),
    }),
    search: builder.query<{ news: NewsData[]; projects: ProjectData[]; services: ServiceData[] }, string>({
      query: (q) => `/search?q=${q}`,
    }),
    submitContact: builder.mutation<{ success: boolean }, Record<string, unknown>>({
      query: (body) => ({ url: '/contact', method: 'POST', body }),
    }),
    login: builder.mutation<LoginResponse, { username: string; password: string }>({
      query: (body) => ({ url: '/auth/login', method: 'POST', body }),
    }),

    // Projects
    getProjects: builder.query<ProjectData[], { pillar?: string; status?: string } | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.pillar) searchParams.set('pillar', params.pillar);
        if (params?.status) searchParams.set('status', params.status);
        const qs = searchParams.toString();
        return `/projects${qs ? `?${qs}` : ''}`;
      },
      providesTags: ['Projects'],
    }),
    getProject: builder.query<ProjectData, string>({
      query: (id) => `/projects/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Projects', id }],
    }),
    createProject: builder.mutation<ProjectData, ProjectFormData>({
      query: (body) => ({ url: '/projects', method: 'POST', body }),
      invalidatesTags: ['Projects'],
    }),
    updateProject: builder.mutation<ProjectData, { id: string; data: Partial<ProjectFormData> }>({
      query: ({ id, data }) => ({ url: `/projects/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Projects', id }, 'Projects'],
    }),
    deleteProject: builder.mutation<void, string>({
      query: (id) => ({ url: `/projects/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Projects'],
    }),

    // About
    getAboutSections: builder.query<AboutSectionData[], void>({
      query: () => '/about',
      providesTags: ['About'],
    }),
    getAboutSection: builder.query<AboutSectionData, string>({
      query: (id) => `/about/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'About', id }],
    }),
    createAboutSection: builder.mutation<AboutSectionData, Partial<AboutSectionData>>({
      query: (body) => ({ url: '/about', method: 'POST', body }),
      invalidatesTags: ['About'],
    }),
    updateAboutSection: builder.mutation<AboutSectionData, { id: string; data: Partial<AboutSectionData> }>({
      query: ({ id, data }) => ({ url: `/about/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'About', id }, 'About'],
    }),
    deleteAboutSection: builder.mutation<void, string>({
      query: (id) => ({ url: `/about/${id}`, method: 'DELETE' }),
      invalidatesTags: ['About'],
    }),

    // Home
    getHomeSections: builder.query<HomeSectionData[], void>({
      query: () => '/home',
      providesTags: ['Home'],
    }),
    getHomeSection: builder.query<HomeSectionData, string>({
      query: (id) => `/home/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Home', id }],
    }),
    createHomeSection: builder.mutation<HomeSectionData, Partial<HomeSectionData>>({
      query: (body) => ({ url: '/home', method: 'POST', body }),
      invalidatesTags: ['Home'],
    }),
    updateHomeSection: builder.mutation<HomeSectionData, { id: string; data: Partial<HomeSectionData> }>({
      query: ({ id, data }) => ({ url: `/home/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Home', id }, 'Home'],
    }),
    deleteHomeSection: builder.mutation<void, string>({
      query: (id) => ({ url: `/home/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Home'],
    }),

    // Services
    getServices: builder.query<ServiceData[], { pillarKey?: string } | void>({
      query: (params) => {
        const qs = params?.pillarKey ? `?pillarKey=${params.pillarKey}` : '';
        return `/services${qs}`;
      },
      providesTags: ['Services'],
    }),
    getService: builder.query<ServiceData, string>({
      query: (id) => `/services/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Services', id }],
    }),
    createService: builder.mutation<ServiceData, Partial<ServiceData>>({
      query: (body) => ({ url: '/services', method: 'POST', body }),
      invalidatesTags: ['Services'],
    }),
    updateService: builder.mutation<ServiceData, { id: string; data: Partial<ServiceData> }>({
      query: ({ id, data }) => ({ url: `/services/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Services', id }, 'Services'],
    }),
    deleteService: builder.mutation<void, string>({
      query: (id) => ({ url: `/services/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Services'],
    }),

    // Contact
    getContactSubmissions: builder.query<{ data: ContactSubmissionData[]; total: number; page: number; limit: number }, { page?: number; limit?: number; status?: string } | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.set('page', String(params.page));
        if (params?.limit) searchParams.set('limit', String(params.limit));
        if (params?.status) searchParams.set('status', params.status);
        const qs = searchParams.toString();
        return `/contact${qs ? `?${qs}` : ''}`;
      },
      providesTags: ['Contact'],
    }),
    getContactSubmission: builder.query<ContactSubmissionData, string>({
      query: (id) => `/contact/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Contact', id }],
    }),
    updateContactStatus: builder.mutation<void, { id: string; status: string }>({
      query: ({ id, status }) => ({ url: `/contact/${id}/status`, method: 'PATCH', body: { status } }),
      invalidatesTags: ['Contact'],
    }),

    // News
    getNews: builder.query<NewsData[], { active?: boolean } | void>({
      query: (params) => {
        const qs = params?.active !== undefined ? `?active=${params.active}` : '';
        return `/news${qs}`;
      },
      providesTags: ['News'],
    }),
    getNewsItem: builder.query<NewsData, string>({
      query: (id) => `/news/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'News', id }],
    }),
    createNews: builder.mutation<NewsData, Partial<NewsData>>({
      query: (body) => ({ url: '/news', method: 'POST', body }),
      invalidatesTags: ['News'],
    }),
    updateNews: builder.mutation<NewsData, { id: string; data: Partial<NewsData> }>({
      query: ({ id, data }) => ({ url: `/news/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'News', id }, 'News'],
    }),
    deleteNews: builder.mutation<void, string>({
      query: (id) => ({ url: `/news/${id}`, method: 'DELETE' }),
      invalidatesTags: ['News'],
    }),

    // Gallery
    getGallery: builder.query<GalleryData[], { active?: boolean } | void>({
      query: (params) => {
        const qs = params?.active !== undefined ? `?active=${params.active}` : '';
        return `/gallery${qs}`;
      },
      providesTags: ['Gallery'],
    }),
    getGalleryItem: builder.query<GalleryData, string>({
      query: (id) => `/gallery/${id}`,
      providesTags: (_result, _error, id) => [{ type: 'Gallery', id }],
    }),
    createGallery: builder.mutation<GalleryData, Partial<GalleryData>>({
      query: (body) => ({ url: '/gallery', method: 'POST', body }),
      invalidatesTags: ['Gallery'],
    }),
    updateGallery: builder.mutation<GalleryData, { id: string; data: Partial<GalleryData> }>({
      query: ({ id, data }) => ({ url: `/gallery/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (_result, _error, { id }) => [{ type: 'Gallery', id }, 'Gallery'],
    }),
    deleteGallery: builder.mutation<void, string>({
      query: (id) => ({ url: `/gallery/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Gallery'],
    }),

    // Upload
    uploadFile: builder.mutation<{ url: string; name: string }, FormData>({
      query: (body) => ({ url: '/upload', method: 'POST', body }),
    }),

    // Unanswered Queries
    getUnansweredQueries: builder.query<{ data: UnansweredQueryData[]; total: number; page: number; limit: number }, { page?: number; limit?: number } | void>({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.page) searchParams.set('page', String(params.page));
        if (params?.limit) searchParams.set('limit', String(params.limit));
        const qs = searchParams.toString();
        return `/unanswered-queries${qs ? `?${qs}` : ''}`;
      },
      providesTags: ['UnansweredQueries'],
    }),
    deleteUnansweredQuery: builder.mutation<void, string>({
      query: (id) => ({ url: `/unanswered-queries/${id}`, method: 'DELETE' }),
      invalidatesTags: ['UnansweredQueries'],
    }),

    // Stats
    getContactStats: builder.query<Record<string, number>, void>({
      query: () => '/contact/stats',
    }),
  }),
});

export const {
  useSendChatMutation,
  useSubmitContactMutation,
  useLoginMutation,
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetAboutSectionsQuery,
  useGetAboutSectionQuery,
  useCreateAboutSectionMutation,
  useUpdateAboutSectionMutation,
  useDeleteAboutSectionMutation,
  useGetHomeSectionsQuery,
  useGetHomeSectionQuery,
  useCreateHomeSectionMutation,
  useUpdateHomeSectionMutation,
  useDeleteHomeSectionMutation,
  useGetServicesQuery,
  useGetServiceQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
  useGetContactSubmissionsQuery,
  useGetContactSubmissionQuery,
  useUpdateContactStatusMutation,
  useGetNewsQuery,
  useGetNewsItemQuery,
  useCreateNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
  useGetGalleryQuery,
  useGetGalleryItemQuery,
  useCreateGalleryMutation,
  useUpdateGalleryMutation,
  useDeleteGalleryMutation,
  useGetUnansweredQueriesQuery,
  useDeleteUnansweredQueryMutation,
  useUploadFileMutation,
  useSearchQuery,
  useLazySearchQuery,
  useGetContactStatsQuery,
} = api;

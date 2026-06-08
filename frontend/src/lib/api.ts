const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${res.status}`);
  }

  return res.json();
}

export const api = {
  // Projects
  getProjects: (params?: { pillar?: string; status?: string }) => {
    const query = params
      ? '?' + new URLSearchParams(params as Record<string, string>).toString()
      : '';
    return fetchAPI<Project[]>(`/projects${query}`);
  },
  getFeaturedProjects: () => fetchAPI<Project[]>('/projects/featured'),
  getProject: (id: string) => fetchAPI<Project>(`/projects/${id}`),

  // Services
  getServices: (pillarKey?: string) =>
    fetchAPI<Service[]>(
      `/services${pillarKey ? `?pillarKey=${pillarKey}` : ''}`,
    ),
  getPillars: () =>
    fetchAPI<{ key: string; title: string; description: string }[]>(
      '/services/pillars',
    ),

  // Contact
  submitContact: (data: ContactFormData) =>
    fetchAPI<ContactSubmission>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Types
export interface Project {
  id: string;
  title: string;
  description: string;
  scope?: string;
  achievement?: string;
  impact?: string;
  pillar: string;
  status: string;
  client?: string;
  location?: string;
  startYear?: number;
  endYear?: number;
  imageUrl?: string;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
}

export interface Service {
  id: string;
  pillarKey: string;
  pillarTitle: string;
  pillarDescription: string;
  title: string;
  description: string;
  features?: string[];
  icon?: string;
  sortOrder: number;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  organization?: string;
  country?: string;
  inquiryType: string;
  subject: string;
  message: string;
  newsletterConsent?: boolean;
}

export interface ContactSubmission extends ContactFormData {
  id: string;
  status: string;
  createdAt: string;
}

// Chat
export interface ChatResponse {
  reply: string;
}

export const chat = {
  send: (message: string) =>
    fetchAPI<ChatResponse>('/chat', {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
};

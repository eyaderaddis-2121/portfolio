/**
 * Centralized API service for the portfolio frontend.
 * All requests go through Vite's proxy (/api → localhost:5000/api).
 */

const BASE = '/api';

// ─── Generic fetch wrapper ────────────────────────────────────────
async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('portfolio_admin_token');

  const res = await fetch(`${BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...((options.headers as Record<string, string>) || {}),
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    const err = new Error(data.message || 'Request failed');
    (err as Error & { status: number; data: unknown }).status = res.status;
    (err as Error & { status: number; data: unknown }).data   = data;
    throw err;
  }

  return data as T;
}

// ─── Types ────────────────────────────────────────────────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  tech_stack: string[];
  featured: number;
  sort_order: number;
  is_active: number;
  created_at: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: number;
  ip_address: string;
  created_at: string;
}

export interface DashboardStats {
  messages: { total: number; unread: number; read: number };
  total_projects: number;
  recent_messages: ContactMessage[];
}

// ─── Public APIs ─────────────────────────────────────────────────

/** Submit contact form */
export const submitContact = (payload: ContactPayload) =>
  request<ApiResponse>('/contact', {
    method: 'POST',
    body:   JSON.stringify(payload),
  });

/** Get all public projects */
export const getProjects = () =>
  request<ApiResponse<Project[]>>('/projects');

/** Subscribe to newsletter */
export const subscribe = (email: string) =>
  request<ApiResponse>('/subscribe', {
    method: 'POST',
    body:   JSON.stringify({ email }),
  });

// ─── Admin Auth APIs ──────────────────────────────────────────────

/** Admin login — stores token in localStorage */
export const adminLogin = async (email: string, password: string) => {
  const res = await request<ApiResponse<{ token: string; admin: { id: number; name: string; email: string } }>>(
    '/auth/login',
    { method: 'POST', body: JSON.stringify({ email, password }) }
  );
  if (res.data?.token) {
    localStorage.setItem('portfolio_admin_token', res.data.token);
  }
  return res;
};

/** Get current admin profile */
export const getAdminProfile = () =>
  request<ApiResponse<{ id: number; name: string; email: string }>>('/auth/me');

/** Logout — clears token */
export const adminLogout = async () => {
  try { await request('/auth/logout', { method: 'POST' }); } catch {}
  localStorage.removeItem('portfolio_admin_token');
};

// ─── Admin Message APIs ───────────────────────────────────────────

export const getMessages = (page = 1, limit = 20, search = '') =>
  request<ApiResponse<ContactMessage[]>>(
    `/admin/messages?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`
  );

export const getUnreadMessages = () =>
  request<ApiResponse<ContactMessage[]>>('/admin/messages/unread');

export const getMessage = (id: number) =>
  request<ApiResponse<ContactMessage>>(`/admin/messages/${id}`);

export const markMessageRead = (id: number) =>
  request<ApiResponse>(`/admin/messages/${id}`, { method: 'PATCH' });

export const deleteMessage = (id: number) =>
  request<ApiResponse>(`/admin/messages/${id}`, { method: 'DELETE' });

export const replyToMessage = (id: number, replyBody: string) =>
  request<ApiResponse>(`/admin/messages/${id}/reply`, {
    method: 'POST',
    body:   JSON.stringify({ replyBody }),
  });

// ─── Admin Dashboard API ──────────────────────────────────────────

export const getDashboardStats = () =>
  request<ApiResponse<DashboardStats>>('/admin/dashboard');

// ─── Admin Project APIs ───────────────────────────────────────────

export const createProject = (project: Partial<Project>) =>
  request<ApiResponse<Project>>('/admin/projects', {
    method: 'POST',
    body:   JSON.stringify(project),
  });

export const updateProject = (id: number, project: Partial<Project>) =>
  request<ApiResponse<Project>>(`/admin/projects/${id}`, {
    method: 'PUT',
    body:   JSON.stringify(project),
  });

export const deleteProject = (id: number) =>
  request<ApiResponse>(`/admin/projects/${id}`, { method: 'DELETE' });

// ─── Admin Subscribers API ────────────────────────────────────────

export const getSubscribers = () =>
  request<ApiResponse<{ id: number; email: string; subscribed_at: string }[]>>(
    '/admin/subscribers'
  );

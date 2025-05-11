import axios from 'axios';
import { Report, ReportSummary, LatestReportsResponse } from '../types/Report';

const API_URL = '/api';
const CACHE_KEY = 'all_reports_cache';
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

function getCachedReports() {
  const cached = localStorage.getItem(CACHE_KEY);
  if (!cached) return null;
  try {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_TTL) {
      return data;
    }
  } catch {}
  return null;
}

function setCachedReports(data: any) {
  localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
}

export const ReportService = {
    // Get all reports (summaries only - no aircraft data)
    getAll: async (params?: Record<string, string | number>): Promise<ReportSummary[]> => {
        const cached = getCachedReports();
        if (cached) {
          // Fetch in background to update cache
          ReportService.getAllNoCache(params).then(setCachedReports);
          return cached;
        }
        const fresh = await ReportService.getAllNoCache(params);
        setCachedReports(fresh);
        return fresh;
    },
    getAllNoCache: async (params?: Record<string, string | number>): Promise<ReportSummary[]> => {
        const response = await axios.get(`${API_URL}/reports`, { params: { published: true, ...params } });
        return response.data;
    },
    clearCache: () => localStorage.removeItem(CACHE_KEY),

    // Get a specific report by ID (includes full aircraft data)
    getById: async (id: string): Promise<Report> => {
        const response = await axios.get(`${API_URL}/reports/${id}`);
        return response.data;
    },

    // Get the latest reports (both monthly and yearly)
    getLatest: async (): Promise<LatestReportsResponse> => {
        const response = await axios.get(`${API_URL}/reports/latest`);
        return response.data;
    },

    // Admin functions - require authentication
    create: async (report: Partial<Report>): Promise<Report> => {
        const response = await axios.post(`${API_URL}/reports/admin/unpublished`, report, {
            withCredentials: true
        });
        return response.data;
    },

    update: async (id: string, report: Partial<Report>): Promise<Report> => {
        const response = await axios.put(`${API_URL}/reports/admin/unpublished/${id}`, report, {
            withCredentials: true
        });
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await axios.delete(`${API_URL}/reports/admin/unpublished/${id}`, {
            withCredentials: true
        });
    },

    publish: async (id: string): Promise<void> => {
        await axios.post(`${API_URL}/reports/admin/publish/${id}`, {}, {
            withCredentials: true
        });
    },

    unpublish: async (id: string): Promise<void> => {
        await axios.delete(`${API_URL}/reports/admin/published/${id}`, {
            withCredentials: true
        });
    },

    // Get all unpublished reports (admin only)
    getAllUnpublished: async (): Promise<ReportSummary[]> => {
        const response = await axios.get(`${API_URL}/reports/admin/unpublished`, {
            withCredentials: true
        });
        return response.data;
    },

    // Check if a report is published
    isPublished: async (id: string): Promise<boolean> => {
        try {
            await axios.get(`${API_URL}/reports/${id}`);
            return true;
        } catch (e: any) {
            if (e.response && e.response.status === 404) return false;
            throw e;
        }
    },

    // Get a specific unpublished report by ID (admin only)
    getUnpublishedById: async (id: string): Promise<Report> => {
        const response = await axios.get(`${API_URL}/reports/admin/unpublished/${id}`, {
            withCredentials: true
        });
        return response.data;
    }
};

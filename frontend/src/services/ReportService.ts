import axios from 'axios';
import { Report, ReportSummary, LatestReportsResponse } from '../types/Report';

const API_URL = '/api';

export const ReportService = {
    // Get all reports (summaries only - no aircraft data)
    getAll: async (params?: Record<string, string | number>): Promise<ReportSummary[]> => {
        const response = await axios.get(`${API_URL}/reports`, { params });
        return response.data;
    },

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
    create: async (report: Partial<Report>, authToken: string): Promise<Report> => {
        const response = await axios.post(`${API_URL}/reports`, report, {
            headers: {
                Authorization: `Basic ${authToken}`
            }
        });
        return response.data;
    },

    update: async (id: string, report: Partial<Report>, authToken: string): Promise<Report> => {
        const response = await axios.put(`${API_URL}/reports/${id}`, report, {
            headers: {
                Authorization: `Basic ${authToken}`
            }
        });
        return response.data;
    },

    delete: async (id: string, authToken: string): Promise<void> => {
        await axios.delete(`${API_URL}/reports/${id}`, {
            headers: {
                Authorization: `Basic ${authToken}`
            }
        });
    }
};

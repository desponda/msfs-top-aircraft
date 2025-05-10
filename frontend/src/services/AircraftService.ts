import axios from 'axios';
import { Aircraft } from '../types/Aircraft';

// Use the proxy configured in vite.config.ts - no need for host/port
const API_URL = '/api';

export const AircraftService = {
  getAll: async (): Promise<Aircraft[]> => {
    const response = await axios.get(`${API_URL}/aircraft`);
    return response.data;
  },
  getById: async (id: string): Promise<Aircraft> => {
    const response = await axios.get(`${API_URL}/aircraft/${id}`);
    return response.data;
  },
  getFiltered: async (params: Record<string, string>): Promise<Aircraft[]> => {
    const response = await axios.get(`${API_URL}/aircraft`, { params });
    return response.data;
  },
  update: async (id: string, data: Partial<Aircraft>): Promise<Aircraft> => {
    const response = await axios.put(`${API_URL}/aircraft/${id}`, data);
    return response.data;
  },
  create: async (data: Partial<Aircraft>): Promise<Aircraft> => {
    const response = await axios.post(`${API_URL}/aircraft`, data);
    return response.data;
  },
  delete: async (id: string): Promise<void> => {
    await axios.delete(`${API_URL}/aircraft/${id}`);
  }
};

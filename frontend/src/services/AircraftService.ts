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
  }
};

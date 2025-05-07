import { Aircraft } from './Aircraft';

export enum ReportType {
    MONTHLY = 'monthly',
    YEARLY = 'yearly'
}

export interface ReportMeta {
    id: string; // UUID
    type: ReportType;
    year: number;
    month?: number; // Only for monthly reports
    title: string;
    description?: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

export interface Report extends ReportMeta {
    aircraft: Aircraft[];
}

export interface ReportSummary extends ReportMeta {
    aircraftCount: number;
}

export interface User {
    id: string;
    username: string;
    role: 'admin' | 'user';
    // We'd add more fields like passwordHash, etc. for a real auth system
}

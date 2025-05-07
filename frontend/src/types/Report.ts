import { Aircraft } from './Aircraft';

export enum ReportType {
    MONTHLY = 'monthly',
    YEARLY = 'yearly'
}

export interface ReportMeta {
    id: string;
    type: ReportType;
    year: number;
    month?: number; // Only for monthly reports
    title: string;
    description?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Report extends ReportMeta {
    aircraft: Aircraft[];
}

export interface ReportSummary extends ReportMeta {
    aircraftCount: number;
}

export interface LatestReportsResponse {
    monthly: Report;
    yearly: Report;
}

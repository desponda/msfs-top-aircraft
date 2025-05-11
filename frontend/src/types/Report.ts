import { AircraftWithVotes } from './Aircraft';

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

export interface AircraftVoteData {
    aircraftId: string;
    votes: number;
    daysOnList: number;
    weeksInChart: number;
}

export interface ReportData extends ReportMeta {
    aircraftVotes: AircraftVoteData[];
}

export interface Report extends ReportMeta {
    aircraft: AircraftWithVotes[];
}

export interface ReportSummary extends ReportMeta {
    aircraftCount: number;
}

export interface LatestReportsResponse {
    monthly: Report;
    yearly: Report;
}

export interface ReportUpdatePayload extends Partial<Report> {
    aircraftVotes?: { aircraftId: string; votes: number }[];
}

import { useState, useEffect } from 'react';
import { ReportService } from '../services/ReportService';
import { AircraftService } from '../services/AircraftService';
import { ReportSummary } from '../types/Report';
import { Aircraft } from '../types/Aircraft';

const useAdminReports = (
    isLoggedIn: boolean,
    setAllAircraft: (aircraft: Aircraft[]) => void
) => {
    const [reports, setReports] = useState<ReportSummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [published, setPublished] = useState<ReportSummary[]>([]);
    const [publishedLoading, setPublishedLoading] = useState(false);
    const [publishedError, setPublishedError] = useState<string | null>(null);

    useEffect(() => {
        if (isLoggedIn) {
            fetchReports();
            fetchAircraft();
            fetchPublished();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn]);

    const fetchReports = async (showLoading: boolean = true) => {
        if (showLoading) setLoading(true);
        try {
            const data = await ReportService.getAllUnpublished();
            setReports(data.sort((a, b) => {
                if (a.year !== b.year) return b.year - a.year;
                return (b.month || 0) - (a.month || 0);
            }));
        } catch (error: any) {
            // Optionally handle error
            console.error('Error fetching reports:', error);
        } finally {
            if (showLoading) setLoading(false);
        }
    };

    const fetchAircraft = async () => {
        try {
            const data = await AircraftService.getAll();
            setAllAircraft(data);
        } catch (error) {
            console.error('Error fetching aircraft:', error);
        }
    };

    const fetchPublished = async () => {
        setPublishedLoading(true);
        setPublishedError(null);
        try {
            const data = await ReportService.getAll();
            setPublished(data);
        } catch (e: any) {
            setPublishedError(e.message);
        } finally {
            setPublishedLoading(false);
        }
    };

    return {
        reports,
        setReports,
        loading,
        published,
        setPublished,
        publishedLoading,
        publishedError,
        fetchReports
    };
};

export default useAdminReports; 
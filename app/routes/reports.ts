import { Router } from 'express';
import { getAllReports, getReportById, createReport } from '../db/reportDAL';
import { getAllAircraft } from '../db/aircraftDAL';
const { ReportType } = require('@prisma/client');

const router = Router();

function mergeAircraftWithVotes(report: any, aircraftList: any[]) {
    if (!report) return undefined;
    const aircraftWithVotes = report.votes.map((vote: any) => {
        const baseAircraft = aircraftList.find(a => a.id === vote.aircraftId);
        if (!baseAircraft) return null;
        // Calculate daysOnList and weeksInChart from dateAdded
        let daysOnList = 0, weeksInChart = 0;
        if (baseAircraft.dateAdded) {
            const dateAdded = new Date(baseAircraft.dateAdded);
            if (!isNaN(dateAdded.getTime())) {
                daysOnList = Math.floor((Date.now() - dateAdded.getTime()) / (1000 * 60 * 60 * 24));
                weeksInChart = Math.floor(daysOnList / 7);
            }
        }
        return {
            ...baseAircraft,
            votes: vote.votes,
            daysOnList,
            weeksInChart,
            positionChange: vote.positionChange ?? null,
            // rank will be set after sorting
        };
    }).filter((a: any) => a !== null);
    // Sort and add rank
    aircraftWithVotes.sort((a: any, b: any) => {
        if (a.votes !== b.votes) return b.votes - a.votes;
        if (a.dateAdded && b.dateAdded) return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        if (b.dateAdded) return -1;
        if (a.dateAdded) return 1;
        return 0;
    });
    aircraftWithVotes.forEach((a: any, i: number) => { a.rank = i + 1; });
    return {
        ...report,
        aircraft: aircraftWithVotes,
    };
}

// GET /api/reports - list all, with optional filters
router.get('/', async (req, res) => {
    try {
        const { year, type, month, published } = req.query;
        const reports = await getAllReports({
            year: year ? Number(year) : undefined,
            type: type as string | undefined,
            month: month ? Number(month) : undefined,
            published: typeof published === 'string' ? published === 'true' : undefined,
        });
        res.json(reports.map((r: any) => ({ ...r, aircraftCount: r.votes ? r.votes.length : 0 })));
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
});

// GET /api/reports/latest - get the latest monthly and yearly reports
router.get('/latest', async (req, res) => {
    try {
        const [reports, aircraftList] = await Promise.all([
            getAllReports({ published: true }),
            getAllAircraft()
        ]);
        // Find latest monthly
        const latestMonthly = reports
            .filter((r: any) => r.type === ReportType.monthly)
            .sort((a: any, b: any) => {
                if (a.year !== b.year) return b.year - a.year;
                return (b.month || 0) - (a.month || 0);
            })[0];
        // Find latest yearly
        const latestYearly = reports
            .filter((r: any) => r.type === ReportType.yearly)
            .sort((a: any, b: any) => b.year - a.year)[0];
        res.json({
            monthly: mergeAircraftWithVotes(latestMonthly, aircraftList),
            yearly: mergeAircraftWithVotes(latestYearly, aircraftList)
        });
    } catch (error) {
        console.error('Error fetching latest reports:', error);
        res.status(500).json({ error: 'Failed to fetch latest reports' });
    }
});

// GET /api/reports/:id - get single report
router.get('/:id', async (req, res) => {
    try {
        const report = await getReportById(req.params.id);
        if (!report) return res.status(404).json({ error: 'Not found' });
        const aircraftList = await getAllAircraft();
        res.json(mergeAircraftWithVotes(report, aircraftList));
    } catch (error) {
        console.error('Error fetching report by id:', error);
        res.status(500).json({ error: 'Failed to fetch report by id' });
    }
});

// POST /api/reports - create a new report
router.post('/', async (req, res) => {
    try {
        const { type, year, month, title, description, aircraftVotes, published } = req.body;
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();
        // If creating a draft (unpublished) report, prevent duplicate for same month/year/type
        if (published === false || published === undefined) {
            const draftId = `${type}-${year}${month ? '-' + String(month).padStart(2, '0') : ''}-draft`;
            const existingDraft = await prisma.report.findUnique({ where: { id: draftId } });
            if (existingDraft) {
                return res.status(409).json({ error: 'A draft report already exists for this month.' });
            }
        }
        const newReport = await createReport({
            type,
            year,
            month,
            title,
            description,
            aircraftVotes,
        });
        res.status(201).json(newReport);
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ error: 'Failed to create report' });
    }
});

// GET /api/reports/admin/unpublished - get all unpublished (draft) reports
router.get('/admin/unpublished', async (req, res) => {
    try {
        const [reports, aircraftList] = await Promise.all([
            getAllReports({ published: false }),
            getAllAircraft()
        ]);
        const merged = reports.map((r: any) => mergeAircraftWithVotes(r, aircraftList));
        res.json(merged.map((r: any) => ({ ...r, aircraftCount: r.votes ? r.votes.length : 0 })));
    } catch (error) {
        console.error('Error fetching unpublished reports:', error);
        res.status(500).json({ error: 'Failed to fetch unpublished reports' });
    }
});

// GET /api/reports/admin/unpublished/:id - get a single unpublished (draft) report
router.get('/admin/unpublished/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const report = await getReportById(id);
        if (!report || report.published) {
            return res.status(404).json({ error: 'Not found' });
        }
        const aircraftList = await getAllAircraft();
        res.json(mergeAircraftWithVotes(report, aircraftList));
    } catch (error) {
        console.error('Error fetching unpublished report by id:', error);
        res.status(500).json({ error: 'Failed to fetch unpublished report by id' });
    }
});

// DELETE /api/reports/admin/unpublished/:id - delete an unpublished (draft) report
router.delete('/admin/unpublished/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();
        // Prevent deletion if a published report exists for the same base id
        const baseId = id.replace(/-draft$/, '');
        const published = await prisma.report.findUnique({ where: { id: baseId } });
        if (published && published.published) {
            return res.status(409).json({ error: 'Cannot delete draft while published report exists. Unpublish/delete the published report first.' });
        }
        await prisma.aircraftVote.deleteMany({ where: { reportId: id } });
        const deleted = await prisma.report.delete({ where: { id } });
        res.json({ success: true, deleted });
    } catch (error) {
        console.error('Error deleting unpublished report:', error);
        res.status(500).json({ error: 'Failed to delete unpublished report' });
    }
});

// PUT /api/reports/admin/unpublished/:id - update an unpublished (draft) report
router.put('/admin/unpublished/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { type, year, month, title, description, aircraftVotes } = req.body;
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();
        const report = await prisma.report.findUnique({ where: { id } });
        if (!report || report.published) {
            return res.status(404).json({ error: 'Not found' });
        }
        // Update the report fields
        await prisma.report.update({
            where: { id },
            data: { type, year, month, title, description }
        });
        // Replace all associated aircraft votes
        if (Array.isArray(aircraftVotes)) {
            await prisma.aircraftVote.deleteMany({ where: { reportId: id } });
            if (aircraftVotes.length > 0) {
                await prisma.aircraftVote.createMany({
                    data: aircraftVotes.map((v: any) => ({ ...v, reportId: id }))
                });
            }
        }
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating unpublished report:', error);
        res.status(500).json({ error: 'Failed to update unpublished report' });
    }
});

// POST /api/reports/admin/publish/:id - publish an unpublished (draft) report
router.post('/admin/publish/:id', async (req, res) => {
    try {
        const draftId = req.params.id;
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();
        // Find the draft report
        const draft = await prisma.report.findUnique({ where: { id: draftId }, include: { votes: true } });
        if (!draft || draft.published) {
            return res.status(404).json({ error: 'Draft not found' });
        }
        // Determine the published report id (remove -draft suffix)
        const publishedId = draftId.replace(/-draft$/, '');
        // Delete existing published report and its votes (if any)
        await prisma.aircraftVote.deleteMany({ where: { reportId: publishedId } });
        await prisma.report.deleteMany({ where: { id: publishedId } });

        // --- Calculate positionChange using previous month's published report ---
        // Find previous month/year
        let prevMonth = draft.month;
        let prevYear = draft.year;
        if (prevMonth === 1) {
            prevMonth = 12;
            prevYear -= 1;
        } else {
            prevMonth -= 1;
        }
        // Find previous published report
        const prevReport = await prisma.report.findFirst({
            where: {
                type: draft.type,
                year: prevYear,
                month: prevMonth,
                published: true
            },
            include: { votes: true }
        });
        // Helper: ranking logic (same as mergeAircraftWithVotes)
        const rankVotes = (votes: Array<{ aircraftId: string; votes: number; } & Record<string, any>>): Array<{ aircraftId: string; votes: number; rank?: number; } & Record<string, any>> => {
            const sorted = [...votes].sort((a, b) => {
                if (a.votes !== b.votes) return b.votes - a.votes;
                return 0;
            });
            sorted.forEach((v: any, i: number) => { v.rank = i + 1; });
            return sorted;
        };
        // Rank current and previous votes
        const currentVotes = draft.votes.map((v: any) => ({ ...v }));
        const rankedCurrent = rankVotes(currentVotes);
        let rankedPrev: Array<{ aircraftId: string; votes: number; rank?: number; } & Record<string, any>> = [];
        if (prevReport) {
            rankedPrev = rankVotes(prevReport.votes.map((v: any) => ({ ...v })));
        }
        // Map aircraftId to previous rank
        const prevRankMap: Record<string, number> = {};
        rankedPrev.forEach((v: any) => { prevRankMap[v.aircraftId] = v.rank!; });
        // Calculate positionChange for each aircraft
        rankedCurrent.forEach((v: any) => {
            const prevRank = prevRankMap[v.aircraftId];
            v.positionChange = typeof prevRank === 'number' ? prevRank - v.rank : null;
        });

        // Create the published report with the draft's data and calculated positionChange
        const publishedReport = await prisma.report.create({
            data: {
                id: publishedId,
                type: draft.type,
                year: draft.year,
                month: draft.month,
                title: draft.title,
                description: draft.description,
                createdAt: draft.createdAt,
                updatedAt: new Date(),
                published: true,
                votes: {
                    create: rankedCurrent.map((v) => ({
                        aircraftId: v.aircraftId,
                        votes: v.votes,
                        positionChange: v.positionChange,
                    }))
                }
            },
            include: { votes: true }
        });
        res.json({ success: true, published: publishedReport });
    } catch (error) {
        console.error('Error publishing report:', error);
        res.status(500).json({ error: 'Failed to publish report' });
    }
});

// DELETE /api/reports/admin/published/:id - unpublish a published report
router.delete('/admin/published/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { PrismaClient } = require('@prisma/client');
        const prisma = new PrismaClient();
        const report = await prisma.report.findUnique({ where: { id } });
        if (!report || !report.published) {
            return res.status(404).json({ error: 'Published report not found' });
        }
        await prisma.report.update({
            where: { id },
            data: { published: false }
        });
        res.json({ success: true });
    } catch (error) {
        console.error('Error unpublishing report:', error);
        res.status(500).json({ error: 'Failed to unpublish report' });
    }
});

export default router;

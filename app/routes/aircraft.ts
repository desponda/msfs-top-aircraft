import { Router } from 'express';
import { Aircraft } from '../types/Aircraft';
import fs from 'fs';
import path from 'path';

const router = Router();
const dataPath = path.join(__dirname, '../data/aircraft.json');

function getAircraftData(): Aircraft[] {
    const raw = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(raw);
}

// GET /api/aircraft - list all, with optional filters
router.get('/', (req, res) => {
    let data = getAircraftData();
    const { manufacturer, category, tag, search } = req.query;

    // Fallback calculation for weeksInChart and daysOnList if missing or zero
    const today = new Date();
    data = data.map(a => {
        let daysOnList = (a as any).daysOnList;
        let weeksInChart = (a as any).weeksInChart;
        if ((!daysOnList || daysOnList === 0 || !weeksInChart || weeksInChart === 0) && a.dateAdded) {
            const dateAdded = new Date(a.dateAdded);
            if (!isNaN(dateAdded.getTime())) {
                daysOnList = Math.floor((today.getTime() - dateAdded.getTime()) / (1000 * 60 * 60 * 24));
                weeksInChart = Math.floor(daysOnList / 7);
            }
        }
        return {
            ...a,
            daysOnList,
            weeksInChart
        };
    });

    if (manufacturer) {
        data = data.filter(a => a.manufacturer.toLowerCase() === String(manufacturer).toLowerCase());
    }
    if (category) {
        data = data.filter(a => a.category.toLowerCase() === String(category).toLowerCase());
    }
    if (tag) {
        data = data.filter(a => a.tags && a.tags.includes(String(tag)));
    }
    if (search) {
        const s = String(search).toLowerCase();
        data = data.filter(a => a.name.toLowerCase().includes(s) || a.manufacturer.toLowerCase().includes(s));
    }
    res.json(data);
});

// GET /api/aircraft/:id - get single aircraft
router.get('/:id', (req, res) => {
    const data = getAircraftData();
    const found = data.find(a => a.id === req.params.id);
    if (!found) return res.status(404).json({ error: 'Not found' });
    res.json(found);
});

export default router;

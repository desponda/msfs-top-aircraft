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

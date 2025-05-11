import { Router } from 'express';
import { getAllAircraft, getAircraftById } from '../db/aircraftDAL';

const router = Router();

// GET /api/aircraft - list all, with optional filters
router.get('/', async (req, res) => {
    try {
        const { manufacturer, category, tag, search } = req.query;
        const data = await getAllAircraft({
            manufacturer: manufacturer as string | undefined,
            category: category as string | undefined,
            tag: tag as string | undefined,
            search: search as string | undefined,
        });
        res.json(data);
    } catch (error) {
        console.error('Error fetching aircraft:', error);
        res.status(500).json({ error: 'Failed to fetch aircraft' });
    }
});

// GET /api/aircraft/:id - get single aircraft
router.get('/:id', async (req, res) => {
    try {
        const found = await getAircraftById(req.params.id);
        if (!found) return res.status(404).json({ error: 'Not found' });
        res.json(found);
    } catch (error) {
        console.error('Error fetching aircraft by id:', error);
        res.status(500).json({ error: 'Failed to fetch aircraft by id' });
    }
});

export default router;

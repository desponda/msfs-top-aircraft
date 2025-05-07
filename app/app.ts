import express from 'express';
import aircraftRouter from './routes/aircraft';
import reportsRouter from './routes/reports';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/aircraft', aircraftRouter);
app.use('/api/reports', reportsRouter);

app.get('/', (req, res) => {
    res.send('MSFS Aircraft Charts API');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

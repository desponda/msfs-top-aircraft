/// <reference path="./express-session.d.ts" />
import express from 'express';
import aircraftRouter from './routes/aircraft';
import reportsRouter from './routes/reports';
import cors from 'cors';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { prisma } from './db/prisma';

const app = express();
const PORT = process.env.PORT || 3001;

const isDev = process.env.NODE_ENV !== 'production';
const ADMIN_USER = isDev ? 'admin' : process.env.ADMIN_USER;
const ADMIN_PASS = isDev ? 'admin123' : process.env.ADMIN_PASS;

app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true                // allow cookies to be sent
}));
app.use(express.json());

app.use(session({
  store: new (connectPgSimple(session))({
    conString: process.env.DATABASE_URL,
    // Optionally, set tableName, createTableIfMissing, etc.
  }),
  secret: process.env.SESSION_SECRET || 'dev-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: process.env.NODE_ENV === 'production' }
}));

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    req.session.user = { username, role: 'admin' };
    res.json({ success: true });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

app.use('/api/aircraft', aircraftRouter);
app.use('/api/reports', reportsRouter);

app.get('/', (req, res) => {
    res.send('MSFS Aircraft Charts API');
});

app.get('/api/session', (req, res) => {
  if (req.session && req.session.user && req.session.user.role === 'admin') {
    res.json({ loggedIn: true });
  } else {
    res.json({ loggedIn: false });
  }
});

// Add a health check endpoint that checks Prisma connection
app.get('/api/health', async (req, res) => {
  try {
    // Check Prisma connection with a simple query
    const result = await prisma.$queryRaw`SELECT 1 as health`;
    
    res.json({
      status: 'ok',
      database: 'connected',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'error',
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

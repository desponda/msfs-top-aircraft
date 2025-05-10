/// <reference path="./express-session.d.ts" />
import express from 'express';
import aircraftRouter from './routes/aircraft';
import reportsRouter from './routes/reports';
import cors from 'cors';
import session from 'express-session';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:5173', // your frontend URL
  credentials: true                // allow cookies to be sent
}));
app.use(express.json());

app.use(session({
  secret: 'change-this-to-a-strong-secret', // use a strong secret in production!
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // set to true if using HTTPS
}));

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin123') {
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

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

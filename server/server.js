import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'data', 'registrations.json');

app.use(cors());
app.use(express.json());

// Ensure data directory and file exist
const initStorage = () => {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
  }
};

initStorage();

const getRegistrations = () => {
  try {
    initStorage();
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    console.error('Error reading registrations data:', error);
    return [];
  }
};

const saveRegistrations = (registrations) => {
  try {
    initStorage();
    fs.writeFileSync(DATA_FILE, JSON.stringify(registrations, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving registrations data:', error);
    return false;
  }
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET /api/registrations
app.get('/api/registrations', (req, res) => {
  const registrations = getRegistrations();
  res.json({
    success: true,
    count: registrations.length,
    registrations,
  });
});

// POST /api/register
app.post('/api/register', (req, res) => {
  try {
    const { fullName, email, phone, teamName, startupName, description } = req.body;

    // Server-side validation
    if (!fullName || fullName.trim().length < 3) {
      return res.status(400).json({ success: false, message: 'Invalid or missing full name' });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ success: false, message: 'Invalid or missing email' });
    }
    if (!phone || !/^[6-9]\d{9}$/.test(phone.trim().replace(/\s+/g, ''))) {
      return res.status(400).json({ success: false, message: 'Invalid or missing 10-digit phone number' });
    }
    if (!teamName || teamName.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Invalid or missing team name' });
    }
    if (!startupName || !startupName.trim()) {
      return res.status(400).json({ success: false, message: 'Invalid or missing startup name' });
    }
    if (!description || description.trim().length < 20 || description.trim().length > 500) {
      return res.status(400).json({ success: false, message: 'Description must be between 20 and 500 characters' });
    }

    const registrations = getRegistrations();
    
    // Generate sequential Registration ID: ECELL-2026-001, ECELL-2026-002, etc.
    const seqNumber = (registrations.length + 1).toString().padStart(3, '0');
    const registrationId = `ECELL-2026-${seqNumber}`;
    const timestamp = new Date().toISOString();

    const newRecord = {
      registrationId,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      teamName: teamName.trim(),
      startupName: startupName.trim(),
      description: description.trim(),
      timestamp,
    };

    registrations.push(newRecord);
    const saved = saveRegistrations(registrations);

    if (!saved) {
      return res.status(500).json({ success: false, message: 'Failed to persist registration data' });
    }

    console.log(`[E-Cell API] Successful registration recorded: ${registrationId} (${teamName})`);

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      registrationId,
      timestamp,
      data: newRecord,
    });
  } catch (error) {
    console.error('[E-Cell API] Registration error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

const startServer = (portToTry) => {
  const server = app.listen(portToTry, () => {
    console.log(`🚀 E-Cell UIET KUK Backend Server listening on http://localhost:${portToTry}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${portToTry} is already in use. Retrying on port ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error('[E-Cell API] Server error:', err);
    }
  });
};

startServer(PORT);

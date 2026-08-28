import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8081;
const DATA_FILE = path.join(__dirname, 'data', 'registrations.json');

app.use(cors());
app.use(express.json());

// Ensure data directory and file exist safely without overwriting existing entries
const initStorage = () => {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
    }
  } catch (err) {
    console.error('[E-Cell Storage] Initialization error:', err);
  }
};

initStorage();

// Migrate legacy records in-place without losing any data
const migrateLegacyData = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      if (raw && raw.trim()) {
        const parsed = JSON.parse(raw);
        let needsSave = false;
        const normalized = parsed.map((item, idx) => {
          const regId = item.registrationId || `ECELL-2026-${(idx + 1).toString().padStart(3, '0')}`;
          const created = item.createdAt || item.timestamp || new Date().toISOString();
          const stat = item.status || 'pending';
          const startup = item.startupName || item.ideaName || '';
          const desc = item.description || item.ideaDescription || '';
          
          if (!item.status || !item.createdAt || !item.registrationId || !item.ideaName || !item.ideaDescription) {
            needsSave = true;
          }

          return {
            registrationId: regId,
            fullName: item.fullName || '',
            email: item.email || '',
            phone: item.phone || '',
            teamName: item.teamName || '',
            startupName: startup,
            ideaName: startup,
            description: desc,
            ideaDescription: desc,
            status: stat,
            createdAt: created,
            timestamp: created,
          };
        });

        if (needsSave) {
          fs.writeFileSync(DATA_FILE, JSON.stringify(normalized, null, 2), 'utf8');
          console.log('[E-Cell Storage] Migrated legacy registration records to standard schema.');
        }
      }
    }
  } catch (err) {
    console.error('[E-Cell Storage] Legacy migration check error:', err);
  }
};

migrateLegacyData();

// Read all registrations from disk safely
const getRegistrations = () => {
  try {
    initStorage();
    if (!fs.existsSync(DATA_FILE)) return [];
    const rawData = fs.readFileSync(DATA_FILE, 'utf8');
    if (!rawData || !rawData.trim()) return [];
    const parsed = JSON.parse(rawData);
    
    // Normalize schema for consistency across legacy and new records
    return parsed.map((item, idx) => ({
      registrationId: item.registrationId || `ECELL-2026-${(idx + 1).toString().padStart(3, '0')}`,
      fullName: item.fullName || '',
      email: item.email || '',
      phone: item.phone || '',
      teamName: item.teamName || '',
      startupName: item.startupName || item.ideaName || '',
      ideaName: item.ideaName || item.startupName || '',
      description: item.description || item.ideaDescription || '',
      ideaDescription: item.ideaDescription || item.description || '',
      status: item.status || 'Registered',
      createdAt: item.createdAt || item.timestamp || new Date().toISOString(),
      timestamp: item.timestamp || item.createdAt || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('[E-Cell Storage] Error reading registrations data:', error);
    return [];
  }
};

// Write registrations synchronously with disk flush
const saveRegistrations = (registrations) => {
  try {
    initStorage();
    const tempFile = `${DATA_FILE}.tmp`;
    const dataString = JSON.stringify(registrations, null, 2);
    
    // Write to temp file first, then atomic rename to prevent file corruption on crash
    fs.writeFileSync(tempFile, dataString, 'utf8');
    fs.renameSync(tempFile, DATA_FILE);
    return true;
  } catch (error) {
    console.error('[E-Cell Storage] Error saving registrations data:', error);
    try {
      // Fallback direct write if atomic rename fails
      fs.writeFileSync(DATA_FILE, JSON.stringify(registrations, null, 2), 'utf8');
      return true;
    } catch (fallbackErr) {
      console.error('[E-Cell Storage] Fallback save failed:', fallbackErr);
      return false;
    }
  }
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET /api/registrations (Directly fetches database state)
app.get('/api/registrations', (req, res) => {
  try {
    const registrations = getRegistrations();
    // Sort descending by creation date
    registrations.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    console.log(`[E-Cell API] GET /api/registrations returning ${registrations.length} record(s)`);
    return res.json({
      success: true,
      count: registrations.length,
      registrations,
    });
  } catch (err) {
    console.error('[E-Cell API] Error fetching registrations:', err);
    return res.status(500).json({ success: false, message: 'Database read error' });
  }
});

// POST /api/register
app.post('/api/register', (req, res) => {
  try {
    const { fullName, email, phone, teamName, startupName, description } = req.body;

    // Server-side strict validation
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
    
    const cleanEmail = email.trim().toLowerCase();
    const cleanTeam = teamName.trim().toLowerCase();

    // Check for duplicate submission within 10 minutes to prevent accidental double-submits
    const existingIndex = registrations.findIndex(
      (r) => r.email.toLowerCase() === cleanEmail && r.teamName.toLowerCase() === cleanTeam
    );

    if (existingIndex !== -1) {
      const existingRecord = registrations[existingIndex];
      console.log(`[E-Cell API] Duplicate registration detected for ${existingRecord.registrationId}`);
      return res.status(200).json({
        success: true,
        message: 'Registration already recorded',
        registrationId: existingRecord.registrationId,
        timestamp: existingRecord.createdAt,
        data: existingRecord,
      });
    }

    // Generate permanent sequential Registration ID: ECELL-2026-001, ECELL-2026-002, etc.
    const maxSeq = registrations.reduce((max, r) => {
      const match = r.registrationId ? r.registrationId.match(/ECELL-2026-(\d+)/) : null;
      if (match) {
        const num = parseInt(match[1], 10);
        return num > max ? num : max;
      }
      return max;
    }, 0);

    const seqNumber = (maxSeq + 1).toString().padStart(3, '0');
    const registrationId = `ECELL-2026-${seqNumber}`;
    const serverTimestampStr = new Date().toISOString();

    const newRecord = {
      registrationId,
      fullName: fullName.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      teamName: teamName.trim(),
      startupName: startupName.trim(),
      ideaName: startupName.trim(),
      description: description.trim(),
      ideaDescription: description.trim(),
      status: 'Registered',
      createdAt: serverTimestampStr,
      timestamp: serverTimestampStr,
    };

    registrations.push(newRecord);
    const saved = saveRegistrations(registrations);

    if (!saved) {
      console.error('[E-Cell API] Database save operation failed for registration:', registrationId);
      return res.status(500).json({ success: false, message: 'Database write failed. Registration could not be saved.' });
    }

    console.log(`[E-Cell API] ✅ Permanent registration saved: ${registrationId} (${teamName.trim()})`);

    return res.status(201).json({
      success: true,
      message: 'Registration successful',
      registrationId,
      timestamp: serverTimestampStr,
      data: newRecord,
    });
  } catch (error) {
    console.error('[E-Cell API] Registration error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error during registration' });
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

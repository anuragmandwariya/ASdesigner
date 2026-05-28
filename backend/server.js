import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import pg from 'pg';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

const { Pool } = pg;
const app = express();

// --- FIX FOR __dirname IN ES MODULES ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION ---
const SECRET_KEY = process.env.JWT_SECRET || 'my_super_secret_key_123';
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
app.use(cors({
    origin: [
        'http://localhost:5173',
        process.env.FRONTEND_URL  // Vercel URL — Railway env mein add karo
    ],
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}));
app.use(express.json());

// NOTE: Static frontend files serve karna HATA DIYA —
// Frontend ab Vercel pe hai, Railway pe sirf backend chalega

// --- NEON DATABASE CONNECTION ---
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

// --- CREATE TABLES ON STARTUP ---
async function initDB() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS contacts (
            id SERIAL PRIMARY KEY,
            first_name TEXT,
            last_name TEXT,
            email TEXT,
            message TEXT,
            created_at TIMESTAMP DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS projects (
            id SERIAL PRIMARY KEY,
            title TEXT,
            category TEXT,
            location TEXT,
            images TEXT[]
        );
    `);
    console.log('✅ Neon DB tables ready');
}
initDB().catch(err => console.error('DB Init Error:', err.message));

// --- CLOUDINARY CONFIG ---
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- CLOUDINARY MULTER STORAGE ---
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'asdesigner-projects',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 1200, quality: 'auto', fetch_format: 'auto' }]
    }
});
const upload = multer({ storage: storage });

// --- API ROUTES ---

// LOGIN
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const adminUser = process.env.ADMIN_USERNAME || 'anurag';
    const adminPass = process.env.ADMIN_PASSWORD || 'anurag123';

    if (username === adminUser && password === adminPass) {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, message: 'Login Successful' });
    } else {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
});

// GET ALL PROJECTS
app.get('/api/projects', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM projects ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching projects' });
    }
});

// CREATE PROJECT (with Cloudinary image upload)
app.post('/api/projects', upload.array('images', 10), async (req, res) => {
    try {
        const { title, category, location } = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }

        // Cloudinary returns the URL in req.files[].path
        const imagePaths = req.files.map(file => file.path);

        const { rows } = await pool.query(
            'INSERT INTO projects (title, category, location, images) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, category, location, imagePaths]
        );

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading project' });
    }
});

// DELETE PROJECT
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM projects WHERE id = $1', [id]);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting project' });
    }
});

// CONTACT FORM
app.post('/api/contact', async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;
        await pool.query(
            'INSERT INTO contacts (first_name, last_name, email, message) VALUES ($1, $2, $3, $4)',
            [firstName, lastName, email, message]
        );
        res.status(201).json({ message: 'Message sent!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- LISTEN ---
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
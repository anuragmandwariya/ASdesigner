import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer'; 
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const app = express();

// --- FIX FOR __dirname IN ES MODULES ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- CONFIGURATION ---
const SECRET_KEY = process.env.JWT_SECRET || 'my_super_secret_key_123'; 
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// 1. Serving static files (Uploads)
// This remains relative to 'backend' because 'uploads' is usually inside 'backend'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 2. Serving Frontend Production Build
// We use ".." to go UP one level out of 'backend' to find 'frontend'
app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

// --- DATABASE CONNECTION ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/as_interior')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// --- IMAGE STORAGE CONFIG ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, 'project-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// --- SCHEMAS ---
const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    message: String,
    date: { type: Date, default: Date.now }
});
const Contact = mongoose.model('Contact', contactSchema);

const projectSchema = new mongoose.Schema({
    title: String,
    category: String,
    location: String,
    images: [String] 
});
const Project = mongoose.model('Project', projectSchema);

// --- ROUTES ---

// 1. ADMIN LOGIN
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const adminUser = process.env.ADMIN_USERNAME || 'anurag'; 
    const adminPass = process.env.ADMIN_PASSWORD || 'anurag123';

    if (username === adminUser && password === adminPass) {
        const token = jwt.sign({ username: username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token: token, message: 'Login Successful' });
    } else {
        res.status(401).json({ message: 'Invalid Credentials' });
    }
});

// 2. GET ALL PROJECTS
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching projects' });
    }
});

// 3. UPLOAD PROJECT
app.post('/api/projects', upload.array('images', 10), async (req, res) => {
    try {
        const { title, category, location } = req.body;
        
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }

        const baseURL = process.env.BASE_URL || `http://localhost:${PORT}`;
        const imagePaths = req.files.map(file => `${baseURL}/uploads/${file.filename}`);
        
        const newProject = new Project({ title, category, location, images: imagePaths });
        await newProject.save();
        
        res.status(201).json(newProject);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading project' });
    }
});

// 4. DELETE PROJECT
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Project.findByIdAndDelete(id);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error("Delete Error:", error);
        res.status(500).json({ message: 'Error deleting project' });
    }
});

// 5. CONTACT FORM
app.post('/api/contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).json({ message: 'Message sent!' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- CATCH-ALL ROUTE ---
// Using Regex Literal for Express 5 support
// Added ".." to resolve the path correctly to the frontend folder
app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "frontend", "dist", "index.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
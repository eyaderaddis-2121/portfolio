import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import cors from 'cors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database('portfolio.db');

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT NOT NULL,
    github_link TEXT,
    live_link TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    avatar_url TEXT
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Seed data if empty
const projectCount = db.prepare('SELECT COUNT(*) as count FROM projects').get() as { count: number };
if (projectCount.count === 0) {
  const insertProject = db.prepare(`
    INSERT INTO projects (title, description, technologies, github_link, live_link, image_url)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertProject.run(
    'E-Commerce Platform',
    'A full-featured online store with payment integration and admin dashboard.',
    'React, Node.js, Express, MySQL, Tailwind',
    'https://github.com',
    'https://demo.com',
    'https://picsum.photos/seed/ecommerce/800/600'
  );
  insertProject.run(
    'Task Management App',
    'Collaborative task tracker with real-time updates and team management.',
    'React, Socket.io, Node.js, SQLite',
    'https://github.com',
    'https://demo.com',
    'https://picsum.photos/seed/tasks/800/600'
  );
  insertProject.run(
    'AI Content Generator',
    'A platform that uses Gemini API to generate creative content and code.',
    'React, Gemini API, Express, Tailwind',
    'https://github.com',
    'https://demo.com',
    'https://picsum.photos/seed/ai/800/600'
  );
}

const testimonialCount = db.prepare('SELECT COUNT(*) as count FROM testimonials').get() as { count: number };
if (testimonialCount.count === 0) {
  const insertTestimonial = db.prepare(`
    INSERT INTO testimonials (name, role, content, avatar_url)
    VALUES (?, ?, ?, ?)
  `);

  insertTestimonial.run(
    'John Doe',
    'CEO at TechCorp',
    'Eyaderaddis is a brilliant developer who delivered our project ahead of schedule with exceptional quality.',
    'https://i.pravatar.cc/150?u=john'
  );
  insertTestimonial.run(
    'Sarah Smith',
    'Product Manager',
    'Highly professional and great communication. The final product exceeded our expectations.',
    'https://i.pravatar.cc/150?u=sarah'
  );
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());

  // API Routes
  app.get('/api/projects', (req, res) => {
    const projects = db.prepare('SELECT * FROM projects ORDER BY id DESC').all();
    res.json(projects);
  });

  app.get('/api/testimonials', (req, res) => {
    const testimonials = db.prepare('SELECT * FROM testimonials ORDER BY id DESC').all();
    res.json(testimonials);
  });

  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    try {
      const insert = db.prepare(`
        INSERT INTO contact_messages (name, email, subject, message)
        VALUES (?, ?, ?, ?)
      `);
      insert.run(name, email, subject, message);
      res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
      console.error('Database error:', error);
      res.status(500).json({ error: 'Failed to save message' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

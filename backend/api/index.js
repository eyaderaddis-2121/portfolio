/**
 * Vercel Serverless Entry Point
 * Exports the Express app — Vercel handles the HTTP server.
 * Do NOT call app.listen() here.
 */
require('dotenv').config();
const app = require('../src/app');

module.exports = app;

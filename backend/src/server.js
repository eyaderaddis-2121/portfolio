require('dotenv').config();
const app = require('./app');
const { testConnection } = require('./config/db');

const PORT = process.env.PORT || 5000;

async function startServer() {
  // Test DB connection before accepting requests
  await testConnection();

  app.listen(PORT, () => {
    console.log('');
    console.log('╔══════════════════════════════════════════╗');
    console.log('║   Portfolio Backend Server Running        ║');
    console.log('╠══════════════════════════════════════════╣');
    console.log(`║   Port  : ${PORT}                             ║`);
    console.log(`║   Mode  : ${process.env.NODE_ENV || 'development'}                     ║`);
    console.log('║   API   : http://localhost:' + PORT + '/api        ║');
    console.log('║   Health: http://localhost:' + PORT + '/api/health ║');
    console.log('╚══════════════════════════════════════════╝');
    console.log('');
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

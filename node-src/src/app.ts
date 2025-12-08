// node-src/src/app.ts
import express from 'express';
import cors from 'cors';
import api from './api';
import Products from './products';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/v1', api);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

// Import products from JSON file (for initial setup)
app.post('/import-products', async (req, res) => {
  try {
    // You would import products from a JSON file here
    // For now, just return success
    res.json({ message: 'Import endpoint ready' });
  } catch (error) {
    res.status(500).json({ error: 'Import failed' });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
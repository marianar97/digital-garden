import express, { Request, Response } from 'express';
import cors from 'cors';
import { ResourceController } from './controllers/resources.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

// Routes
app.post('/api/resources', ResourceController.createResource);
app.get('/api/resources', ResourceController.getResources);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
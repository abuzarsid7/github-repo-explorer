import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import githubRoutes from './src/routes/github.js';
import { errorHandler } from './src/middleware/errorHandler.js';

dotenv.config();
const app = express();
app.use(cors({origin: process.env.FRONTEND_URL,}));
app.use(express.json());
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is running'
  });
});
app.use('/api/github', githubRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

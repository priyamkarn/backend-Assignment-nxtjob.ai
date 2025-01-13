import express from 'express';
import cors from 'cors';
import jobRoutes from './routes/job.routes.js';
import { errorHandler } from './middleware/error.middleware.js';
const app = express();
const PORT = process.env.PORT || 4500;
app.use(cors());
app.use(express.json());
app.use('/api', jobRoutes);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

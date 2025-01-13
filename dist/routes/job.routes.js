import { Router } from 'express';
import { createJob, getAllJobs, getJobById, updateJob, deleteJob } from '../controllers/job.controller.js';
const router = Router();
router.post('/jobs', createJob);
router.get('/jobs', getAllJobs);
router.get('/jobs/:id', getJobById);
router.put('/jobs/:id', updateJob);
router.delete('/jobs/:id', deleteJob);
export default router;

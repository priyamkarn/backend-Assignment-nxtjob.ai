import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { JobSchema } from '../types/job.js';

const prisma = new PrismaClient();

export const createJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const validatedData = JobSchema.parse(req.body);
    const job = await prisma.job.create({
      data: validatedData,
    });
    res.status(201).json(job); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to create job' });
  }
};

export const getAllJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await prisma.job.findMany();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};

export const getJobById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const job = await prisma.job.findUnique({
      where: { id }
    });

    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    res.json(job); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
};

export const updateJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const validatedData = JobSchema.parse(req.body);

    const job = await prisma.job.update({
      where: { id },
      data: validatedData,
    });

    res.json(job); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to update job' });
  }
};

export const deleteJob = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);

    await prisma.job.delete({
      where: { id },
    });

    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
};

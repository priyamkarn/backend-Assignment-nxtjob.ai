var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from '@prisma/client';
import { JobSchema } from '../types/job.js';
const prisma = new PrismaClient();
export const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validatedData = JobSchema.parse(req.body);
        const job = yield prisma.job.create({
            data: validatedData,
        });
        res.status(201).json(job);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create job' });
    }
});
export const getAllJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield prisma.job.findMany();
        res.json(jobs);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});
export const getJobById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const job = yield prisma.job.findUnique({
            where: { id }
        });
        if (!job) {
            res.status(404).json({ error: 'Job not found' });
            return;
        }
        res.json(job);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch job' });
    }
});
export const updateJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const validatedData = JobSchema.parse(req.body);
        const job = yield prisma.job.update({
            where: { id },
            data: validatedData,
        });
        res.json(job);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update job' });
    }
});
export const deleteJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield prisma.job.delete({
            where: { id },
        });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete job' });
    }
});

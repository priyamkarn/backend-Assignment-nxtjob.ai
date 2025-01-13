import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Server } from 'http';
import app from '../index.js';

describe('Express Server', () => {
  let server: Server;
  let baseUrl: string;

  beforeAll(async () => {
    server = app.listen(0, () => {
      const address = server.address();
      if (address && typeof address !== 'string') {
        baseUrl = `http://localhost:${address.port}`;
      } else {
        throw new Error('Server address is not available');
      }
    });

    // Wait for the server to be fully initialized (in case the asynchronous setup is not complete)
    if (!baseUrl) {
      await new Promise(resolve => {
        const checkAddress = setInterval(() => {
          const address = server.address();
          if (address && typeof address !== 'string') {
            baseUrl = `http://localhost:${address.port}`;
            clearInterval(checkAddress);
            resolve(true);
          }
        }, 100);
      });
    }
  });

  afterAll(async () => {
    // Ensure the server is closed after tests
    await new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });

  it('should respond to the GET /api/jobs endpoint', async () => {
    const res = await request(baseUrl).get('/api/jobs');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should handle unknown routes', async () => {
    const res = await request(baseUrl).get('/unknown-route');
    expect(res.status).toBe(404);
  });
});

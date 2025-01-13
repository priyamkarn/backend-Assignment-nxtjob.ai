var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import request from 'supertest';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import app from '../index.js';
describe('Express Server', () => {
    let server;
    let baseUrl;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        server = app.listen(0, () => {
            const address = server.address();
            if (address && typeof address !== 'string') {
                baseUrl = `http://localhost:${address.port}`;
            }
            else {
                throw new Error('Server address is not available');
            }
        });
        // Wait for the server to be fully initialized (in case the asynchronous setup is not complete)
        if (!baseUrl) {
            yield new Promise(resolve => {
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
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Ensure the server is closed after tests
        yield new Promise((resolve, reject) => {
            server.close((err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }));
    it('should respond to the GET /api/jobs endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(baseUrl).get('/api/jobs');
        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    }));
    it('should handle unknown routes', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield request(baseUrl).get('/unknown-route');
        expect(res.status).toBe(404);
    }));
});

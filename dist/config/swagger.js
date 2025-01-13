import swaggerJsdoc from 'swagger-jsdoc';
import { join } from 'path';
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Job Board API',
            version: '1.0.0',
            description: 'API for managing job postings',
        },
        servers: [
            {
                url: 'http://localhost:3000/api',
                description: 'Development server',
            },
        ],
    },
    apis: [join(__dirname, '../routes/*.ts')],
};
export const specs = swaggerJsdoc(options);

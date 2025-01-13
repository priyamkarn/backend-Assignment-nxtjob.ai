import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import jobRoutes from './routes/job.routes.js';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();
const PORT = process.env.PORT || 8000;

// Complete Swagger specification
const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'Job Board API',
    version: '1.0.0',
    description: 'API for managing job postings'
  },
  servers: [
    {
      url: `http://localhost:${PORT}/api`,
      description: 'Development server'
    }
  ],
  paths: {
    '/jobs': {
      get: {
        tags: ['Jobs'],
        summary: 'Get all jobs',
        responses: {
          '200': {
            description: 'List of all jobs',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Job'
                  }
                }
              }
            }
          }
        }
      },
      post: {
        tags: ['Jobs'],
        summary: 'Create a new job',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/JobInput'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Job created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Job'
                }
              }
            }
          }
        }
      }
    },
    '/jobs/{id}': {
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer'
          },
          description: 'Job ID'
        }
      ],
      get: {
        tags: ['Jobs'],
        summary: 'Get a job by ID',
        responses: {
          '200': {
            description: 'Job details',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Job'
                }
              }
            }
          },
          '404': {
            description: 'Job not found'
          }
        }
      },
      put: {
        tags: ['Jobs'],
        summary: 'Update a job',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/JobInput'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Job updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Job'
                }
              }
            }
          },
          '404': {
            description: 'Job not found'
          }
        }
      },
      delete: {
        tags: ['Jobs'],
        summary: 'Delete a job',
        responses: {
          '204': {
            description: 'Job deleted successfully'
          },
          '404': {
            description: 'Job not found'
          }
        }
      }
    }
  },
  components: {
    schemas: {
      Job: {
        type: 'object',
        properties: {
          id: {
            type: 'integer',
            description: 'The job ID'
          },
          title: {
            type: 'string',
            description: 'The job title'
          },
          company: {
            type: 'string',
            description: 'Company name'
          },
          location: {
            type: 'string',
            description: 'Job location'
          },
          salary: {
            type: 'number',
            description: 'Job salary'
          },
          description: {
            type: 'string',
            description: 'Job description'
          }
        }
      },
      JobInput: {
        type: 'object',
        required: ['title', 'company', 'location', 'salary', 'description'],
        properties: {
          title: {
            type: 'string',
            description: 'The job title'
          },
          company: {
            type: 'string',
            description: 'Company name'
          },
          location: {
            type: 'string',
            description: 'Job location'
          },
          salary: {
            type: 'number',
            description: 'Job salary'
          },
          description: {
            type: 'string',
            description: 'Job description'
          }
        }
      }
    }
  }
};

// Middleware
app.use(cors());
app.use(express.json());

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/', (req, res) => {
  res.send('Welcome to the Job Board API');
});
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});
// Routes
app.use('/api', jobRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
});

export default app;
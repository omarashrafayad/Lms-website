import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LMS API Documentation',
            version: '1.0.0',
            description: 'Comprehensive API documentation for the LMS platform.',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Category: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        slug: { type: 'string' },
                        image: { type: 'string' },
                    },
                },
                Course: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        title: { type: 'string' },
                        description: { type: 'string' },
                        price: { type: 'number' },
                        instructor: { type: 'string' },
                        category: { type: 'string' },
                        imageCover: { type: 'string' },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        _id: { type: 'string' },
                        name: { type: 'string' },
                        email: { type: 'string' },
                        role: { type: 'string', enum: ['student', 'instructor', 'manager', 'admin'] },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.ts', './server.ts'], // Path to the API docs
};

export default swaggerOptions;

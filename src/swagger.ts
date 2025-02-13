import { Options } from 'swagger-jsdoc';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: `./${process.env.NODE_ENV || 'local'}.env` });

const { PORT } = process.env;

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Local Swagger API",
    version: "1.0.0",
    description: "This is a local REST API application made with Express",
  },
  servers: [
    {
      url: `http://localhost:3000`,
      description: "Local Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

// Swagger options
export const swaggerOptions: Options = {
  swaggerDefinition,
  apis: [
    path.join(process.cwd(), "src/router/*.ts"),  // Ensure paths match your file structure
    path.join(process.cwd(), "src/router/swagger.ts"),
  ],
};

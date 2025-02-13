import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { swaggerOptions } from '../swagger';

const router = Router();

// Initialize swagger-jsdoc with the options
const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI at `/api/docs`
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve the raw Swagger JSON at `/api/swagger.json`
router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

export default router;

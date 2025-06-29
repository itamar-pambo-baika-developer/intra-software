import { Express } from "express";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API INTRA', 
      version: '1.0.0',
      description: 'Documentação da API para o sistema escolar INTRA.',
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3000}`, description: 'Servidor local' },
      { url: `https://school.baikasaude.click`, description: 'Servidor de produção' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      }
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [
    path.join(__dirname, './*.yaml'), 
  ],
});

export const bootstrap = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  return app;
};
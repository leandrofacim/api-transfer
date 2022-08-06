import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

// app.use(
//   (error: Error, request: Request, response: Response, next: NextFunction) => {
//     if (error instanceof AppError) {
//       return response.status(error.statusCode).json({
//         status: 'error',
//         message: error.message,
//       });
//     }

//     return response.status(500).json({
//       status: 'error',
//       message: 'Internal server error',
//     });
//   },
// );

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'API Transfer',
    },
    servers: [
      {
        url: 'http://localhost:3333/api',
        description: 'Development Server',
      },
    ],
  },
  apis: [`${__dirname}/../../modules/**/*.ts`],
};

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerJsDoc(swaggerOptions)),
);

app.listen(3333, () => {
  console.log('Server started on port 3333! 🏆');
});

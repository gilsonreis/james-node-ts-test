import express from 'express';
import * as swaggerUi from 'swagger-ui-express';

export function swaggerSetup(app: express.Express) {
  try {
    const swaggerDocument = require('../../build/swagger.json');
    app.use(`${process.env.SWAGGER_BASE}`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (err) {
    console.log('Unable to load swagger.json', err);
  }
}

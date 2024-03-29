import express, { RequestHandler } from 'express';
import 'express-async-errors';
import cors from 'cors';
import "reflect-metadata";

import globalErrorHandler from './middlewares/globalErrorHandler';
import configureEnvironment from './middlewares/dotenvSetup';
import { swaggerSetup } from './middlewares/swaggerSetup';
import { RegisterRoutes } from './routes/routes';
import {createConnection} from "typeorm";
import {pagination} from 'typeorm-pagination'

configureEnvironment();
const listenPort = process.env.PORT || 4000;
const app = express();

app.use(express.json() as RequestHandler);
app.use(cors({ origin: true }));
app.use(pagination);

createConnection().then(() => console.debug("DATABASE", "✅ Database was Connected successful"));

// Routes
RegisterRoutes(app);

// Middlewares
app.use(globalErrorHandler);
swaggerSetup(app);

// app.get('*', function (req, res) {
//   res.redirect(`${process.env.SWAGGER_BASE}`);
// });

app.listen(listenPort, () => {
  console.log("SERVER", `🚀 Server started on port ${listenPort}`);
})

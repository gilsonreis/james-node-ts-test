import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import globalErrorHandler from './middlewares/globalErrorHandler';
import configureEnvironment from './middlewares/dotenvSetup';
import { swaggerSetup } from './middlewares/swaggerSetup';
import { RegisterRoutes } from './routes/routes';

configureEnvironment();
const listenPort = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

// Routes
RegisterRoutes(app);

// Middlewares
app.use(globalErrorHandler);
swaggerSetup(app);

app.get('*', function (req, res) {
  res.redirect(`${process.env.SWAGGER_BASE}`);
});

app.listen(listenPort, () => {
  console.log(`🚀: Server started on port ${listenPort}`);
})

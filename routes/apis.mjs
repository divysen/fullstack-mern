import { Router } from 'express';
import ExpressValidator from 'express-validator';
import { json } from 'body-parser';

const ApiRouter = Router({ strict: true });

ApiRouter.use(json({ strict: true, type: 'application/json', limit: '5kb' }));

export default ApiRouter;
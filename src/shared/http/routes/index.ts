import { Router } from 'express';
import usersRouter from '@modules/users/routes/usersRouter';
import sessionsRouter from '@modules/users/routes/sessionsRouter';

const routes = Router();

routes.use('/users', usersRouter);

routes.use('/sessions', sessionsRouter);

export default routes;

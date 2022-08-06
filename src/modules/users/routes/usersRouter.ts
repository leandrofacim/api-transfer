import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import isShopkeepers from '@shared/http/middlewares/isShopkeepers';

const usersRouter = Router();
const usersController = new UsersController();

/**
 * @swagger
 * /users:
 *   post:
 *     description: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       description: User data
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ICreateUserRequest'
 *     produces:
 *      - application/json
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/ICreateUserRequest'
 *       '400':
 *         description: Invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/IErrorBadRequestResponse'
 *       '409':
 *         description: Email already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/IEmailAlreadyInUseResponse'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/definitions/IInternalServerErrorResponse'
 */
usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      cpf: Joi.string().required(),
      cnpj: Joi.string(),
      type: Joi.string().required(),
    },
  }),
  usersController.create,
);

/**
 * @swagger
 * /users/transfer:
 *   post:
 *     description: Transfer user data to another user
 *     tags: [Users - Transfer]
 *     requestBody:
 *       description: Transfer data
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/ITransferUserRequest'
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Transferred successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example:
 *                     transferred successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example:
 *                     internal server error
 *                 status:
 *                   type: string
 *                   example:
 *                     error
 */
usersRouter.post(
  '/transfer',
  isAuthenticated,
  isShopkeepers,
  celebrate({
    [Segments.BODY]: {
      payee: Joi.string().required(),
      value: Joi.number().required(),
    },
  }),
  usersController.handleTransfer,
);

export default usersRouter;

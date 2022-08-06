import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateTransferService from '../services/CreateTransferService';
import CreateUserService from '../services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cpf, cnpj, type } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
      cpf,
      cnpj,
      type,
    });

    return response.status(201).json(user);
  }

  public async handleTransfer(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { value, payee } = request.body;

    const createTransferService = new CreateTransferService();

    const transfer = await createTransferService.execute({
      value,
      userId: request.user.id,
      payee,
    });

    if (!transfer) {
      throw new AppError('Transfer failed.');
    }

    return response.json({ message: 'Transferred successfully.' });
  }
}

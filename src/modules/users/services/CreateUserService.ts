import Wallet from '@modules/wallets/typeorm/entities/Wallet';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository, getRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
  cpf: string;
  cnpj: string;
  type: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
    cpf,
    cnpj,
    type,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const walletRepository = getRepository(Wallet);

    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.', 409);
    }

    const user = usersRepository.create({
      name,
      email,
      password: await hash(password, 10),
      cpf,
      cnpj,
      type,
    });

    await usersRepository.save(user);

    const wallet = walletRepository.create({
      user_id: user.id,
      amount: 1000,
    });

    await walletRepository.save(wallet);

    return user;
  }
}

export default CreateUserService;

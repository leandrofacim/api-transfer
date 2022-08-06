import CreateHistoryService from '@modules/histories/services/CreateHistoryService';
import AppError from '@shared/errors/AppError';
import { mountRequest } from '@shared/http/helpers/common-methods';
import { getConnection, getRepository } from 'typeorm';
import Wallet from '../../wallets/typeorm/entities/Wallet';
import User from '../typeorm/entities/User';

interface IRequest {
  value: number;
  userId: string;
  payee: string;
}

class CreateTransferService {
  public async execute({ value, userId, payee }: IRequest): Promise<boolean> {
    const usersRepository = getRepository(User);
    const walletRepository = getRepository(Wallet);

    try {
      await getConnection().transaction(async transaction => {
        const user = await usersRepository.findOne({
          where: { id: userId },
        });

        if (!user) {
          throw new AppError('User not found.');
        }
        const payerWallet = await walletRepository.findOne({
          where: {
            user_id: user.id,
          },
        });

        if (!payerWallet) {
          throw new AppError(`${user.name} has no wallet.`);
        }

        if (payerWallet.amount < value) {
          throw new AppError('Insufficient funds.');
        }

        const payeeUser = await usersRepository.findOne({
          where: { id: payee },
        });

        if (!payeeUser) {
          throw new AppError('Payee not found.');
        }

        const payeeWallet = await walletRepository.findOne({
          where: {
            user_id: payee,
          },
        });

        if (!payeeWallet) {
          throw new AppError('Payee wallet not found.');
        }

        const createHistoryService = new CreateHistoryService();

        await createHistoryService.execute({
          user_id: userId,
          type: 'T',
          amount: value,
          total_before: payerWallet.amount,
          total_after: payerWallet.amount - value,
          user_id_transfer: payee,
        });

        await mountRequest<string>(
          'get',
          'https://run.mocky.io/v3/d02168c6-d88d-4ff2-aac6-9e9eb3425e31',
        )
          .then(response => {
            if (response.status === 200) {
              payerWallet.amount -= value;
              payeeWallet.amount = Number(value) + Number(payeeWallet.amount);
            }
          })
          .catch(error => {
            throw new AppError(error);
          });

        await Promise.all([
          transaction.save(payerWallet),
          transaction.save(payeeWallet),
        ]);
      });

      return true;
    } catch (error) {
      throw new AppError('Transfer failed.');
    }
  }
}

export default CreateTransferService;

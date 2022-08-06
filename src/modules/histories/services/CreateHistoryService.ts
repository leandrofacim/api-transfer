import { getRepository } from 'typeorm';
import History from '../typeorm/entities/History';

interface IRequest {
  user_id: string;
  type: string;
  amount: number;
  total_before: number;
  total_after: number;
  user_id_transfer: string;
}

class CreateHistoryService {
  public async execute({
    user_id,
    amount,
    total_after,
    total_before,
    type,
    user_id_transfer,
  }: IRequest): Promise<void> {
    const usersRepository = getRepository(History);

    await usersRepository.save({
      user_id,
      type,
      amount,
      total_before,
      total_after,
      user_id_transfer,
    });

    return;
  }
}

export default CreateHistoryService;

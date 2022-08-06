import { NextFunction, Request, Response } from 'express';
import AppError from '@shared/errors/AppError';
import { getRepository } from 'typeorm';
import User from '@modules/users/typeorm/entities/User';

export default async function isShopkeepers(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void | Response> {
  const { url, method, user } = request;

  try {
    const hasUser = await getRepository(User).findOne({
      where: {
        id: user.id,
      },
    });

    if (
      hasUser?.type === 'shopkeepers' &&
      url.includes('/transfer') &&
      method === 'POST'
    ) {
      throw new AppError('You are not allowed to transfer.', 401);
    }

    return next();
  } catch (error) {
    throw new AppError((error as Error).message);
  }
}

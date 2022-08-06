import { EntityRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
class UsersTokensRepository extends Repository<UserToken> {
  public async findByToken(token: string): Promise<UserToken | undefined> {
    return this.findOne({
      where: {
        token,
      },
    });
  }

  public async generate(userId: string): Promise<UserToken | undefined> {
    const userToken = this.create({
      user_id: userId,
    });

    await this.save(userToken);

    return userToken;
  }
}

export default UsersTokensRepository;

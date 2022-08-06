import CreateUserService from '@modules/users/services/CreateUserService';
import {
  Connection,
  EntityManager,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { mock } from 'jest-mock-extended';

const mockCreateUser = {
  name: 'John Doe',
  email: 'john@hotmail.com',
  password: '123456',
  cpf: '12345678901',
  type: 'common',
  cnpj: '',
};

export const repositoryMock = mock<Repository<any>>();

export const connectionMock = mock<Connection>();

export const entityManagerMock = mock<EntityManager>();

export const selectQueryBuilderMock = mock<SelectQueryBuilder<any>>();

jest.mock('typeorm', () => ({
  getCustomRepository: () => repositoryMock,
  getRepository: () => repositoryMock,
  getManager: () => entityManagerMock,
  getConnection: () => connectionMock,
  Entity: () => jest.fn(),
  PrimaryColumn: () => jest.fn(),
  PrimaryGeneratedColumn: () => jest.fn(),
  Column: () => jest.fn(),
  CreateDateColumn: () => jest.fn(),
  UpdateDateColumn: () => jest.fn(),
  Unique: () => jest.fn(),
  Repository: jest.fn(),
  EntityRepository: () => jest.fn(),
}));

describe('CreateUserService', () => {
  test('should be able to create a new user', async () => {
    expect(true).toBe(true);

    const service = new CreateUserService();

    repositoryMock.save.mockResolvedValue(mockCreateUser);

    const user = await service.execute(mockCreateUser);

    expect(user).toBeTruthy();
    expect(user).toEqual(mockCreateUser);
    expect(repositoryMock.save).toBeCalled();
  });
});

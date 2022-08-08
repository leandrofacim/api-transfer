import CreateUserService from '@modules/users/services/CreateUserService';
import {
  Connection,
  EntityManager,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';
import { mock } from 'jest-mock-extended';
import { faker } from '@faker-js/faker';

const mockCreateUser = {
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  cpf: faker.datatype.uuid(),
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

    repositoryMock.create.mockResolvedValue(mockCreateUser);
    repositoryMock.save.mockResolvedValue(mockCreateUser);

    const user = await service.execute(mockCreateUser);

    repositoryMock.create.mockResolvedValue(mockCreateUser.id);

    expect(user).toBeTruthy();
    expect(user).toEqual(mockCreateUser);
    expect(repositoryMock.save).toBeCalled();
  });
});

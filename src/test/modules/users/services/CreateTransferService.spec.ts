import { faker } from '@faker-js/faker';
import CreateTransferService from '@modules/users/services/CreateTransferService';
import { mock } from 'jest-mock-extended';
import {
  Connection,
  EntityManager,
  Repository,
  SelectQueryBuilder,
} from 'typeorm';

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

const mockUserPayer = {
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  cpf: faker.datatype.number(99999999999),
  type: 'common',
};

const mockUserPayee = {
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  cpf: faker.datatype.number(99999999999),
  type: 'common',
};

describe('CreateTransferService', () => {
  beforeEach(() => {
    repositoryMock.insert.mockRestore();
    repositoryMock.save.mockRestore();
    repositoryMock.count.mockRestore();
    repositoryMock.findOne.mockRestore();
    repositoryMock.find.mockRestore();
    connectionMock.transaction.mockRestore();
  });

  test('should be able to create a new transfer', async () => {
    const createTransferService = new CreateTransferService();

    repositoryMock.findOne.mockResolvedValue({ id: mockUserPayer.id });
    repositoryMock.findOne.mockResolvedValue({ id: mockUserPayee.id });

    connectionMock.transaction.mockImplementation(async (fn: any) =>
      fn(entityManagerMock),
    );

    await createTransferService.execute({
      userId: faker.datatype.uuid(),
      payee: faker.datatype.uuid(),
      value: faker.datatype.number(),
    });

    expect(connectionMock.transaction).toBeCalledTimes(1);
  });
});

import { CategoryName } from '../../../../shared/domain/value-object/categoryName.vo';
import { CategoryInMemoryRepository } from '../../../infra/db/in-memory/category-in-memory.repository';
import { CreateCategoryUseCase } from '../../commands/create/create-category.use-case';

describe('CreateCategoryUseCase', () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new CreateCategoryUseCase(repository);
  });

  test('should create a category', async () => {
    const spyInsert = jest.spyOn(repository, 'insert');
    let output = await useCase.execute({ name: new CategoryName('test') });

    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: repository.items[0].categoryId.id,
      name: 'test',
      description: null,
      isActive: true,
      createdAt: repository.items[0].createdAt,
    });

    output = await useCase.execute({
      name: new CategoryName('test'),
      description: 'some description',
      isActive: false,
    });

    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: repository.items[1].categoryId.id,
      name: 'test',
      description: 'some description',
      isActive: false,
      createdAt: repository.items[1].createdAt,
    });
  });
});

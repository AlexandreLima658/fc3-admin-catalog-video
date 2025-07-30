import { Sequelize } from "sequelize-typescript";
import { CategorySequelizeRepository } from "../../../infra/db/sequelize/category-sequelize.repository";
import { UpdateCategoryUseCase } from "../../commands/update/update-category.use-case";
import { CategoryModel } from "../../../infra/db/sequelize/category.model";
import { Uuid } from "../../../../shared/domain/value-object/uuid.vo";
import { NotFoundException } from "../../../domain/commons/exceptions/not-found.exception";
import { Category } from "../../../domain/category.entity";


describe("UpdateCategory Integration tests", () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategorySequelizeRepository;

  const setupSequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    models: [CategoryModel],
    logging: false,
  });

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new UpdateCategoryUseCase(repository);

    await setupSequelize.sync({ force: true });
  });

  test("should throws error when entity not found", async () => {
    const uuid = new Uuid();

    await expect(() =>
      useCase.execute({ categoryId: uuid.id, name: "fake" })
    ).rejects.toThrow(new NotFoundException(uuid.id, Category));
  });

  test("should update a category", async () => {
    const entity = Category.fake().aCategory().build();
    repository.insert(entity);

    let output = await useCase.execute({
      categoryId: entity.categoryId.id,
      name: "test",
    });

    expect(output).toStrictEqual({
      id: entity.categoryId.id,
      name: "test",
      description: entity.description,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
    });

    type Arrange = {
      input: {
        id: string;
        name: string;
        description?: null | string;
        isActive?: boolean;
      };

      expected: {
        id: string;
        name: string;
        description: null | string;
        isActive: boolean;
        createdAt: Date;
      };
    };

    const arrange: Arrange[] = [
      {
        input: {
          id: entity.categoryId.id,
          name:'test',
          description: "some description",
        },
        expected: {
          id: entity.categoryId.id,
          name: "test",
          description: "some description",
          isActive: true,
          createdAt: entity.createdAt,
        },
      },
    ];

    for (const i of arrange) {
      output = await useCase.execute({
        categoryId: i.input.id,
        ...("name" in i.input && { name: i.input.name }),
        ...("description" in i.input && { description: i.input.description }),
        ...("isActive" in i.input && { isActive: i.input.isActive }),
      });

      const entityUpdated = await repository.findById(new Uuid(i.input.id));

      expect(output).toStrictEqual({
        id: entity.categoryId.id,
        name: i.expected.name,
        description: i.expected.description,
        isActive: i.expected.isActive,
        createdAt: entityUpdated.createdAt
      });

      
    }
  });
});

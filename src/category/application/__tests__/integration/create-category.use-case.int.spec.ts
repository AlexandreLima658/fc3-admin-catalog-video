import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "../../../infra/db/sequelize/category.model";
import { CreateCategoryUseCase } from "../../commands/create/create-category.use-case";
import { CategorySequelizeRepository } from "../../../infra/db/sequelize/category-sequelize.repository";
import { CategoryName } from "../../../../shared/domain/value-object/categoryName.vo";
import { CategoryId } from "../../../domain/category.entity";

describe("CreateCategoryUseCase Integration", () => {
  let useCase: CreateCategoryUseCase;
  let repository: CategorySequelizeRepository;

  const setupSequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    models: [CategoryModel],
    logging: false,
  });

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new CreateCategoryUseCase(repository);

    await setupSequelize.sync({force: true})
  });

  test("should create a category", async () => {
    let output = await useCase.execute({ name: new CategoryName("test") });
    let entity = await repository.findById(new CategoryId(output.id));

    expect(output).toStrictEqual({
      id: entity.categoryId.id,
      name: "test",
      description: null,
      isActive: true,
      createdAt: entity.createdAt,
    });

    output = await useCase.execute({
      name: new CategoryName("test"),
      description: "some description",
    });

    entity = await repository.findById(new CategoryId(output.id));

    expect(output).toStrictEqual({
      id: entity.categoryId.id,
      name: "test",
      description: "some description",
      isActive: true,
      createdAt: entity.createdAt,
    });
  });
});

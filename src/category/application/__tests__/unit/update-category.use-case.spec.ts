import { CategoryName } from "../../../../shared/domain/value-object/categoryName.vo";
import {
  InvalidUuidError,
  Uuid,
} from "../../../../shared/domain/value-object/uuid.vo";
import { Category } from "../../../domain/category.entity";
import { NotFoundException } from "../../../domain/commons/exceptions/not-found.exception";
import { CategoryInMemoryRepository } from "../../../infra/db/in-memory/category-in-memory.repository";
import { UpdateCategoryUseCase } from "../../commands/update/update-category.use-case";

describe("UpdateCategory Unit test", () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase(repository);
  });

  test("should throws error when entity not found", async () => {
    await expect(() =>
      useCase.execute({ categoryId: "fake id", name: "fake" })
    ).rejects.toThrow(new InvalidUuidError());

    const uuid = new Uuid();

    await expect(() =>
      useCase.execute({ categoryId: uuid.id, name: "fake" })
    ).rejects.toThrow(new NotFoundException(uuid.id, Category));
  });

  test("should update a category", async () => {
    const spyUpdate = jest.spyOn(repository, "update");
    const entity = new Category({ name: new CategoryName("Movie") });

    repository.items = [entity];

    let output = await useCase.execute({
      categoryId: entity.categoryId.id,
      name: "test",
    });

    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: entity.categoryId.id,
      name: "test",
      description: null,
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
          name: entity.name.value,
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

      expect(output).toStrictEqual({
        id: entity.categoryId.id,
        name: i.expected.name,
        description: i.expected.description,
        isActive: i.expected.isActive,
        createdAt: i.expected.createdAt,
      });
    }
  });
});

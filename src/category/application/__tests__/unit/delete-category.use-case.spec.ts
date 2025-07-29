import { CategoryName } from "../../../../shared/domain/value-object/categoryName.vo";
import { InvalidUuidError } from "../../../../shared/domain/value-object/uuid.vo";
import { Category, CategoryId } from "../../../domain/category.entity";
import { NotFoundException } from "../../../domain/commons/exceptions/not-found.exception";
import { CategoryInMemoryRepository } from "../../../infra/db/in-memory/category-in-memory.repository";
import { DeleteCategoryUseCase } from "../../commands/delete/delete-category.use-case";

describe("DeleteCategoryUseCase Unit Tests", () => {
  let useCase: DeleteCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase(repository);
  });

  test("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new InvalidUuidError()
    );

    const categoryId = new CategoryId();

    await expect(() => useCase.execute({ id: categoryId.id })).rejects.toThrow(
      new NotFoundException(categoryId.id, Category)
    );
  });

  test("should delete a category", async () => {
    const items = [new Category({ name: new CategoryName("test") })];
    repository.items = items;

    await useCase.execute({id: items[0].categoryId.id});

    expect(repository.items).toHaveLength(0);
  });
});

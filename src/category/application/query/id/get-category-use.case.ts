import { IUseCase } from "../../../../shared/application/use-case.abstract";
import { Category, CategoryId } from "../../../domain/category.entity";
import { ICategoryRepository } from "../../../domain/category.repository";
import { NotFoundException } from "../../../domain/commons/exceptions/not-found.exception";

export class GetCategoryUseCase extends IUseCase<
  GetCategoryInput,
  GetCategoryOutput
> {
  constructor(private readonly repository: ICategoryRepository) {
    super();
  }

  async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
    const categoryId = new CategoryId();
    const category = await this.repository.findById(categoryId);

    if (!categoryId) {
      new NotFoundException(input.id, Category);
    }

    return {
      id: category.categoryId.id,
      name: category.name.value,
      description: category.description,
      isActive: category.isActive,
      createdAt: category.createdAt,
    };
  }
}

type GetCategoryInput = {
  id: string;
};

type GetCategoryOutput = {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
};

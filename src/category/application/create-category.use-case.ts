import { IUseCase } from "../../shared/application/use-case.interface";
import { CategoryName } from "../../shared/domain/value-object/categoryName.vo";
import { Category } from "../domain/category.entity";
import { ICategoryRepository } from "../domain/category.repository";

export class CreateCategoryUseCase
  implements IUseCase<CreateCategoryInput, CreateCategoryOutput>
{
  constructor(private readonly repository: ICategoryRepository) {}

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    
    const entity = Category.create(input);
    
    await this.repository.insert(entity);

    return {
      id: entity.categoryId.id,
      name: entity.name.value,
      description: entity.description,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
    };
  }
}

export type CreateCategoryInput = {
  name: CategoryName;
  description?: string | null;
  isActive?: boolean;
};

export type CreateCategoryOutput = {
  id: string;
  name: string;
  description?: string | null;
  isActive?: boolean;
  createdAt: Date;
};

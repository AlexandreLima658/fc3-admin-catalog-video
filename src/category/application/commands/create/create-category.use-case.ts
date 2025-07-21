import { IUseCase } from "../../../../shared/application/use-case.interface";
import { Category } from "../../../domain/category.entity";
import { ICategoryRepository } from "../../../domain/category.repository";
import { CreateCategoryInput } from "./create-category.input";
import { CreateCategoryOutput } from "./create-cateogory.output";

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



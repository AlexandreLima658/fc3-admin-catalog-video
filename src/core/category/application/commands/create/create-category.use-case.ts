import { IUseCase } from '../../../../shared/application/use-case.abstract';
import { Category } from '../../../domain/category.entity';
import { ICategoryRepository } from '../../../domain/category.repository';
import { CategoryOutputMapper } from '../../commons/category-output';
import { CreateCategoryInput } from './create-category.input';
import { CreateCategoryOutput } from './create-cateogory.output';

export class CreateCategoryUseCase extends IUseCase<
  CreateCategoryInput,
  CreateCategoryOutput
> {
  constructor(private readonly repository: ICategoryRepository) {
    super();
  }

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const entity = Category.create(input);

    await this.repository.insert(entity);

    return CategoryOutputMapper.toOutput(entity);
  }
}

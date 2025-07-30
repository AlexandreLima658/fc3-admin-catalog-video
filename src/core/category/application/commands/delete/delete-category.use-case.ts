import { IUseCase } from '../../../../shared/application/use-case.abstract';
import { CategoryId } from '../../../domain/category.entity';
import { ICategoryRepository } from '../../../domain/category.repository';

export class DeleteCategoryUseCase extends IUseCase<
  DeleteCategoryInput,
  DeleteCategoryOutput
> {
  constructor(private repository: ICategoryRepository) {
    super();
  }

  async execute(input: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
    const categoryId = new CategoryId(input.id);
    await this.repository.delete(categoryId);
  }
}

export type DeleteCategoryInput = {
  id: string;
};

type DeleteCategoryOutput = void;

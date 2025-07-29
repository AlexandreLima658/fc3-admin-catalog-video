import { IUseCase } from "../../../../shared/application/use-case.abstract";
import { CategoryName } from "../../../../shared/domain/value-object/categoryName.vo";
import { Category, CategoryId } from "../../../domain/category.entity";
import { ICategoryRepository } from "../../../domain/category.repository";
import { NotFoundException } from "../../../domain/commons/exceptions/not-found.exception";
import { CategoryOutputMapper } from "../../commons/category-output";
import { UpdateCategoruInput } from "./update-category.input";
import { UpdateCategoruOutput } from "./update-category.output";

export class UpdateCategoryUseCase extends IUseCase<UpdateCategoruInput,UpdateCategoruOutput> {
 
  constructor(private readonly repository: ICategoryRepository) {
    super();
  }

  async execute(input: UpdateCategoruInput): Promise<UpdateCategoruOutput> {
    const id = new CategoryId(input.categoryId);
    const category = await this.repository.findById(id);

    if (!category) {
      throw new NotFoundException(input.categoryId, Category);
    }

    input.name && category.changeName(new CategoryName(input.name));
    if ("description" in input) {
      category.changeDescription(input.description);
    }

    if (input.isActive === true) {
      category.activate();
    }

    if (input.isActive === false) {
      category.deactivate();
    }

    await this.repository.update(category);

    return CategoryOutputMapper.toOutput(category);
  }
}

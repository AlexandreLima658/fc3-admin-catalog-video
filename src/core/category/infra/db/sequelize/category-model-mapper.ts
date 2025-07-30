import { CategoryName } from "../../../../shared/domain/value-object/categoryName.vo";
import { Category, CategoryId } from "../../../domain/category.entity";
import { CategoryModel } from "./category.model";

export class CategoryModelMapper {
  static toModel(entity: Category): CategoryModel {
    return CategoryModel.build({
      categoryId: entity.categoryId.id,
      name: entity.name.value,
      description: entity.description,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
    });
  }

  static toEntity(model: CategoryModel): Category {
    const entity = new Category({
      categoryId: new CategoryId(model.categoryId),
      name: new CategoryName(model.name),
      description: model.description,
      isActive: model.isActive,
      createdAt: model.createdAt,
    });

    return entity;
  }
}

import { isAlpha } from "class-validator";
import { Entity } from "../../../../../shared/domain/entity";
import { SearchParams } from "../../../../../shared/domain/repository/search-param";
import { SearchResult } from "../../../../../shared/domain/repository/search-results";
import { CategoryName } from "../../../../../shared/domain/value-object/categoryName.vo";
import { Uuid } from "../../../../../shared/domain/value-object/uuid.vo";
import { Category, CategoryId } from "../../../category.entity";
import { ICategoryRepository } from "../../../category.repository";
import { CategoryModel } from "./category.model";
import { CreatedAt } from "sequelize-typescript";

export class CategorySequelizeRepository implements ICategoryRepository {
  sortebleFields: string[] = ["name", "createdAt"];

  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create({
      categoryId: entity.categoryId.id,
      name: entity.name.value,
      description: entity.description,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
    });
  }

  async bulkInsert(entities: Category[]): Promise<void> {
    await this.categoryModel.bulkCreate(
      entities.map((entity) => ({
        categoryId: entity.categoryId.id,
        name: entity.name.value,
        description: entity.description,
        isActive: entity.isActive,
        createdAt: entity.createdAt,
      }))
    );
  }

  update(entity: Category): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(entityId: Uuid): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async findById(entityId: Uuid): Promise<Category | null> {
    const model = await this.categoryModel.findByPk(entityId.id);
    return new Category({
      categoryId: new CategoryId(model.categoryId),
      name: new CategoryName(model.name),
      description: model.description,
      isActive: model.isActive,
      createdAt: model.createdAt,
    });
  }

  async findAll(): Promise<Category[]> {
    const models = await this.categoryModel.findAll();
    return models.map((model) => {  
      return new Category({
        categoryId: new CategoryId(model.categoryId),
        name: new CategoryName(model.name),
        description: model.description,
        isActive: model.isActive,
        createdAt: model.createdAt,
      });
    });
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }

  search(props: SearchParams<string>): Promise<SearchResult<Entity>> {
    throw new Error("Method not implemented.");
  }
}

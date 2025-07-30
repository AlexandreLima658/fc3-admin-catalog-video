import { CategoryName } from '../../../../shared/domain/value-object/categoryName.vo';
import { Uuid } from '../../../../shared/domain/value-object/uuid.vo';
import { Category, CategoryId } from '../../../domain/category.entity';
import {
  CategorySearchParams,
  CategorySearchResult,
  ICategoryRepository,
} from '../../../domain/category.repository';
import { CategoryModel } from './category.model';
import { NotFoundException } from '../../../domain/commons/exceptions/not-found.exception';
import { Op } from 'sequelize';
import { CategoryModelMapper } from './category-model-mapper';

export class CategorySequelizeRepository implements ICategoryRepository {
  sortebleFields: string[] = ['name', 'createdAt'];

  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    const model = CategoryModelMapper.toModel(entity);
    await this.categoryModel.create(model.toJSON());
  }

  async bulkInsert(entities: Category[]): Promise<void> {
    const models = entities.map((entity) =>
      CategoryModelMapper.toModel(entity),
    );
    await this.categoryModel.bulkCreate(models);
  }

  async update(entity: Category): Promise<void> {
    const id = entity.categoryId.id;
    const model = this._get(id);

    if (!model) {
      throw new NotFoundException(id, this.getEntity());
    }

    const modelToUpdate = CategoryModelMapper.toModel(entity);

    await this.categoryModel.update(modelToUpdate.toJSON(), {
      where: { categoryId: id },
    });
  }

  async delete(categoryId: Uuid): Promise<void> {
    const id = categoryId.id;
    const model = this._get(id);

    if (!model) {
      throw new NotFoundException(id, this.getEntity());
    }

    await this.categoryModel.destroy({ where: { categoryId: id } });
  }

  private async _get(id: string) {
    return await this.categoryModel.findByPk(id);
  }

  async findById(entityId: Uuid): Promise<Category | null> {
    const model = await this._get(entityId.id);
    return model ? CategoryModelMapper.toEntity(model) : null;
  }

  async findAll(): Promise<Category[]> {
    const models = await this.categoryModel.findAll();
    return models.map((model) => {
      return CategoryModelMapper.toEntity(model);
    });
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }

  async search(props: CategorySearchParams): Promise<CategorySearchResult> {
    const offset = (props.page - 1) * props.perPage;
    const limit = props.perPage;

    const { rows: models, count } = await this.categoryModel.findAndCountAll({
      ...(props.filter && {
        where: {
          name: { [Op.like]: `%${props.filter}%` },
        },
      }),
      ...(props.sort && this.sortebleFields.includes(props.sort)
        ? { order: [[props.sort, props.sortDir]] }
        : { order: [['createAt', 'desc']] }),
      offset,
      limit,
    });

    return new CategorySearchResult({
      items: models.map((model) => {
        return new Category({
          categoryId: new CategoryId(model.categoryId),
          name: new CategoryName(model.name),
          description: model.description,
          isActive: model.isActive,
          createdAt: model.createdAt,
        });
      }),
      currentPage: props.page,
      perPage: props.perPage,
      total: count,
    });
  }
}

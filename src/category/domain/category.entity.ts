import { Entity } from "../../shared/domain/entity";
import { ValueObject } from "../../shared/domain/value-object";
import { CategoryName} from "../../shared/domain/value-object/categoryName.vo";
import { Uuid } from "../../shared/domain/value-object/uuid.vo";
import { CategoryFakeBuilder } from "./category-fake.builder";

export type CategoryConstructorProps = {
  categoryId?: CategoryId;
  name: CategoryName;
  description?: string | null;
  isActive?: boolean;
  createdAt?: Date;
};

export type CategoryCreateCommand = {
  name: CategoryName;
  description?: string | null;
  isActive?: boolean;
};

export class CategoryId extends Uuid{};

export class  Category extends Entity{
    categoryId: CategoryId;
    name: CategoryName;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
  
  constructor(props: CategoryConstructorProps) {
    super();
    this.categoryId = props.categoryId || new CategoryId();
    this.name = props.name;
    this.description = props.description ?? null;
    this.isActive = props.isActive ?? true;
    this.createdAt = props.createdAt ?? new Date();
  }

  // //factory method
  static create(props: CategoryCreateCommand): Category {
    return new Category(props);
  }

  changeName(name: CategoryName): void {
    this.name = name;
  }

  changeDescription(description: string): void {
    this.description = description;
  }

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }

  get entityId(): ValueObject {
    return this.categoryId;
  }

  static fake() {
    return CategoryFakeBuilder;
  }

  toJSON() {
    return {
      categoryId: this.categoryId.id,
      name: this.name.value,
      description: this.description,
      isActive: this.isActive,
      createdAt: this.createdAt,
    };
  }
}

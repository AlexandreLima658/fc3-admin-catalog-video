import { CategoryName} from "../../shared/domain/value-object/categoryName.vo";
import { Uuid } from "../../shared/domain/value-object/uuid.vo";

export type CategoryConstructorProps = {
  categoryId?: Uuid;
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

export class Category {
    categoryId: Uuid;
    name: CategoryName;
    description: string | null;
    isActive: boolean;
    createdAt: Date;
  
  constructor(props: CategoryConstructorProps) {
    this.categoryId = props.categoryId || new Uuid();
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

  toJSON() {
    return {
      categoryId: this.categoryId.id,
      name: this.name,
      description: this.description,
      isActive: this.isActive,
      createdAt: this.createdAt,
    };
  }
}

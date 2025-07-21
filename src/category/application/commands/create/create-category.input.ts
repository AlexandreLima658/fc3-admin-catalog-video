import { CategoryName } from "../../../../shared/domain/value-object/categoryName.vo";

export type CreateCategoryInput = {
  name: CategoryName;
  description?: string | null;
  isActive?: boolean;
};

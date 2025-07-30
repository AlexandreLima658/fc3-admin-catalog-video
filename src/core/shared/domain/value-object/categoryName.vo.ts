import { DomainException } from "../../../category/domain/commons/exceptions/domain.exception";
import { ValueObject } from "../value-object";

export class CategoryName extends ValueObject {
  static readonly CATEGORY_NAME_MAX_LENGTH = 255;
  readonly value: string;

  constructor(value: string) {
    super();
    if (!value || value.trim() === "") {
      throw DomainException.with("Category name cannot be null or empty");
    }

    if (value.length > CategoryName.CATEGORY_NAME_MAX_LENGTH) {
      throw DomainException.with("Category name cannot be longer then ${CateogoryName.CATEGORY_NAME_MAX_LENGTH} characters");
    }

    this.value = value;
  }
}

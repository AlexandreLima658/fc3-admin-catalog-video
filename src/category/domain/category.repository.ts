import { IRepository } from "../../shared/domain/repository/repository.interface";
import { Category } from "./category.entity";
import { Uuid } from "../../shared/domain/value-object/uuid.vo";

export interface ICategoryRepository extends IRepository<Category, Uuid> {
}
import { ISearchableRepository } from "../../shared/domain/repository/repository.interface";
import { Category } from "./category.entity";
import { Uuid } from "../../shared/domain/value-object/uuid.vo";
import { SearchParams } from "../../shared/domain/repository/search-param";
import { SearchResult } from "../../shared/domain/repository/search-results";

export type CategoryFilter = string;

export class CategorySearchParams extends SearchParams<CategoryFilter> {}

export class CategorySearchResult extends SearchResult<Category> {}

export interface ICategoryRepository
  extends ISearchableRepository<
    Category,
    Uuid,
    CategoryFilter,
    CategorySearchParams,
    CategorySearchResult
  > {}

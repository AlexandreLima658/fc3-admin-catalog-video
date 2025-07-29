import {
  PaginationOutput,
  PaginationOutputMapper,
} from "../../../../shared/application/pagination-output";
import { IUseCase } from "../../../../shared/application/use-case.abstract";
import { SortDirection } from "../../../../shared/domain/repository/search-param";
import {
  CategoryFilter,
  CategorySearchParams,
  CategorySearchResult,
  ICategoryRepository,
} from "../../../domain/category.repository";
import {
  CategoryOutput,
  CategoryOutputMapper,
} from "../../commons/category-output";

export class ListCategoriesUseCase extends IUseCase<
  ListCategoriesInput,
  ListCategoriesOutput
> {
  constructor(private readonly repository: ICategoryRepository) {
    super();
  }

  async execute(input: ListCategoriesInput): Promise<ListCategoriesOutput> {
    const params = new CategorySearchParams(input);
    const searchResult = await this.repository.search(params);

    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategorySearchResult): ListCategoriesOutput {
    const { items: _items } = searchResult;
    const items = _items.map((item) => CategoryOutputMapper.toOutput(item));
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}

type ListCategoriesInput = {
  page?: number;
  perPage?: number;
  sort?: string | null;
  sortDir?: SortDirection;
  filter?: CategoryFilter;
};

type ListCategoriesOutput = PaginationOutput<CategoryOutput>;

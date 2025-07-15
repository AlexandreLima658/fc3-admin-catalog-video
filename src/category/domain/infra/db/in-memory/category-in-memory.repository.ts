import { SortDirection } from "../../../../shared/domain/repository/search-param";
import { Uuid } from "../../../../shared/domain/value-object/uuid.vo";
import {
  InMemoryRepository,
  InMemorySearchRepository,
} from "../../../../shared/infra/db/in-memory/in-memory.repository";
import { Category } from "../../category.entity";

export class CategoryInMemoryRepository extends InMemorySearchRepository<
  Category,
  Uuid
> {

 sortebleFields: string[] = ["name", "createAt"];

  protected async applyFilter(
    items: Category[],
    filter: string
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.name.value.toLowerCase().includes(filter.toLocaleLowerCase());
    });
  }

  protected applySort(
    items: Category[],
    sort: string | null,
    sortDir: SortDirection | null
  ) {
    return sort
      ? super.applySort(items, sort, sortDir)
      : super.applySort(items, "createAt", "desc");
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}

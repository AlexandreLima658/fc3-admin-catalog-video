import { NotFoundException } from "../../../../category/domain/commons/exceptions/not-found.exception";
import { Entity } from "../../../domain/entity";
import {
  IRepository,
  ISearchableRepository,
} from "../../../domain/repository/repository.interface";
import {
  SearchParams,
  SortDirection,
} from "../../../domain/repository/search-param";
import { SearchResult } from "../../../domain/repository/search-results";
import { ValueObject } from "../../../domain/value-object";

export abstract class InMemoryRepository<
  E extends Entity,
  EntityId extends ValueObject
> implements IRepository<E, EntityId>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async bulkInsert(entities: E[]): Promise<void> {
    this.items.push(...entities);
  }

  async update(entity: E): Promise<void> {
    const indexFound = this.items.findIndex((item) =>
      item.entityId.equals(entity.entityId)
    );
    if (indexFound === -1) {
      throw new NotFoundException(entity.entityId, this.getEntity());
    }
    this.items[indexFound] = entity;
  }

  async delete(entityId: EntityId): Promise<void> {
    const indexFound = this.items.findIndex((item) =>
      item.entityId.equals(entityId)
    );

    if (indexFound === -1) {
      throw new NotFoundException(entityId, this.getEntity());
    }
    this.items.splice(indexFound, 1);
  }

  async findById(entityId: EntityId): Promise<E> {
    const item = this.items.find((item) => item.entityId.equals(entityId));
    return typeof item === "undefined" ? null : item;
  }

  async findAll(): Promise<any[]> {
    return this.items;
  }

  abstract getEntity(): new (...args: any[]) => E;
}

export abstract class InMemorySearchRepository<
    E extends Entity,
    EntityId extends ValueObject,
    Filter = string
  >
  extends InMemoryRepository<E, EntityId>
  implements ISearchableRepository<E, EntityId, Filter>
{
  sortebleFields: string[] = [];

  async search(props: SearchParams<Filter>): Promise<SearchResult<E>> {
    const itemsFiltered = await this.applyFilter(this.items, props.filter);
    const itemSorted = this.applySort(itemsFiltered, props.sort, props.sortDir);
    const itemPaginated = this.applyPaginate(
      itemSorted,
      props.page,
      props.perPage
    );

    return new SearchResult({
      items: itemPaginated,
      total: itemsFiltered.length,
      currentPage: props.page,
      perPage: props.perPage,
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter: Filter | null
  ): Promise<E[]>;

  protected applyPaginate(
    items: E[],
    page: SearchParams["page"],
    perPage: SearchParams["perPage"]
  ) {
    const start = (page - 1) * perPage;
    const limit = start + perPage;
    return items.slice(start, limit);
  }

  protected applySort(
    items: E[],
    sort: string | null,
    sortDir: SortDirection | null,
    customGetter?: (sort: string, item: E) => any
  ) {
    if (!sort || !this.sortebleFields.includes(sort)) {
      return items;
    }

    return [...items].sort((a, b) => {
      //@ts-ignore
      const aValue = customGetter ? customGetter(sort, a) : a[sort];
      //@ts-ignore
      const bValue = customGetter ? customGetter(sort, b) : b[sort];

      if (aValue < bValue) {
        return sortDir === "asc" ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortDir === "asc" ? 1 : -1;
      }

      return 0;
    });
  }
}

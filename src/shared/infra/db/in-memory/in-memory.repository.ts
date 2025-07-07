import { NotFoundException } from "../../../../category/domain/commons/exceptions/not-found.exception";
import { Entity } from "../../../domain/entity";
import { IRepository } from "../../../domain/repository/repository.interface";
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
      throw new NotFoundException(entity.entityId,this.getEntity());
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

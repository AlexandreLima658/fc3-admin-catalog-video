import { Entity } from "../entity";
import { ValueObject } from "../value-object";

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
  insert(entity: E): Promise<void>;
  update(entity: E): Promise<void>;
  delete(entityId: E): Promise<void>;
  bulkInsert(entities: E[]): Promise<void>
  findById(entityId: EntityId): Promise<void>;
  findAll(): Promise<E[]>;

  getEntity(): new (...args: any[]) => E;
}

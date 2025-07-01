import { NotFoundException } from "../../../../category/domain/commons/exceptions/not-found.exception";
import { Entity } from "../../../domain/entity";
import { Uuid } from "../../../domain/value-object/uuid.vo";

import { InMemoryRepository } from "../in-memory.repository";

type StubeEntityConstructorProps = {
  entityId?: Uuid;
  name: string;
  price: number;
};

class StubEntity extends Entity {
  entityId: Uuid;
  name: string;
  price: number;

  constructor(props: StubeEntityConstructorProps) {
    super();
    this.entityId = props.entityId || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entityId: this.entityId.id,
      name: this.name,
      price: this.price,
    };
  }
}

class StubeInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity;
  }
}

describe("InMemoryRepository Unit Tests", () => {
  let repository: StubeInMemoryRepository;

  beforeEach(() => {
    repository = new StubeInMemoryRepository();
  });

  test("should insert a new entity", async () => {
    const entity = new StubEntity({
      entityId: new Uuid(),
      name: "Test",
      price: 100,
    });

    await repository.insert(entity);

    expect(repository.items.length).toBe(1);
    expect(repository.items[0]).toBe(entity);
  });

  test("should bulk insert intities", async () => {
    const entities = [
      new StubEntity({
        entityId: new Uuid(),
        name: "Test",
        price: 100,
      }),

      new StubEntity({
        entityId: new Uuid(),
        name: "Test",
        price: 100,
      }),
    ];

    await repository.bulkInsert(entities);
    expect(repository.items.length).toBe(2);
    expect(repository.items[0]).toBe(entities[0]);
    expect(repository.items[1]).toBe(entities[1]);
  });

  test("should returns all entities", async () => {
    const entity = new StubEntity({ name: "name", price: 6 });
    await repository.insert(entity);

    const entities = await repository.findAll();

    expect(entities).toStrictEqual([entity]);
  });

  test("should throw error on update when entity not found", async () => {
    const entity = new StubEntity({ name: "name", price: 6 });

    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundException(entity.entityId, StubEntity)
    );
  });

  test("should throws error on delete when entity not found", async () => {
    const uuid = new Uuid();
    await expect(repository.delete(uuid)).rejects.toThrow(
      new NotFoundException(uuid.id, StubEntity)
    );

    await expect(
      repository.delete(new Uuid("5f063a06-90f7-45fe-b6ca-ba9ad219164b"))
    ).rejects.toThrow(
      new NotFoundException("5f063a06-90f7-45fe-b6ca-ba9ad219164b", StubEntity)
    );
  });
});

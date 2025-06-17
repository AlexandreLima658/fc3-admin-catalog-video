import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
  constructor(readonly value: string) {
    super();
  }
}

describe("ValueObject", () => {
  test("should be equals", () => {
    const valueObject1 = new StringValueObject("test");
    const valueObject2 = new StringValueObject("test");
    expect(valueObject1.equals(valueObject2)).toBe(true);
  });
});

import { InvalidUuidError, Uuid } from "../uuid.vo";

describe("UUID Unit Tests", () => {
  const validateSpy = jest.spyOn(Uuid.prototype as any, "validade");

  test("should throw error when uuid is invalid", () => {
    expect(() => {
      new Uuid("invalid-uuid");
    }).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });

  test("should create a valid uuid", () => {
    const uuid = new Uuid();
    expect(uuid.id).toBeDefined();
  });

  test("should accept a valid uuid", () => {
    const uuid = new Uuid("5a2e568c-6944-451c-a728-8b7a9308b204");
    expect(uuid.id).toBe("5a2e568c-6944-451c-a728-8b7a9308b204");
    expect(validateSpy).toHaveBeenCalledTimes(1);
  });
});

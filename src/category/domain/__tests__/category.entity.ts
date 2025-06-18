import { Uuid } from "../../../shared/domain/value-object/uuid.vo";
import { Category } from "../category.entity";

describe("Category Unit Tests", () => {
  describe("constructor", () => {
    test("should create category with default values", () => {
      const category = new Category({
        name: "Movie",
      });

      expect(category.categoryId).toBeDefined();
      expect(category.name).toBe("Movie");
      expect(category.isActive).toBeTruthy();
    });

    test("should create category with all values", () => {
      const createdAt = new Date();

      const category = new Category({
        name: "Movie",
        description: "Movie description",
        isActive: false,
        createdAt,
      });

      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
      expect(category.isActive).toBeFalsy();
      expect(category.createdAt).toBe(createdAt);
    });

    test("should create category with name and description", () => {
      const category = new Category({
        name: "Movie",
        description: "Movie description",
      });

      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Movie description");
    });
  });

  describe("categoryId field", () => {
    const arrange = [
      { categoryId: null },
      { categoryId: undefined },
      { categoryId: new Uuid() },
    ];

    test.each(arrange)("id = %j", ({ categoryId }) => {
      const category = new Category({
        name: "Movie",
        categoryId: categoryId as any,
      });

      expect(category.categoryId).toBeInstanceOf(Uuid);
    });
  });

  describe("create command", () => {
    test("should create a category", () => {
      const category = Category.create({
        name: "Movie",
      });

      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.isActive).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
    });

    test("should create a category with description", () => {
      const category = Category.create({
        name: "Movie",
        description: "some description",
      });

      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("some description");
      expect(category.isActive).toBe(true);
      expect(category.createdAt).toBeInstanceOf(Date);
    });

    test("should create category with is active", () => {
      const category = Category.create({
        name: "Movie",
        isActive: false,
      });

      expect(category.categoryId).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.isActive).toBe(false);
      expect(category.createdAt).toBeInstanceOf(Date);
    });

    test("should change name", () => {
      const category = Category.create({
        name: "Movie",
      });

      category.changeName("New Movie");

      expect(category.name).toBe("New Movie");
    });

    test("should change description", () => {
      const category = Category.create({
        name: "Movie",
        description: "some description",
      });

      category.changeDescription("New some description");
      expect(category.description).toBe("New some description");
    });

    test("should active a category", () => {
      const category = Category.create({
        name: "Movie",
        isActive: false,
      });

      category.activate();
      expect(category.isActive).toBe(true);
    });

    test("should disable a category", () => {
      const category = Category.create({
        name: "Movie",
        isActive: true,
      });

      category.deactivate();
      expect(category.description).toBeNull();
      expect(category.isActive).toBe(false);
    });
  });
});

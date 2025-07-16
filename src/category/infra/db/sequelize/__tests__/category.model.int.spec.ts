import {
  AllowNull,
  CreatedAt,
  DataType,
  Sequelize,
} from "sequelize-typescript";
import { CategoryModel } from "../category.model";
import { Category } from "../../../../domain/category.entity";

describe("CategoryModel Integration Test", () => {
  let sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      models: [CategoryModel],
      logging: false,
    });

    await sequelize.sync({ force: true });
  });

  test("mapping props", async () => {
    const attributesMap = CategoryModel.getAttributes();
    const attributes = Object.keys(attributesMap);

    expect(attributes).toStrictEqual([
      "categoryId",
      "name",
      "description",
      "isActive",
      "createdAt",
    ]);

    const categoryIdAttr = attributesMap.categoryId;
    expect(categoryIdAttr).toMatchObject({
      field: "categoryId",
      fieldName: "categoryId",
      primaryKey: true,
      type: DataType.UUID(),
    });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({
      field: "name",
      fieldName: "name",
      allowNull: false,
      type: DataType.STRING(255),
    });

    const descriptionAttr = attributesMap.description;
    expect(descriptionAttr).toMatchObject({
      field: "description",
      fieldName: "description",
      allowNull: true,
      type: DataType.TEXT(),
    });

    const isActiveAttr = attributesMap.isActive;
    expect(isActiveAttr).toMatchObject({
      field: "isActive",
      fieldName: "isActive",
      allowNull: false,
      type: DataType.BOOLEAN(),
    });

    const createdAtAttr = attributesMap.createdAt;
    expect(createdAtAttr).toMatchObject({
      field: "createdAt",
      fieldName: "createdAt",
      allowNull: false,
      type: DataType.DATE(3),
    });
  });

  test("creat", async () => {
    const arrange = {
      categoryId: "ddcc84d9-ca05-414e-b286-5d558a75d4ff",
      name: "Fulano",
      description: "bew description",
      isActive: false,
      createdAt: new Date(),
    };

    const category = await CategoryModel.create(arrange);
    expect(category.toJSON()).toStrictEqual(arrange);
  });
});

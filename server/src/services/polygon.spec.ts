// ! FIXME: revisit

import { db } from "../tests";
import polygon from "./polygon";
beforeAll(async () => {
  await db.connect();
});

describe("polygons list service", () => {
  it("should return list of polygons", async () => {
    const polygons = await polygon.list();
    expect(polygons).not.toBeNull();
    expect(polygons).toEqual([]);
  });
});

describe("polygons create service", () => {
  it("should return create polygon with given title and area", async () => {
    const dummyPolygon = {
      title: "test",
      area: [],
    };
    const createdPolygon = await polygon.create(dummyPolygon);
    expect(createdPolygon).not.toBeNull();
    expect(createdPolygon).toHaveProperty("_id");
    expect(createdPolygon).toHaveProperty("title");
    expect(createdPolygon).toHaveProperty("area");
    expect(createdPolygon.title).toEqual(dummyPolygon.title);
    expect(createdPolygon.area).toEqual(dummyPolygon.area);
  });

  it("should throw error if title is not provided", async () => {
    const dummyPolygon = {
      area: [],
    };
    await expect(polygon.create(dummyPolygon as any)).rejects.toThrow();
  });

  it("should throw error if title has length < 2", async () => {
    const dummyPolygon = {
      area: [],
      title: "x",
    };
    await expect(polygon.create(dummyPolygon as any)).rejects.toThrow();
  });

  it("should throw error if title is not provided", async () => {
    const dummyPolygon = {
      area: [],
    };
    await expect(polygon.create(dummyPolygon as any)).rejects.toThrow();
  });
});

describe("polygons update service", () => {
  it("should return updated polygon with given title and area", async () => {
    const dummyPolygon = {
      title: "test",
      area: [],
    };
    const dummyPolygonUpdate = {
      title: "test2",
      area: [],
    };
    const createdPolygon = await polygon.create(dummyPolygon);
    const updatedPolygon = await polygon.update(
      createdPolygon._id,
      dummyPolygonUpdate
    );
    expect(updatedPolygon).not.toBeNull();
    expect(updatedPolygon).toHaveProperty("_id");
    expect(updatedPolygon).toHaveProperty("title");
    expect(updatedPolygon).toHaveProperty("area");
    expect(updatedPolygon.title).toEqual(dummyPolygonUpdate.title);
    expect(updatedPolygon.area).toEqual(dummyPolygonUpdate.area);
  });

  it("should throw error if polygon with given id does not exist", async () => {
    await expect(polygon.update("123", {} as any)).rejects.toThrow();
  });

  it("should keep old title if no new title is provided", async () => {
    const dummyPolygon = {
      title: "test",
      area: [],
    };
    const dummyPolygonUpdate = {
      area: [],
    };
    const createdPolygon = await polygon.create(dummyPolygon);
    const updatedPolygon = await polygon.update(
      createdPolygon._id,
      dummyPolygonUpdate as any
    );
    expect(updatedPolygon).not.toBeNull();
    expect(updatedPolygon).toHaveProperty("_id");
    expect(updatedPolygon).toHaveProperty("title");
    expect(updatedPolygon).toHaveProperty("area");
    expect(updatedPolygon.title).toEqual(dummyPolygon.title);
    expect(updatedPolygon.area).toEqual(dummyPolygonUpdate.area);
  });
});

describe("polygons delete service", () => {
  it("should return deleted polygon with given id", async () => {
    const dummyPolygon = {
      title: "test",
      area: [],
    };
    const createdPolygon = await polygon.create(dummyPolygon);
    const deletedPolygon = await polygon.delete(createdPolygon._id);
    expect(deletedPolygon).not.toBeNull();
    expect(deletedPolygon).toHaveProperty("_id");
    expect(deletedPolygon).toHaveProperty("title");
    expect(deletedPolygon).toHaveProperty("area");
    expect(deletedPolygon.title).toEqual(dummyPolygon.title);
    expect(deletedPolygon.area).toEqual(dummyPolygon.area);
  });

  it("should throw error if polygon with given id does not exist", async () => {
    await expect(polygon.delete("123")).rejects.toThrow();
  });
});

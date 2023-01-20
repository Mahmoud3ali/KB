import { IPolygon, Polygon } from "./../models/polygon";

class PolygonService {
  async list(): Promise<IPolygon[]> {
    const polygons = await Polygon.find();
    return polygons;
  }

  async create(polygon: Pick<IPolygon, "area" | "title">): Promise<IPolygon> {
    const newPolygon = new Polygon(polygon);
    const savedPolygon = await newPolygon.save();
    return savedPolygon;
  }

  async update(
    id: string,
    polygon: Pick<IPolygon, "area" | "title">
  ): Promise<IPolygon> {
    const updatedPolygon = await Polygon.findByIdAndUpdate(id, polygon, {
      new: true,
    });

    if (!updatedPolygon) throw new Error("Polygon not found");

    return updatedPolygon;
  }

  async delete(id: string): Promise<IPolygon> {
    const deletedPolygon = await Polygon.findByIdAndDelete(id);

    if (!deletedPolygon) throw new Error("Polygon not found");

    return deletedPolygon;
  }
}

export default new PolygonService();

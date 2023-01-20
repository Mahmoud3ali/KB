import { RawPolygon } from "../models/polygon";
import { sealed } from "../utils";
import http from "./http";

@sealed
class PolygonService {
  public readonly listKey = "polygon_list";
  private static instance: PolygonService;
  private constructor() {}
  public static getInstance(): PolygonService {
    if (!PolygonService.instance) {
      PolygonService.instance = new PolygonService();
    }
    return PolygonService.instance;
  }

  async list(): Promise<RawPolygon[]> {
    try {
      const { data } = await http.get<{ data: RawPolygon[] }>("/polygons");
      return data.data;
    } catch (error) {
      if (http.isHttpError(error) && error.response) {
        switch (error.response.status) {
          default:
            throw error;
        }
      }
      http.defaultHandleForNonHttpError(error);
      throw new Error("Something went wrong");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await http.delete(`/polygon/${id}`);
    } catch (error) {
      if (http.isHttpError(error) && error.response) {
        switch (error.response.status) {
          default:
            throw error;
        }
      }
      http.defaultHandleForNonHttpError(error);
      throw new Error("Something went wrong");
    }
  }

  async create(polygon: Pick<RawPolygon, "title">): Promise<RawPolygon> {
    try {
      const { data } = await http.post<{ data: RawPolygon }>(
        "/polygon",
        polygon
      );
      return data.data;
    } catch (error) {
      if (http.isHttpError(error) && error.response) {
        switch (error.response.status) {
          default:
            throw error;
        }
      }
      http.defaultHandleForNonHttpError(error);
      throw new Error("Something went wrong");
    }
  }

  async update({
    id,
    polygon,
  }: {
    id: string;
    polygon: Pick<RawPolygon, "title">;
  }): Promise<void> {
    try {
      await http.put(`/polygon/${id}`, polygon);
    } catch (error) {
      if (http.isHttpError(error) && error.response) {
        switch (error.response.status) {
          default:
            throw error;
        }
      }
      http.defaultHandleForNonHttpError(error);
      throw new Error("Something went wrong");
    }
  }
}

const polygonService = PolygonService.getInstance();
export { polygonService };

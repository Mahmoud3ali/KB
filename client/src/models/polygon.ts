import z from "zod";
export type RawPolygon = {
  _id: string;
  title: string;
  area: [number, number][];
};

export const polygonSchema = z.object({
  title: z.string().min(2),
});

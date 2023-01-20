import { Schema, model, Document } from "mongoose";

export interface IPolygon extends Document {
  _id: string;
  title: string;
  area: Array<[number, number]>;
}

const polygonSchema = new Schema<IPolygon>({
  title: { type: String, required: true, minlength: 2 },
  area: [{ type: [Number] }],
});

export const Polygon = model<IPolygon>("Polygon", polygonSchema);

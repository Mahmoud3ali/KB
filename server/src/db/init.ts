// using require instead of import as it need esm module support
const fetch = require("node-fetch");
import { exit } from "process";
import { connectToDatabase } from "../db";
import { Polygon } from "../models/polygon";

const initiatePolygons = async () => {
  const rawPolygons = await (
    await fetch(
      // using a free geojson file from deck.gl examples
      `https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson`
    )
  ).json();
  const polygons = rawPolygons.features.slice(0, 30).map((feature: any) => {
    return {
      title: `${feature.properties.sr_subunit}`,
      area: feature.geometry.coordinates[0],
    };
  });
  // drop all polygons and initiate them again
  await Polygon.deleteMany({});
  // using slice to insert only 100 polygons
  // to avoid performance issues, if we are to to insert all polygons we will need to implement pagination & search server side
  await Polygon.insertMany(polygons);
};

(async () => {
  await connectToDatabase();
  await initiatePolygons();
  exit(0);
})();

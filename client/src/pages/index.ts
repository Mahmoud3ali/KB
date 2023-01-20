import { lazy } from "react";

export * from "./components";
export const NotFoundPage = lazy(() => import("./NotFound"));
export const HomePage = lazy(() => import("./Home"));

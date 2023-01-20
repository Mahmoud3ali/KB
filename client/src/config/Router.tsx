import { Routes, Route, BrowserRouter } from "react-router-dom";
import { NotFoundPage, MainLayout, HomePage } from "../pages";

type Props = {
  children?: React.ReactNode;
};

export const routes = [
  {
    path: "/",
    name: "Home",
    Component: () => <HomePage />,
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="*" element={<NotFoundPage />} />
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>
    </Routes>
  );
};

export const RouterConfig = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <AppRoutes />
      {children}
    </BrowserRouter>
  );
};

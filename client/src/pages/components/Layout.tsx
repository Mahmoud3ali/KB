import { AppBar, Grid } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { NavItem } from "../../components";

const routes = [{ path: "/", name: "Home" }];

const Routes = () => {
  return (
    <Grid container padding="8px">
      {routes.map((route) => (
        <NavItem key={route.name} path={route.path} name={route.name} />
      ))}
    </Grid>
  );
};

export function MainLayout() {
  return (
    <>
      <AppBar position="static" sx={{ minHeight: "64px" }}>
        <Grid
          container
          justifyContent="space-between"
          justifyItems="center"
          padding="8px"
        >
          <Grid item>
            <Routes />
          </Grid>
        </Grid>
      </AppBar>
      {/* routes are lazy loaded, so adding suspense here to display placeholder till route chunk is loaded */}
      {/* we can support prefetching if bundles got bigger, just for simplicity I didn't add it here */}
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  );
}

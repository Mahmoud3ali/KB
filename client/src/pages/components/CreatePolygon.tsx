import { Button } from "@mui/material";
import { useState } from "react";
import { PolygonForm } from "./PolygonForm";

export function CreatePolygon() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PolygonForm mode="create" onClose={() => setOpen(false)} open={open} />
      <Button
        data-cy="create_polygon_btn"
        size="small"
        variant="outlined"
        sx={{
          backgroundColor: "#fff",
        }}
        onClick={() => setOpen(true)}
      >
        Add Polygon
      </Button>
    </>
  );
}

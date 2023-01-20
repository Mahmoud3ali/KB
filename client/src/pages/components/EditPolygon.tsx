import { Button } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { RawPolygon } from "../../models";
import { PolygonForm } from "./PolygonForm";

interface EditPolygonProps {
  polygon: RawPolygon;
}

export function EditPolygon({ polygon }: EditPolygonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <PolygonForm
        mode="update"
        polygon={polygon}
        onClose={() => setOpen(false)}
        open={open}
      />
      <Button
        data-cy="edit_polygon_btn"
        size="small"
        sx={{
          backgroundColor: "#fff",
        }}
        onClick={() => setOpen(true)}
      >
        <EditIcon color="secondary" />
      </Button>
    </>
  );
}

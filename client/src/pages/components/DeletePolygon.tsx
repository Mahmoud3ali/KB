import { Button } from "@mui/material";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { polygonService } from "../../services";
import DeleteIcon from "@mui/icons-material/Delete";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { RawPolygon } from "../../models";

interface DeletePolygonProps {
  polygon: RawPolygon;
}

export function DeletePolygon({ polygon }: DeletePolygonProps) {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { mutate, isLoading } = useMutation(polygonService.delete, {
    onSuccess: () => queryClient.invalidateQueries(polygonService.listKey),
  });

  return (
    <>
      <ConfirmationDialog
        open={open}
        onClose={() => setOpen(false)}
        isDisabled={isLoading}
        onConfirm={() => {
          mutate(polygon._id);
          setOpen(false);
        }}
        title={`Delete polygon "${polygon.title}"`}
        confirmButtonText="Delete"
      >
        Are you sure you want to delete this polygon?
      </ConfirmationDialog>
      <Button
        data-cy="delete_polygon_btn"
        size="small"
        sx={{
          backgroundColor: "#fff",
        }}
        onClick={() => setOpen(true)}
      >
        <DeleteIcon color="error" />
      </Button>
    </>
  );
}

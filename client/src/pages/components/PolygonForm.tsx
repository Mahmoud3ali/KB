import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { polygonSchema, RawPolygon } from "../../models";
import { useMutation, useQueryClient } from "react-query";
import { polygonService } from "../../services";

type BaseProps = {
  open: boolean;
  onClose: () => void;
};
type ModeProps =
  | {
      polygon?: undefined;
      mode: "create";
    }
  | {
      polygon: RawPolygon;
      mode: "update";
    };
type Props = BaseProps & ModeProps;
export function PolygonForm({ mode, polygon, onClose, open }: Props) {
  const queryClient = useQueryClient();
  const polygonMutation = useMutation(polygonService.create, {
    onSuccess: () => queryClient.invalidateQueries(polygonService.listKey),
  });
  const polygonUpdate = useMutation(polygonService.update, {
    onSuccess: () => queryClient.invalidateQueries(polygonService.listKey),
  });
  const { register, formState, handleSubmit } = useForm<
    Omit<RawPolygon, "_id">
  >({
    resolver: zodResolver(polygonSchema),
    mode: "onChange",
    defaultValues: {
      title: mode === "update" ? polygon.title : "",
    },
  });

  return (
    <Dialog data-cy="polygon-form" open={open} onClose={onClose}>
      <DialogTitle data-cy="update-polygon-title" align="center">
        {`${mode === "create" ? "Create" : "Update"} Polygon`}
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          onSubmit={handleSubmit(async ({ title }) => {
            if (mode === "create") {
              await polygonMutation.mutate({ title });
            } else {
              await polygonUpdate.mutate({
                id: polygon._id,
                polygon: { title },
              });
            }
            onClose();
          })}
          noValidate
          marginTop={1}
        >
          <TextField
            data-cy="title_input"
            margin="normal"
            fullWidth
            id="title"
            label="Title"
            {...register("title")}
            error={!!formState.errors.title}
          />
          <FormHelperText
            data-cy="error_text"
            error
            hidden={!formState.errors.title}
          >
            {formState.errors.title?.message}
          </FormHelperText>
          <Button
            data-cy="apply_mutation_btn"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!formState.isValid}
          >
            {mode === "create" ? "Create" : "Update"}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";
import { useQuery } from "react-query";
import { polygonService } from "../services";
import { EditPolygon, DeletePolygon, CreatePolygon } from "./components";

export default function UsersPage() {
  const listPolygons = useQuery([polygonService.listKey], polygonService.list, {
    refetchOnWindowFocus: false,
  });

  if (listPolygons.data === undefined) {
    return <div data-cy="polygons_page">Loading...</div>;
  }

  return (
    <Box
      data-cy="polygons_page"
      marginX="auto"
      marginTop="32px"
      maxWidth="650px"
    >
      <Box textAlign="end" marginBottom={2}>
        <CreatePolygon />
      </Box>
      <TableContainer component={Paper} sx={{ maxHeight: "450px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell sx={{ minWidth: "200px" }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listPolygons.data.map((polygon) => (
              <TableRow key={polygon._id}>
                <TableCell component="th" scope="row">
                  {polygon._id}
                </TableCell>
                <TableCell align="left">{polygon.title}</TableCell>
                <TableCell align="center">
                  <EditPolygon polygon={polygon} />
                  <DeletePolygon polygon={polygon} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

import * as React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Button,
  Box,
} from "@mui/material";

const columns = [
  { id: "order_id", label: "Order ID", minWidth: 100 },
  { id: "product_id", label: "Product ID", minWidth: 100 },
  { id: "category_code", label: "Category Code", minWidth: 100 },
  { id: "brand", label: "Brand Name", minWidth: 100 },
];

function createData(order_id, product_id, category_code, brand) {
  return { order_id, product_id, category_code, brand };
}

export default function InputTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([
    createData(
      "2388440981134609919",
      "2273948312304353947",
      "smartphone",
      "huawei"
    ),
  ]);

  React.useEffect(() => {
    console.log("rows", rows);
  }, [rows]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editField = (e, row, column) => {
    setRows(
      rows.map((r) => {
        if (r.order_id === row.order_id) {
          return {
            ...r,
            [column.id]: e.target.value,
          };
        }
        return r;
      })
    );
  };

  const addRow = () => {
    setRows([...rows, createData("", "", "", "")]);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box
        m={1}
        //margin
        display="flex"
        justifyContent="flex-end"
        alignItems="flex-end"
      >
        <Button variant="contained" onClick={() => addRow()}>Contained</Button>
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <TextField
                            id="outlined-basic"
                            key={column.id}
                            align={column.align}
                            value={value}
                            onChange={(e) => editField(e, row, column)}
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[1, 3, 5]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

import { Box, Button, TextField } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const TablePage = () => {
  const [data, setData] = useState<any>([{ test: "test" }]);
  const [query, setquery] = useState<string>("");

  useEffect(() => {
    axios
      .post("http://35.213.155.144:4000/query", {
        sql: "SELECT * FROM Event ;",
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  }, []);

  const searchHandler = () => {
    axios
      .post("http://35.213.155.144:4000/query", { sql: query })
      .then((res) => {
        console.log(res);
        setData(res.data);
      });
  };

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      display="flex"
      paddingY={"5%"}
      style={{ backgroundColor: "#FAF3E7" }}
      minHeight="100vh"
    >
      <Box width="80%">
        <TextField
          onChange={(e) => setquery(e.target.value)}
          style={{ width: "100%", marginBottom: "20px" }}
        />
        <Button
          onClick={searchHandler}
          variant="contained"
          style={{ width: "100%", marginBottom: "20px" }}
        >
          SEARCH
        </Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {Object.keys(data[0]).map((e) => {
                  console.log(e);
                  return <TableCell>{e}</TableCell>;
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(data).map((e) => {
                return (
                  <TableRow>
                    {Object.keys(data[e]).map((x) => {
                      console.log(data[e], x);
                      return <TableCell>{data[e][x]}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TablePage;

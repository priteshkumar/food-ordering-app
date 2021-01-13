import React from "react";
//import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
//import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
//import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import "font-awesome/css/font-awesome.css";
/*const useStyles = makeStyles({
  table: {
    maxWidth: 450
  }
});*/

function createData(name, count, price) {
  return { name, count, price };
}

const rows = [
  createData("Frozen yoghurt", 2, 300.0),
  createData("Ice cream sandwich", 2, 900.0),
  createData("Eclair", 7, 160.0),
];

export default function TableTest() {
  //const classes = useStyles();

  return (
    <Grid container item xs={12} justify="center">
      <Grid item xs={10} sm={6} md={5}>
        <Table
          aria-label="caption table"
          style={{ borderCollapse: "collapse", border: "none" }}
        >
          <TableHead>
            <h3>My Cart</h3>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                style={{ borderCollapse: "collapse", border: "none" }}
              >
                <TableCell style={{ textAlign: "right" }}>
                  <Icon
                    className="fa fa-stop-circle-o"
                    style={{
                      color: "green",
                      fontSize: "1rem",
                    }}
                  />
                </TableCell>
                <TableCell>
                  <span style={{ textAlign: "left" }}>{row.name}</span>
                </TableCell>

                <TableCell align="center">
                  {" "}
                  <IconButton
                    style={{
                      color: "black",
                      paddingTop: "0px",
                      paddingBottom: "0px",
                      fontSize: "1.1rem",
                    }}
                    edge="start"
                    aria-label="decrementitem"
                  >
                    <RemoveIcon style={{ paddingRight: "2px" }} />{" "}
                    {"  " + row.count + " "}
                  </IconButton>
                  <IconButton
                    style={{
                      color: "black",
                      paddingTop: "0px",
                      paddingBottom: "0px",
                    }}
                    edge="start"
                    aria-label="incrementitem"
                  >
                    <AddIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="left">
                  <span
                    style={{
                      fontSize: "0.9rem",
                    }}
                  >
                    <Icon
                      className="fa fa-inr"
                      style={{
                        marginBottom: "-2px",
                        fontSize: "1rem",
                      }}
                    />
                    {Number(300).toFixed(2)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
}

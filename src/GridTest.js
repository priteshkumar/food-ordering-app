import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardHeader,
} from "@material-ui/core/";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    height: "100vh",
  },
  flexbox: {
        display: "-webkit-flex",
        // eslint-disable-next-line no-dupe-keys
        display: "-ms-flexbox",
        // eslint-disable-next-line no-dupe-keys
        display: "flex",
        overflow: "hidden",
      },
}));

export default function GridTest() {
  const classes = useStyles();
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250, categories: "snacks,drinks" },
    {
      quarter: 4,
      earnings: 19000,
      categories: "indian,chinese,continental,snacks",
    },
  ];
  return (
    <div className={classes.root}>
      <Grid
        className={classes.flexbox}
        container
        spacing={2}
        direction="row"
        justify="flex-start"
        alignItems="stretch"
      >
        {data.map((elem) => (
          <Grid item xs={12} sm={6} md={3} key={data.indexOf(elem)}>
            <Card style={{height:"100%"}}>
              <CardHeader
                title={`quarter : ${elem.quarter}`}
                subheader={`earnings : ${elem.earnings}`}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Hello World
                </Typography>
                <Typography variant="p" style={{ fontSize: "17px" }}>
                  {elem.categories}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
//import { withStyles } from "@material-ui/core/styles";
import restaurantData from "../../common/restaurantData";
//import GridList from "@material-ui/core/GridList";
//import GridListTile from "@material-ui/core/GridListTile";
//import GridListTileBar from "@material-ui/core/GridListTileBar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
//import FormControl from "@material-ui/core/FormControl";
import { GridList, GridListTile, Typography } from "@material-ui/core";
//import ListItemText from "@material-ui/core/ListItemText";
//import TextField from "@material-ui/core/TextField";
//import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
//import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import "font-awesome/css/font-awesome.css";

// eslint-disable-next-line no-unused-vars
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  gridListReleasedMovie: {
    padding: "20px",
    width: "65%",
  },
  gridListMain: {
    transform: "translateZ(0)",
    cursor: "pointer",
  },
  title: {
    color: theme.palette.primary.light,
  },
});

//console.log(typeof styles);

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
    };
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { classes } = this.props;
    console.log(restaurantData);
    return (
      <div>
        <Header />
        <div className="flex-container">
          <GridList
            className="restaurant-list-main"
            cellHeight="auto"
            cols={4}
            style={{ justifyContent: "flex-start", flexWrap: "wrap" }}
          >
            {restaurantData.map((restaurant) => (
              <GridListTile style={{ width: "25%", marginBottom: "0px" }}>
                <Card
                  variant="outlined"
                  style={{
                    margin: "9px",
                    marginBottom: "0px",
                    marginTop: "0px",
                    flex: "1",
                    paddingBottom: "4.7%",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={restaurant.restaurant_name}
                    height="260"
                    image={restaurant.photo_url}
                    title={restaurant.restaurant_name}
                  />
                  <CardContent>
                    <Typography variant="h5">
                      {restaurant.restaurant_name}
                    </Typography>
                    <br />
                    <br />
                    <Typography
                      variant="body2"
                      color="textPrimary"
                      component="p"
                      style={{ fontSize: "17px" }}
                    >
                      {restaurant.categories
                        .map((category) => {
                          return category.category_name;
                        })
                        .join(", ")}
                    </Typography>
                  </CardContent>
                  <br />
                  <CardActions>
                    <div className="cardaction-div">
                      <span
                        style={{
                          backgroundColor: "#ffd600",
                          color: "white",
                          width: "100px",
                          fontWeight: "530",
                          textAlign: "center",
                          fontSize: 12,
                          padding: "5px",
                          paddingLeft: "2px",
                          paddingRight: "2px",
                          marginLeft: "7px",
                        }}
                      >
                        <Icon
                          className="fa fa-star"
                          style={{ color: "white", fontSize: 12 }}
                        />{" "}
                        {restaurant.customer_rating +
                          "(" +
                          restaurant.number_of_customers_rated +
                          ")"}
                      </span>
                      <Icon
                        className="fa fa-inr"
                        style={{ fontSize: 15, width: "100px" }}
                      >
                        {restaurant.average_price_for_two + " for two"}
                      </Icon>
                    </div>
                  </CardActions>
                </Card>
              </GridListTile>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default Home;

/*

import React from 'react';
import { loadCSS } from 'fg-loadcss';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > .fa': {
      margin: theme.spacing(2),
    },
  },
}));

export default function FontAwesome() {
  const classes = useStyles();

  React.useEffect(() => {
    const node = loadCSS(
      'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return (
    <div className={classes.root}>
      <Icon className="fa fa-plus-circle" />
      <Icon className="fa fa-plus-circle" color="primary" />
      <Icon className="fa fa-plus-circle" color="secondary" />
      <Icon className="fa fa-plus-circle" style={{ color: green[500] }} />
      <Icon className="fa fa-plus-circle" fontSize="small" />
      <Icon className="fa fa-plus-circle" style={{ fontSize: 30 }} />
    </div>
  );
}

*/

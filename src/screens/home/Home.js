import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import Icon from "@material-ui/core/Icon";
import "font-awesome/css/font-awesome.css";
import Grid from "@material-ui/core/Grid";

// eslint-disable-next-line no-unused-vars
const styles = (theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  flexContainer: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: "0 auto",
    minHeight: "100vh",
    marginTop: "20px",
  },

  restaurantCard: {
    margin: "9px",
    marginBottom: "16px",
    marginTop: "0px",
    height: "auto",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "96%",
      flex: "96%",
    },

    [theme.breakpoints.between("sm", "md")]: {
      maxWidth: "45.5%",
      flex: "45.5%",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "33%",
      flex: "33%",
    },
    [theme.breakpoints.between("md", "lg")]: {
      maxWidth: "33%",
      flex: "33%",
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: "23.5%",
      flex: "23.5%",
    },
    paddingBottom: "1%",
    position: "relative",
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.baseUrl = "http://localhost:8080/api";
    this.state = {
      restaurantSearch: "",
      restaurants: [],
    };
  }

  componentWillMount() {
    let dataUpcoming = null;
    let xhrUpcoming = new XMLHttpRequest();
    let that = this;
    xhrUpcoming.addEventListener("readystatechange", function() {
      if (this.readyState === 4 && this.status === 200) {
        let result = JSON.parse(this.responseText);
        //console.log(result);
        console.log(result.restaurants);
        that.setState({
          restaurants: result.restaurants,
        });
      }
    });

    xhrUpcoming.open("GET", this.baseUrl + "/restaurant");
    xhrUpcoming.setRequestHeader("Cache-Control", "no-cache");
    xhrUpcoming.send(dataUpcoming);
  }

  restaurantSearchChangeHandler = (restaurantSearch) => {
    console.log(restaurantSearch);
    let that = this;
    let xhrFilter = new XMLHttpRequest();
    xhrFilter.addEventListener("readystatechange", function() {
      if (xhrFilter.readyState === 4 && xhrFilter.status === 200) {
        console.log(xhrFilter.responseText);
        let result = JSON.parse(xhrFilter.responseText);
        console.log(result.restaurants);
        that.setState({
          restaurants: result.restaurants,
        });
      }
    });

    xhrFilter.open("GET", this.baseUrl + "/restaurant/name/" + restaurantSearch);
    xhrFilter.setRequestHeader("Cache-Control", "no-cache");
    xhrFilter.send();
  };

  /*
  movieClickHandler = (movieId) => {
    this.props.history.push("/movie/" + movieId);
  };*/

  render() {
    // eslint-disable-next-line no-unused-vars
    const { classes } = this.props;
    //console.log(this.state.restaurants);
    let restaurantData = this.state.restaurants;
    console.log(restaurantData);

    return (
      <div>
        <Header
          baseUrl={this.baseUrl}
          searchHandler={this.restaurantSearchChangeHandler}
        />
        <div className={classes.root}>
          <Grid
            style={{ marginBottom: "30px" }}
            container
            spacing={1}
            direction="row"
            justify="flex-start"
            alignItems="stretch"
          >
            {restaurantData.length === 0 ? (
              <Typography
                style={{ marginLeft: "10px", fontSize: "1.2rem" }}
                variant="body1"
              >
                No restaurant with the given name.
              </Typography>
            ) : null}
            {restaurantData.map((restaurant) => (
              <Grid
                style={{ marginBottom: "8px" }}
                item
                xs={12}
                sm={6}
                md={3}
                key={restaurantData.indexOf(restaurant)}
              >
                <Card
                  variant="outlined"
                  style={{
                    height: "100%",
                    margin: "7px",
                    position: "relative",
                  }}
                >
                  <CardMedia
                    component="img"
                    alt={restaurant.restaurant_name}
                    height="280"
                    image={restaurant.photo_URL}
                    title={restaurant.restaurant_name}
                  />
                  <CardContent>
                    <Typography
                      variant="h5"
                      gutterBottom
                      style={{ marginBottom: "12px" }}
                    >
                      {restaurant.restaurant_name}
                    </Typography>

                    <Typography
                      gutterBottom
                      variant="body1"
                      color="textPrimary"
                      style={{
                        width: "75%",
                        textAlign: "left",
                        fontSize: "18px",
                        paddingTop: "20px",
                        marginBottom: "50px",
                      }}
                    >
                      {restaurant.categories}
                    </Typography>
                  </CardContent>
                  <div className="cardaction-div">
                    <span
                      style={{
                        backgroundColor: "#fdd835",
                        color: "white",
                        width: "100px",
                        fontWeight: "550",
                        textAlign: "center",
                        fontSize: 12,
                        padding: "9px",
                        paddingLeft: "2px",
                        paddingRight: "2px",
                        marginLeft: "10px",
                      }}
                    >
                      <Icon
                        className="fa fa-star"
                        style={{ color: "white", fontSize: 12 }}
                      />{" "}
                      {restaurant.customer_rating +
                        "(" +
                        restaurant.number_customers_rated +
                        ")"}
                    </span>
                    <Icon
                      className="fa fa-inr"
                      style={{ fontSize: 20, width: "130px" }}
                    >
                      {restaurant.average_price + " for two"}
                    </Icon>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Home);

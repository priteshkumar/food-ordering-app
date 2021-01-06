import React, { Component } from "react";
import "./Home.css";
import Header from "../../common/header/Header";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { GridList, Typography } from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
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

class Home extends Component {
  constructor(props) {
    super(props);
    this.baseUrl = "http://localhost:8080/api/restaurant";
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

    xhrUpcoming.open("GET", this.baseUrl);
    xhrUpcoming.setRequestHeader("Cache-Control", "no-cache");
    xhrUpcoming.send(dataUpcoming);
  }

  restaurantSearchChangeHandler = (event) => {
    this.setState({ restaurantSearch: event.target.value });
  };

  /*
  movieClickHandler = (movieId) => {
    this.props.history.push("/movie/" + movieId);
  };

  filterApplyHandler = () => {
    let queryString = "?status=RELEASED";
    if (this.state.movieName !== "") {
      queryString += "&title=" + this.state.movieName;
    }
    if (this.state.genres.length > 0) {
      queryString += "&genres=" + this.state.genres.toString();
    }
    if (this.state.artists.length > 0) {
      queryString += "&artist_name=" + this.state.artists.toString();
    }
    if (this.state.releaseDateStart !== "") {
      queryString += "&start_date=" + this.state.releaseDateStart;
    }
    if (this.state.releaseDateEnd !== "") {
      queryString += "&end_date=" + this.state.releaseDateEnd;
    }

    let that = this;
    let dataFilter = null;
    let xhrFilter = new XMLHttpRequest();
    xhrFilter.addEventListener("readystatechange", function() {
      if (this.readyState === 4) {
        that.setState({ releasedMovies: JSON.parse(this.responseText).movies });
      }
    });

    xhrFilter.open(
      "GET",
      this.props.baseUrl + "movies" + encodeURI(queryString)
    );
    xhrFilter.setRequestHeader("Cache-Control", "no-cache");
    xhrFilter.send(dataFilter);
  };*/

  render() {
    // eslint-disable-next-line no-unused-vars
    const { classes } = this.props;
    //console.log(this.state.restaurants);
    let restaurantData = this.state.restaurants;
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
              <Card
                variant="outlined"
                style={{
                  margin: "9px",
                  marginBottom: "16px",
                  marginTop: "0px",
                  height: "auto",
                  width: "23.5%",
                  paddingBottom: "1%",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  alt={restaurant.restaurant_name}
                  height="260"
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
                    component="p"
                    style={{
                      width: "75%",
                      textAlign: "left",
                      fontSize: "18px",
                      paddingTop: "20px",
                      paddingBottom: "30px",
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
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}

export default Home;

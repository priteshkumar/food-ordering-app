import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
//import ButtonBase from "@material-ui/core/ButtonBase";
import "font-awesome/css/font-awesome.css";
import Header from "../../common/header/Header";
import { ListSubheader } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: "0",
  },
  paper: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    margin: "0px",
    maxWidth: "100%",
    backgroundColor: "lightgrey",
  },
  image: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    margin: "0 auto",
  },
  img: {
    margin: "0 auto",
    display: "block",
    maxWidth: "94%",
    maxHeight: "100%",
    height: "280px",
  },
  restaurantInfo: {
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
    [theme.breakpoints.up("sm")]: {
      alignItems: "flex-start",
    },
  },
  restaurantName: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "3rem",
    },
  },
});

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { restaurant: null };
  }

  componentDidMount() {
    let that = this;
    let dataRestaurant = null;
    let xhrMovie = new XMLHttpRequest();
    xhrMovie.addEventListener("readystatechange", function() {
      if (this.readyState === 4 && this.status === 200) {
        let restaurantInfo = JSON.parse(this.responseText);
        console.log(restaurantInfo);
        that.setState({ restaurant: JSON.parse(this.responseText) });
        console.log(that.state.restaurant);
      }
    });

    xhrMovie.open(
      "GET",
      this.props.baseUrl + "/restaurant/" + this.props.match.params.id
    );
    xhrMovie.setRequestHeader("Cache-Control", "no-cache");
    xhrMovie.send(dataRestaurant);
  }

  render() {
    const { classes } = this.props;
    const priceMsg = "AVERAGE COST FOR\n TWO PEOPLE";
    const restaurant = this.state.restaurant;

    return (
      <div className={classes.root}>
        <Header baseUrl={this.baseUrl} showSearchBox="false" />
        {this.state.restaurant !== null && (
          <div className={classes.paper}>
            <Grid
              container
              spacing={5}
              direction="row"
              alignItems="flex-start"
              justify="flex-start"
            >
              <Grid item xs={12} sm={5} md={4} lg={4}>
                <div className={classes.image}>
                  <img
                    className={classes.img}
                    alt="complex"
                    src={restaurant.photo_URL}
                  />
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={7}
                lg={7}
                container
                direction="column"
                spacing={2}
                justify="flex-start"
                className={classes.restaurantInfo}
              >
                <Grid item xs>
                  <Typography variant="h3" style={{paddingBottom:"5px"}}>
                    {restaurant.restaurant_name}
                  </Typography>
                  </Grid>
                  <Grid item xs>
                  <Typography variant="h5" gutterBottom>
                    {restaurant.address.locality.toUpperCase()}
                  </Typography>
                  </Grid>
                  <Grid item xs={10} sm={12}>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    style={{ fontWeight: "400"}}
                    gutterBottom
                  >
                    {restaurant.categories
                      .map((category) => {
                        return category.category_name;
                      })
                      .join(", ")}
                  </Typography>
                  </Grid>
                <br />
                <Grid item container direction="row" justify="space-between">
                  <Grid item xs>
                    <Typography variant="subtitle1">
                      <span style={{ fontSize: "1.4rem" }}>
                        <Icon
                          className="fa fa-star"
                          style={{ marginBottom: "-3px" }}
                        />{" "}
                        {restaurant.customer_rating}
                      </span>
                      <br />
                      <span
                        style={{
                          whiteSpace: "pre-line",
                          color: "grey",
                          fontWeight: "430",
                          fontSize: "1.2rem",
                        }}
                      >
                        {"AVERAGE RATING BY\n" +
                          restaurant.number_customers_rated +
                          " CUSTOMERS"}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant="subtitle1">
                      <span style={{ fontSize: "1.4rem" }}>
                        <Icon
                          className="fa fa-inr"
                          style={{ marginBottom: "-3px" }}
                        />
                        {restaurant.average_price}
                      </span>
                      <br />
                      <span
                        style={{
                          whiteSpace: "pre-line",
                          color: "grey",
                          fontWeight: "430",
                          fontSize: "1.2rem",
                        }}
                      >
                        {priceMsg}
                      </span>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        )}
        {this.state.restaurant !== null && (
          <Grid container spacing={2} justify="flex-start">
            <Grid item xs={12} md={6}>
              <Box mt={3}>
                <List dense={false} subheader={<li />}>
                  {restaurant.categories.map((category) => (
                    <>
                      <ListSubheader disableSticky={true}>
                        {category.category_name.toUpperCase()}
                      </ListSubheader>
                      <Divider />
                      {category.item_list.map((item) => (
                        <ListItem>
                          <ListItemIcon>
                            <Icon
                              className="fa fa-circle"
                              style={{
                                color:
                                  item.item_type === "VEG" ? "green" : "red",
                                  fontSize:"1.1rem"
                              }}
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={item.item_name
                              .split(" ")
                              .map((word) => {
                                return (
                                  word.substr(0, 1).toUpperCase() +
                                  word.substr(1)
                                );
                              })
                              .join(" ")}
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="additem">
                              <span
                                style={{
                                  marginRight: "3em",
                                  fontSize: "1.1rem",
                                  color: "black",
                                }}
                              >
                                <Icon
                                  className="fa fa-inr"
                                  style={{
                                    marginBottom: "-2px",
                                    fontSize: "1rem",
                                  }}
                                />
                                {item.price}
                              </span>
                              <AddIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </>
                  ))}
                </List>
              </Box>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Details);

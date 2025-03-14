import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
//import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Snackbar from "@material-ui/core/Snackbar";
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
      fontSize: "2.3rem",
      paddingBottom: "0px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "3rem",
      paddingBottom: "5px",
    },
  },
  restaurantLocality: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.3rem",
    },
  },
  restaurantStats:{
    whiteSpace: "pre-line",
    color: "grey",
    fontWeight: "430",
    fontSize: "1.1rem",
    [theme.breakpoints.down("sm")]: {
      textAlign:"center",
    },
    [theme.breakpoints.up("sm")]: {
      textAlign:"left",
    },
  },
});

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: null,
      checkoutItems: new Map(),
      checkoutItemCount: 0,
      totalPrice: 0.0,
      itemsAdded: false,
      itemsIncreased: false,
      itemsRemoved: false,
      emptyCheckout: false,
      loggedIn: false,
      customerId: null,
      loggedOutcheckOut: false,
    };
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

  addItemHandler = (item, itemAdded) => {
    console.log("add item clicked");
    let checkoutItems = this.state.checkoutItems;
    let checkoutItemCount = this.state.checkoutItemCount;
    let totalPrice = this.state.totalPrice + item.price;

    let hasItem = checkoutItems.has(item.id);
    if (hasItem === true) {
      let itemValue = checkoutItems.get(item.id);
      itemValue["count"] += 1;
      checkoutItems.set(item.id, itemValue);
    } else {
      let itemValue = {
        id: item.id,
        item_name: item.item_name,
        itemtype: item.item_type,
        price: item.price,
        count: 1,
      };
      checkoutItems.set(item.id, itemValue);
    }
    this.setState({ checkoutItems: checkoutItems });
    this.setState({ checkoutItemCount: checkoutItemCount + 1 });
    this.setState({ totalPrice: totalPrice });

    itemAdded === true
      ? this.setState({ itemsAdded: true })
      : this.setState({ itemsIncreased: true });
    //console.log(this.state.checkoutItems);
  };

  removeItemHandler = (item) => {
    console.log("remove item clicked");
    let checkoutItems = this.state.checkoutItems;
    let checkoutItemCount = this.state.checkoutItemCount - 1;
    let totalPrice = this.state.totalPrice - item.price;
    let itemValue = checkoutItems.get(item.id);
    if (itemValue["count"] === 1) {
      checkoutItems.delete(item.id);
    } else {
      itemValue["count"] -= 1;
      checkoutItems.set(item.id, itemValue);
    }
    this.setState({ checkoutItems: checkoutItems });
    this.setState({ checkoutItemCount: checkoutItemCount });
    this.setState({ totalPrice: totalPrice });
    this.setState({ itemsRemoved: true });
  };

  generatecheckedOutItemList = () => {
    let itemList = [];
    this.state.checkoutItems.forEach((itemvalue, id) => {
      let listItem = (
        <TableRow key={"row" + id}>
          <TableCell style={{ textAlign: "right" }}>
            <Icon
              className="fa fa-stop-circle-o"
              style={{
                color: itemvalue.itemtype === "VEG" ? "green" : "red",
                fontSize: "1rem",
              }}
            />
          </TableCell>
          <TableCell>
            <span style={{ textAlign: "left" }}>{itemvalue.item_name}</span>
          </TableCell>

          <TableCell align="center">
            <IconButton
              style={{
                color: "black",
                paddingTop: "0px",
                paddingBottom: "0px",
                fontSize: "1.1rem",
              }}
              edge="start"
              aria-label="decrementitem"
              onClick={() => this.removeItemHandler(itemvalue)}
            >
              <RemoveIcon style={{ paddingRight: "2px" }} />
              <span>{itemvalue.count}</span>
            </IconButton>
            <IconButton
              style={{
                color: "black",
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
              edge="start"
              aria-label="incrementitem"
              onClick={() => this.addItemHandler(itemvalue, false)}
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
              {Number(itemvalue.price * itemvalue.count).toFixed(2)}
            </span>
          </TableCell>
        </TableRow>
      );
      itemList.push(listItem);
    });

    // eslint-disable-next-line no-unused-vars
    let totalAmountRow = (
      <TableRow>
        <TableCell colSpan={1} align="right">
          TOTAL AMOUNT
        </TableCell>
        <TableCell colspan={3} align="right">
          <span
            style={{
              marginRight: "1em",
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
            {Number(this.state.totalPrice).toFixed(2)}
          </span>
        </TableCell>
      </TableRow>
    );
    //itemList.push(totalAmountRow);
    return itemList;
  };

  handlesnackBarClose = (e) => {
    if (this.state.itemsAdded === true) {
      this.setState({ itemsAdded: false });
    } else if (this.state.itemsIncreased === true) {
      this.setState({ itemsIncreased: false });
    } else if (this.state.itemsRemoved === true) {
      this.setState({ itemsRemoved: false });
    } else if (this.state.emptyCheckout === true) {
      this.setState({ emptyCheckout: false });
    } else if (this.state.loggedOutcheckOut === true) {
      this.setState({ loggedOutcheckOut: false });
    }
  };

  profileHandler = (e) => {
    this.props.history.push("/profile");
  };

  checkoutHandler = (e) => {
    if (this.state.checkoutItemCount === 0) {
      this.setState({ emptyCheckout: true });
    } else if (
      this.state.loggedIn === false &&
      this.state.checkoutItemCount > 0
    ) {
      this.setState({ loggedOutcheckOut: true });
    }
    //todo move to checkout screen
  };

  loginNotifier = () => {
    console.log("login notifier");
    this.setState({ loggedIn: true });
    this.setState({ customerId: sessionStorage.getItem("uuid") });
  };

  logoutNotifier = () => {
    console.log("logout notifier");
    this.setState({ loggedIn: false });
    this.setState({ customerId: null });
  };

  render() {
    const { classes } = this.props;
    const restaurant = this.state.restaurant;
    let vertical = "bottom";
    let horizontal = "left";

    return (
      <div className={classes.root}>
        <Header
          baseUrl={this.props.baseUrl}
          showSearchBox="false"
          profileHandler={this.profileHandler}
          loginNotifier={this.loginNotifier}
          logoutNotifier={this.logoutNotifier}
        />
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
                  <Typography variant="h3" className={classes.restaurantName}>
                    {restaurant.restaurant_name}
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.restaurantLocality}
                  >
                    {restaurant.address.locality.toUpperCase()}
                  </Typography>
                </Grid>
                <Grid item xs={10} sm={12}>
                  <Typography
                    variant="h6"
                    color="textPrimary"
                    style={{ fontWeight: "400" }}
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
                <Grid
                  item
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="baseline"
                >
                  <Grid item xs={5} style={{ marginLeft: "0px" }}>
                    <Typography component="div" style={{ textAlign: "left" }}>
                      <p className={classes.restaurantStats}>
                        <Icon
                          className="fa fa-star"
                          style={{ marginBottom: "-3px", color: "black" }}
                        />
                        <span style={{ color: "black" }}>
                          {restaurant.customer_rating}
                        </span>
                        {"\nAVERAGE RATING BY\n" +
                          restaurant.number_customers_rated +
                          " CUSTOMERS"}
                      </p>
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography component="div" style={{ textAlign: "left" }}>
                      <p className={classes.restaurantStats}>
                        <Icon
                          className="fa fa-inr"
                          style={{ marginBottom: "-5px", color: "black" }}
                        />
                        <span style={{ color: "black" }}>
                          {restaurant.average_price}
                        </span>
                        {"\nAVERAGE COST FOR\n2 PEOPLE"}
                      </p>
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        )}
        {this.state.restaurant !== null && (
          <Grid container spacing={2} justify="space-around">
            <Grid item xs={12} md={6}>
              <Box mt={3}>
                <List dense={false} subheader={<li />}>
                  {restaurant.categories.map((category) => (
                    <React.Fragment key={"category" + category.id}>
                      <ListSubheader disableSticky={true}>
                        {category.category_name.toUpperCase()}
                      </ListSubheader>
                      <Divider />
                      {category.item_list.map((item) => (
                        <ListItem key={"item" + item.id}>
                          <ListItemIcon>
                            <Icon
                              className="fa fa-circle"
                              style={{
                                color:
                                  item.item_type === "VEG" ? "green" : "red",
                                fontSize: "1.1rem",
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
                            <IconButton
                              edge="end"
                              aria-label="additem"
                              onClick={() => this.addItemHandler(item, true)}
                            >
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
                                {Number(item.price).toFixed(2)}
                              </span>
                              <AddIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </React.Fragment>
                  ))}
                </List>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={5}
              style={{ marginTop: "24px" }}
            >
              <Card>
                <CardHeader
                  avatar={
                    <Badge
                      color="primary"
                      badgeContent={this.state.checkoutItemCount}
                      showZero
                    >
                      <ShoppingCartIcon />
                    </Badge>
                  }
                  title={<Typography variant="h6">My Cart</Typography>}
                />
                <CardContent>
                  <Table aria-label="caption table" style={{ width: "100%" }}>
                    <TableBody>{this.generatecheckedOutItemList()}</TableBody>
                  </Table>
                  <Typography
                    component="div"
                    style={{
                      width: "98%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <h4>TOTAL AMOUNT</h4>
                    <span
                      style={{
                        marginRight: "2.5em",
                        fontSize: "1rem",
                        color: "black",
                      }}
                    >
                      <Icon
                        className="fa fa-inr"
                        style={{
                          fontSize: "1rem",
                        }}
                      />
                      {Number(this.state.totalPrice).toFixed(2)}
                    </span>
                  </Typography>
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{ width: "100%" }}
                    onClick={this.checkoutHandler}
                  >
                    CHECKOUT
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={
                this.state.itemsAdded ||
                this.state.itemsRemoved ||
                this.state.itemsIncreased ||
                this.state.emptyCheckout ||
                this.state.loggedOutcheckOut
              }
              onClose={this.handlesnackBarClose}
              autoHideDuration={1000}
              message={
                this.state.itemsAdded === true
                  ? "Item added to cart!"
                  : this.state.itemsIncreased === true
                    ? "Item quantity increased by 1!"
                    : this.state.itemsRemoved === true
                      ? "Item removed from cart!"
                      : this.state.emptyCheckout === true
                        ? "Please add an item to your cart!"
                        : this.state.loggedOutcheckOut === true
                          ? "Please login first!"
                          : ""
              }
              key={vertical + horizontal}
            />
          </Grid>
        )}
      </div>
    );
  }
}

export default withStyles(styles)(Details);

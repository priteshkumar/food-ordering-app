import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
//import ButtonBase from "@material-ui/core/ButtonBase";
import "font-awesome/css/font-awesome.css";
import Header from "../../common/header/Header";

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
    maxWidth: "90%",
    maxHeight: "96%",
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
      margin: "0 auto",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "3rem",
    },
  },
});

class Details extends Component {
  render() {
    const { classes } = this.props;
    const ratingMsg = "AVERAGE RATING BY\n658 CUSTOMERS";
    const priceMsg = "AVERAGE COST FOR\n TWO PEOPLE";

    return (
      <div className={classes.root}>
        <Header baseUrl={this.baseUrl} showSearchBox="false" />
        <div className={classes.paper}>
          <Grid
            container
            spacing={6}
            direction="row"
            alignItems="flex-start"
            justify="flex-start"
          >
            <Grid item xs={12} sm={5} md={4} lg={4}>
              <div className={classes.image}>
                <img
                  className={classes.img}
                  alt="complex"
                  src="https://b.zmtcdn.com/data/reviews_photos/94a/be67cc20a6ab663f95330e5af6afb94a_1521359398.jpg"
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
                <Typography gutterBottom variant="h3">
                  Loud Silence
                </Typography>
                <Typography variant="h5" gutterBottom>
                  CBD BELAPUR
                </Typography>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  style={{ fontWeight: "400" }}
                  gutterBottom
                >
                  Chinese, Continental, Indian, Italian, Snacks
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
                      4.4
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
                      {ratingMsg}
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
                      600
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
      </div>
    );
  }
}

export default withStyles(styles)(Details);

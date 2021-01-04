import React, { Component } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
//import Typography from "@material-ui/core/Typography";
//import InputBase from "@material-ui/core/InputBase";
//import MenuItem from "@material-ui/core/MenuItem";
//import Menu from "@material-ui/core/Menu";
//import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
//import AccountCircle from "@material-ui/icons/AccountCircle";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import "./Header.css";

/*
underline: {
      '&:after': {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        left: 0,
        bottom: 0,
        // Doing the other way around crash on IE 11 "''" https://github.com/cssinjs/jss/issues/242
        content: '""',
        position: 'absolute',
        right: 0,
        transform: 'scaleX(0)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shorter,
          easing: theme.transitions.easing.easeOut,
        }),
        pointerEvents: 'none', // Transparent to the hover style.
      },
*/

/*const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "30%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));
*/

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#fff",
    },
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state = { searchText: "" };
  }

  render() {
    return (
      <div className="appbar">
        <IconButton
          style={{ marginLeft: "3px" }}
          edge="start"
          color="inherit"
          aria-label="open drawer"
        >
          <FastfoodIcon style={{ color: "white" }} fontSize="large" />
        </IconButton>
        <div className="searchbar-div">
          <ThemeProvider theme={darkTheme}>
            <Input
              type="text"
              style={{ color: "white" }}
              className="searchbar"
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon fontSize="medium" style={{ color: "white" }} />
                </InputAdornment>
              }
              placeholder="Search by Restaurant Name"
            />
          </ThemeProvider>
        </div>
      </div>
    );
  }
}

export default Header;

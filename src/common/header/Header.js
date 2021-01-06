import React, { Component } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Modal from "react-modal";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import PropTypes from "prop-types";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
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

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const TabContainer = function(props) {
  return (
    <Typography component="div" align="center" style={{ padding: 0 }}>
      {props.children}
    </Typography>
  );
};

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

class Header extends Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state = {
      searchText: "",
      ModalIsOpen: false,
      value: 0,
      username: "",
      usernameRequired: "dispNone",
      password: "",
      passwordRequired: "dispNone",
      fname: "",
      firstnameRequired: "dispNone",
      lname: "",
      lastnameRequired: "dispNone",
      email: "",
      emailRequired: "dispNone",
      userPassword: "",
      userpassRequired: "dispNone",
      contactNo: "",
      contactnumRequired: "dispNone",
    };
  }

  openModalHandler = () => {
    this.setState({
      ModalIsOpen: true,
      value: 0,
      username: "",
      usernameRequired: "dispNone",
      password: "",
      passwordRequired: "dispNone",
      fname: "",
      firstnameRequired: "dispNone",
      lname: "",
      lastnameRequired: "dispNone",
      email: "",
      emailRequired: "dispNone",
      userPassword: "",
      userpassRequired: "dispNone",
      contactNo: "",
      contactnumRequired: "dispNone",
    });
  };

  closeModalHandler = () => {
    this.setState({ ModalIsOpen: false });
  };

  onTabchangeHandler = (event, value) => {
    this.setState({ value: value });
  };

  btnClickhandler = (event) => {
    console.log(this.state.username);
    this.state.username === ""
      ? this.setState({ usernameRequired: "dispBlock" })
      : this.setState({ usernameRequired: "dispNone" });
    this.state.password === ""
      ? this.setState({ passwordRequired: "dispBlock" })
      : this.setState({ passwordRequired: "dispNone" });
  };

  signupClickhandler = (event) => {
    console.log(this.state);
    this.state.fname === ""
      ? this.setState({ firstnameRequired: "dispBlock" })
      : this.setState({ firstnameRequired: "dispNone" });

    this.state.email === "" || !this.validateEmail(this.state.email)
      ? this.setState({ emailRequired: "dispBlock" })
      : this.setState({ emailRequired: "dispNone" });

    /*if (this.state.email.length > 0) {
      if (!this.validateEmail(this.state.email)) {
        this.setState({ invalidEmail: "dispBlock" });
      }
    }*/

    this.state.userPassword === "" ||
    !this.validatePassword(this.state.userPassword)
      ? this.setState({ userpassRequired: "dispBlock" })
      : this.setState({ userpassRequired: "dispNone" });

    this.state.contactNo === "" ||
    !this.validateContactNumber(this.state.contactNo)
      ? this.setState({ contactnumRequired: "dispBlock" })
      : this.setState({ contactnumRequired: "dispNone" });
  };

  validateEmail = (email) => {
    console.log(email);
    let emailRegex = /.+@.+\..+/;
    return emailRegex.test(email);
  };

  /*
  at least a capital letter, a small letter, a number and a special character
  Password must contain at least one capital letter, one small letter, one number, and one special character
  */
  validatePassword = (password) => {
    console.log(password);
    // let passwordRegex = /.+/;
    return (
      /[A-Z]+/.test(password) &&
      /[a-z]+/.test(password) &&
      /[0-9]+/.test(password) &&
      /[!@#$%^&*]+/.test(password)
    );
  };

  validateContactNumber = (contactNum) => {
    console.log(contactNum);
    let phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(contactNum);
  };

  userNameChangeHandler = (e) => {
    this.setState({ username: e.target.value });
  };

  passwordChangeHandler = (e) => {
    this.setState({ password: e.target.value });
  };

  firstNameChangeHandler = (e) => {
    this.setState({ fname: e.target.value });
  };

  lastNameChangeHandler = (e) => {
    this.setState({ lname: e.target.value });
  };

  emailChangeHandler = (e) => {
    this.setState({ email: e.target.value });
  };

  userpassChangeHandler = (e) => {
    this.setState({ userPassword: e.target.value });
  };

  contactnumChangeHandler = (e) => {
    this.setState({ contactNo: e.target.value });
  };

  searchInputChangeHandler = (e) => {
    console.log("searchtext ===" + e.target.value);
    this.props.searchHandler(e.target.value);
  }

  render() {
    let invalidPasswordMsg =
      "Password must contain at least one capital letter, one small letter, one number, and one special character";
    let invalidContactNumMsg =
      "Contact No. must contain only numbers and must be 10 digits long";

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
                  <SearchIcon style={{ color: "white" }} />
                </InputAdornment>
              }
              placeholder="Search by Restaurant Name"
              onChange={this.searchInputChangeHandler}
            />
          </ThemeProvider>
        </div>
        <div className="loginbtn-div">
          <Button
            style={{ marginRight: "15px" }}
            variant="contained"
            color="default"
            size="medium"
            startIcon={<AccountCircle />}
            onClick={this.openModalHandler}
          >
            LOGIN
          </Button>
        </div>
        <Modal
          style={customStyles}
          ariaHideApp={false}
          isOpen={this.state.ModalIsOpen}
          contentLabel="Login"
          onRequestClose={this.closeModalHandler}
        >
          <Tabs
            className="tabs"
            value={this.state.value}
            onChange={this.onTabchangeHandler}
          >
            <Tab label="LOGIN" />
            <Tab label="SIGN UP" />
          </Tabs>
          {this.state.value === 0 && (
            <TabContainer>
              <FormControl className="form-control" required>
                <InputLabel htmlFor="username">Contact No.</InputLabel>
                <Input
                  type="text"
                  id="username"
                  username={this.state.username}
                  value={this.state.username}
                  aria-describedby="enter username"
                  onChange={this.userNameChangeHandler}
                />
                <FormHelperText className={this.state.usernameRequired}>
                  <span className="red" style={{ color: "red" }}>
                    required
                  </span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl className="form-control" required>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                  type="password"
                  id="password"
                  password={this.state.password}
                  value={this.state.password}
                  aria-describedby="enter password"
                  onChange={this.passwordChangeHandler}
                />
                <FormHelperText className={this.state.passwordRequired}>
                  <span className="red">required</span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.btnClickhandler}
              >
                LOGIN
              </Button>
            </TabContainer>
          )}
          {this.state.value === 1 && (
            <TabContainer>
              <FormControl className="form-control" required>
                <InputLabel htmlFor="fname">First Name</InputLabel>
                <Input
                  type="text"
                  id="fname"
                  fname={this.state.fname}
                  value={this.state.fname}
                  aria-describedby="enter first name"
                  onChange={this.firstNameChangeHandler}
                />
                <FormHelperText className={this.state.firstnameRequired}>
                  <span className="red" style={{ color: "red" }}>
                    required
                  </span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl className="form-control">
                <InputLabel htmlFor="lname">Last Name</InputLabel>
                <Input
                  type="text"
                  id="lname"
                  lname={this.state.lname}
                  value={this.state.lname}
                  aria-describedby="enter last name"
                  onChange={this.lastNameChangeHandler}
                />
              </FormControl>
              <br />
              <br />
              <FormControl className="form-control" required>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                  type="email"
                  id="email"
                  email={this.state.email}
                  value={this.state.email}
                  aria-describedby="enter email id"
                  onChange={this.emailChangeHandler}
                />
                <FormHelperText className={this.state.emailRequired}>
                  <span className="red">
                    {this.state.email === "" ? "required" : "Invalid Email"}
                  </span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl className="form-control" required>
                <InputLabel htmlFor="user-password">Password</InputLabel>
                <Input
                  type="password"
                  id="user-password"
                  user-password={this.state.userPassword}
                  value={this.state.userPassword}
                  aria-describedby="enter password"
                  onChange={this.userpassChangeHandler}
                />
                <FormHelperText className={this.state.userpassRequired}>
                  <span className="red">
                    {this.state.userPassword === ""
                      ? "required"
                      : invalidPasswordMsg}
                  </span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <FormControl className="form-control" required>
                <InputLabel htmlFor="contactno">Contact No.</InputLabel>
                <Input
                  type="text"
                  id="contactno"
                  contactno={this.state.contactNo}
                  value={this.state.contactNo}
                  aria-describedby="enter contact number"
                  onChange={this.contactnumChangeHandler}
                />
                <FormHelperText className={this.state.contactnumRequired}>
                  <span className="red">
                    {this.state.contactNo === ""
                      ? "required"
                      : invalidContactNumMsg}
                  </span>
                </FormHelperText>
              </FormControl>
              <br />
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.signupClickhandler}
              >
                SIGNUP
              </Button>
            </TabContainer>
          )}
        </Modal>
      </div>
    );
  }
}

export default Header;

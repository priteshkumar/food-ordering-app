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
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
//import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
//import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import Snackbar from "@material-ui/core/Snackbar";
import "./Header.css";

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
      registrationSuccess: false,
      signupError: "dispNone",
      signupErrorMsg: "",
      loggedIn: false,
      loginError:"dispNone",
      loginErrorMsg:"",
      anchorEl: null,
      snackDisp:false,
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
      registrationSuccess: false,
      signupError: "dispNone",
      signupErrorMsg: "",
      loggedIn: false,
      loginError:"dispNone",
      loginErrorMsg:"",
      anchorEl: null,
      snackDisp: false,
    });
  };

  closeModalHandler = () => {
    this.setState({ ModalIsOpen: false });
  };

  onTabchangeHandler = (event, value) => {
    this.setState({ value: value });
  };

  loginClickhandler = (event) => {
    console.log(this.state.username);
    this.state.username === "" ||
    !this.validateContactNumber(this.state.username)
      ? this.setState({ usernameRequired: "dispBlock" })
      : this.setState({ usernameRequired: "dispNone" });
    this.state.password === ""
      ? this.setState({ passwordRequired: "dispBlock" })
      : this.setState({ passwordRequired: "dispNone" });

    if (
      this.state.username === "" ||
      !this.validateContactNumber(this.state.username) ||
      this.state.password === ""
    ) {
      return;
    }

    let that = this;
    let dataLogin = null;

    let xhrLogin = new XMLHttpRequest();
    xhrLogin.addEventListener("readystatechange", function() {
      if (this.readyState === 4 && this.status === 200) {
        console.log(xhrLogin.getResponseHeader("access-token"));

        sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
        sessionStorage.setItem(
          "loggedinUser",
          JSON.parse(this.responseText).first_name
        );
        sessionStorage.setItem(
          "access-token",
          xhrLogin.getResponseHeader("access-token")
        );

        that.setState({ loggedIn: true });
        that.setState({ snackDisp: true });
        if(that.props.loginNotifier){
         // console.log("notify loginstate");
          that.props.loginNotifier();
        }
        that.closeModalHandler();
      }
      else if(this.readyState === 4 && this.status !== 200){
        let errorMsg = JSON.parse(this.responseText);
        that.setState({loginError:"dispBlock"});
        that.setState({loginErrorMsg:errorMsg.message});
      }
    });

    xhrLogin.open("POST", this.props.baseUrl + "/customer/login");
    xhrLogin.setRequestHeader(
      "Authorization",
      "Basic " + window.btoa(this.state.username + ":" + this.state.password)
    );
    xhrLogin.setRequestHeader("Content-Type", "application/json");
    xhrLogin.setRequestHeader("Cache-Control", "no-cache");
    xhrLogin.send(dataLogin);
  };

  signupClickhandler = (event) => {
    this.state.fname === ""
      ? this.setState({ firstnameRequired: "dispBlock" })
      : this.setState({ firstnameRequired: "dispNone" });

    this.state.email === "" || !this.validateEmail(this.state.email)
      ? this.setState({ emailRequired: "dispBlock" })
      : this.setState({ emailRequired: "dispNone" });

    this.state.userPassword === "" ||
    !this.validatePassword(this.state.userPassword)
      ? this.setState({ userpassRequired: "dispBlock" })
      : this.setState({ userpassRequired: "dispNone" });

    this.state.contactNo === "" ||
    !this.validateContactNumber(this.state.contactNo)
      ? this.setState({ contactnumRequired: "dispBlock" })
      : this.setState({ contactnumRequired: "dispNone" });

    console.log(this.state);

    if (
      this.state.fname === "" ||
      this.state.email === "" ||
      !this.validateEmail(this.state.email) ||
      this.state.userPassword === "" ||
      !this.validatePassword(this.state.userPassword) ||
      this.state.contactNo === "" ||
      !this.validateContactNumber(this.state.contactNo)
    ) {
      console.log("invalid singnup");
      return;
    }

    let that = this;
    let dataSignUp = JSON.stringify({
      email_address: this.state.email,
      first_name: this.state.fname,
      last_name: this.state.lname,
      contact_number: this.state.contactNo,
      password: this.state.userPassword,
    });

    let xhrSignup = new XMLHttpRequest();
    xhrSignup.addEventListener("readystatechange", function() {
      console.log(this.readyState + " " + this.status);
      if (this.readyState === 4) {
        switch (this.status) {
          case 201: {
            console.log(this.responseText);
            that.setState({ value: 0 });
            that.setState({ registrationSuccess: true });
            break;
          }
          case 400: {
            let errorMsg = JSON.parse(this.responseText);
            console.log(errorMsg);
            that.setState({ signupError: "dispBlock" });
            that.setState({
              signupErrorMsg: errorMsg.message,
            });
            break;
          }
          default:
            break;
        }
      }
    });

    xhrSignup.open("POST", this.props.baseUrl + "/customer/signup");
    xhrSignup.setRequestHeader("Content-Type", "application/json");
    xhrSignup.setRequestHeader("Cache-Control", "no-cache");
    xhrSignup.send(dataSignUp);
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
  };

  handlesnackBarClose = (e) => {
    this.setState({ registrationSuccess: false });
    this.setState({ snackDisp: false });
  };

  openMenuHandler = (e) => {
    this.setState({ anchorEl: e.currentTarget });
  };

  closeMenuHandler = (e) => {
    this.setState({ anchorEl: null });
  };

  profileHandler = (e) => {
    console.log("navigate to profile page");
    this.props.profileHandler();
  };

  logoutHandler = (e) => {
    let that = this;

    let xhrLogin = new XMLHttpRequest();
    xhrLogin.addEventListener("readystatechange", function() {
      if (this.readyState === 4 && this.status === 200) {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");
        sessionStorage.removeItem("loggedinUser");
        that.setState({ loggedIn: false });
        if(that.props.logoutNotifier){
          /*console.log("notify logout"); */
          that.props.logoutNotifier();
        }
        console.log("loggedout customer");
      }
    });

    xhrLogin.open("POST", this.props.baseUrl + "/customer/logout");
    xhrLogin.setRequestHeader(
      "Authorization",
      "Bearer " + sessionStorage.getItem("access-token")
    );
    xhrLogin.setRequestHeader("Content-Type", "application/json");
    xhrLogin.setRequestHeader("Cache-Control", "no-cache");
    xhrLogin.send();
  };

  render() {
    let invalidPasswordMsg =
      "Password must contain at least one capital letter, one small letter, one number, and one special character";
    let invalidContactNumMsg =
      "Contact No. must contain only numbers and must be 10 digits long";
    let vertical = "bottom";
    let horizontal = "left";

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
        <div className="searchbar-div" style={{display:this.props.showSearchBox === "false"?"none":"block"}}>
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
          {!this.state.loggedIn ? (
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
          ) : (
            <>
              <IconButton
                aria-controls="logged-in-menu"
                aria-haspopup="true"
                style={{
                  textAlign: "left",
                  marginRight: "14px",
                  color: "white",
                }}
                aria-label="user profile"
                onMouseOver={this.openMenuHandler}
              >
                <AccountCircle
                  style={{
                    marginLeft: "-7px",
                    marginBottom: "-2px",
                    fontSize: "1rem",
                  }}
                />{" "}
                <span
                  style={{
                    paddingLeft: "5px",
                    fontSize: "1rem",
                    color: "lightgrey",
                  }}
                >
                  {" " + sessionStorage.getItem("loggedinUser")}
                </span>
              </IconButton>
              <Menu
                id="logged-in-menu"
                getContentAnchorEl={null}
                anchorEl={this.state.anchorEl}
                keepMounted
                open={Boolean(this.state.anchorEl)}
                onClose={this.closeMenuHandler}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <MenuItem onClick={this.profileHandler}>My Profile</MenuItem>
                <MenuItem onClick={this.logoutHandler}>Logout</MenuItem>
              </Menu>
            </>
          )}
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
                    {this.state.username === ""
                      ? "required"
                      : "Invalid Contact"}
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
              <FormControl>
              <FormHelperText style={{marginTop:"15px",marginBottom:"15px"}} className={this.state.loginError}>
                <span
                  className="red"
                  style={{ paddingTop: "5px", fontSize: "1rem" }}
                >
                  {this.state.loginErrorMsg}
                </span>
              </FormHelperText>
              </FormControl>
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={this.loginClickhandler}
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
              <FormHelperText className={this.state.signupError}>
                <span
                  className="red"
                  style={{ marginTop: "15px", fontSize: "1rem" }}
                >
                  {this.state.signupErrorMsg}
                </span>
              </FormHelperText>
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
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={this.state.registrationSuccess || this.state.snackDisp}
          onClose={this.handlesnackBarClose}
          autoHideDuration={3000}
          message={
            this.state.snackDisp === true
              ? "Logged in successfully!"
              : "Registered successfully! Please login now!"
          }
          key={vertical + horizontal}
        />
      </div>
    );
  }
}

export default Header;

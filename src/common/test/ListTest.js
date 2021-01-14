import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
//import CommentIcon from "@material-ui/icons/Comment";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import "font-awesome/css/font-awesome.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function ListTest() {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <Grid container item xs={12}>
      <Grid item container xs={10} sm={6} md={5}>
        <List className={classes.root}>
          {[0, 1, 2, 3].map((value) => {
            const labelId = `checkbox-list-label-${value}`;

            return (
              <ListItem
                key={value}
                role={undefined}
                dense
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
            <Icon
              className="fa fa-stop-circle-o"
              style={{
                color: "green" ,
                fontSize: "1.1rem",
              }}
            />
          </ListItemIcon>
                
                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                <ListItemSecondaryAction style={{right:"5%"}}>
                  <IconButton
                    edge="start"
                    aria-label="comments"
                    style={{ fontSize: "1em"}}
                  >
                    <AddIcon/>{" 2"}
                  </IconButton>
                  <IconButton
                    edge="start"
                    aria-label="comments"
                    style={{ fontSize: "1em"}}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <span
              style={{
                marginLeft: "1em",
                fontSize: "1rem",
              }}
            >
              <Icon
                className="fa fa-inr"
                style={{
                  marginBottom: "-2px",
                  fontSize: "1rem",
                }}  
              />
              {Number(300).toFixed(2)}
            </span>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
      </Grid>
    </Grid>
  );
}

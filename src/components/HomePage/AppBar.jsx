import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import { useUserInfo } from './../../hooks/UseUserInfo';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textTransform: "capitalize",
  },
}));

export default function ButtonAppBar() {
  const context = useUserInfo();
  const classes = useStyles();
  const navigate = useNavigate();

  const LogoutBtnClickedHandler = () => {
    context.setUserInfo({
      token: "",
      userData: null,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("UserData");
    navigate("/");
  };

  
  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {context.userInfo.token === "" ? "Welcome" : context.userInfo.userData.name}
            <br />
          </Typography>
          <Button color="inherit" onClick={LogoutBtnClickedHandler}>
            {context.userInfo.token === "" ? "Register" : "Logout"}
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

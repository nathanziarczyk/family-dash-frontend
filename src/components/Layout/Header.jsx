import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FaceIcon from "@material-ui/icons/Face";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import GroupIcon from "@material-ui/icons/Group";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CancelIcon from "@material-ui/icons/Cancel";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

import { logoutUser } from "./../../data/user";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "white",
    cursor: "pointer",
    height: "100%",
  },
  grow: {
    display: "flex",
  },
}));

export default function MenuAppBar({ group, mobile }) {
  const user = useSelector((state) => state.user.user);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElGroup, setAnchorElGroup] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const openGroup = Boolean(anchorElGroup);

  const currentGroup = useSelector((state) => state.group);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleGroupMenu = (event) => {
    setAnchorElGroup(event.currentTarget);
  };

  const handleGroupClose = () => {
    setAnchorElGroup(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    dispatch(logoutUser());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div className={classes.grow}>
            <Link to="/" className={classes.title}>
              <Typography variant="h6">FamilyDash</Typography>
            </Link>
          </div>
          {group && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
                onClick={handleGroupMenu}
              >
                <GroupIcon style={{ marginRight: !mobile && ".5em" }} />
                {!mobile && (
                  <Typography
                    variant="subtitle2"
                    style={{ display: "flex", alignItems: "flex-end" }}
                  >
                    {currentGroup.name}
                  </Typography>
                )}
                {openGroup ? <ArrowDropDownIcon /> : <ArrowLeftIcon />}
              </div>
              <Menu
                id="menu-appbar"
                style={{ padding: "1em", width: "100%" }}
                anchorEl={anchorElGroup}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                open={openGroup}
                onClose={handleGroupClose}
              >
                <MenuItem button={false}>
                  <Typography variant="subtitle2">
                    Current group <br />
                    <b>{currentGroup.name}</b>
                  </Typography>
                </MenuItem>
                <MenuItem onClick={(e) => console.log(e)}>
                  <GroupAddIcon
                    color="primary"
                    style={{ marginRight: ".5em" }}
                  />
                  <Typography variant="body2">Add member</Typography>
                </MenuItem>
                <MenuItem onClick={(e) => console.log(e)}>
                  <CancelIcon color="error" style={{ marginRight: ".5em" }} />
                  <Typography variant="body2">Leave group</Typography>
                </MenuItem>
              </Menu>
            </>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <FaceIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              style={{ padding: "1em" }}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem button={false}>
                <Typography variant="subtitle2">
                  Logged in as <br />
                  <b>
                    {user.firstName} {user.lastName}
                  </b>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

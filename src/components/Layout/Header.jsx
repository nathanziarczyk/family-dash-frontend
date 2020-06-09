import React, { useState } from "react";
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
import { Link, useHistory } from "react-router-dom";
import GroupIcon from "@material-ui/icons/Group";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import CancelIcon from "@material-ui/icons/Cancel";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import EventIcon from "@material-ui/icons/Event";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import NoteIcon from "@material-ui/icons/Note";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";

import { logoutUser } from "./../../data/user";
import AddGroupMemberModal from "../ReUsable/AddGroupMemberModal";
import ConfirmDialog from "../ReUsable/ConfirmDialog";
import axios from "../../axios";
import { Divider } from "@material-ui/core";

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
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const history = useHistory();

  const open = Boolean(anchorEl);
  const openGroup = Boolean(anchorElGroup);

  const currentGroup = useSelector((state) => state.group);
  const userId = useSelector((state) => state.user.user.id);

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

  const leaveGroup = (e) => {
    axios.put(`/groups/${currentGroup.id}`, {
      removeGroupMember: `/api/users/${userId}`,
    });
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" elevation={0} style={{ height: "50px" }}>
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "0px",
          }}
        >
          <div className={classes.grow}>
            <Link to="/" className={classes.title}>
              <Typography variant="h6">FamilyDash</Typography>
            </Link>
          </div>
          {group && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton color="inherit" onClick={() => history.goBack()}>
                <ArrowBackIosIcon fontSize="small" />
              </IconButton>
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
                style={{ padding: 0, width: "100%" }}
                className={classes.title}
                anchorEl={anchorElGroup}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                open={openGroup}
                onClose={handleGroupClose}
                dense
              >
                <Link
                  to={`/group/${currentGroup.id}`}
                  onClick={handleGroupClose}
                >
                  <MenuItem>
                    <Typography variant="subtitle2">
                      Current group <br />
                      <b>{currentGroup.name}</b>
                    </Typography>
                  </MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={(e) => setModalOpen(true)}>
                  <GroupAddIcon
                    color="primary"
                    style={{ marginRight: ".5em" }}
                  />
                  <Typography variant="body2">Add member</Typography>
                </MenuItem>
                <MenuItem onClick={(e) => setConfirmOpen(true)}>
                  <CancelIcon color="error" style={{ marginRight: ".5em" }} />
                  <Typography variant="body2">Leave group</Typography>
                </MenuItem>
                <Divider />
                <Link to="/calendar" onClick={handleGroupClose}>
                  <MenuItem>
                    <EventIcon
                      color="primary"
                      style={{ marginRight: ".5em" }}
                    />
                    <Typography variant="body2">Calendar</Typography>
                  </MenuItem>
                </Link>
                <Link to="/shopping-lists" onClick={handleGroupClose}>
                  <MenuItem>
                    <ShoppingBasketIcon
                      color="primary"
                      style={{ marginRight: ".5em" }}
                    />
                    <Typography variant="body2">Shopping lists</Typography>
                  </MenuItem>
                </Link>
                <Link to="/notes" onClick={handleGroupClose}>
                  <MenuItem>
                    <NoteIcon color="primary" style={{ marginRight: ".5em" }} />
                    <Typography variant="body2">Notes</Typography>
                  </MenuItem>
                </Link>
              </Menu>
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconButton onClick={handleMenu} color="inherit">
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
      <AddGroupMemberModal open={modalOpen} setOpen={setModalOpen} />
      <ConfirmDialog
        open={confirmOpen}
        setOpen={setConfirmOpen}
        onConfirm={leaveGroup}
        title="Leave group?"
      >
        Are you sure you want to leave the group? This cannot be undone
      </ConfirmDialog>
    </div>
  );
}

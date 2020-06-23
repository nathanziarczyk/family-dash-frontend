import React, { useEffect, useState } from "react";
import {
  Grid,
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Divider,
  FormControl,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  IconButton,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import FaceIcon from "@material-ui/icons/Face";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Skeleton from "react-loading-skeleton";
import DeleteSweepIcon from "@material-ui/icons/DeleteSweep";
import EditIcon from "@material-ui/icons/Edit";
import { useHistory } from "react-router-dom";

import axios from "../../axios";
import { formatDate } from "../../helpers/formatDate";
import { deleteEvent } from "../../data/events";
import EditEventModal from "../ReUsable/EditEventModal";

// MATERIAL UI CLASSES VOOR CUSTOM CSS
const useStyles = makeStyles((theme) => ({
  card: {
    height: "95%",
    width: "100%",
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      height: "100%",
    },
  },
  select: {
    top: "12px",
    right: "10px",
  },
  detailContainer: {
    marginTop: theme.spacing(3),
  },
  icons: {
    position: "absolute",
    bottom: theme.spacing(2),
  },
}));

export default function EventDetail({ props }) {
  const classes = useStyles();
  const id = props.match.params.id;
  const history = useHistory();
  const dispatch = useDispatch();

  // USER DATA UIT REDUX STORE HOUDEN
  const currentUserId = useSelector((state) => state.user.user.id);
  const currentUserFn = useSelector((state) => state.user.user.firstName);
  const groupId = useSelector((state) => state.group.id);
  // LOCAL STATE VOOR EVENT DATA
  const [event, setEvent] = useState({});
  // STATE VOOR LOADING
  const [loading, setLoading] = useState(false);
  // STATE OM TE BEPALEN OF INGELOGDE GEBRUIKER
  // DEELNEEMT AAN EVENT OF NIET
  const [attending, setAttending] = useState(false);
  // GEGEVENS VAN DE AANMAKER VAN HET EVENT
  const [owner, setOwner] = useState({});
  // DE DEELNEMERS AAN HET EVENT
  const [attendants, setAttendants] = useState([]);
  // STATE VOOR MODAL EDIT EVENT OPEN
  const [open, setOpen] = useState(false);

  // EVENT OPHALEN ON PAGE LOAD
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/events/${id}`)
      .then((response) => {
        setEvent({ ...response.data });
        setOwner({ ...response.data.user });
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, [id]);

  // ATTENDANTS OPHALEN
  useEffect(() => {
    if (Object.keys(event).length > 0) {
      setAttendants(event.attendants);
      event.attendants.map((user) => {
        if (user.id === currentUserId) setAttending(true);
        return null;
      });
    }
  }, [event, currentUserId]);

  // FUNCTIES VOOR HET VERWIJDEREN OF TOEVOEGEN VAN DEELNEMERS
  const removeAtt = () => {
    const newAtt = attendants.filter((user) => user.id !== currentUserId);
    setAttendants([...newAtt]);
  };
  const addAtt = () => {
    setAttendants([
      ...attendants,
      {
        id: currentUserId,
        firstName: currentUserFn,
      },
    ]);
  };

  //
  const handleAttending = (bool) => {
    if (bool === 0) {
      axios
        .put(`/events/${id}`, {
          removeAttendant: `/api/users/${currentUserId}`,
        })
        .then((response) => {
          setAttending(false);
          removeAtt();
        });
    } else {
      axios
        .put(`/events/${id}`, {
          newAttendant: `/api/users/${currentUserId}`,
        })
        .then((response) => {
          setAttending(true);
          addAtt();
        });
    }
  };

  // DELETE EVENT
  const handleDeleteClick = (e, eventId) => {
    e.preventDefault();
    dispatch(deleteEvent(eventId, groupId));
    history.goBack();
  };

  return (
    <Grid container>
      <Grid item xs={false} md={4} />
      <Grid container justify="center" alignItems="center" item xs={12} md={4}>
        <Card className={classes.card}>
          <CardHeader
            title={loading ? <Skeleton /> : event.title}
            subheader={
              loading ? (
                <Skeleton />
              ) : (
                `${formatDate(event.start)} — ${formatDate(event.end)}`
              )
            }
          />
          {!loading && (
            <FormControl
              className={classes.select}
              style={{ position: "absolute" }}
              variant="outlined"
              size="small"
            >
              <Select
                defaultValue={attending ? 1 : 0}
                inputProps={{
                  name: "name",
                  id: "uncontrolled-native",
                }}
                onChange={(e) => handleAttending(e.target.value)}
              >
                <MenuItem value={1}>Going</MenuItem>
                <MenuItem value={0}>Not Going</MenuItem>
              </Select>
            </FormControl>
          )}
          <CardContent style={{ paddingTop: 0 }}>
            <div className={classes.detailContainer}>
              <Typography variant="subtitle1">
                {loading ? <Skeleton /> : `Created by: ${owner.firstName}`}
              </Typography>
            </div>
            <div className={classes.detailContainer}>
              <Typography variant="h6">Description</Typography>
              <Divider style={{ marginBottom: ".5em" }} />
              <Typography>
                {loading ? <Skeleton /> : event.description}
              </Typography>
            </div>
            <div className={classes.detailContainer}>
              <Typography variant="h6">Attendants</Typography>
              <Divider />
              <List style={{ maxHeight: "300px", overflow: "hidden" }}>
                {loading ? (
                  <ListItem>
                    <ListItemAvatar>
                      <Skeleton circle={true} height={30} width={30} />
                    </ListItemAvatar>
                    <ListItemText>
                      <Skeleton />
                    </ListItemText>
                  </ListItem>
                ) : (
                  ""
                )}
                {!loading && attendants.length === 0 ? (
                  <ListItem key={0}>
                    <ListItemText> No attendants</ListItemText>
                  </ListItem>
                ) : (
                  attendants.map((user) => {
                    return (
                      <div key={user.id}>
                        <ListItem key={currentUserId}>
                          <ListItemAvatar>
                            {user.id === currentUserId ? (
                              <FaceIcon />
                            ) : (
                              <AccountCircleIcon />
                            )}
                          </ListItemAvatar>
                          <ListItemText>
                            {user.id === currentUserId ? (
                              <b>You</b>
                            ) : (
                              user.firstName
                            )}
                          </ListItemText>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </div>
                    );
                  })
                )}
              </List>
            </div>
            {owner.id === currentUserId && (
              <div className={classes.icons}>
                <IconButton onClick={(e) => setOpen(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={(e) => handleDeleteClick(e, event.id)}>
                  <DeleteSweepIcon />
                </IconButton>
              </div>
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={false} md={4} />
      <EditEventModal open={open} setOpen={setOpen} event={event} />
    </Grid>
  );
}

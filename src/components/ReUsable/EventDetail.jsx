import React, { useEffect, useState } from "react";
import {
  Grid,
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Collapse,
  Typography,
  Divider,
  FormControl,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import FaceIcon from "@material-ui/icons/Face";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import axios from "../../axios";
import { formatDate } from "../../helpers/formatDate";

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
    top: "15px",
    right: "10px",
  },
  detailContainer: {
    marginTop: theme.spacing(3),
  },
}));

export default function EventDetail({ props }) {
  const [event, setEvent] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [attending, setAttending] = useState(false);
  const [owner, setOwner] = useState({});
  const [attendants, setAttendants] = useState([]);
  const currentUserId = useSelector((state) => state.user.user.id);
  const currentUserFn = useSelector((state) => state.user.user.firstName);
  const classes = useStyles();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/events/${id}`)
      .then((response) => {
        setEvent({ ...response.data });
        setOwner({ ...response.data.user });
      })
      .catch(() => console.log(""))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (Object.keys(event).length > 0) {
      setAttendants(event.attendants);
      event.attendants.map((user) => {
        if (user.id === currentUserId) setAttending(true);
        return null;
      });
    }
  }, [event]);
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

  const id = props.match.params.id;
  console.log(owner);
  return (
    <Grid container>
      <Grid item xs={false} md={4} />
      <Grid container justify="center" alignItems="center" item xs={12} md={4}>
        {!loading && (
          <Card className={classes.card}>
            <CardHeader
              title={event.title}
              subheader={`${formatDate(event.start)} — ${formatDate(
                event.end
              )}`}
            />
            <FormControl
              className={classes.select}
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
            <CardContent style={{ paddingTop: 0 }}>
              <div className={classes.detailContainer}>
                <Typography variant="subtitle1">
                  Created by: <b>{owner.firstName}</b>
                </Typography>
              </div>
              <div className={classes.detailContainer}>
                <Typography variant="h6">Description</Typography>
                <Divider style={{ marginBottom: ".5em" }} />
                <Typography>{event.description}</Typography>
              </div>
              <div className={classes.detailContainer}>
                <Typography variant="h6">Attendants</Typography>
                <Divider />
                <List>
                  {attendants.length === 0 ? (
                    <ListItem>
                      <ListItemText> No attendants</ListItemText>
                    </ListItem>
                  ) : (
                    attendants.map((user) => {
                      if (user.id === currentUserId)
                        return (
                          <>
                            <ListItem>
                              <ListItemAvatar>
                                <FaceIcon />
                              </ListItemAvatar>
                              <ListItemText>
                                <b>You</b>
                              </ListItemText>
                            </ListItem>
                            <Divider variant="inset" />
                          </>
                        );
                      else
                        return (
                          <>
                            <ListItem divider>
                              <ListItemAvatar>
                                <AccountCircleIcon />
                              </ListItemAvatar>
                              <ListItemText>{user.firstName}</ListItemText>
                            </ListItem>
                            <Divider variant="inset" />
                          </>
                        );
                    })
                  )}
                </List>
              </div>
            </CardContent>
            <Collapse in={expanded}></Collapse>
          </Card>
        )}
      </Grid>
      <Grid item xs={false} md={4} />
    </Grid>
  );
}

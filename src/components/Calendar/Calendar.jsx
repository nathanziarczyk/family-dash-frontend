import React, { useState, useEffect } from "react";
import {
  Grid,
  makeStyles,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from "@material-ui/core";
import FullCalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useSelector } from "react-redux";

import AddEventModal from "../ReUsable/AddEventModal";
import EventDialog from "../ReUsable/EventDialog";

import "./main.scss";

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: "100%",
    width: "100vw",
  },
}));

export default function Calendar() {
  const classes = useStyles();
  const { events, loading } = useSelector((state) => state.events);
  const [addedLoading, setAddedLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [eventArgs, setEventArgs] = useState({});

  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const openEventDialog = (e) => {
    const event = {
      title: e.event["_def"]["title"],
      ...e.event["_def"]["extendedProps"],
    };
    console.log(e);
    setEventArgs({
      event,
    });
    setEventDialogOpen(true);
    return null;
  };

  return (
    <>
      <Grid container className={classes.gridContainer + " " + "calendar"}>
        <Grid item xs={false} sm={2} />
        <Grid
          item
          container
          direction="row"
          style={{ width: "100%" }}
          xs={12}
          sm={8}
        >
          <div id="calendar" className={mobile && "mobile"}>
            <FullCalendar
              buttonText={{
                today: "Today",
              }}
              defaultView="listWeek"
              plugins={[listPlugin]}
              customButtons={{
                addEvent: {
                  text: "New Event",
                  click: () => setModalOpen(true),
                },
              }}
              height="parent"
              themeSystem="regular"
              events={events}
              eventClick={(arg) => openEventDialog(arg)}
              views={{
                listDay: { buttonText: "Day" },
                listWeek: { buttonText: "Week" },
                listMonth: { buttonText: "Month" },
              }}
              header={{
                left: "prev,next today addEvent",
                center: "title",
                right: "listDay ,listWeek, listMonth",
              }}
            />
            {addedLoading || loading ? <LinearProgress color="primary" /> : ""}
          </div>
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
      <AddEventModal
        open={modalOpen}
        setOpen={setModalOpen}
        setAddedLoading={setAddedLoading}
        date={""}
      />
      <EventDialog
        setOpen={setEventDialogOpen}
        open={eventDialogOpen}
        event={eventDialogOpen && eventArgs.event}
      />
    </>
  );
}

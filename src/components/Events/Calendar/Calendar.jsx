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
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import AddEventModal from "../../ReUsable/AddEventModal";
import { searchEvents } from "../../../data/events";
import "./main.scss";

// MATERIAL UI CLASSES VOOR CUSTOM CSS
const useStyles = makeStyles((theme) => ({
  gridContainer: {
    height: "100%",
    width: "100vw",
  },
}));

export default function Calendar() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  // BEPALEN OF SCREEN MOBILE IS OBV MATERIAL UI BREAKPOINTS
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  // ID VAN DE HUIDIGE GROEP
  const currentGroupId = useSelector((state) => state.group.id);
  // ALLE EVENTS UIT STATE HALEN
  const { events, loading } = useSelector((state) => state.events);
  // LOADING STATE ALS EVENT IS TOEGEVOEGD
  const [addedLoading, setAddedLoading] = useState(false);
  // STATE VOOR MODAL ADD EVENT OPEN
  const [modalOpen, setModalOpen] = useState(false);

  // LAAD EVENTS ON PAGE LOAD
  useEffect(() => {
    dispatch(searchEvents(currentGroupId));
  }, [dispatch, currentGroupId]);

  // LINK NAAR EVENT PAGINA ALS ER OP GEKLIKT WORDT
  const handleEventClick = (e) => {
    console.log(e);
    const id = e.event["_def"]["publicId"];
    history.push(`/event/${id}`);
  };

  return (
    <>
      <Grid container className={classes.gridContainer + " calendar"}>
        <Grid item xs={false} sm={2} />
        <Grid
          item
          container
          direction="row"
          style={{ height: "94%" }}
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
              eventClick={(arg) => handleEventClick(arg)}
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
    </>
  );
}

import React, {useEffect, useState} from 'react';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import {messages} from "../../helpers/calendar-messages-es";
import 'react-big-calendar/lib/css/react-big-calendar.css'

import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";
import Navbar from "../ui/Navbar";

import {useDispatch, useSelector} from "react-redux";
import {uiOpenModal} from "../../actions/ui";
import {eventClearActiveEvent, eventStartLoading, evetSetActive} from "../../actions/event";
import AddNewFab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";
import 'moment/locale/es';
moment.locale('es');

const localizer = momentLocalizer(moment);


const CalendarScreen = () => {
  const dispatch = useDispatch();
  const {events, activeEvent} = useSelector(state => state.calendar);
  const { uid } = useSelector(state => state.auth);

  const [lastView, setLastView] = useState(
    localStorage.getItem('lastView') || 'month'
  );

  // Cargar todos los eventos
  useEffect( () =>{
    dispatch(eventStartLoading());
  },[dispatch])

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  }
  const onSelectEvent = (e) => {
    dispatch( evetSetActive(e) );
  }
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem('lastView',e);
  }

  const eventStyleGetter = (event, start, end , isSelected) =>{

    const style = {
      backgroundColor: (uid === event.user._id) ? '#367CF7': '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    };
    return {
      style
    }
  };

  const onSelectSlot = (e) => {
    // Agregar crear evento al seleccionar dia
    dispatch( eventClearActiveEvent() );
  }

  return (
    <div className='calendar-screen'>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter = {eventStyleGetter}
        onDoubleClickEvent = {onDoubleClick}
        onSelectEvent = {onSelectEvent}
        onView = {onViewChange}
        onSelectSlot = {onSelectSlot}
        selectable={true}
        view = {lastView}
        components = {{
          event: CalendarEvent
        }}
      />

      <AddNewFab/>

      {
        (activeEvent) && <DeleteEventFab/>
      }

      <CalendarModal/>
    </div>
  );
};

export default CalendarScreen;

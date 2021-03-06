import {types} from "../types/types";
import {fetchConToken} from "../helpers/fetch";
import Swal from "sweetalert2";
import {prepareEvents} from "../helpers/prepareEvents";


export const eventStartAddNew = (event) => {
  return async (dispatch,getState) => {
    const {uid, name} = getState().auth;
    try {
      const resp = await fetchConToken('events',event,'POST');
      const body = await resp.json();

      if(body.ok){
        event.id = body.evento.id;
        event.user = {
          _id: uid,
          name:name
        }

        dispatch(eventAddNew(event));
      }
    }catch (e) {
      console.log(e)
    }

  }
}
const eventAddNew = (event) =>({
  type: types.eventAddNew,
  payload:event
});


export const evetSetActive = (event) =>({
  type: types.eventSetActive,
  payload:event
});
export const eventClearActiveEvent = () =>({
  type: types.eventClearActiveEvent
});


export const eventStartUpdate = (event) => {
  return async (dispatch) =>{
    try {
      const resp = await fetchConToken(`events/${event.id}`,event, 'PUT')
      const body = await resp.json();
      if(body.ok){
        dispatch(eventUpdated(event));
      }else{
        Swal.fire('error',body.msg,'error');
      }
    }catch (e) {
      console.log(e)
    }
  }
}
const eventUpdated =(event) =>({
  type: types.eventUpdated,
  payload: event
})

export const eventStartDelete = (event) =>{
  return async (dispatch,getState) => {
    const {id} = getState().calendar.activeEvent;
    try {
      const resp = await fetchConToken(`events/${id}`,{}, 'DELETE')
      const body = await resp.json();
      if(body.ok){
        dispatch(eventDeleted());
      }else{
        Swal.fire('error',body.msg,'error');
      }
    }catch (e) {
      console.log(e)
    }
  }
}
const eventDeleted = () =>({
  type: types.eventDeleted
});


export const eventStartLoading = () =>{
  return async (dispatch) => {
    try {
      const resp = await fetchConToken('events');
      const body = await resp.json();

      const events = prepareEvents(body.eventos);

      dispatch(eventLoaded(events));

    }catch (e) {
      console.log(e)
    }
  }
}
const eventLoaded = (events) =>({
  type:types.eventLoaded,
  payload: events
})


export const eventLogout = () => ({
  type: types.eventLogout
})

import {fetchConToken, fetchSinToken} from "../helpers/fetch";
import {types} from "../types/types";
import Swal from "sweetalert2";
import {eventLogout} from "./event";

// Esto solo si es una funcion asincrona
export const startLogin = (email, password) =>{
  return async (dispatch) =>{
    const resp = await fetchSinToken('auth', {email, password},'POST');
    const body = await resp.json();

    if(body.ok){
      localStorage.setItem('token',body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch( login({
        uid: body.uid,
        name: body.name
      }));
    }else{
      Swal.fire('error',body.msg,'error');
    }
  }
}

export const startRegister = (email, password, name) => {
  return async (dispatch) =>{
    const resp = await fetchSinToken('auth/new', {email, password,name},'POST');
    const body = await resp.json();

    if(body.ok){
      localStorage.setItem('token',body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch( login({
        uid: body.uid,
        name: body.name
      }));
    }else{
      Swal.fire('error',body.msg,'error');
    }
  }
}

export const startChecking = () => {
  return async (dispatch) =>{
    const resp = await fetchConToken('auth/renew');
    const body = await resp.json();

    if(body.ok){
      localStorage.setItem('token',body.token);
      localStorage.setItem('token-init-date', new Date().getTime());
      dispatch( login({
        uid: body.uid,
        name: body.name
      }));
    }else{
      dispatch(checkingFinish());
    }
  }
}


// Funcion inmediata
const checkingFinish = () =>({type:types.authCheckingFinish})

const login = (user) =>({
  type: types.authLogin,
  payload: user
})

export const startLogout = () =>{
  return (dispatch) =>{
    localStorage.clear();
    dispatch(eventLogout());
    dispatch(logout());
  }
}
const logout = () => ( { type: types.authLogout } )

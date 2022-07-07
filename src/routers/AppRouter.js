import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginScreen from "../components/auth/LoginScreen";
import CalendarScreen from "../components/calendar/CalendarScreen";
import {useDispatch, useSelector} from "react-redux";
import {startChecking} from "../actions/auth";
import {PrivateRoute} from "./PrivateRoute";
import {PublicRoute} from "./PublicRoute";

const AppRouter = () => {

  const dispatch = useDispatch();
  const {checking, uid} = useSelector(state => state.auth);
  useEffect( ()=>{
    dispatch(startChecking());
  },[dispatch])

  if(checking){
    return (<h5>Espere...</h5>);
  }
  return (
    <>
      <Router>
        <Routes>
          <Route path='/login' element={
            <PublicRoute isLoggedIn={!!uid}>
              <LoginScreen/>
            </PublicRoute>
          }/>

          <Route path='/' element={
            <PrivateRoute isLoggedIn={!!uid}>
              <CalendarScreen/>
            </PrivateRoute>
          }/>

          <Route path='/*' element={ <Navigate to='/' /> }/>
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;

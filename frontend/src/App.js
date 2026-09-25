import React, { useContext, useEffect, useCallback } from "react";
import axios from "axios";

import { Routes, Route, Navigate } from "react-router";

import { GlobalContext } from "./context/Context";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";


function App() {

  const {
    state,
    dispatch
  } = useContext(GlobalContext);


  const checkUser = useCallback(async () => {

    try {

      const apiRes = await axios.get(
        '/api/v1/me',
        {
          withCredentials: true
        }
      );

      dispatch({
        type: "USER_LOGIN",
        user: apiRes.data.user
      });

    } catch (error) {

      dispatch({
        type: "USER_LOGOUT"
      });

      console.log("User not logged in");
    }
  }, [dispatch]);


  useEffect(() => {

    checkUser();

  }, [checkUser]);


  if (state.isLogin === null) {

    return <p>Loading...</p>;
  }


  return (

    <div>

      {state.isLogin ? (

        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="*"
            element={
              <Navigate to="/" />
            }
          />

        </Routes>

      ) : (

        <Routes>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          <Route
            path="*"
            element={
              <Navigate to="/login" />
            }
          />

        </Routes>

      )}

    </div>
  );
}

export default App;
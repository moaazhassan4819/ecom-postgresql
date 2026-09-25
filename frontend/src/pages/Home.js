import React, {
    useContext
} from "react";

import axios from "axios";

import { GlobalContext } from "../context/Context";

const Home = () => {

    const {
        state,
        dispatch
    } = useContext(GlobalContext);


    const logout = async () => {

        try {

            await axios.post(
                '/api/v1/logout',
                {},
                {
                    withCredentials: true
                }
            );

            dispatch({
                type: "USER_LOGOUT"
            });

        } catch (error) {

            console.log("Logout Error:", error);
        }
    };


    return (

        <div>

            <h1>Dashboard</h1>

            <h2>
                Welcome {state.user.first_name}
            </h2>

            <p>
                Email: {state.user.email}
            </p>

            <p>
                Role: {state.user.role}
            </p>

            <p>
                Phone: {state.user.phone}
            </p>


            <button onClick={logout}>
                Logout
            </button>

        </div>
    );
};

export default Home;
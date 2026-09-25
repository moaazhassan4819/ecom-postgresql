import React, {
    useContext,
    useState
} from "react";

import axios from "axios";
import { Link } from "react-router";

import { GlobalContext } from "../context/Context";

const Login = () => {

    const {
        state,
        dispatch
    } = useContext(GlobalContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const login = async (e) => {

        e.preventDefault();

        try {

            const apiRes = await axios.post(
                '/api/v1/login',
                {
                    email,
                    password
                },
                {
                    withCredentials: true
                }
            );

            dispatch({
                type: "USER_LOGIN",
                user: apiRes.data.user
            });

        } catch (error) {

            console.log("Login Error:", error);

            alert(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }
    };


    return (

        <div>

            <h1>Login</h1>


            <form onSubmit={login}>

                <div>

                    <label>Email</label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                </div>


                <br />


                <div>

                    <label>Password</label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                    />

                </div>


                <br />


                <button type="submit">
                    Login
                </button>

            </form>


            <br />


            <Link to="/signup">
                Don't have an account? Signup
            </Link>

        </div>
    );
};

export default Login;
import React, {
    createContext,
    useReducer
} from "react";

import { reducer } from "./Reducer";

export const GlobalContext = createContext();

const initialState = {
    user: {},
    isLogin: null,
    baseUrl: ''
};

export default function ContextProvider({ children }) {

    const [state, dispatch] = useReducer(
        reducer,
        initialState
    );

    return (
        <GlobalContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
}
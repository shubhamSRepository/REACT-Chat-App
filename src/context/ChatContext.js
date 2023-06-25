import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../firebase"
import { AuthContext } from "./AuthContext";
import { act } from "react-dom/test-utils";

export const ChatContext = createContext();


export function ChatContextProvider({ children }) {

    const { currentUser } = useContext(AuthContext);
    const Initial_State = {
        chatId: "null",
        user: {},
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId:
                        currentUser.uid > action.payload.uid ?
                            currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid
                }

            default:
                return state;
        }
    }

    const [state, dispatch] = useReducer(chatReducer, Initial_State);

    return (
        <ChatContext.Provider value={{ data: state, dispatch }}>
            {children}
        </ChatContext.Provider>
    )

}
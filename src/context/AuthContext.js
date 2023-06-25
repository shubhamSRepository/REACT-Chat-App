import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase"

export const AuthContext = createContext();

/*we have use 'AuthContextProvider' in 'index.js' */
export function AuthContextProvider({ children }) {

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        /*'onAuthStateChanged' is firebase function which helps us to 
        detect user is logged in or not */

        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => {
            /*to prevent memory leak */
            unsub();
        }
    }, []);


    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    )

}
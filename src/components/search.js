import React, { useContext, useState } from "react";
import { collection, query, where, getDoc, getDocs, serverTimestamp, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function Search() {

    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const { currentUser } = useContext(AuthContext);


    async function handleSearch() {
        const q = query(collection(db, "users"), where("displayName", "==", userName));

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data())
            });
        } catch (err) {
            setErr(true);
        }

    }


    function handleKey(e) {
        e.code === "Enter" && handleSearch();
    };


    async function handleSelect() {
        /*check whether the group (chats in firestore) exists, if not create one */
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;

        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                /*create a chat in chats collection */
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                /*create user chats */
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL: user.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"]: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL
                    },
                    [combinedId + ".date"]: serverTimestamp()
                })
            }
        }
        catch (err) {
            setErr(true);
        }

        setUser(null);
        setUserName("");

    }


    return (

        <div className="search">

            <div className="searchForm">
                <input type="text"
                    placeholder="find a user"
                    onKeyDown={handleKey}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
            </div>

            {err && <span>User not found!</span>}
            {user && <div className="userChat" onClick={handleSelect}>

                <img src={user.photoURL} />

                <div className="userChatInfo">
                    <span>{user.displayName}</span>
                </div>

            </div>}

        </div>
    )
}

export default Search;
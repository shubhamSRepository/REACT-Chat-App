import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, serverTimestamp } from "firebase/firestore";



function Message({ message }) {

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);


    return (
        <div
            ref={ref}
            className={`message ${message.senderId === currentUser.uid && "owner"}`}>

            <div className="messageInfo">

                {/* <img src={
                    Message.senderId === currentUser.uid ?
                        currentUser.photo : data.user.photoURL
                } /> */}
                <span>{}</span>

            </div>

            <div className="messageContent">

                <p>{message.text} </p>
                {message.img && <img src={message.img} />}

            </div>

        </div>
    )
}

export default Message;
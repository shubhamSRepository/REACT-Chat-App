import { useContext, useEffect, useState } from "react";
import Message from "../components/message"
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

function MessageBox() {

    const [messages, setMessages] = useState([]);
    const { data } = useContext(ChatContext);


    useEffect(() => {
        const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })

        return () => {
            unsub();
        }
    }, [data.chatId])


    return (
        <div className="messageBox">
            {messages.map((m) => (
                <Message message={m} key={m.id} />
            ))}
        </div>
    )
}

export default MessageBox;
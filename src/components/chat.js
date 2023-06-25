import { useContext } from "react";
import Input from "./input";
import MessageBox from "./messageBox";
import { ChatContext } from "../context/ChatContext";
import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";

function Chat() {

    const { data } = useContext(ChatContext);

    return (
        <div className="chat">

            <div className="chatInfo">
                <span>
                    <img src={data.user.photoURL} />
                    {data.user.displayName}
                </span>
                <div className="chatIcons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>

            <MessageBox />
            <Input />
        </div>
    )
}

export default Chat;
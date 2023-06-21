import Input from "./input";
import MessageBox from "./messageBox";

function Chat() {
    return (
        <div className="chat">

            <div className="chatInfo">
                <span>Jane</span>
                <div className="chatIcons">
                    <img src="" alt="icon" />
                    <img src="" alt="icon" />
                    <img src="" alt="icon" />
                </div>
            </div>

            <MessageBox />
            <Input />
        </div>
    )
}

export default Chat;
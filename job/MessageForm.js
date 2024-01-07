import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../redux/contaxt/appContaxt";

function MessageForm() {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  //   const user = useSelector((user)=> user.state)
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);
  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 0 ? month : "0" + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : "0" + day;
    return day + "/" + month + "/" + year;
  }
  function handleSubmit(e) {
    e.preventDefault();
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  }

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages",(roomMessages)=>{
    console.log("room Mesages",roomMessages)
    setMessage(roomMessages)
  })

  return;
  <>
    <div className="message-box">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button value="submit" type="submit"></button>
      </form>
    </div>
  </>;
}

export default MessageForm;

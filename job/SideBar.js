import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { AppContext } from "../redux/contaxt/appContaxt";

function Sidebar() {
  const user = useSelector((state) => state.user);
  const { socket, setMembers, members, setCurrentRoom, setRooms, privateMemberMsg, rooms, setPrivateMemberMsg, currentRoom } = useContext(AppContext);

  useEffect(()=>{

  },[])

  socket.off('new-user').on('new-user',(payload)=>{
    setMembers(payload)
  })  
  return (
    <>
      <h2>Messages</h2>
      {
        members.map((member,ind)=>{

            return(
                <>
                <ul>
                    <li key={ind}>{member.name}</li>
                </ul>
                </>
            )
        })
      }
    </>
  );
}

export default Siderbar;

import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import { BsBell } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import MessageTab from "../../components/MessageTab";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { Tab } from "@headlessui/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { jobPortalBaseURL } from "../../constants/urlConstants";
import AuthorizeRec from "./AuthorizeRec/AuthorizeRec";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/router";
import AuthorizeCandidate from "../../job/AuthorizeCandidate/AuthorizeCan";
import socketIO from "socket.io-client";

const socket = socketIO.connect('https://api.sucify.com');
console.log("socaket API", socket);

const CandidateMessageSection = () => {
  let Token = secureLocalStorage.getItem("CandidateToken");
  const addActiveToMessage = () => {
    document.getElementById("MessageTab").classList.add("active");
  };
  const remActive = () => {
    document.getElementById("MessageTab").classList.remove("active");
  };

  // const[socket,setSocket] = useState(undefined)
  const [showBtn, setShowBtn] = useState(false);
  let CandidateId = secureLocalStorage.getItem("Candidate");
  console.log("CandidateId",CandidateId)
  let [CandidateName, setCandidateName] = useState("");
  let [CandidatePhoto, setCandidatePhoto] = useState("");
  const [message, setMessage] = useState("");
  const [currentRoom, setCurrentRoom] = useState("");
  const [isShow, setIsShow] = useState(false);
  //let generate Room Id By Posting Below Structure
  let [GenerateRoomIdData, setGenerateRoomIdData] = useState({
    roomName: "",
    participants: [],
    createdBy: CandidateId,
  });

  // useEffect(() => {
  //   socket.on('messageResponse', (data) =>
  //   console.log(data)
  //   );

  // }, [socket]);

  useEffect(() => {
    if (CandidateId !== null) {
      fetchCandidateName();
    }
  }, []);

  const fetchCandidateName = async () => {
    try {
      let response = await axios.get(`${jobPortalBaseURL}user/${CandidateId}`, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      if (response.status === 200) {
        setCandidateName(response.data.data?.firstName);
        setCandidatePhoto(response.data.data?.avatar);
      }
    } catch (error) {
      toast.error("Failed To Fetch Recruiter Name.!");
    }
  };

  //list of user array is here
  let [RecruiterList, setRecruiterList] = useState([]);

  //single user data will be stored here is recruiter click on any user
  let [singleRecruiterData, setsingleRecruiterData] = useState({});
  console.log("singleRecruiterData",singleRecruiterData)

  // console.log(GenerateRoomIdData)

  //let Chat Room Id will be stored here
  let [RoomId, setRoomId] = useState("");

  //store all messages of single conversation
  let [AllMessages, setAllMessages] = useState([]);
  console.log("all messages",AllMessages)
  useEffect(() => {

    socket.off("room-messages").on("room-messages", (roomMessages) => {
      console.log("roomMessages");
      console.log(roomMessages);
      setAllMessages([...roomMessages?.data?.messages]);
      // alert("All messages");
  });


    // socket.on("chatHistory", (data) => {
    //   let { id, name } = singleRecruiterData;
    //   const array = [ data?.data?.participants[0],  data?.data?.participants[1]];
    //   console.log("arraYW",array)
    //   const valuesToFind = [CandidateId,id];
    //   console.log("Valiues to findddd",valuesToFind)
    //   const foundValues = [];
    //   for (let i = 0; i < array.length; i++) {
    //     if (valuesToFind.includes(array[i])) {
    //       foundValues.push(array[i]);
    //     }
    //   }

    //   console.log(foundValues.length); // [2, 4]

    //   if (foundValues.length === 2 ) {
    //     console.log("history data", data);
    //     // setMessages(data)
    //     // setAllMessages([...data?.data?.messages]);
    //   }
    // });
  }, [socket,singleRecruiterData]);

  //show messages tab of single user handeled here
  let [showMessageTab, setShowMessageTab] = useState(false);

  //message structure which sender is going to send
  let [messageStructure, setMessageStructure] = useState({
    sender: CandidateId,
    roomId: "",
    content: "",
  });

  //fetchList of Users
  useEffect(() => {
    fetchUsersListing(jobPortalBaseURL + "recruiter/chat-user/" + CandidateId, {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    });
  }, []);

  //fetchUsersListing
  const fetchUsersListing = async (url) => {
    try {
      let response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
      if (response.status === 200) {
        let userlisting = response.data.data.map((data, id) => {
          return {
            id: data?.recruiterDetails?._id,
            name:
              data?.recruiterDetails?.firstName +
              " " +
              data?.recruiterDetails?.LastName,
          };
        });

        //remove duplicate objects
        let uniqLisiting = userlisting.reduce((finalArray, current) => {
          let obj = finalArray.find((data) => data.id === current.id);
          if (obj) {
            return finalArray;
          } else {
            return finalArray.concat([current]);
          }
        }, []);

        setRecruiterList(uniqLisiting?.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //GenerateRoomID function is here
  const GenerateRoomID = async (generateRoomValues) => {
    try {
      let response = await axios.post(
        `${jobPortalBaseURL}tweet/create-room`,
        generateRoomValues,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );
      if (response.status === 200) {
        setShowBtn(true);
        let { _id, messages } = response.data.data;
        setRoomId(_id);
        // setAllMessages([...messages]);
        setShowMessageTab(true);
      }
    } catch (error) {
      // toast.error("Failed To Open Chat")
      // console.log(error);
    }
  };

  //OpenMessageTab is here when recruiter click on user lisiting
  let OpenMessageTab = (RecruiterData) => {
    setIsShow(false)
    setsingleRecruiterData(RecruiterData);
    let { id, name } = RecruiterData;
    console.log("Recruiter ID",id)
    var obj = {
      roomName: `${id}-${CandidateId}`,
      participants: [id, CandidateId],
      participantsName: [CandidateName, name],
      createdBy: CandidateId,
      authorization:`Bearer ${Token}`
    };
    console.log("CREATE ROOM");
    console.log(obj);
    setGenerateRoomIdData(obj);
    // callling function is here to generateRoomID
    GenerateRoomID(obj);
    // alert("JOIN ROOM"+`${id}-${CandidateId}`);
    socket.emit("join-room",obj , currentRoom);
    setCurrentRoom(`${id}-${CandidateId}`)

    // MESSAGE TAB LOADER
    setTimeout(() => {
      setIsShow(true)
    }, 1000);
  };

  // useEffect(()=>{
  //   const interval = setInterval(() => {
  //   GenerateRoomID(GenerateRoomIdData);
  // }, 2000);
  // return () => clearInterval(interval);
  // },[])

  //SendMessageToUser function is here
  const SendMessageToUser = async (e) => {
    e.preventDefault();
   
    // console.log("socket")
    // setShowBtn(false)
    // let obj = {
    //   ...messageStructure,
    //   roomId : RoomId
    // }
    // e.preventDefault();
    // try{
    //   let response = await axios.post(`${jobPortalBaseURL}tweet/send-message`,obj,{
    //     headers: {
    //        'Authorization': `Bearer ${Token}`
    //   }
    //   });
    //   if(response.status===201){
    //     setShowBtn(true)
    //     toast.success("Message Send Successfully.")
    //     //reset Form Input Field
    //     setMessageStructure({
    //       ...messageStructure,
    //       content : ''
    //     })
    //     let {id , name} = singleRecruiterData;
    //     let obj = {
    //       roomName : `${id}-${CandidateId}`,
    //       participants : [id,CandidateId],
    //       participantsName : [name,CandidateName],
    //       createdBy : CandidateId
    //     }
    //   GenerateRoomID(obj);

    //   }
    // }catch(error){
    //   toast.error("Failed To Send Message To " + singleRecruiterData?.name);
    //   console.log(error);
    // }
    let { id, name } = singleRecruiterData;
    // USING SOCKET IO
    // socket.emit("message", {
    //   sender: CandidateId,
    //   roomId: RoomId,
    //   content: message,
    //   authorization: `Bearer ${Token}`,
    // });
    const body = {
      roomName: `${id}-${CandidateId}`,
      participants: [id, CandidateId],
      participantsName: [name, CandidateName],
      createdBy: CandidateId,
      authorization: `Bearer ${Token}`,
    };
    socket.emit("message-room", {
        sender: CandidateId,
        roomId: RoomId,
        content: message,
        authorization: `Bearer ${Token}`,
      },body);
  // alert("Sent Message"+JSON.stringify({
  //   sender: CandidateId,
  //   roomId: RoomId,
  //   content: message,
  //   authorization: `Bearer ${Token}`,
  // }));

    // const body = {
    //   roomName: `${id}-${CandidateId}`,
    //   participants: [id, CandidateId],
    //   participantsName: [name, CandidateName],
    //   createdBy: CandidateId,
    //   authorization: `Bearer ${Token}`,
    // };
    // console.log("body", body);
    // socket.emit("join-room",body , "currentRoom");
    setMessage("");
  };

  //ScrollDownToNewMessagesref
  const ScrollDownToNewMessagesref = useRef(null);
  useEffect(() => {
    ScrollDownToNewMessagesref?.current?.scrollIntoView({
      block: "end",
      behaviour: "smooth",
    });
  }, [AllMessages]);

  return (
    <>
      <Head>
        <title>Candidate Messages - Simandhar Education</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>
      {/* <Jobheader showData3={false} /> */}
      <div className="jp-admin-wrapper RecruiterDashboardJobs Messages CandidateMessagesection candidate-smg-box">
        {/* <MessageTab/> */}
        <div
          className="jpbportal-menubar"
          id="sub-menu-box"
          onClick={addActiveToMessage}
        >
          <button className="show-sidemenu" id="show-sidemenu">
            Messages
          </button>
        </div>
        <section className="MessageTab active" id="MessageTab">
          <div className="messagewrapper">
            <div className="messageTab_close" onClick={remActive}>
              <BsChevronDoubleLeft
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                  fontSize: "3rem",
                  color: "#ffffff",
                }}
              />
            </div>

            <h3 className="text-center">Messages</h3>
            <div className="tabstructure mt-4">
              <Tab.Group>
                <div className="tab-head-row text-center">
                  <Tab.List className={"flex"}>
                    <Tab className="tabhead active">
                      <p>Inbox</p>
                    </Tab>
                  </Tab.List>
                </div>

                <div className="Messages-list custom-scrollbar">
                  <Tab.Panels>
                    {/* //user lisiting is here  */}
                    {RecruiterList &&
                      RecruiterList.map((Recruiter, index) => {
                        return (
                          <div
                            className={
                              Recruiter.id === singleRecruiterData.id
                                ? "tabpanel pointer active"
                                : "tabpanel pointer"
                            }
                            onClick={() => OpenMessageTab(Recruiter)}
                          >
                            <div className="namedate">
                              <div className="name">
                                <p>{Recruiter?.name}</p>
                              </div>
                              <div className="date">
                                <p>
                                  {new Date()
                                    .toString()
                                    .split(" ")
                                    .slice(0, 3)
                                    .join(" ")}
                                </p>
                              </div>
                            </div>
                            <div className="pendingmess">
                              <p>{Recruiter?.name + "..."}</p>
                            </div>
                          </div>
                        );
                      })}
                  </Tab.Panels>
                </div>
              </Tab.Group>
            </div>
          </div>
        </section>

        {/* //message section is here  */}
        {showMessageTab && (
          <section className="jobportal-right-section message-right-section cand-right-message">
            <div className="messageContent message-content-section">
              <h3>{singleRecruiterData?.name}</h3>
              <div className="chats custom-scrollbar mt-4">
                <div className="text-center">
                  <p>
                    <span className="datefeaf text-center">
                      {new Date(new Date().toLocaleString())
                        ?.toString()
                        ?.split(" ")
                        ?.slice(0, 4)
                        ?.join(" ")}
                    </span>
                  </p>
                </div>
{
  isShow ? <div>

                {AllMessages &&
                  AllMessages.map((message, id) => {
                    let time = new Date(
                      message?.timestamp
                    ).toLocaleTimeString();
                    // console.log("time",time)
                    return (
                      <>
                        {/* //receivers message */}
                        {message?.sender !== CandidateId && (
                          <div className="sender" key={message?._id}>
                            <div className="mess">
                              <div className="profileicon">
                                <CgProfile />
                              </div>
                              <div className="newMessage">
                                <p>{singleRecruiterData?.name}</p>
                                <p>{message?.content}</p>
                                <span>{time}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* //sender message  */}
                        {message?.sender === CandidateId && (
                          <div className="reciver" key={message?._id}>
                            <div className="mess">
                              <div className="profileicon">
                                {CandidatePhoto ? (
                                  <img
                                    src={CandidatePhoto}
                                    style={{
                                      width: "35px",
                                      height: "35px",
                                      objectFit: "cover",
                                      borderRadius: "99%",
                                    }}
                                    alt=""
                                  />
                                ) : (
                                  <CgProfile />
                                )}
                              </div>
                              <div className="newMessage">
                                <p>{CandidateName}</p>
                                <p>{message?.content} </p>
                                <span>{time}</span>
                              </div>
                            </div>
                            <div className="clear"></div>
                          </div>
                        )}
                      </>
                    );
                  })}
                  </div> :""
                  }

                <div ref={ScrollDownToNewMessagesref}></div>
              </div>

              {/* //send chat input form  */}
              <form onSubmit={SendMessageToUser} className="typetext mt-4">
                <input
                  type="text"
                  name="message"
                  placeholder="Type your message here..."
                  // value={messageStructure?.content}
                  value={message}
                  // onChange={(e)=>setMessageStructure({...messageStructure,roomId : "",content : e.target.value})}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <a
                  className="text-center btn maroon-btn maroon-btn-arrow"
                  onClick={SendMessageToUser}
                >
                  {showBtn ? "Send" : "Sending..."}
                </a>
              </form>
            </div>
          </section>
        )}
      </div>
      <Jobfooter />
    </>
  );
};
export default AuthorizeCandidate(CandidateMessageSection);

import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Jobfooter from "./JobFooter";
import Jobheader from "./JobHeader";
import Link from "next/link";
import { BsBell } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import MessageTab from "../../components/MessageTab";
import { FaAngleLeft } from "react-icons/fa";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { Tab } from "@headlessui/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { jobPortalBaseURL } from "../../constants/urlConstants";
import AuthorizeRec from "./AuthorizeRec/AuthorizeRec";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/router";
import socketIO from 'socket.io-client';

const socket = socketIO.connect('https://api.sucify.com');
const RecruiterMessagesection = () => {
  let Token = secureLocalStorage.getItem('RecruiterToken');

  const addActiveToMessage = () => {
    document.getElementById("MessageTab").classList.add("active");
  };
  const remActive = () => {
    document.getElementById("MessageTab").classList.remove("active");
  };
  const [isShow, setIsShow] = useState(false);
  const[showBtn, setShowBtn] = useState(false)
  const[message,setMessage] = useState('')
  const [currentRoom, setCurrentRoom] = useState("");

// REFRESH PAGE FOR NEW DATA
const router = useRouter()
let handleRefresh = () =>{
    router.reload()
}

  let RecruiterID = secureLocalStorage.getItem('RecID');
  let [RecruiterName,setRecruiterName] = useState('');

  useEffect(()=>{
    if(RecruiterID!==null){
      fetchRecruiterName();
    }
  },[])

  const fetchRecruiterName = async() =>{
    try{
      let response = await axios.get(`${jobPortalBaseURL}recruiter/${RecruiterID}`,{
        headers: {
           'Authorization': `Bearer ${Token}`
      }
      });
      if(response.status===200){
        setRecruiterName(response.data.data.firstName)
      }
    }catch(error){
      toast.error('Failed To Fetch Recruiter Name.!')
    }
  }



  //list of user array is here
  let [userList,setUserList] = useState([]);


  //single user data will be stored here is recruiter click on any user
  let [singleUserData,setSingleUserData] = useState({});
  let [clickedUserId,setClickedUserId] = useState()
  console.log("clickedUserId",clickedUserId,"++++====>singleUserData.id",singleUserData.id)


  //let generate Room Id By Posting Below Structure
  let [GenerateRoomIdData,setGenerateRoomIdData] = useState({
    roomName : "",
    participants : [],
    createdBy : RecruiterID
  });



  //let Chat Room Id will be stored here 
  let [RoomId,setRoomId] = useState('');


  //store all messages of single conversation
  let [AllMessages,setAllMessages] = useState([]);
  console.log("all messages",AllMessages)
  useEffect(() => { 
  //   socket.on('chatHistory', (data) => {
  //     console.log("history data",data)
  //     let {id , name} = singleUserData;     
  //     setClickedUserId(data?.data?.participants[1])
  //     console.log("++++=======",singleUserData,id)
  //     const array = [ data?.data?.participants[0],  data?.data?.participants[1]];
  //     console.log("ARRRAY",array)
  //     const valuesToFind = [RecruiterID,id];
  //     console.log("valuesToFind",valuesToFind)
  //     const foundValues = [];
  //     for (let i = 0; i < array.length; i++) {
  //       if (valuesToFind.includes(array[i])) {
  //         foundValues.push(array[i]);
  //       }
  //     }
   
  //     // console.log(foundValues.length); // [2, 4]


  //     if (data?.data?.participants[1] === id && foundValues.length > 1){ 
  //       console.log("id matched")
  //     setAllMessages([...data.data.messages])
  //     }else{
  //       console.log("id not matched")
  //     }
  // });
  socket.off("room-messages").on("room-messages", (roomMessages) => {
    console.log("roomMessages");
    console.log(roomMessages);
    setAllMessages([...roomMessages?.data?.messages]);
    // alert("All messages");
});
  }, [socket,singleUserData]);

  //show messages tab of single user handeled here 
  let [showMessageTab,setShowMessageTab] = useState(false);


  //message structure which sender is going to send
  let [messageStructure,setMessageStructure] = useState({
    sender : RecruiterID,
    roomId : "",
    content : ""
  })







  //fetchList of Users
  useEffect(()=>{
    fetchUsersListing(jobPortalBaseURL+'user/chat-user/'+RecruiterID,{
      headers: {
         'Authorization': `Bearer ${Token}`
    }
    });
  },[])



  //fetchUsersListing
  const fetchUsersListing = async(url)=>{
    try{
      let response = await axios.get(url,{
        headers: {
           'Authorization': `Bearer ${Token}`
      }
      });
      if(response.status===200){
        // setUserList(()=>{
        //   return 
        // })
        let userlisting = response.data.data.map((data,id)=>{
          return {id : data?.userDetails?._id , name : data?.userDetails?.firstName + " " + data?.userDetails?.lastName , photo : data?.userDetails?.avatar}
        })

        //remove duplicate objects
        let uniqLisiting = userlisting.reduce((finalArray,current)=>{
          let obj = finalArray.find((data)=>data.id===current.id)
          if(obj){
              return finalArray;
          }else{
            return finalArray.concat([current])
      }
      },[])


        setUserList(uniqLisiting?.reverse())
      }
    }catch(error){
      toast.error(error.message);
    }
  }



  //GenerateRoomID function is here 
  const GenerateRoomID = async(generateRoomValues)=>{
    try{
      let response = await axios.post(`${jobPortalBaseURL}tweet/create-room`,generateRoomValues,{
        headers: {
           'Authorization': `Bearer ${Token}`
      }
      });
      if(response.status === 200){
        setShowBtn(true)
        let {_id , messages} = response.data.data
        setRoomId(_id)
        // setAllMessages([...messages])
        setShowMessageTab(true);
      }
    }catch(error){
      toast.error("Failed To Open Chats")
      console.log(error);
    }
  }
  

  //OpenMessageTab is here when recruiter click on user lisiting
  let OpenMessageTab = (candidateData) =>{
    setIsShow(false)
    setSingleUserData(candidateData)
    console.log("OpenMessageTab setSingleUserData",candidateData)
    let {id , name} = candidateData;
    setGenerateRoomIdData({
      ...GenerateRoomIdData,
      roomName : `${RecruiterID}-${id ? id : singleUserData.id}`,
      participants : [RecruiterID,id ? id : singleUserData.id],
      participantsName : [RecruiterName,name]
    })  

    let obj = {
      roomName : `${RecruiterID}-${id ? id : singleUserData.id}`,
      participants : [RecruiterID,id ? id : singleUserData.id],
      participantsName : [RecruiterName,name],
      createdBy : RecruiterID
    }

    // callling function is here to generateRoomID 
    GenerateRoomID(obj);
  const body={
    roomName:  `${RecruiterID}-${id}`,
    participants:[RecruiterID,id],
    participantsName:[RecruiterName,name],
    createdBy:RecruiterID,
    authorization: `Bearer ${Token}`
  }
  // alert("JOIN ROOM"+`${RecruiterID}-${id}`);
  socket.emit("join-room",body , currentRoom);
  setCurrentRoom(`${RecruiterID}-${id}`)
  // socket.emit('loadHistory',body);

  // MESSAGE TAB LOADER
  setTimeout(() => {
    setIsShow(true)
  }, 1000);
  }



  //SendMessageToUser function is here 
  const SendMessageToUser = async(e) =>{    
    e.preventDefault(); 
    let {id , name} = singleUserData;
    
     // USING SOCKET IO
  //    socket.emit('message', {
  //     sender: RecruiterID,
  //     roomId: RoomId,
  //     content: message,
  //     authorization: `Bearer ${Token}`
  // });
  const body={
    roomName:  `${RecruiterID}-${id}`,
    participants:[RecruiterID,id],
    participantsName:[RecruiterName,name],
    createdBy:RecruiterID,
    authorization: `Bearer ${Token}`
  }
  socket.emit("message-room", {
    sender: RecruiterID,
    roomId: RoomId,
    content: message,
    authorization: `Bearer ${Token}`,
  },body);
// alert("Sent Message"+JSON.stringify({
// sender: RecruiterID,
// roomId: RoomId,
// content: message,
// authorization: `Bearer ${Token}`,
// }));
  // const body={
  //   roomName:  `${RecruiterID}-${id}`,
  //   participants:[RecruiterID,id],
  //   participantsName:[RecruiterName,name],
  //   createdBy:RecruiterID,
  //   authorization: `Bearer ${Token}`
  // }
  console.log("body",body) 
  // socket.emit("join-room",body , "currentRoom");
  setMessage('')
  }



  // //recruiter comming from dashboard
  let {query,isReady} = useRouter();
  useEffect(()=>{
    if(isReady){
      if(query?.UID){

        //set structure to generate room id
        let {id , name} = singleUserData;
        let obj = {
          roomName : `${RecruiterID}-${id}`,
          participants : [RecruiterID,id],
          participantsName : [RecruiterName,name],
          createdBy : RecruiterID
        }

        //generate room id once structure is build
        GenerateRoomID(obj);

        //get  single user data which has been cliked from dashboard
        // setSingleUserData(secureLocalStorage.getItem('MessageDataFromRecruiterDashboard'));

        //show message tab
        setShowMessageTab(true);
      }
    }
  },[isReady,query])









  
  //ScrollDownToNewMessagesref
  const ScrollDownToNewMessagesref = useRef(null);
  useEffect(()=>{
    ScrollDownToNewMessagesref?.current?.scrollIntoView({block: "end",behaviour : "smooth"});
  },[AllMessages])

 
  return (
    <>
      <Head>
        <title>Recruiter Messages - Simandhar Education</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      </Head>
      {/* <Jobheader showData3={false} /> */}
      <div>
          <Link
            href="/job/RecruiterDashboardJobs"
            className="btn maroon-btn maroon-btn-arrow d-iflex" style={{ backgroundImage: "none", paddingRight:"4rem",float:"right",margin:"2rem", position:"absolute",right:"0",zIndex:"2" }}
          >
            <FaAngleLeft />
            Back To Dashboard
          </Link>
          </div>
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
                    {
                      userList && userList.map((candidate,index)=>{
                        return(
                          <div className={candidate.id === singleUserData.id ? "tabpanel pointer active" : "tabpanel pointer"} onClick={()=>OpenMessageTab(candidate)} key={index}>
                          <div className="namedate">
                            <div className="name" style={{display : "flex" , justifyContent : "center" , alignItems : "center" , gap : '8px'}}>
                              {
                                candidate?.photo ?
                                <img src={candidate?.photo} alt="" style={{width : '30px' , height : '30px' , objectFit:"cover" , borderRadius : "99%" , border : '1px solid #760B28'}} /> : <CgProfile style={{width : '30px' , height : '30px' , objectFit:"cover" , borderRadius : "99%" }}/>
                              }
                              <p>{candidate?.name}</p>
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
                          {/* <div className="pendingmess">
                            <p>{candidate?.name+'...'}</p>
                          </div> */}
                        </div>
                        )
                      })
                    }
                     
                  </Tab.Panels>
                </div>
              </Tab.Group>
            </div>
          </div>
        </section>


          {/* //message section is here  */}
          
           {
            showMessageTab
               &&
            <section className="jobportal-right-section message-right-section">



            {/* <div className="setbellicon">
              <h3></h3>
              <div className="icon">
                <BsBell />
              </div>
            </div> */}


            <div className="messageContent">
              <div  style={{display : 'flex' , justifyContent : 'center' , alignItems : "center"} }>
                {
                  singleUserData?.photo ? 
                  <img src={singleUserData?.photo} style={{width : "35px",height:"35px",objectFit : "cover" , borderRadius : "99%"}} alt="" /> : <CgProfile style={{width : "35px",height:"35px",objectFit : "cover" , borderRadius : "99%"}} />
                }
                <h3>{singleUserData?.name}</h3>
              </div>
              <div className="chats custom-scrollbar mt-4">
                <div className="text-center">
                  <p>
                    <span className="datefeaf text-center">{new Date(new Date().toLocaleString())?.toString()?.split(' ')?.slice(0,4)?.join(' ')}</span>
                  </p>
                </div>

{
  isShow ? 

                <div>
                 {
                  AllMessages && AllMessages.map((message,id)=>{
                    let time = new Date(message?.timestamp).toLocaleTimeString()
                    return(
                      <>
                {/* //receivers message */}
                {
                  message?.sender!==RecruiterID 
                  &&
                  <div className="sender" key={message?._id}>
                  <div className="mess">
                    <div className="profileicon">
                      {
                        singleUserData?.photo 
                        ?
                        <img src={singleUserData?.photo} style={{width : "35px",height:"35px",objectFit : "cover" , borderRadius : "99%"}} alt="" />
                        :
                        <CgProfile />
                      }
                    </div>
                    <div className="newMessage">
                      <p>
                         {singleUserData?.name}
                      </p>
                      <p>{message?.content}</p>
                      <span>{time}</span>
                    </div>
                  </div>
                </div>                
                }
                         

                
                {/* //sender message  */}
                {
                  message?.sender===RecruiterID 
                  &&
                  <div className="reciver" key={message?._id}>
                  <div className="mess">
                    <div className="profileicon">
                      <CgProfile />
                    </div>
                    <div className="newMessage">
                      <p>
                        {RecruiterName}
                      </p>
                      <p>{message?.content}</p>
                      <span>{time}</span>
                    </div>
                  </div>
                  <div className="clear"></div>
                </div>
             
                }


                      </>
                    )
                  })
                 }
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
                  value={message}
                  // onChange={(e)=>setMessageStructure({...messageStructure,content : e.target.value,roomId : ""})}
                  onChange={(e)=>{
                    setMessage(e.target.value)
                  }}
                  // onClick={handleCreateRoom}
                />
                <a
                  className="text-center btn maroon-btn maroon-btn-arrow"
                  onClick={SendMessageToUser}
                >
                  {showBtn ? "Send": "Sending..."}
                </a>
              </form>
            </div>

          </section>

           }
      
      </div>
      <Jobfooter />
    </>
  );
};
export default AuthorizeRec(RecruiterMessagesection);

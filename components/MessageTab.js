import React, { useEffect } from "react";
import { Tab } from "@headlessui/react";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { jobPortalBaseURL } from "../constants/urlConstants";

const MessageTab = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      let response = await axios.get(
        `${jobPortalBaseURL}user/datatable?page=1&limit=10&sort=id:asc&search=`,{
          headers: {
             'Authorization': `Bearer ${Token}`
        }
        }
      );
      if (response.status === 200) {
        setUsers(response.data.data.records);
      }
    } catch (error) {
      // toast.error("Something Went Wrong");
    }
  };

  const remActive = () => {
    document.getElementById("MessageTab").classList.remove("active");
  };

  const [state, setstate] = useState({
    inbox: true,
    archive: false,
    spam: false,
  });

  const setLinkActive = (ele) => {
    if (ele === "inbox") {
      setstate({
        inbox: true,
        archive: false,
        spam: false,
      });
    } else if (ele === "archive") {
      setstate({
        inbox: false,
        archive: true,
        spam: false,
      });
    } else {
      setstate({
        inbox: false,
        archive: false,
        spam: true,
      });
    }
    // alert(ele)
  };

  return (
    <>
      <section className="MessageTab" id="MessageTab">
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
                <Tab.List className={"flex "}>
                  <Tab
                    className={state.inbox ? "tabhead active" : "tabhead"}
                    onClick={() => setLinkActive("inbox")}
                  >
                    <p>Inbox</p>
                  </Tab>
                  <Tab
                    className={state.archive ? "tabhead active" : "tabhead"}
                    onClick={() => setLinkActive("archive")}
                  >
                    <p>Archived</p>
                  </Tab>
                  <Tab
                    className={state.spam ? "tabhead active" : "tabhead"}
                    onClick={() => setLinkActive("spam")}
                  >
                    <p>Spam</p>
                  </Tab>
                </Tab.List>
              </div>

              <div className="Messages-list custom-scrollbar">
                <Tab.Panels>
                  <Tab.Panel>
                    {users &&
                      users.map((data, id) => {
                        const {fullName,_id} = data;
                        return (
                          <div className="tabpanel">
                            <div className="namedate">
                              <div className="name">
                                <p>{fullName}</p>
                              </div>
                              <div className="date">
                                <p>{new Date().toString().split(' ').slice(0,3).join(' ')}</p>
                              </div>
                            </div>
                            <div className="pendingmess">
                              <p>{fullName}...</p>
                            </div>
                          </div>
                        );
                      })}
                  </Tab.Panel>
                </Tab.Panels>
              </div>
            </Tab.Group>
          </div>
        </div>
      </section>
    </>
  );
};

export default MessageTab;

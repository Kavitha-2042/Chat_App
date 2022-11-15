import { Send } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface propTypes {
  btn: boolean;
  currentUserID?: string;
  currentUserName?: string;
  currentUserImage?: string;
  selectedId?: string;
  selectedName?: string;
  selectedImage?: string;
  currentChat: any;
}
// {handleSendMsg}:propTypes

const ChatInput = ({
  btn,
  currentUserID,
  currentUserName,
  currentUserImage,
  selectedId,
  selectedImage,
  selectedName,
  currentChat,
}: propTypes) => {
  const currentUserNameValue = localStorage.getItem("CurrentUserName");
  const selectedNameValue = localStorage.getItem("SelectedName");

  const [msg, setMsg] = useState("");
  const [sendMsg, setSendMsg] = useState("");
  const [allMsg, setAllMsg] = useState([]);
  const [count, setCount] = useState(0);
  const [msgSender, setMsgSender] = useState([]);

  const [details, setDetails] = useState([]);

  console.log("In input: ", currentUserName);

  console.log("Selected Name: ", selectedName);

  const sendChat = (event: any) => {
    event.preventDefault();
    if (msg.length > 0) {
      console.log("msg: ", msg);
      // handleSendMsg(msg)
      setSendMsg(msg);
      setMsg("");
      // alert(msg)
    }

    axios
      .post("/message/createMsg", {
        from: currentUserNameValue,
        to: selectedNameValue,
        message: msg,
      })
      .then((messageResponse) => {
        if (messageResponse) {
          // alert("Success");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .post("/message/getAllMsgs", {
        from: currentUserNameValue,
        to: selectedNameValue,
      })
      .then((allMessagesResponse) => {
        if (allMessagesResponse.data.auth === true) {
          setDetails(allMessagesResponse.data.details);
          setAllMsg(allMessagesResponse.data.allMessages);
          console.log("all messgage: ", allMessagesResponse.data.allMessages);
          setCount(allMessagesResponse.data.length);
          setMsgSender(allMessagesResponse.data.sender);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {btn ? (
        <></>
      ) : (
        <>
          <div>
            <div
              className=""
              style={{
                color: "white",
              }}
            >
              <div
                style={{
                  maxWidth: "100%",
                  overflowWrap: "break-word",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                  overflow: "auto",
                  alignItems: "center",
                  paddingTop: "100px",
                  fontSize: "1.1rem",
                  borderRadius: "1rem",
                  color: "#d1d1d1",
                }}
              >
                {details.map((val: any) => {
                  return (
                    <ul
                      style={{
                        padding: "10px",
                        backgroundColor:
                          val.sender === currentUserNameValue
                            ? "#4f04ff90"
                            : "#ffffff30",
                        justifyContent:
                          val.sender === currentUserNameValue
                            ? "flex-end"
                            : "flex-start",
                        alignContent:
                          val.sender === currentUserNameValue ? "end" : "start",
                        marginLeft:
                          val.sender === currentUserNameValue
                            ? "300px"
                            : "-300px",
                        marginRight:
                          val.sender === currentUserNameValue
                            ? "-600px"
                            : "700px",
                        borderRadius: "10%",
                      }}
                    >
                      {val.message.text}
                    </ul>
                  );
                })}
              </div>
            </div>
            <div>
              <div
                className="chat-messages"
                style={{
                  marginTop: "500px",
                  marginLeft: "10px",
                }}
              >
                <form action="" onSubmit={(event) => sendChat(event)}>
                  <input
                    type="message"
                    name="Type a message"
                    placeholder="Type a message... "
                    onChange={(e) => {
                      setMsg(e.target.value);
                    }}
                    value={msg}
                    style={{
                      marginLeft: "-3px",
                      width: "99%",
                      borderRadius: "3rem",
                      height: "50px",
                      backgroundColor: "#ffffff34",
                      color: "white",
                      paddingLeft: "1rem",
                      fontSize: "1.2rem",
                    }}
                  />
                  <button
                    className="shadow-slate-100 hover:to-white-900"
                    style={{
                      position: "relative",
                      marginLeft: "-50px",
                      backgroundColor: "#9a86f3",
                      color: "white",

                      borderRadius: "50%",
                      alignItems: "center",
                      border: "none",
                      height: "51px",
                      width: "51px",
                      marginTop: "40px",
                    }}
                  >
                    <Send />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ChatInput;

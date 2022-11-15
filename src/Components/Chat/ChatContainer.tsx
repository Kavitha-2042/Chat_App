import React from "react";
import ChatInput from "./ChatInput";


interface propType {
  btn: boolean;
  currentUserID?: string;
  currentUserName?: string;
  currentUserImage?: string;
  selectedId?: string;
  selectedName?: string;
  selectedImage?: string;
  currentChat: any;
}

const ChatContainer = ({
  btn,
  currentUserID,
  currentUserName,
  currentUserImage,
  selectedId,
  selectedName,
  selectedImage,
  currentChat,
}: propType) => {
  console.log("In containre name: ", currentUserName);
  console.log("Selected name in chatcontainer: ", selectedName);

  return (
    <>
      {btn ? (
        <>{/* <Welcome /> */}</>
      ) : (
        <>
          <ChatInput
            btn={btn}
            currentUserID={currentUserID}
            currentUserName={currentUserName}
            currentUserImage={currentUserImage}
            selectedId={selectedId}
            selectedName={selectedName}
            selectedImage={selectedImage}
            currentChat={currentChat}
          />
        </>
      )}
    </>
  );
};

export default ChatContainer;

import React, { useState } from "react";
import { chatState } from "./context/ChatProvider";
import { Flex } from "@chakra-ui/react";
import SideDrawer from "./components/misc/SideDrawer";
import MyChats from "./components/MyChats";
import ChatBox from "./components/ChatBox";

function ChatPage() {
  const { user } = chatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Flex justify="space-between" w="100%" p="10px" height="91.5vh">
        {user && (
          <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Flex>
    </div>
  );
}

export default ChatPage;

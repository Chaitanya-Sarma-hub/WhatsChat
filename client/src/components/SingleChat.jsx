import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  IconButton,
  Input,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { chatState } from "../context/ChatProvider";
import ProfileModel from "./misc/ProfileModel";
import UpdateGroupChatModal from "./misc/UpdateGroupChatModal";
import axios from "axios";

function SingleChat({ fetchAgain, setFetchAgain }) {
  const { user, selectedChat, setSelectedChat } = chatState();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState();

  const fetchMessages = async () => {
    if (!selectedChat) return;
    try {
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:5050/api/messages/${selectedChat._id}`,
        {
          headers,
        }
      );
      // console.log(data);
      setMessages(data);
      console.log(messages);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Failed to load chats",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async (e) => {
    if (e.key === "Enter" && newMessage) {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        };
        setNewMessage("");
        const { data } = await axios.post(
          `http://localhost:5050/api/messages`,
          { content: newMessage, chatId: selectedChat._id },
          {
            headers,
          }
        );
        setMessages([...messages, data]);
      } catch (error) {
        toast({
          title: "Send Failed",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={2}
            px={3}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModel user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                ></UpdateGroupChatModal>
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={3}
            bg="#E8E8E8"
            w="100%"
            h="100%"
            borderRadius="lg"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div></div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              <Input
                variant="solid"
                bg="#E0E0E0"
                placeholder="Enter message to send"
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start Chatting
          </Text>
        </Box>
      )}
    </>
  );
}

export default SingleChat;

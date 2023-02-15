import { ViewIcon } from "@chakra-ui/icons";
import {
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Box,
  FormControl,
  Input,
  ModalFooter,
  Spinner,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { chatState } from "../../context/ChatProvider";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import axios from "axios";
import UserListItem from "../userAvatar/UserListItem";

function UpdateGroupChatModal({ fetchAgain, setFetchAgain }) {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { selectedChat, setSelectedChat, user } = chatState();

  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const toast = useToast();

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only Admins can remove or add users",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      const { data } = await axios.put(
        `http://localhost:5050/api/chats/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        {
          headers,
        }
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        title: "Error Occured",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u.id === user1.id)) {
      toast({
        title: "User already exists",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only Admins can remove or add users",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      const { data } = await axios.put(
        `http://localhost:5050/api/chats/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        {
          headers,
        }
      );
      setSelectedChat(data);
      console.log(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast({
        title: "Error Occured",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      const { data } = await axios.put(
        `http://localhost:5050/api/chats/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        {
          headers,
        }
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
      setRenameLoading(false);
      toast({
        title: "Error Occured",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
    setGroupChatName("");
    onClose();
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) return;

    try {
      setLoading(true);
      const headers = {
        Authorization: `Bearer ${user.token}`,
      };
      const { data } = await axios.get(
        `http://localhost:5050/api/users?search=${search}`,
        {
          headers,
        }
      );
      setLoading(false);
      console.log(data);
      setSearchResult(data);
    } catch (error) {
      console.log(error);
      toast({
        title: "Failed to load search results",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box display="flex" w="100%" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add users to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((u) => (
                <UserListItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleAddUser(u)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateGroupChatModal;

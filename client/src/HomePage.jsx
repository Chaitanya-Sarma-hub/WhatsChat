import React, { useEffect } from "react";
import {
  Container,
  Box,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigateTo = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("userInfo");
    if (user) navigateTo("/chats");
  }, [navigateTo]);

  return (
    <Container maxW="xl">
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        bg={"white"}
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text
          align="center"
          fontSize="4xl"
          fontFamily="Work sans"
          color="black"
        >
          Talk-A-Tive
        </Text>
      </Box>
      <Box
        color="black"
        bg={"white"}
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage;

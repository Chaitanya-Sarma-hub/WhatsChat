import { Box, CloseButton } from "@chakra-ui/react";
import React from "react";

function UserBadgeItem({ user, handleFunction }) {
  return (
    <Box
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={15}
      backgroundColor="purple"
      color="white"
      cursor="pointer"
      onClick={handleFunction}
      display="flex"
      alignItems="center"
    >
      {user.name}
      <CloseButton pl={1} size="sm" />
    </Box>
  );
}

export default UserBadgeItem;

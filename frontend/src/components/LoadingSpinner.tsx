import { Container, Spinner, VStack, Text } from "@chakra-ui/react";

export const LoadingSpinner = () => {
  return (
    <Container
      py={{ base: "4", md: "6", lg: "8" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
    >
      <VStack gap="4">
        <Spinner size="lg" />
        <Text>Loading users...</Text>
      </VStack>
    </Container>
  );
};

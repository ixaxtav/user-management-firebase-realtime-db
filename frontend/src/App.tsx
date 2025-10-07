import { Container, Heading, Input, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { UserTable } from "./components/UserTable";
import { CreateUserDialog } from "./components/CreateUserDialog";
import { userService } from "./services/userService";
import type { User } from "./types/user";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { Toaster } from "./components/ui/toaster";

const App = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const unsubscribe = userService.subscribeToUsers((users) => {
      setUsers(users);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // non-optimal for large datasets
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.zipCode.includes(searchTerm)
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Container py={{ base: "4", md: "6", lg: "8" }}>
      <Heading size="2xl" mb={4}>
        User Management
      </Heading>
      <Flex justify="space-between" align="center" mb={4}>
        <Input
          placeholder="Search users..."
          maxW="md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <CreateUserDialog />
      </Flex>
      <UserTable users={filteredUsers} />
      <Toaster />
    </Container>
  );
};

export default App;

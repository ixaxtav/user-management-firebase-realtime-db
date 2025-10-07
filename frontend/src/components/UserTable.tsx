import { Table, IconButton, Icon, Link } from "@chakra-ui/react";
import { FiTrash, FiEdit2 } from "react-icons/fi";
import { EditUserDialog } from "./EditUserDialog";
import { DeleteDialog } from "./DeleteDialog";
import type { User } from "../types/user";

interface UserTableProps {
  users: User[];
}

export const UserTable = ({ users }: UserTableProps) => {
  function formatTimezone(offsetInSeconds: number) {
    const hours = offsetInSeconds / 3600;
    return `UTC${hours >= 0 ? `+${hours}` : hours}`;
  }

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>ID</Table.ColumnHeader>
          <Table.ColumnHeader>Name</Table.ColumnHeader>
          <Table.ColumnHeader>Zip Code</Table.ColumnHeader>
          <Table.ColumnHeader>Location</Table.ColumnHeader>
          <Table.ColumnHeader>Timezone</Table.ColumnHeader>
          <Table.ColumnHeader>Actions</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users.map((user) => (
          <Table.Row
            key={user.id}
            _hover={{
              bg: "gray.50",
            }}
            transition="background-color 0.2s"
          >
            <Table.Cell>{user.id}</Table.Cell>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.zipCode}</Table.Cell>
            <Table.Cell>
              <Link
                href={`https://www.google.com/maps?q=${user.latitude},${user.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                colorPalette="blue"
              >
                {user.latitude}, {user.longitude}
              </Link>
            </Table.Cell>
            <Table.Cell>{formatTimezone(user.timezone)}</Table.Cell>
            <Table.Cell>
              <EditUserDialog
                user={user}
                trigger={
                  <IconButton variant="subtle" size="sm" mr="4">
                    <Icon as={FiEdit2} />
                  </IconButton>
                }
              />
              <DeleteDialog
                user={user}
                trigger={
                  <IconButton variant="subtle" size="sm" colorPalette="red">
                    <Icon as={FiTrash} />
                  </IconButton>
                }
              />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

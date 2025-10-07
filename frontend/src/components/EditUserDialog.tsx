import { Dialog, Portal, CloseButton, Button, Stack } from "@chakra-ui/react";
import type { User, UpdateUserData } from "../types/user";
import { UserForm } from "./UserForm";
import { useState } from "react";
import type { ReactNode } from "react";
import { toaster } from "./ui/toaster";
import { userService } from "../services/userService";

interface EditUserDialogProps {
  user: User;
  onSave?: (user: User, data: UpdateUserData) => void;
  trigger: ReactNode;
  isLoading?: boolean;
}

export const EditUserDialog = ({
  user,
  onSave,
  trigger,
}: EditUserDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (data: UpdateUserData) => {
    setIsLoading(true);

    try {
      await userService.updateUser(user.id, data);
      toaster.create({
        title: "Success",
        description: "User updated successfully",
        type: "success",
      });

      setIsOpen(false);
      if (onSave) onSave(user, data);
    } catch (error) {
      toaster.create({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Internal server error",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{`Edit User ${user.name}`}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <UserForm
                user={user}
                onSubmit={handleSave}
                isLoading={isLoading}
              />
            </Dialog.Body>
            <Dialog.Footer>
              <Stack direction="row" gap="2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading} colorPalette="blue">
                  Save
                </Button>
              </Stack>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

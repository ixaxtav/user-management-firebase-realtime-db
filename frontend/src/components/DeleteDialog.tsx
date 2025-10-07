import { Dialog, Portal, CloseButton, Button, Stack } from "@chakra-ui/react";
import type { User } from "../types/user";
import { useState } from "react";
import type { ReactNode } from "react";
import { toaster } from "./ui/toaster";
import { userService } from "../services/userService";

interface DeleteDialogProps {
  user: User;
  onConfirm?: (user: User) => void;
  trigger: ReactNode;
  isLoading?: boolean;
}

export const DeleteDialog = ({
  user,
  onConfirm,
  trigger,
}: DeleteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);

    try {
      await userService.deleteUser(user.id);
      toaster.create({
        title: "Success",
        description: "User deleted successfully",
        type: "success",
      });

      setIsOpen(false);
      if (onConfirm) onConfirm(user);
    } catch (error) {
      toaster.create({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to delete user",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
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
              <Dialog.Title>
                {`Are you sure you want to delete user "${user.name}"?`}
              </Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>This action cannot be undone.</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Stack direction="row" gap="2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button
                  colorPalette="red"
                  onClick={handleConfirm}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
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

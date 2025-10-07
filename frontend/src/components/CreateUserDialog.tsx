import {
  Dialog,
  Portal,
  CloseButton,
  Button,
  Stack,
  Field,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { toaster } from "./ui/toaster";
import { userService } from "../services/userService";

export const CreateUserDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", zipCode: "" });

  const handleSave = async () => {
    if (!formData.name || !formData.zipCode) {
      toaster.create({
        title: "Error",
        description: "Please fill in all fields",
        type: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      await userService.createUser(formData);
      toaster.create({
        title: "Success",
        description: "User created successfully",
        type: "success",
      });
      setIsOpen(false);
      setFormData({ name: "", zipCode: "" });
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
    setFormData({ name: "", zipCode: "" });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button colorPalette="blue">Create User</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Create User</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap="5">
                <Field.Root>
                  <Field.Label>Name</Field.Label>
                  <Input
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                    disabled={isLoading}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Zip Code</Field.Label>
                  <Input
                    value={formData.zipCode}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        zipCode: e.target.value,
                      }))
                    }
                    required
                    disabled={isLoading}
                  />
                </Field.Root>
              </Stack>
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
                <Button
                  onClick={handleSave}
                  disabled={isLoading}
                  colorPalette="blue"
                >
                  Create
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

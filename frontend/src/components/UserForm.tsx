import { Stack, Field, Input } from "@chakra-ui/react";
import type { User, CreateUserData, UpdateUserData } from "../types/user";
import { useState, useEffect } from "react";

interface UserFormProps {
  user?: User;
  onSubmit: (data: CreateUserData | UpdateUserData) => void;
  isLoading?: boolean;
  formRef?: (ref: HTMLFormElement | null) => void;
}

export const UserForm = ({
  user,
  onSubmit,
  isLoading,
  formRef,
}: UserFormProps) => {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    zipCode: user?.zipCode || "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        zipCode: user.zipCode,
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange =
    (field: keyof typeof formData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <Stack gap="5">
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input
            value={formData.name}
            onChange={handleChange("name")}
            required
            disabled={isLoading}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Zip Code</Field.Label>
          <Input
            value={formData.zipCode}
            onChange={handleChange("zipCode")}
            required
            disabled={isLoading}
          />
        </Field.Root>
      </Stack>
    </form>
  );
};

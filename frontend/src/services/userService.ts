import { ref, get, onValue, off } from "firebase/database";
import { database } from "../firebase";
import type { User, CreateUserData, UpdateUserData } from "../types/user";
import { API_BASE_URL, API_ENDPOINTS } from "../config/api";

const USERS_REF = "users";

export const userService = {
  async getAllUsers(): Promise<User[]> {
    const usersRef = ref(database, USERS_REF);
    const snapshot = await get(usersRef);

    if (!snapshot.exists()) {
      return [];
    }

    const usersData = snapshot.val();
    return Object.entries(usersData).map(([id, userData]) => ({
      id,
      ...(userData as Omit<User, "id">),
    }));
  },

  async createUser(userData: CreateUserData): Promise<User> {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.USERS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to create user");
    }

    return result.data;
  },

  async updateUser(id: string, userData: UpdateUserData): Promise<User> {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.USERS}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update user");
    }

    return result.data;
  },

  async deleteUser(id: string): Promise<void> {
    const response = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.USERS}/${id}`,
      {
        method: "DELETE",
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to delete user");
    }
  },

  subscribeToUsers(callback: (users: User[]) => void): () => void {
    const usersRef = ref(database, USERS_REF);

    const unsubscribe = onValue(usersRef, (snapshot) => {
      if (!snapshot.exists()) {
        callback([]);
        return;
      }

      const usersData = snapshot.val();
      const users = Object.entries(usersData).map(([id, userData]) => ({
        id,
        ...(userData as Omit<User, "id">),
      }));

      callback(users);
    });

    return () => off(usersRef, "value", unsubscribe);
  },
};

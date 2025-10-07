export interface User {
  id: string;
  name: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  timezone: number;
}

export interface CreateUserData {
  name: string;
  zipCode: string;
}

export interface UpdateUserData {
  name: string;
  zipCode: string;
}

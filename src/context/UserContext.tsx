import { createContext } from "react";
import { UserCredentials } from "./UserProvider";

export interface UserContextType {
  user: UserCredentials | null;
  login: (username: string, email: string, token: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

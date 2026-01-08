import { createContext } from "react";
import { UserCredentials } from "../providers/user-provider";

export interface UserContextType {
  user: UserCredentials | null;
  login: (username: string, token: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

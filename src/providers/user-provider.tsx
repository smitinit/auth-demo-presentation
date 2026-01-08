import { ReactNode, useState } from "react";
import { UserContext } from "../context/UserContext";

export interface UserCredentials {
  username: string;
  token: string;
}

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserCredentials | null>(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (username: string, token: string) => {
    const userData = { username, token };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

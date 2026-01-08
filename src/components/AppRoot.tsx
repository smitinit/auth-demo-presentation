import { Outlet } from "react-router-dom";
import { UserProvider } from "@/context/UserProvider";
import { ThemeProvider } from "@/providers/theme-provider";

export function AppRoot() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Outlet />
      </UserProvider>
    </ThemeProvider>
  );
}

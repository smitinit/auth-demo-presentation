import { TestContext } from "@/context/TestContext";
import { useContext } from "react";

export function useTest() {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error("useTest must be used within a TestContext.Provider");
  }
  return context;
}

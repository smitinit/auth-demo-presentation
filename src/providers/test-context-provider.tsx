import { TestContext } from "@/context/TestContext";
import { ReactNode, useState } from "react";

export default function TestContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [values, setValues] = useState({ name: "", age: 0 });
  const ctxValue = { name: values.name, age: values.age, setValues: setValues };
  return (
    <TestContext.Provider value={ctxValue}>{children}</TestContext.Provider>
  );
}

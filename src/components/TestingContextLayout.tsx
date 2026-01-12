import TestContextProvider from "@/providers/test-context-provider";
import { Test } from "./TestComp1";
import { Test2 } from "./TestComp2";

export default function TestingContextLayout() {
  return (
    <>
      <TestContextProvider>
        <Test />
        <Test2 />
      </TestContextProvider>
    </>
  );
}

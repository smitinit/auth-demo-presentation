import { TestContext } from "@/context/TestContext";
import { Input } from "./ui/input";

import { Label } from "./ui/label";

export function Test2() {
  return (
    <TestContext.Consumer>
      {({ name, age, setValues }) => {
        return (
          <>
            <Label>Name input, belongs to test 2</Label>
            <Input
              type="text"
              placeholder="
                  This input belongs to App component, Enter name..."
              value={name}
              onChange={(e) =>
                setValues((pV) => {
                  return {
                    ...pV,
                    name: e.target.value,
                  };
                })
              }
            />
            This is in the test2, AGE:{age}
          </>
        );
      }}
    </TestContext.Consumer>
  );
}

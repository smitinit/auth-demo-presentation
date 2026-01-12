import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useTest } from "@/hooks/test-context-hook";

export function Test() {
  const { name, age, setValues } = useTest();

  return (
    <>
      <Label>AGE input, belongs to test</Label>
      <Input
        type="number"
        placeholder="This input belongs to Test Component, Enter age: "
        value={age ?? 0}
        onChange={(e) =>
          setValues((pV) => {
            return {
              ...pV,
              age: +e.target.value,
            };
          })
        }
      />
      This is in the test, NAME:{name}
    </>
  );
}

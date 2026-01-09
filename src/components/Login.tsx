import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const { login, user } = useUser();

  const [credentials, setCredentials] = useState({
    name: "",
    password: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const handleLogin = () => {
    // basic validation
    const validationErrors: string[] = [];

    if (!credentials.name.trim()) {
      validationErrors.push("User Name is required, please submit a username.");
    }

    if (
      !credentials.password ||
      credentials.password.length < 8 ||
      credentials.password.length > 15
    ) {
      validationErrors.push(
        "Password length must be between 8 and 15 characters."
      );
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    // clear previous errors
    setErrors([]);

    // dummy login
    login(credentials.name, credentials.password);
  };

  // redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="flex h-screen justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your credentials to login</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-5">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter name..."
                value={credentials.name}
                onChange={(e) =>
                  setCredentials((c) => ({ ...c, name: e.target.value }))
                }
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter password..."
                value={credentials.password}
                onChange={(e) =>
                  setCredentials((c) => ({ ...c, password: e.target.value }))
                }
              />
            </div>
            {errors.length > 0 && (
              <ul className="text-destructive text-sm text-center space-y-1">
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleLogin}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

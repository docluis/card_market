"use client";

import { title } from "@/components/primitives";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Spacer,
  Checkbox,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setIsSubmitting(true);
    setMessage("");
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        setIsSubmitting(false);
        if (response.status === 201) {
          // router.push("/login");
          console.log("User login successfully");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data) {
          setMessage(data.message);
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        console.error("Error registering user:", error);
      });
  };

  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex justify-center p-4 bg-blue-500 text-white">
          <h2 className="text-2xl font-semibold">Login</h2>
        </CardHeader>
        <CardBody className="p-6">
          <div className="mb-4">
            <Input
              label="Username"
              placeholder="your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Input
              label="Password"
              placeholder="your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Spacer y={1} />
          <CardFooter className="flex-col justify-center">
            <Button
              isDisabled={username === "" || password === ""}
              isLoading={isSubmitting}
              onClick={handleLogin}
            >
              Login
            </Button>
            {message && <p className="text-center text-red-500">{message}</p>}
            <Spacer y={1} />
          </CardFooter>
        </CardBody>
      </Card>
    </div>
  );
}

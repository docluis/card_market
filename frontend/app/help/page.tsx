"use client";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Textarea,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
// import { Help } from "@/components/types";
import { title } from "@/components/primitives";

export default function HelpPage() {
  // const emptyHelp: Help = {
  //   full_name: "",
  //   phone_number: "",
  //   email: "",
  //   message: "",
  // };
  // const [localUser, setLocalUser] = useState<Help>(emptyHelp);

  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleNext = () => {
    if (message.trim()) {
      setStep(2); // Proceed to the next step if message is filled in
    }
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log({ message, email, name });
    alert("Form submitted!");
  };

  return (
    <div>
      <h1 className={title()}>Help</h1>
      <div className="flex justify-center items-center">
        <Card className="w-full max-w-sm p-6 space-y-4 mt-8 min-h-2xl">
          {step === 1 ? (
            <>
              <Textarea
                placeholder="Describe your issue..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
                className="mb-4"
                minRows={7}
              />
              <Button onClick={handleNext} disabled={!message.trim()}>
                Next
              </Button>
            </>
          ) : (
            <>
              <Input
                label="Name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                className="mb-4"
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                className="mb-4"
                type="email"
              />
              <Button
                onClick={handleSubmit}
                disabled={!email.trim() || !name.trim()}
              >
                Submit
              </Button>
              {/* goback to step 1 button */}
              <Button variant="faded" onClick={() => setStep(1)}>
                Go back
              </Button>
            </>
          )}
        </Card>
      </div>
      <div>
        <p className="w-full mt-8">
          If you have any questions or need help, please don't hesitate to
          contact us
        </p>
      </div>
    </div>
  );
}

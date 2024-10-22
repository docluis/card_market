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
import { Help } from "@/components/types";
import { title } from "@/components/primitives";

export default function HelpPage() {
  const [step, setStep] = useState(1);

  const emptyHelp: Help = {
    message: "",
    email: "",
    name: "",
  };
  const [help, setHelp] = useState<Help>(emptyHelp);

  const handleNext = () => {
    if (help.message.trim()) {
      setStep(2);
    }
  };

  const handleSubmit = () => {
    // TODO: send help request
    console.log({ help });
    setHelp(emptyHelp);
    setStep(1);
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
                value={help.message}
                onChange={(e) => setHelp({ ...help, message: e.target.value })}
                fullWidth
                className="mb-4"
                minRows={7}
              />
              <Button onClick={handleNext} disabled={!help.message.trim()}>
                Next
              </Button>
            </>
          ) : (
            <>
              <Input
                label="Name"
                placeholder="Enter your name"
                value={help.name}
                onChange={(e) => setHelp({ ...help, name: e.target.value })}
                fullWidth
                className="mb-4"
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                value={help.email}
                onChange={(e) => setHelp({ ...help, email: e.target.value })}
                fullWidth
                className="mb-4"
                type="email"
              />
              <Button
                onClick={handleSubmit}
                disabled={!help.name.trim() || !help.email.trim()}
              >
                Submit
              </Button>
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

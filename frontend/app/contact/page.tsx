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
import { Contact } from "@/components/types";

export default function ContactPage() {
  const emptyContact: Contact = {
    full_name: "",
    phone_number: "",
    email: "",
    message: "",
  };
  const [localUser, setLocalUser] = useState<Contact>(emptyContact);

  const handleSubmitContactForm = () => {
    // does nothing
    console.log("submitting contact form... TODO!");
  };

  return (
    <div className="flex flex-col items-center">
      <div className=" flex items-center justify-center">
        {/* user info */}
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <h1 className="text-2xl">Contact - WIP!</h1>
          </CardHeader>
          <CardBody className="flex flex-row gap-2">
            <div className="flex flex-col gap-5 ">
              <Input
                label="Full name"
                value={localUser?.full_name}
                onChange={(e) =>
                  setLocalUser({ ...localUser, full_name: e.target.value })
                }
                required
              />
              <Input
                label="Phone number"
                value={localUser.phone_number}
                onChange={(e) =>
                  setLocalUser({ ...localUser, phone_number: e.target.value })
                }
                required
              />
              <Input
                label="Email"
                value={localUser.email}
                onChange={(e) =>
                  setLocalUser({ ...localUser, email: e.target.value })
                }
                required
              />
              <Textarea
                label="Message"
                value={localUser.message}
                onChange={(e) =>
                  setLocalUser({ ...localUser, message: e.target.value })
                }
                required
              />
            </div>
          </CardBody>
          <CardFooter className="flex justify-center gap-2">
            <Button onClick={handleSubmitContactForm}>Submit</Button>
          </CardFooter>
        </Card>
      </div>
      <div>
      <p className="w-full mt-8">
        Dear user, this page is under construction, thus the form may not work
        as expected.
      </p>
      </div>
    </div>
  );
}

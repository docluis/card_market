"use client";

import { title } from "@/components/primitives";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import useStore from "@/stores/useStore";
import { useEffect, useState } from "react";
import { User } from "@/components/types";

export default function ProfilePage() {
  const router = useRouter();
  const setStoreUsername = useStore((state: any) => state.setUsername);
  const [localUser, setLocalUser] = useState<User | null>(null);

  const handleLogout = () => {
    fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      console.log("Logout successful");
      setStoreUsername("");
      router.push("/");
    });
  };

  const handleUpdateProfile = () => {
    fetch("/api/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      // send body as user: localUser
      body: JSON.stringify({ user: localUser }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Update failed");
        }
      })
      .then((data) => {
        console.log("Update successful:", data);
        router.push("/profile");
      })
      .catch((error) => {
        console.error("Update error:", error);
      });
  };

  useEffect(() => {
    // fetch /api/me
    fetch("/api/me")
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("User not found");
        }
      })
      .then((data) => {
        console.log("User found:", data);
        setLocalUser(data.user);
        setStoreUsername(data.user.username);
      })
      .catch((error) => {
        console.error("User error:", error);
        router.push("/login");
      });
  }, []);

  return (
    <div className="flex items-center justify-center ">
      {/* user info */}
      {localUser && (
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <h1 className="text-2xl">Profile</h1>
          </CardHeader>
          <CardBody className="flex flex-row gap-2">
            <div className="flex flex-col gap-5">
              <Input label="Username" value={localUser?.username} disabled />
              <Input label="Email" value={localUser?.email} disabled />
            </div>
            <div className="flex flex-col gap-5 ">
              <Input
                label="Full name"
                value={localUser.full_name}
                onChange={(e) =>
                  setLocalUser({ ...localUser, full_name: e.target.value })
                }
              />
              <Input
                label="Street"
                value={localUser.address_street}
                onChange={(e) =>
                  setLocalUser({ ...localUser, address_street: e.target.value })
                }
              />
              <Input
                label="Number"
                value={localUser.address_number}
                onChange={(e) =>
                  setLocalUser({ ...localUser, address_number: e.target.value })
                }
              />
              <Input
                label="Extra"
                value={localUser.address_extra}
                onChange={(e) =>
                  setLocalUser({ ...localUser, address_extra: e.target.value })
                }
              />
              <Input
                label="Zip"
                value={localUser.address_zip}
                onChange={(e) =>
                  setLocalUser({ ...localUser, address_zip: e.target.value })
                }
              />
              <Input
                label="City"
                value={localUser.address_city}
                onChange={(e) =>
                  setLocalUser({ ...localUser, address_city: e.target.value })
                }
              />
              <Input
                label="Country"
                value={localUser.address_country}
                onChange={(e) =>
                  setLocalUser({
                    ...localUser,
                    address_country: e.target.value,
                  })
                }
              />
            </div>
          </CardBody>
          <CardFooter className="flex justify-center gap-2">
            <Button onClick={handleUpdateProfile}>Update</Button>
            <Button onClick={handleLogout}>Logout</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}

"use client";
import { title } from "@/components/primitives";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  Button,
  Badge,
  Spacer,
  Image,
  Skeleton,
} from "@nextui-org/react";
// import {Spacer} from "@nextui-org/spacer";

// Define the Card type to represent the structure of the card data
type Card = {
  title: string;
  info: string;
  price: number;
  imageURL: string;
};

export default function CardPage() {
  const [card, setCard] = useState<Card | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      fetch(`/api/cards/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setCard(data.card);
          setIsLoaded(true);
          console.log("card");
        })
        .catch((error) => console.error("Error fetching card data:", error));
    }
  }, [id]);

  return (
    <div className="flex flex-col gap-3">
      <Card className="w-[300px] space-y-5 p-4" radius="lg">
        <Skeleton isLoaded={isLoaded} className="w-full h-[400px] rounded-lg">
          <Image
            src={card?.imageURL}
            alt={card?.title}
            width={300}
            height={400}
            className="rounded-lg"
          />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
            <h3 className="text-lg font-semibold">{card?.title}</h3>
          </Skeleton>
          <Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
            <p className="text-sm text-secondary-500">{card?.info}</p>
          </Skeleton>
          <Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg">
            <p className="text-lg text-secondary-500">${card?.price}</p>
          </Skeleton>
        </div>
      </Card>
    </div>
  );
}

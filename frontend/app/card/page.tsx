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
import { Card as CardType } from "@/components/types";

export default function CardPage() {
  const [card, setCard] = useState<CardType | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      fetch(`/api/card/${id}`)
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
    <div className="flex flex-row gap-10">
      <Card className="w-[300px] space-y-5 p-4" radius="lg">
        <Skeleton isLoaded={isLoaded} className="w-full h-full rounded-lg">
          <Image
            src={card?.imageURL}
            alt={card?.title}
            width={300}
            height={400}
            className="rounded-lg"
          />
        </Skeleton>
      </Card>
      <div className="flex flex-col gap-3 w-[400px]">
        <Skeleton isLoaded={isLoaded} className="w-3/5 h-[32px] rounded-lg">
          <h3 className="text-lg font-semibold">{card?.title}</h3>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} className="w-3/5 h-[64px] rounded-lg">
          <p className="text-sm text-secondary-500">{card?.info}</p>
        </Skeleton>
        <div className="flex flex-row gap-3">
          <Skeleton isLoaded={isLoaded} className="w-1/5 rounded-lg">
            <p className="text-lg text-secondary-500">${card?.price}</p>
          </Skeleton>
          <Button>Buy now</Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

import { useRouter } from "next/navigation";
import { Card as CardType } from "@/components/types";

export const CardGrid = ({ cards: cards }: { cards: CardType[] }) => {
    const router = useRouter();
    const handleCardPress = (id: number) => {
        router.push(`/card?id=${id}`);
      };
    
    return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((item, index) => (
          <Card
            shadow="sm"
            key={index}
            isPressable
            onPress={() => handleCardPress(item.id)}
          >
            <CardBody className="overflow-visible p-0">
              <Image
                shadow="sm"
                radius="lg"
                width="100%"
                alt={item.title}
                className="w-full object-cover h-[200px]"
                src={item.imageURL}
              />
            </CardBody>
            <CardFooter className="text-small justify-between">
              <b>{item.title}</b>
              <p className="text-default-500">{item.price}€</p>
            </CardFooter>
          </Card>
        ))}
      </div>);

}
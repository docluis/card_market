"use client";
import { title } from "@/components/primitives";
import { use, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  Button,
  Badge,
  Spacer,
  Image,
  Skeleton,
  Input,
} from "@nextui-org/react";
import { Card as CardType } from "@/components/types";
import { SearchIcon } from "@/components/icons";
import { CardGrid } from "@/components/card_grid";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const [cards, setCards] = useState<CardType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch cards for search term
  useEffect(() => {
    if (searchTerm !== "") {
      fetch(`/api/search/${searchTerm}/8`)
        .then((response) => response.json())
        .then((data) => {
          setCards(data.cards);
          setIsLoaded(true);
        })
        .catch((error) => console.error("Error fetching card data:", error));
    } else {
      fetch(`/api/cards/1/8`)
        .then((response) => response.json())
        .then((data) => {
          setCards(data.cards);
          setIsLoaded(true);
        })
        .catch((error) => console.error("Error fetching card data:", error));
    }
  }, [searchTerm]);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Search our&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>vast&nbsp;</h1>
        <br />
        <h1 className={title()}>collection of cards!</h1>
      </div>
      <div className="inline-block max-w-lg text-center justify-center">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          labelPlacement="outside"
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
        />
      </div>

      {/* display the cards */}
      <CardGrid cards={cards} />

      <div className="mt-8"></div>
    </section>
  );
}

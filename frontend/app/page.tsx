"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { useState, useEffect, use } from "react";

import { CardGrid } from "@/components/card_grid";

import { Card as CardType } from "@/components/types";
import { SearchIcon } from "@/components/icons";
import { Input } from "@nextui-org/input";
import { useRouter } from "next/navigation";
import { Spacer } from "@nextui-org/react";

export default function Home() {
  const [cards, setCards] = useState<CardType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search?s=${searchTerm}`);
    }
  };

  useEffect(() => {
    fetch("/api/cards/1/4")
      .then((res) => res.json())
      .then((data) => {
        setCards(data.cards);
      });
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Buy&nbsp;</h1>
        <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
        <br />
        <h1 className={title()}>playing cards for every game!</h1>
      </div>

      {/* <div className="inline-block max-w-lg text-center justify-center">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          // when pressing enter, search for the term
          onKeyDown={handleSearch}
          labelPlacement="outside"
          startContent={
            <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
          }
          type="search"
        />
      </div> */}

      <Spacer y={10} />

      {/* display the cards */}
      <CardGrid cards={cards} />

      <div className="mt-8"></div>
    </section>
  );
}

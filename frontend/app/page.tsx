"use client";

import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { useState, useEffect, use } from "react";

export default function Home() {
  // interface for the cards
  interface Card {
    title: string;
    info: string;
    price: number;
  }

  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    fetch("/api/cards")
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
        <h1 className={title()}>playing cards for every game!!</h1>
      </div>

      {/* display the cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <div key={index} className="bg-default-100 rounded-lg p-4 shadow-lg">
            <h2 className="text-lg font-semibold">{card.title}</h2>
            <p className="text-default-500">{card.info}</p>
            <p className="text-lg font-semibold mt-2">${card.price}</p>
          </div>
        ))}
      </div>

      <div className="mt-8"></div>
    </section>
  );
}

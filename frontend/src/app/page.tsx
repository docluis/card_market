"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

interface Card {
  title: string;
  info: string;
  price: number;
}

export default function Home() {
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch("/api/cards");
        const data = await response.json();
        setCards(data.cards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    }

    fetchCards();
  }, []);

  return (
    <main className={styles.main}>
      {/* Navigation Bar */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          <div className={styles.logo}>CardMarket</div>
          <ul className={styles.navLinks}>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
          </ul>
          <div className={styles.authButtons}>
            <button className={styles.loginButton}>Log In</button>
            <button className={styles.registerButton}>Register</button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className={styles.header}>
        <h1>Welcome to the Card Market</h1>
        <p>Your one-stop shop for trading cards!</p>
        <p>
          Explore our wide variety of cards and find the perfect addition to
          your collection.
        </p>
      </div>

      {/* Card Display */}
      <div className={styles.cardContainer}>
        {cards.map((card, index) => (
          <div key={index} className={styles.card}>
            <h2>{card.title}</h2>
            <p>{card.info}</p>
            <p className={styles.price}>Price: ${card.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

import { title } from "@/components/primitives";

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>About</h1>
      <p>
        Welcome to the ultimate destination for trading card enthusiasts!
        Whether you're a seasoned collector or just starting your journey, our
        platform offers a vibrant space to discover, trade, and celebrate rare
        cards from all over the world.
      </p>
      <p>
        Built with passion and powered by Next.js and NextUI, we aim to bring
        you a seamless and dynamic experience, where every card tells a story,
        and every collection has its place.
      </p>
      <p>
        Join our growing community, explore new decks, and find your next
        favorite card today!
      </p>
    </div>
  );
}

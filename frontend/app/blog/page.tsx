"use client";

import { title } from "@/components/primitives";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

export default function BlogPage() {
  return (
    <div>
      <h1 className={title()}>Blog</h1>

      <div
        style={{
          display: "grid",
          gridGap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          marginTop: "2rem",
        }}
      >
        <Card>
          <CardHeader>
             <h3 className="font-bold text-lg text-green-600">Latest Market Trends</h3>
          </CardHeader>
          <CardBody>
            <p>
              Stay updated with the newest trends in the trading card market,
              from rare card spikes to fresh collections worth exploring.
            </p>
          </CardBody>
          <CardFooter>
            <p>...</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
             <h3 className="font-bold text-lg text-green-600">Collector Tips & Tricks</h3>
          </CardHeader>
          <CardBody>
            <p>
              Discover insider tips on how to build, manage, and protect your
              trading card collection like a pro.
            </p>
          </CardBody>
          <CardFooter>
            <p>...</p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
             <h3 className="font-bold text-lg text-green-600">Spotlight on Rare Finds</h3>
          </CardHeader>
          <CardBody>
            <p>
              Dive deep into the stories behind some of the rarest and most
              sought-after cards in the world.
            </p>
          </CardBody>
          <CardFooter>
            <p>...</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

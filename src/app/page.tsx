"use client";

import { useState, useEffect } from "react";
import { forgeMoves } from "@/utils/forgeMoves";
import Image from "next/image";
import Title from "./title";

const negMoves = [-3, -6, -9, -15];
const moves = [2, 7, 13, 16];

const imageMap: { [key: string]: string } = {
  "-15": "/assets/draw.png",
  "-9": "/assets/heavy-hit.png",
  "-6": "/assets/medium-hit.png",
  "-3": "/assets/light-hit.png",
  "2": "/assets/punch.png",
  "7": "/assets/bend.png",
  "13": "/assets/upset.png",
  "16": "/assets/shrink.png",
};

export default function Home() {
  const [lastAction, setLastAction] = useState<number[]>([0, 0, 0]);
  const [action, setAction] = useState<number[]>([]);

  const addLast = (action: number) => {
    setLastAction((lastAction) => {
      if (lastAction.length < 3) {
        return [...lastAction, action];
      } else {
        return [action, ...lastAction.slice(0, 2)];
      }
    });
  };

  useEffect(() => {
    setAction(forgeMoves(lastAction.reduce((a, b) => a + b, 0)));
  }, [lastAction]);

  return (
    <div>
      <Title />
      <div className="flex flex-col gap-16 items-center rounded-md border border-solid border-gray-600 p-8 bg-gray-900">
        <div className="flex gap-4 flex-nowrap">
          {lastAction.map((action, index) => (
            <div
              key={index}
              className="rounded-md border border-solid border-gray-600 bg-gray-800 w-14 h-14 flex-center"
            >
              <Image
                width={48}
                height={48}
                src={imageMap[action]}
                alt={imageMap[action]}
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-12">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {negMoves.map((action) => (
              <button
                key={`anvilAction${action}`}
                className="btn bg-action-red"
                onClick={() => addLast(action)}
              >
                <Image
                  width={48}
                  height={48}
                  src={imageMap[action]}
                  alt={imageMap[action]}
                />
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            {moves.map((action) => (
              <button
                key={`anvilAction${action}`}
                className="btn bg-action-green"
                onClick={() => addLast(action)}
              >
                <Image
                  width={48}
                  height={48}
                  src={imageMap[action]}
                  alt={imageMap[action]}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <div className="flex items-center gap-2">
            {action.map((action, index) => (
              <>
                <Image
                  key={index}
                  width={32}
                  height={32}
                  src={imageMap[action]}
                  alt={imageMap[action]}
                />
                <span>{">"}</span>
              </>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-md border border-solid border-gray-600 bg-gray-800 p-2">
            {lastAction.map((action, index) => (
              <>
                <Image
                  key={index}
                  width={32}
                  height={32}
                  src={imageMap[action]}
                  alt={imageMap[action]}
                />
                {index != lastAction.length - 1 && <span>{">"}</span>}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

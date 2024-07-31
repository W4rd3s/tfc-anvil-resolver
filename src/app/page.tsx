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
  const [lastAction, setLastAction] = useState<number[]>([]);
  const [action, setAction] = useState<number[]>([]);

  const addLast = (action: number) => {
    setLastAction((lastAction) => {
      return [action, ...lastAction.slice(0, 2)];
    });
  };

  useEffect(() => {
    setAction(forgeMoves(lastAction.reduce((a, b) => a + b, 0)));
  }, [lastAction]);

  // lastAction display
  const lastActionDiv: JSX.Element[] = [];
  for (let i = 0; i < 3; i++) {
    lastActionDiv.push(
      <div
        key={i}
        className="rounded-md border border-solid border-gray-600 bg-gray-800 w-14 h-14 flex-center"
      >
        {!!lastAction[i] && (
          <Image
            width={48}
            height={48}
            src={imageMap[lastAction[i]]}
            alt={imageMap[lastAction[i]]}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <Title />
      <div className="flex flex-col gap-16 items-center rounded-md border border-solid border-gray-600 p-8 bg-gray-900">
        {/* Last Action */}
        <div className="flex gap-4 flex-nowrap">{lastActionDiv}</div>

        {/* Buttons */}
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

        {/* Action list */}
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
          {lastAction.length > 0 && (
            <div className="flex items-center gap-2 rounded-md border border-solid border-gray-600 bg-gray-800 p-2">
              {lastAction.toReversed().map((action, index) => (
                <>
                  {!!action && (
                    <Image
                      width={48}
                      height={48}
                      src={imageMap[action]}
                      alt={imageMap[action]}
                    />
                  )}
                  {index != lastAction.length - 1 && <span>{">"}</span>}
                </>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Reset button */}
      <div>
        <button
          className="btn rounded-md border border-solid border-gray-600 bg-gray-900 p-2"
          onClick={() => setLastAction([])}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

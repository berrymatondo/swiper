"use client";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import Image from "next/image";
import eva from "../public/eva.png";

const BulleInfo = () => {
  const [close, setClose] = useState(false);
  const router = useRouter();
  return (
    <div>
      {!close && (
        <div
          onClick={() =>
            router.push("https://www.youtube.com/watch?v=dpULmVf87DM")
          }
          className="hover:cursor-pointer py-4 px-2 rounded-xl absolute top-2 left-2 w-[175px] h-[200px] hover:bg-sky-800/90 bg-sky-900/90 z-20"
        >
          <p className="flex justify-end">
            <MdClose className="" size={25} onClick={() => setClose(!close)} />
          </p>
          <div className="flex flex-col">
            <Badge className="flex flex-col my-2 bg-sky-600">
              Revoir le Culte du
              <span className="text-yellow-400 font-semibold text-sm">
                10/11/2024
              </span>
            </Badge>
            <div className="flex">
              <p className="text-center font-medium text-xs">
                {"NE TE LAISSE PAS LIMITER PAR TON STYLE DE VIE IM(PARFAIT) ! "}
              </p>
              <div className="w-28">
                <Image
                  onClick={() => router.push("/")}
                  alt="home"
                  src={eva}
                  quality={100}
                  className=" rounded-full"
                />
              </div>
            </div>
            <p className="text-center mt-2 text-xs  font-medium text-yellow-500">
              Pst Eva Saboukoulou
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulleInfo;

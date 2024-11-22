"use client";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";
import Image from "next/image";
import eva from "../public/pstchristian.png";
import Link from "next/link";

const BulleInfo = () => {
  const [close, setClose] = useState(false);
  const [close2, setClose2] = useState(false);
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 absolute top-2 left-2">
      {!close && (
        <div className=" p-2 rounded-xl  w-[175px] h-[200px]  bg-sky-900/90 z-20">
          <div className="flex  justify-end">
            <MdClose
              className="hover:text-red-600"
              size={25}
              onClick={() => setClose(!close)}
            />
          </div>
          <div
            className="flex flex-col mt-2  hover:cursor-pointer hover:bg-sky-800/90"
            onClick={() =>
              //router.push("https://www.youtube.com/watch?v=dpULmVf87DM")
              window.open("https://www.youtube.com/watch?v=dpULmVf87DM")
            }
          >
            <Badge className="flex flex-col  bg-sky-600">
              Revoir le Culte du
              <span className="text-yellow-400 font-semibold text-sm">
                17/11/2024
              </span>
            </Badge>
            <div className="flex mt-2">
              <p className="text-center font-medium text-xs">
                {
                  "PROFESSION GAGNEURS D'ÂMES: TU DOIS ACCUMULER DE L'EXPÉRIENCE"
                }
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
              Pst Christian Saboukoulou
            </p>
          </div>
        </div>
      )}

      {!close2 && (
        <div className=" p-2 rounded-xl  w-[175px] max-h-[200px]  bg-sky-900/90 z-20">
          <div className="flex  justify-end">
            <MdClose
              className="hover:text-red-600"
              size={25}
              onClick={() => setClose2(!close2)}
            />
          </div>
          <div className="flex flex-col mt-2  hover:cursor-pointer ">
            <Badge className="flex flex-col  bg-sky-600">
              <Link
                className="flex flex-col items-center"
                target="_blank"
                href="./tmp/ICC_MON_EGLISE_20241117.pdf"
              >
                <p>ICC Mon Eglise</p>
                <span className="text-yellow-400 font-semibold text-sm">
                  17/11/2024
                </span>
              </Link>
            </Badge>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulleInfo;

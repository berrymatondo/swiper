"use client";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { Badge } from "./ui/badge";

const BulleInfo = () => {
  const [close, setClose] = useState(false);
  return (
    <div>
      {!close && (
        <div className="py-4 px-2 rounded-xl absolute top-2 left-2 w-[175px] h-[200px] bg-sky-900/90 z-20">
          <p className="flex justify-end">
            <MdClose className="" size={25} onClick={() => setClose(!close)} />
          </p>
          <div className="flex flex-col">
            <Badge className="flex flex-col my-2 bg-sky-600">
              Veillée de prière{" "}
              <span className="text-yellow-400 font-semibold text-sm">
                08/11/2024
              </span>
            </Badge>
            <p className="font-medium text-xs">
              Veillée de lancement des cellules de maison
            </p>
            <p className="mt-2 text-xs  font-medium text-yellow-500">
              Bloquez dans vos agendas !
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulleInfo;

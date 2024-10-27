"use client";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { Badge } from "./ui/badge";

const BulleInfo = () => {
  const [close, setClose] = useState(false);
  return (
    <div>
      {!close && (
        <div className="p-4 rounded-xl absolute top-2 left-2 w-[200px] h-[200px] bg-sky-900/90 z-20">
          <p className="flex justify-end">
            <MdClose className="" size={25} onClick={() => setClose(!close)} />
          </p>
          <Badge className="flex flex-col my-2 bg-sky-600">
            Veillée de prière{" "}
            <span className="text-yellow-400 font-semibold text-sm">
              08/11/2024
            </span>
          </Badge>
          <p className="font-medium">
            Veillée de lancement des cellules de maison
          </p>
          <p className="text-center font-medium text-yellow-500">
            Bloquez dans vos agendas !
          </p>
        </div>
      )}
    </div>
  );
};

export default BulleInfo;

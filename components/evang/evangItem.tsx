"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BiEditAlt } from "react-icons/bi";

import { Button } from "../ui/button";
import {
  MdEditDocument,
  MdOutlineDeleteForever,
  MdPeople,
} from "react-icons/md";
import { Badge } from "../ui/badge";
import { Evang } from "@prisma/client";

type EvangItemProps = {
  evang: any;
  usr: any;
};

const EvangItem = ({ evang, usr }: EvangItemProps) => {
  const router = useRouter();

  // console.log("meeting: ", meeting);

  return (
    <div
      key={evang.id}
      // className="shadow-xl rounded-lg my-2 bg-gradient-to-r from-slate-200 to-transparent hover:bg-slate-300 hover:cursor-pointer"
      className="mb-2 py-2 gap-2 flex justify-between shadow-md rounded-lg bg-gradient-to-r from-blue-100 to-transparent hover:cursor-pointer"
    >
      <div
        // onClick={() => router.push(`/zones/${zone.id}`)}
        className=" grid grid-cols-4  w-2/3"
      >
        <div className="gap-2 rounded-lg col-span-1  max-md:col-span-2 bg-gradient-to-r from-blue-50 to-transparent flex   justify-center items-center">
          <MdEditDocument size={20} className="text-sky-600" />
          <p className="text-md font-semibold max-md:text-xs ">
            {evang.date.split("-").reverse().join("-")}
          </p>
        </div>
        <div className="relative col-span-3  max-md:col-span-2 flex justify-end gap-2 items-end my-2 ml-2 ">
          <Badge className="flex gap-2 bg-sky-800 md:hidden">
            {" "}
            <MdPeople />{" "}
            <span className="text-yellow-200 text-sm max-md:text-xs">
              {+evang?.nGag}
            </span>
          </Badge>

          <div className=" max-md:hidden">
            <Badge className="flex justify-center gap-2 bg-sky-800">
              {" Ames gagnées: "}

              <span className="text-md">{+evang?.nGag}</span>
            </Badge>
          </div>
        </div>
      </div>

      <div className="md:hidden flex justify-between gap-4 items-center mx-4 ">
        {usr?.role == "ADMIN" && (
          <MdOutlineDeleteForever
            className="text-red-400"
            onClick={() =>
              router.push(
                `/admin/evangs/delete/${evang.id}?date=${evang.date}&name=${evang.cellule.name}&celluleId=${evang.celluleId}&evangId=${evang.id}&zoneId=${evang.zoneId}`
              )
            }
            size={20}
          />
        )}
        <BiEditAlt
          onClick={() =>
            router.push(
              `/admin/evangs/${evang.id}/update/?evangId=${evang.id}&celluleId=${evang.celluleId}&zoneId=${evang.zoneId}`
            )
          }
          className="text-gray-600"
          size={20}
        />
      </div>

      <div className="flex justify-between gap-4 items-center mx-4 max-md:hidden">
        {usr?.role == "ADMIN" && (
          <Button
            className=" text-red-400"
            variant="secondary"
            onClick={() =>
              router.push(
                `/admin/evangs/delete/${evang.id}?date=${evang.date}&name=${evang.cellule.name}&celluleId=${evang.celluleId}&evangId=${evang.id}&zoneId=${evang.zoneId}`
              )
            }
          >
            Supprimer
          </Button>
        )}
        <Button
          className=""
          onClick={() =>
            router.push(
              `/admin/evangs/${evang.id}/update/?evangId=${evang.id}&celluleId=${evang.celluleId}&zoneId=${evang.zoneId}`
            )
          }
        >
          Modifier
        </Button>
      </div>
    </div>
  );
};

export default EvangItem;

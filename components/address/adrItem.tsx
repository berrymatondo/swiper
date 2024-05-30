"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { RiMapPinFill } from "react-icons/ri";
import { BiEditAlt, BiMap } from "react-icons/bi";

import { Button } from "../ui/button";
import { MdOutlineDeleteForever } from "react-icons/md";

type AdrItemProps = {
  adr: any;
};

const AdrItem = ({ adr }: AdrItemProps) => {
  const router = useRouter();

  console.log("ADR Item:", adr);

  return (
    <div
      key={adr.id}
      // className="shadow-xl rounded-lg my-2 bg-gradient-to-r from-slate-200 to-transparent hover:bg-slate-300 hover:cursor-pointer"
      className="gap-2 flex justify-between shadow-md rounded-lg mb-2 bg-white hover:cursor-pointer"
    >
      <div onClick={() => router.push(`/addresses/${adr.id}`)} className="">
        {/*         <div className="rounded-lg col-span-1  bg-gradient-to-r from-gray-300 to-transparent flex flex-col  justify-center items-center">
          <RiMapPinFill size={30} className="text-orange-400" />
        </div> */}
        <div className="relative col-span-2 flex flex-col items-start my-2 ml-2 ">
          {/*           <p className="text-md font-semibold ">{adr.street}</p>
           */}{" "}
          <div className="flex  items-start gap-2  ">
            <div className="flex max-lg:flex-col lg:gap-2 items-start max-md:text-xs">
              <p>
                {adr.street}, {adr.number} {adr.box}
              </p>
              <p className="">
                {adr.postalCode} {adr.municipality}
              </p>
              <p className="text-semibold">{adr.cellule.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex justify-between gap-4 items-center mx-4 ">
        <MdOutlineDeleteForever
          className="text-red-400"
          onClick={() => router.push(`/admin/addresses/delete/${adr.id}`)}
          size={30}
        />

        <BiEditAlt
          onClick={() => router.push(`/admin/addresses/update/${adr.id}`)}
          className="text-gray-600"
          size={30}
        />
      </div>

      <div className="flex justify-between gap-4 items-center mx-4 max-md:hidden">
        <Button
          className=" text-red-400"
          variant="secondary"
          onClick={() => router.push(`/admin/addresses/delete/${adr.id}`)}
        >
          Supprimer
        </Button>
        <Button
          className=""
          onClick={() => router.push(`/admin/addresses/update/${adr.id}`)}
        >
          Modifier
        </Button>
      </div>
    </div>
  );
};

export default AdrItem;

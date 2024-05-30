"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { RiMapPinFill } from "react-icons/ri";
import { BiEditAlt, BiMap } from "react-icons/bi";

import { Button } from "../ui/button";
import { MdOutlineDeleteForever } from "react-icons/md";
import Link from "next/link";

type PersonItemProps = {
  per: any;
};

const PersonItem = ({ per }: PersonItemProps) => {
  const router = useRouter();

  console.log("PER", per);

  return (
    <div
      key={per.id}
      // className="shadow-xl rounded-lg my-2 bg-gradient-to-r from-slate-200 to-transparent hover:bg-slate-300 hover:cursor-pointer"
      className="gap-2 flex justify-between shadow-md rounded-lg m-2 bg-white hover:cursor-pointer"
    >
      <div className=" grid grid-cols-3 ">
        {/*         <div className="rounded-lg col-span-1  bg-gradient-to-r from-gray-300 to-transparent flex flex-col  justify-center items-center">
          <RiMapPinFill size={30} className="text-orange-400" />
        </div> */}
        <div className="relative col-span-2 flex flex-col items-start my-2 ml-2 ">
          <p
            onClick={() => router.push(`/members/${per.id}`)}
            className="text-xs  "
          >
            {per.firstname}
          </p>
          <p
            onClick={() => router.push(`/members/${per.id}`)}
            className="text-sm font-semibold "
          >
            {per.lastname}
          </p>
          <div className="flex items-center gap-2">
            <Link
              href={`/cellules/${per.celluleId}`}
              className="text-sm font-semibold text-blue-800"
            >
              {per?.cellule?.name}
            </Link>
            {per?.isPilote && <span>(pilote)</span>}
          </div>
          <div className="flex  items-start gap-2  ">
            {/*             <div className="flex max-md:flex-col md:gap-2 items-start">
              <p>Rue Frans Hals, 152</p>
              <p className="">1080 Koekelberg</p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="md:hidden flex justify-between gap-4 items-center mx-4 ">
        <MdOutlineDeleteForever
          className="text-red-400"
          onClick={() => router.push(`/admin/members/delete/${per.id}`)}
          size={30}
        />

        <BiEditAlt
          onClick={() => router.push(`/admin/members/update/${per.id}`)}
          className="text-gray-600"
          size={30}
        />
      </div>

      <div className="flex justify-between gap-4 items-center mx-4 max-md:hidden">
        <Button
          className=" text-red-400"
          variant="secondary"
          onClick={() => router.push(`/admin/members/delete/${per.id}`)}
        >
          Supprimer
        </Button>
        <Button
          className=""
          onClick={() => router.push(`/admin/members/update/${per.id}`)}
        >
          Modifier
        </Button>
      </div>
    </div>
  );
};

export default PersonItem;

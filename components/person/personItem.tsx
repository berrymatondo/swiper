"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { RiMapPinFill, RiUserReceived2Line } from "react-icons/ri";
import { BiEditAlt, BiMap } from "react-icons/bi";

import { Button } from "../ui/button";
import {
  MdEmail,
  MdHome,
  MdOutlineDeleteForever,
  MdPerson,
  MdPhone,
} from "react-icons/md";
import { GrUserPolice } from "react-icons/gr";

import Link from "next/link";
import { Badge } from "../ui/badge";
import { GiPoliceOfficerHead } from "react-icons/gi";

type PersonItemProps = {
  per: any;
};

const PersonItem = ({ per }: PersonItemProps) => {
  const router = useRouter();

  // console.log("PER", per);

  return (
    <div
      key={per.id}
      // className="shadow-xl rounded-lg my-2 bg-gradient-to-r from-slate-200 to-transparent hover:bg-slate-300 hover:cursor-pointer"
      className="border gap-2 flex max-md:flex-col justify-between shadow-md rounded-lg m-2 bg-white hover:cursor-pointer"
    >
      <div className=" grid grid-cols-3 w-full">
        {/*         <div className="rounded-lg col-span-1  bg-gradient-to-r from-gray-300 to-transparent flex flex-col  justify-center items-center">
          <RiMapPinFill size={30} className="text-orange-400" />
        </div> */}
        <div className="w-full relative col-span-3 flex flex-col items-start my-2 ml-2 gap-2">
          <div className="flex items-end gap-2">
            <MdPerson size={25} />
            <p
              onClick={() => router.push(`/members/${per.id}`)}
              className="text-sm  "
            >
              {per.firstname}
            </p>

            <p
              onClick={() => router.push(`/members/${per.id}`)}
              className="text-sm font-semibold "
            >
              {per.lastname}
            </p>
          </div>
          <p
            onClick={() => router.push(`/members/${per.id}`)}
            className="p-1 text-sm flex items-end gap-2"
          >
            <MdPhone size={20} /> {per.mobile}
          </p>
          <p className="text-sm flex items-end gap-2 p-1">
            <MdEmail size={20} /> {per.email}
          </p>
          <div className="flex justify-between items-end  w-full">
            <div className="flex items-center gap-2 my-2">
              <Link
                href={`/cellules/${per.celluleId}`}
                className="text-sm font-semibold text-blue-800"
              >
                <Badge className="bg-sky-500 flex items-end gap-1">
                  <MdHome size={20} /> {per?.cellule?.name}
                </Badge>
              </Link>
              {per?.isPilote && (
                <Badge className="bg-green-500 flex items-end gap-1">
                  <GiPoliceOfficerHead size={20} /> Pilote
                </Badge>
              )}
              {per?.isRespo && (
                <Badge className="bg-teal-700 flex items-end gap-1">
                  <RiUserReceived2Line size={20} /> Hôte
                </Badge>
              )}
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
          <div className="flex  items-start gap-2  ">
            {/*             <div className="flex max-md:flex-col md:gap-2 items-start">
              <p>Rue Frans Hals, 152</p>
              <p className="">1080 Koekelberg</p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="md:hidden flex justify-end gap-4 items-center m-2 ">
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
    </div>
  );
};

export default PersonItem;

"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { BsBuildings } from "react-icons/bs";
import { RiMapPinFill } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";

import ZoneForm from "./zoneForm";
import { Button } from "../ui/button";
import {
  MdAddHome,
  MdAddHomeWork,
  MdBuild,
  MdLocalPhone,
  MdOutlineDeleteForever,
  MdPerson,
} from "react-icons/md";
import { Cellule, Zone } from "@prisma/client";

type ZoneItemProps = {
  zone: any;
};

const ZoneItem = ({ zone }: ZoneItemProps) => {
  const router = useRouter();
  const sta = zone.statut.charAt(0);

  console.log("ZONE:", zone);

  return (
    <div
      key={zone.id}
      // className="shadow-xl rounded-lg my-2 bg-gradient-to-r from-slate-200 to-transparent hover:bg-slate-300 hover:cursor-pointer"
      className="gap-2 flex flex-col justify-between shadow-md rounded-lg m-2 bg-gray-100 hover:cursor-pointer"
    >
      <div
        onClick={() => router.push(`/zones/${zone.id}`)}
        className=" grid grid-cols-3 "
      >
        {/*         <div className="rounded-lg col-span-1  bg-gradient-to-r from-gray-300 to-transparent flex flex-col  justify-center items-center">
          <RiMapPinFill size={30} className="text-orange-400" />
        </div> */}
        <div className="relative col-span-2 flex flex-col items-start my-2 ml-2 ">
          <p className="text-lg text-sky-600 font-semibold flex items-center gap-2">
            {" "}
            <MdAddHomeWork size={20} /> {zone.name}
          </p>
          <p className="text-md flex items-center gap-2">
            {" "}
            <MdAddHome size={20} />{" "}
            <span>
              {zone?.cellules.length}
              {" cellule(s)"}
            </span>
          </p>
          <div className="flex  flex-wrap">
            {zone?.cellules.map((c: Cellule) => (
              <span
                className="text-sm text-sky-700 whitespace-nowrap mr-2"
                key={c.id}
              >
                {c?.name}
              </span>
            ))}
          </div>
          <p className="text-md flex items-center gap-2">
            {" "}
            <MdPerson size={20} /> {zone?.evang?.firstname} (Evangélisation)
          </p>
          <p className="text-md flex items-center gap-2">
            {" "}
            <MdLocalPhone size={20} /> {zone?.evang?.mobile}
          </p>
          <p className="text-md flex items-center gap-2">
            {" "}
            <MdPerson size={20} /> {zone?.respo?.firstname} (Cellules)
          </p>
          <p className="text-md flex items-center gap-2">
            {" "}
            <MdLocalPhone size={20} /> {zone?.respo?.mobile}
          </p>
        </div>
      </div>
      {/*       <div className="md:hidden flex justify-between gap-4 items-center mx-4 ">
        {getStatusMobile(zone, sta)}
        <MdOutlineDeleteForever
          className="text-red-400"
          onClick={() => router.push(`/admin/zones/delete/${zone.id}`)}
          size={30}
        />
        <BiEditAlt
          onClick={() => router.push(`/admin/zones/update/${zone.id}`)}
          className="text-gray-600"
          size={30}
        />
      </div> */}
      <div className="flex justify-between gap-4 items-center p-2 bg-gray-200">
        {/*         {getStatus(zone)}
         */}{" "}
        <Button
          className=" text-red-400"
          variant="secondary"
          onClick={() => router.push(`/admin/zones/delete/${zone.id}`)}
        >
          Supprimer
        </Button>
        <Button
          className=""
          onClick={() => router.push(`/admin/zones/update/${zone.id}`)}
        >
          Modifier
        </Button>
      </div>
    </div>
  );
};

export default ZoneItem;

const getStatus = (zone: any) => {
  return (
    <span
      className={
        zone.statut == "ACTIF"
          ? "bg-green-600  text-white text-xs text-center w-20 p-1 rounded-full ml-1"
          : zone.statut == "SUSPENDU"
          ? "bg-neutral-400 text-white text-xs text-center w-20 p-1 rounded-full ml-1"
          : "bg-red-600 text-white text-xs text-center w-20 p-1 rounded-full ml-1"
      }
    >
      {zone.statut}
    </span>
  );
};

const getStatusMobile = (zone: any, sta: any) => {
  return (
    <span
      className={
        zone.statut == "ACTIF"
          ? "bg-green-600 text-white text-center w-6 rounded-full ml-1"
          : zone.statut == "SUSPENDU"
          ? "bg-neutral-400 text-white text-center w-6 rounded-full ml-1"
          : "bg-red-600 text-white  text-center w-6 rounded-full ml-1"
      }
    >
      {sta}
    </span>
  );
};

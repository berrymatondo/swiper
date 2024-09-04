"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { RiMapPinFill } from "react-icons/ri";
import { BiEditAlt, BiMap } from "react-icons/bi";

import { Button } from "../ui/button";
import { MdOutlineDeleteForever } from "react-icons/md";
import Link from "next/link";
import { FaRegHandPointRight, FaWhatsapp } from "react-icons/fa";
import { Badge } from "../ui/badge";

type CelItemProps = {
  cel: any;
  userSession?: any;
};

const CelItem = ({ cel, userSession }: CelItemProps) => {
  const router = useRouter();
  const sta = cel.statut.charAt(0);
  const role = userSession?.user?.role;
  const name = userSession?.user?.name;

  //console.log("userSession:", role);

  return (
    <div
      key={cel.id}
      // className="shadow-xl rounded-lg my-2 bg-gradient-to-r from-slate-200 to-transparent hover:bg-slate-300 hover:cursor-pointer"
      //  className="w-full bg-gradient-to-l from-orange-300 to-transparent p-2 my-1 mx-autu rounded-md"
      className="hover:bg-orange-300/20 hover:cursor-pointer mb-1 w-full border border-black/30 p-2  mx-auto rounded-md"
    >
      <div className="flex items-start justify-between gap-2 w-full  ">
        <div className="flex flex-col lg:gap-2 items-start">
          <p className="opacity-70 flex justify-between  font-semibold text-blue-900 w-full ">
            {cel.name}
          </p>

          <p className="text-sm font-semibold">
            {/*             {cel?.address?.street as string}, {cel?.address?.number as string}{" "}
             */}{" "}
            {cel?.address?.street as string} {cel?.address?.box as string}
          </p>
          <p className="text-xs">
            {cel?.address?.postalCode as string}{" "}
            {cel?.address?.municipality as string}
          </p>
        </div>

        {/*         <Badge
          className="hover:cursor-pointer max-md:text-xs uppercase text-white w-1/3 md:w-2/5 bg-gradient-to-r from-red-800/80 to-orange-500"
          onClick={() => router.push(`/cellules/${cel.id}`)}
        >
          <FaRegHandPointRight size={20} className="mr-2 text-yellow-200" />
          Détails
        </Badge> */}
        <div className="flex flex-col">
          <Badge
            className="hover:cursor-pointer max-md:text-xs uppercase text-white w-full bg-green-600 hover:bg-green-800 p-2"
            onClick={() => router.push(`/cellules/${cel.id}`)}
          >
            {/*             <FaRegHandPointRight size={20} className="mr-2 text-yellow-200" />
             */}{" "}
            <FaWhatsapp size={20} className="mr-2" />
            Rejoindre
          </Badge>
          <span className="text-xs text-center">le groupe WhatsApp</span>
        </div>
      </div>
      {/*       <div className=" max-md:hiddenflex justify-between gap-2 md:gap-4 w-full">
        <Button
          className="max-md:hidden text-xs text-white bg-gradient-to-r from-red-800/80 to-blue-500"
          onClick={() => router.push(`/cellules/${cel.id}`)}
        >
          Contacter la cellule
        </Button>{" "}
      </div> */}
      {userSession && (
        <div className="   flex justify-between items-center ">
          {getStatus(cel)}
          {role && (
            <div className="flex justify-between w-1/3">
              {role == "ADMIN" && (
                <MdOutlineDeleteForever
                  className="text-red-400 bg-white rounded-full p-1"
                  onClick={() =>
                    router.push(`/admin/cellules/delete/${cel.id}`)
                  }
                  size={30}
                />
              )}
              <BiEditAlt
                onClick={() => router.push(`/admin/cellules/update/${cel.id}`)}
                className="bg-blue-800 text-white rounded-full p-1"
                size={30}
              />{" "}
            </div>
          )}
        </div>
      )}

      {/*    <div className="flex flex-col gap-4 justify-center items-center  max-md:hidden">
        <div className="flex justify-end gap-2 w-full">
          <Button
            className=" text-red-400"
            variant="secondary"
            onClick={() => router.push(`/admin/cellules/delete/${cel.id}`)}
          >
            Supprimer
          </Button>
          <Button
            className=""
            onClick={() => router.push(`/admin/cellules/update/${cel.id}`)}
          >
            Modifier
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default CelItem;

const getStatus = (cel: any) => {
  return (
    <span
      className={
        cel.statut == "ACTIF"
          ? "bg-green-600  text-white text-xs text-center w-20 p-2.5 px-2.5 rounded-full ml-1"
          : cel.statut == "SUSPENDU"
          ? "bg-neutral-400 text-white text-xs text-center w-20 p-2.5 px-2.5 rounded-full ml-1"
          : "bg-red-600 text-white text-xs text-center w-20 p-2.5 px-2.5 rounded-full ml-1"
      }
    >
      {cel.statut}
    </span>
  );
};

const getStatusMobile = (cel: any, sta: any) => {
  return (
    <span
      className={
        cel.statut == "ACTIF"
          ? "bg-green-600 text-white text-center w-6 rounded-full ml-1"
          : cel.statut == "SUSPENDU"
          ? "bg-neutral-400 text-white text-center w-6 rounded-full ml-1"
          : "bg-red-600 text-white  text-center w-6 rounded-full ml-1"
      }
    >
      {sta}
    </span>
  );
};

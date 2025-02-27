"use client";
import { Person } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { BiMap } from "react-icons/bi";
import { FaMobileAlt } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { MdCalendarMonth, MdHome } from "react-icons/md";
import CelUpdateBar from "./celUpdateBar";
import { auth } from "@/auth";
import { IoLogoWhatsapp } from "react-icons/io";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { useRouter } from "next/navigation";

type CelCompletProps = {
  cel: any;
  userSession?: any;
};

const CelComplet = ({ cel, userSession }: CelCompletProps) => {
  // const session = await auth();
  const usr = userSession?.user;
  const router = useRouter();
  //console.log("USR ", usr);

  return (
    <div className="w-full bg-red-400">
      <div
        onClick={() => router.push(`/cellules/${cel.id}`)}
        className="p-2 bg-gradient-to-l to-sky-100 from-transparent m-1 border-2 rounded-lg mb-2"
      >
        <div className="flex items-center gap-2 mb-2 ">
          <p className="w-full flex justify-between font-semibold text-blue-800">
            <span className="flex gap-2 items-center ">
              <MdHome size={25} />{" "}
              <strong className="font-normal text-2xl">{cel?.name}</strong>
            </span>
          </p>
          {!cel.grpWhatsApp && (
            <div className="max-md:text-xs text-sm italic">
              Pas de groupe Whatsapp disponible.
              <div>
                Contacter: <strong>0484/82.03.62</strong> ou{" "}
                <strong>0485/80.22.78</strong>
              </div>{" "}
            </div>
          )}
          {cel.grpWhatsApp && (
            <div className="flex flex-col">
              <Badge className="border-green-600 hover:cursor-pointer max-md:text-xs  hover:text-white text-green-600 bg-transparent w-full  hover:bg-green-800 p-1">
                {/*             <FaRegHandPointRight size={20} className="mr-2 text-yellow-200" />
                 */}{" "}
                <IoLogoWhatsapp size={30} className="mr-2" />
                <Link
                  target="_blank"
                  href={cel.grpWhatsApp}
                  className="font-semibold text-lg"
                >
                  Rejoindre
                </Link>
              </Badge>
              {/*             <span className="text-xs text-center mt-1">
                le groupe WhatsApp
              </span> */}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="  rounded-lg text-sky-800 flex items-center max-md:items-start gap-2  ">
            <BiMap size={25} className="text-green-600" />
            <div className="font-semibold flex flex-col  md:gap-2 items-start">
              <p className="">
                {cel?.address?.street as string},{" "}
                {/*                 {cel?.address?.number as string} {cel?.address?.box as string}
                 */}{" "}
              </p>
              <p className="">
                {cel?.address?.postalCode as string}{" "}
                {cel?.address?.municipality as string}
              </p>
            </div>
          </div>

          {/*           <div className="flex justify-between">
            <div className=" flex items-center gap-2 mb-2">
              <MdCalendarMonth size={30} className="text-blue-600" />
              <p>{cel?.days}</p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <GoClock size={30} className="text-teal-600" />
              <p>{cel?.hours}</p>
            </div>
          </div> */}
        </div>

        <div className="flex flex-col items-start mt-2">
          {cel?.persons &&
            cel?.persons
              ?.filter((per: Person) => per.isPilote == true)
              .map((person: Person) => (
                <div
                  className="flex justify-start items-center gap-2"
                  key={person.id}
                >
                  <GiPoliceOfficerHead size={25} className="text-purple-600" />{" "}
                  {/*  {person.mobile}  */}
                  Pilotée par: <strong>{person.firstname}</strong>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default CelComplet;

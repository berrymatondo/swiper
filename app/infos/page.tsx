import PageLayout from "@/components/pageLayout";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { MdAddCircle, MdDirectionsRun } from "react-icons/md";
import { prisma } from "@/lib/prisma";
import { Cellule } from "@prisma/client";
import CelItem from "@/components/cel/celItem";
import SearchCel from "@/components/searchCel";
import PersonItem from "@/components/person/personItem";
import SearchPer from "@/components/searchPer";
import { auth } from "@/auth";
import {
  TbCircleNumber1Filled,
  TbCircleNumber3Filled,
  TbCircleNumber5Filled,
  TbCircleNumber7Filled,
  TbCircleNumber2,
  TbCircleNumber4,
  TbCircleNumber6,
  TbCircleNumber2Filled,
  TbCircleNumber4Filled,
  TbCircleNumber6Filled,
} from "react-icons/tb";

const CellulesPage = async () => {
  return (
    <PageLayout
      title="Informations cellules d'impact"
      description="Voici quelques informations à propos des cellules d'impact"
    >
      <div className="">
        <CustomBreadcrumb name="Informations" />
        <p className="text-orange-600 border mb-8  rounded-bl-full rounded-tr-full m-1 uppercase text-xl max-md:text-sm  text-center p-4 font-bold bg-gradient-to-r to-orange-100 from-white">
          {"7 bonnes raisons d'être membre d'une cellule d'Impact "}
        </p>
        <div className="max-md:text-xs max-md:mx-1 flex flex-col items-start justify-between my-2">
          <p className="text-end flex items-center bg-white p-1 px-2 rounded-bl-3xl rounded-tr-3xl">
            <TbCircleNumber1Filled size={40} className="text-orange-600" />{" "}
            <span> {"Mieux comprendre la parole de Dieu"}</span>
          </p>

          <p className="flex items-center bg-white  p-1 px-2 rounded-bl-3xl rounded-tr-3xl mt-4">
            <TbCircleNumber2Filled size={40} className="text-orange-600" />
            <span> {"Apprendre à prier avec et pourles autres"}</span>
          </p>

          <p className="flex items-center bg-white p-1 px-2 rounded-bl-3xl rounded-tr-3xl mt-4">
            <TbCircleNumber3Filled size={40} className="text-orange-600" />{" "}
            <span> {"Apprendre à évangéliserles voisins"}</span>
          </p>

          <p className="flex items-center bg-white  p-1 px-2 rounded-bl-3xl rounded-tr-3xl mt-4">
            <TbCircleNumber4Filled size={40} className="text-orange-600" />
            <span> {"Apprendre à paître les brebis du Seigneur"}</span>
          </p>

          <p className="flex items-center bg-white p-1 px-2 rounded-bl-3xl rounded-tr-3xl mt-4">
            <TbCircleNumber5Filled size={40} className="text-orange-600" />{" "}
            <span> {"Apprendre à exhorter"}</span>
          </p>

          <p className="flex items-center bg-white  p-1 px-2 rounded-bl-3xl rounded-tr-3xl mt-4">
            <TbCircleNumber6Filled size={40} className="text-orange-600" />
            <span>
              {" "}
              {
                "Contribuer à la croissance de l'église en invitantles voisins à l'église"
              }
            </span>
          </p>

          <p className="flex items-center bg-white p-1 px-2 rounded-bl-3xl rounded-tr-3xl mt-4">
            <TbCircleNumber7Filled size={40} className="text-orange-600" />{" "}
            <span> {"Devenir un véritable disciple de Jésus-Christ"}</span>
          </p>
        </div>
        <Link href="/zones" className=" text-center p-1  mt-8 md:mt-24">
          <div className="m-2 text-lg bg-gradient-to-r from-red-800/80 to-orange-500 text-white py-1 px-20 rounded-full">
            {" "}
            <p className="flex justify-center font-semibold">
              {" "}
              <span className=" text-yellow-400 md:text-lg">
                <MdDirectionsRun size={30} />
              </span>{" "}
              Rejoins vite
            </p>
            <p className="block md:text-lg  font-semibold">
              {" "}
              {" une cellule d'impact !"}
            </p>
          </div>
        </Link>
      </div>
    </PageLayout>
  );
};

export default CellulesPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {/*         <BreadcrumbItem>
          <BreadcrumbLink href="/zones">Zones</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator /> */}
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

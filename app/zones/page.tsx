import PageLayout from "@/components/pageLayout";
import SearchZone from "@/components/searchZone";
import { BsBuildings } from "react-icons/bs";

import React from "react";
import ZoneItem from "@/components/zone/zoneItem";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { MdAddCircle, MdArrowBack } from "react-icons/md";
import { getAllZones } from "@/lib/_zoneActions";
import { log } from "console";
import { Zone } from "@prisma/client";
import Title from "@/components/title";
import { prisma } from "@/lib/prisma";

const ZonesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const skip =
    typeof searchParams.skip === "string" ? Number(searchParams.skip) : 0;
  const take =
    typeof searchParams.take === "string" ? Number(searchParams.take) : 10;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const zoneCount = await prisma.zone.count();

  const zones = await prisma.zone.findMany({
    take: take,
    skip: skip,
    include: {
      cellules: true,
      /*       cellules: {
        include: { persons: true, address: true },
      }, */
      _count: {
        select: { cellules: true },
      },
    },
    where: {
      name: { contains: search as string, mode: "insensitive" },
    },
    orderBy: {
      name: "asc",
    },
  });

  //console.log("zoness", zones);

  /*   const res = await getAllZones();
  const zones = res?.data; */

  //console.log("ZONES:", zones);

  return (
    <PageLayout
      title="Liste des zones d'impact"
      description="La liste de toutes les zones d'impact"
    >
      <div className="">
        <CustomBreadcrumb name="Zones" />
        <div className="flex items-center justify-between m-2">
          <SearchZone search={search} />
          <div className="flex justify-normal gap-2 ">
            {skip == 0 ? null : (
              <Link
                href={{
                  pathname: "/zones",
                  query: {
                    ...(search ? { search } : {}),
                    skip: skip > 0 ? skip - take : 0,
                  },
                }}
              >
                {"Précédent"}
              </Link>
            )}
            {skip + zones.length >= zoneCount ? null : (
              <Link
                href={{
                  pathname: "/zones",
                  query: {
                    ...(search ? { search } : {}),
                    skip: skip + take,
                  },
                }}
              >
                {"Suivant"}
              </Link>
            )}
          </div>
          <Link className="" href="/admin/zones/new">
            <MdAddCircle size={50} className="md:hidden text-blue-800 mr-2" />
            <span className="text-sm font-semibold max-md:hidden  px-4 py-3 rounded-md hover:bg-blue-600 hover:cursor-pointer bg-blue-800 text-white mr-4">
              Nouveau
            </span>
          </Link>
        </div>
        <div className="max-sm:max-h-[600px] overflow-auto xl:grid xl:grid-cols-2  md:gap-3">
          {zones?.map((zone: Zone) => (
            <ZoneItem zone={zone} key={zone.id} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default ZonesPage;

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

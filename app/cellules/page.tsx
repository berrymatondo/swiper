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
import { MdAddCircle } from "react-icons/md";
import { prisma } from "@/lib/prisma";
import { Cellule } from "@prisma/client";
import CelItem from "@/components/cel/celItem";
import SearchCel from "@/components/searchCel";
import Map from "@/components/map/map";
import { auth } from "@/auth";

const CellulesPage = async ({
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

  const celCount = await prisma.cellule.count();

  const cellules = await prisma.cellule.findMany({
    take: take,
    skip: skip,
    include: {
      address: true,
      zone: true,
    },
    where: {
      name: { contains: search as string, mode: "insensitive" },
    },
    orderBy: {
      name: "asc",
    },
  });

  const session = await auth();
  //console.log("Session: ", session);

  return (
    <PageLayout
      title="Liste des cellules d'impact"
      description="La liste de toutes les cellules d'impact"
    >
      <div className="">
        <CustomBreadcrumb name="Cellules" />
        <div className="flex items-center justify-between max-md:m-1 md:mt-2">
          <div className="flex items-center text-xs gap-1">
            <SearchCel search={search} />
            <span className="max-md:hidden ">Ex: Anderlecht</span>
          </div>
          <div className="flex justify-normal gap-2 ">
            {skip == 0 ? null : (
              <Link
                href={{
                  pathname: "/cellules",
                  query: {
                    ...(search ? { search } : {}),
                    skip: skip > 0 ? skip - take : 0,
                  },
                }}
              >
                {"Précédent"}
              </Link>
            )}
            {skip + cellules.length >= celCount ? null : (
              <Link
                href={{
                  pathname: "/cellules",
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
          <Link className="" href="/admin/cellules/new">
            <MdAddCircle size={50} className="md:hidden text-blue-800" />
            <span className="text-sm font-semibold max-md:hidden  px-4 py-3 rounded-full hover:bg-blue-600 hover:cursor-pointer bg-blue-800 text-white ">
              Nouveau
            </span>
          </Link>
        </div>
        <div className="p-1 max-md:flex-col-reverse max-md:flex max-md:justify-center md:grid md:grid-cols-6 ">
          <div className="max-sm:max-h-[600px] grid mx-auto w-full md:col-span-2">
            {cellules?.map((cel: any) => (
              <CelItem userSession={session} cel={cel} key={cel.id} />
            ))}
          </div>

          <div className="md:hidden col-span-3 p-1 max-h-1/2">
            <Map cels={cellules} haut="250px" />
          </div>

          <div className="max-md:hidden col-span-4 p-1 max-h-1/2">
            <Map cels={cellules} />
          </div>
        </div>
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

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
import { Cellule } from "@prisma/client";
import CelItem from "@/components/cel/celItem";
import SearchCel from "@/components/searchCel";
import Map from "@/components/map/map";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import CelDetails from "@/components/cel/celDetails";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllFilterCels } from "@/lib/_celActions";

const CellulesPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const skip =
    typeof searchParams.skip === "string" ? Number(searchParams.skip) : 0;
  const take =
    typeof searchParams.take === "string" ? Number(searchParams.take) : 100;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  // const celCount = await prisma.cellule.count();

  /*   const cels = await prisma.cellule.findMany({
    take: take,
    skip: skip,
    include: {
      address: true,
      zone: true,
      persons: true,
    },
    where: {
      OR: [
        {
          address: {
            postalCode: { contains: search as string, mode: "insensitive" },
          },
        },
        {
          address: {
            street: { contains: search as string, mode: "insensitive" },
          },
        },
        {
          address: {
            municipality: { contains: search as string, mode: "insensitive" },
          },
        },
        {
          address: {
            number: { contains: search as string, mode: "insensitive" },
          },
        },
        {
          address: {
            country: { contains: search as string, mode: "insensitive" },
          },
        },
        { name: { contains: search as string, mode: "insensitive" } },
      ],
    },
    orderBy: {
      name: "asc",
    },
  });
 */
  const res = await getAllFilterCels(search);
  const cels = res?.data;

  const session = await auth();
  const usr: any = session?.user;
  const role = usr?.role;

  let cellules: any;
  if (role != "ADMIN" || role == undefined) {
    cellules = cels?.filter((cl: any) => cl?.statut == "ACTIF");
  } else {
    cellules = cels;
  }

  return (
    <PageLayout
      title="Liste des cellules d'impact"
      description="La liste de toutes les cellules d'impact"
    >
      <div className="">
        <CustomBreadcrumb name="Choisissez une cellule près de chez vous!" />
        <div className="flex items-center justify-start max-md:m-1 md:mt-2">
          <div className="flex items-center text-xs gap-1 md:w-1/2">
            <SearchCel search={search} />
          </div>
          {session && session.user && (
            <div className="flex items-center">
              <Link className="m-2" href="/admin/cellules/new">
                <MdAddCircle size={50} className="md:hidden text-blue-800" />
                <span className="text-sm font-semibold max-md:hidden  px-4 py-3 rounded-full hover:bg-sky-600 hover:cursor-pointer bg-sky-800 text-white ">
                  Nouveau
                </span>
              </Link>

              <Link
                className="italic underline text-sky-600"
                href="/cellules/details"
              >
                {"Liste détaillée"}
              </Link>
            </div>
          )}
        </div>

        <div className="p-1 max-md:flex-col-reverse max-md:flex max-md:justify-center md:grid md:grid-cols-6">
          <div className="max-sm:max-h-[600px] grid mx-auto w-full md:col-span-2">
            <ScrollArea className="h-[600px]  rounded-md border">
              <div>
                {cellules?.map((cel: any) => (
                  <CelDetails userSession={session} cel={cel} key={cel.id} />
                  /*                 <CelItem userSession={session} cel={cel} key={cel.id} />
                   */
                ))}
              </div>
            </ScrollArea>
          </div>

          <div className="md:hidden col-span-4 p-1 max-h-1/2">
            <Map cels={cellules} haut="250px" show={true} />
          </div>

          <div className="max-md:hidden col-span-4 p-1 max-h-1/2">
            <Map cels={cellules} show={true} />
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

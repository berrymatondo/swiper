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
import prisma from "@/lib/prisma";

import AdrItem from "@/components/address/adrItem";
import SearchAdr from "@/components/searchAdr";

const AddressesPage = async ({
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

  const adrCount = await prisma.address.count();

  const addresses = await prisma.address.findMany({
    take: take,
    skip: skip,
    /*     include: {
      secteur: true,
    }, */
    where: {
      street: { contains: search as string, mode: "insensitive" },
    },
    include: {
      cellule: true,
    },
    orderBy: {
      municipality: "asc",
    },
  });

  //console.log("ADRS:", addresses);

  return (
    <PageLayout
      title="Liste des adresses hôtes des cellules d'impact"
      description="La liste de toutes les adresses hôtes des cellules d'impact"
    >
      <div className="">
        <CustomBreadcrumb name="Adresses des hôtes" />
        <div className="px-1 flex items-center justify-between my-2">
          <SearchAdr search={search} />
          <div className="flex justify-normal gap-2 ">
            {skip == 0 ? null : (
              <Link
                href={{
                  pathname: "/addresses",
                  query: {
                    ...(search ? { search } : {}),
                    skip: skip > 0 ? skip - take : 0,
                  },
                }}
              >
                {"Précédent"}
              </Link>
            )}
            {skip + addresses.length >= adrCount ? null : (
              <Link
                href={{
                  pathname: "/addresses",
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
          <Link className="" href="/admin/addresses/new">
            <MdAddCircle size={50} className="md:hidden text-blue-800 " />
            <span className="text-sm font-semibold max-md:hidden  px-4 py-3 rounded-md hover:bg-blue-600 hover:cursor-pointer bg-blue-800 text-white">
              Nouveau
            </span>
          </Link>
        </div>
        <div className="max-sm:max-h-[600px] overflow-auto md:gap-3 px-1">
          {addresses?.map((adr: any) => (
            <AdrItem adr={adr} key={adr.id} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default AddressesPage;

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

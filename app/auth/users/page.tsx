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
import { Cellule } from "@prisma/client";
import CelItem from "@/components/cel/celItem";
import SearchCel from "@/components/searchCel";
import SearchUser from "@/components/searchPerson";
import UserItem from "@/components/user/userItem";
import { auth } from "@/auth";

const UsersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await auth();
  const usr: any = session?.user;

  const skip =
    typeof searchParams.skip === "string" ? Number(searchParams.skip) : 0;
  const take =
    typeof searchParams.take === "string" ? Number(searchParams.take) : 10;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const usrCount = await prisma.user.count();

  const users = await prisma.user.findMany({
    take: take,
    skip: skip,
    include: {
      cellule: true,
    },
    /*     include: {
      address: true,
      zone: true,
    }, */
    where: {
      username: { contains: search as string, mode: "insensitive" },
    },
    orderBy: {
      username: "asc",
    },
  });

  if (usr?.role != "ADMIN")
    return (
      <div className="flex flex-col items-center justify-center">
        {"Vous n'avez pas les droits d'accès à cette page"}
        <Link className="text-sky-600 italic underline" href="/">
          {"Page d'accueil"}
        </Link>{" "}
      </div>
    );

  return (
    <PageLayout
      title="Liste des utilisateurs"
      description="La liste de tous les utilisateurs"
    >
      <div className="">
        <CustomBreadcrumb name="Utilisateurs" />
        <div className="flex items-center justify-between max-md:m-2 md:mt-2">
          <SearchUser search={search} />
          <div className="flex justify-normal gap-2 ">
            {skip == 0 ? null : (
              <Link
                href={{
                  pathname: "/auth/users",
                  query: {
                    ...(search ? { search } : {}),
                    skip: skip > 0 ? skip - take : 0,
                  },
                }}
              >
                {"Précédent"}
              </Link>
            )}
            {skip + users.length >= usrCount ? null : (
              <Link
                href={{
                  pathname: "/auth/users",
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
          <Link className="" href="/auth/register">
            <MdAddCircle size={50} className="md:hidden text-blue-800" />
            <span className="text-sm font-semibold max-md:hidden  px-4 py-3 rounded-md hover:bg-blue-600 hover:cursor-pointer bg-blue-800 text-white ">
              Nouveau
            </span>
          </Link>
        </div>
        <div className="max-sm:max-h-[600px] overflow-auto xl:grid xl:grid-cols-2  md:gap-3">
          {users?.map((usr: any) => (
            <UserItem key={usr.id} usr={usr} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default UsersPage;

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

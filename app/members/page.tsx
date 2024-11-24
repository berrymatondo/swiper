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
import { Cellule, Person } from "@prisma/client";
import CelItem from "@/components/cel/celItem";
import PersonItem from "@/components/person/personItem";
import SearchPer from "@/components/searchPer";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import NotAccess from "@/components/notAccess";

const MembersPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = await auth();
  const usr: any = session?.user;

  if (usr?.role != "ADMIN" && usr?.role != "PILOTE" && usr?.role != "VISITOR")
    return <NotAccess />;

  //console.log("usr", usr);

  /*   if (!session || !session.user)
    return (
      <div className="border border-neutral-400 rounded-lg text-red-600 flex flex-col items-center md:w-1/2 mx-auto my-24 p-8 gap-8">
        <span className="font-semibold">
          {"Vous devez être connecté(e) pour accéder à cette transaction"}
        </span>
        <div className="container flex justify-between items-center">
          <Link href="/" className="bg-blue-600 text-white p-2 rounded-lg">
            Accueil
          </Link>
          <Link
            href="/auth/login"
            className="bg-blue-600 text-white p-2 rounded-lg"
          >
            Se Connecter
          </Link>
        </div>
      </div>
    ); */

  const skip =
    typeof searchParams.skip === "string" ? Number(searchParams.skip) : 0;
  const take =
    typeof searchParams.take === "string" ? Number(searchParams.take) : 1000;

  const search =
    typeof searchParams.search === "string" ? searchParams.search : undefined;

  const pilote =
    typeof searchParams.pilote === "string" ? searchParams.pilote : false;

  const hote =
    typeof searchParams.hote === "string" ? searchParams.hote : false;

  //const perCount = await prisma.person.count();

  let persons;

  if (search)
    persons = await prisma.person.findMany({
      take: take,
      skip: skip,
      where: {
        OR: [
          { firstname: { contains: search as string, mode: "insensitive" } },
          { lastname: { contains: search as string, mode: "insensitive" } },
        ],
      },
      include: {
        cellule: true,
      },
      /*     include: {
      secteur: true,
    }, */
      /*     where: {
      lastname: { contains: search as string, mode: "insensitive" },
    },
    orderBy: {
      lastname: "asc",
    }, */
    });
  else
    persons = await prisma.person.findMany({
      take: take,
      skip: skip,
      include: {
        cellule: true,
      },

      /*     include: {
      secteur: true,
    }, */
      /*     where: {
      lastname: { contains: search as string, mode: "insensitive" },
    },
    orderBy: {
      lastname: "asc",
    }, */
    });

  let personbis;
  if (pilote == "true") {
    personbis = persons.filter((per: Person) => per.isPilote === true);
  } else personbis = [...persons];

  let personbise0;
  if (hote == "true") {
    personbise0 = personbis.filter((per: Person) => per.isRespo === true);
  } else personbise0 = [...personbis];

  if (!usr) {
    return <div>Access Denied</div>;
  }

  let personbise;
  if (usr?.role == "PILOTE") {
    personbise = personbise0.filter(
      (per: Person) => per.celluleId === usr.celluleId
    );
  } else personbise = [...personbise0];

  //console.log("personbise ", personbise);

  return (
    <PageLayout
      title="Liste des membres des cellules d'impact"
      description="La liste de tous les membres des cellules d'impact"
    >
      <div className="">
        <CustomBreadcrumb name={`Membres (${personbise?.length})`} />
        <div className="flex items-center justify-between my-2">
          <SearchPer
            search={search}
            pilote={pilote == "true" ? true : false}
            hote={hote == "true" ? true : false}
          />
          {/*   <div className="flex justify-normal gap-2 ">
            {skip == 0 ? null : (
              <Link
                href={{
                  pathname: "/members",
                  query: {
                    ...(search ? { search } : {}),
                    skip: skip > 0 ? skip - take : 0,
                  },
                }}
              >
                {"Précédent"}
              </Link>
            )}
            {skip + persons.length >= perCount ? null : (
              <Link
                href={{
                  pathname: "/memebers",
                  query: {
                    ...(search ? { search } : {}),
                    skip: skip + take,
                  },
                }}
              >
                {"Suivant"}
              </Link>
            )}
          </div> */}
          {/*           <div>Total:{personbise?.length}</div>
           */}{" "}
          <Link className="" href="/admin/members/new">
            <MdAddCircle size={50} className="md:hidden text-blue-800 mr-2" />
            <span className="text-sm font-semibold max-md:hidden  px-4 py-3 rounded-md hover:bg-blue-600 hover:cursor-pointer bg-blue-800 text-white mr-4">
              Nouveau
            </span>
          </Link>
        </div>

        <div className="max-sm:max-h-[600px] overflow-auto lg:grid md:grid-cols-2  md:gap-3">
          {personbise?.map((per: any) => (
            <PersonItem per={per} key={per.id} usr={usr} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default MembersPage;

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

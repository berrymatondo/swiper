import Map from "@/components/map/map";
import PageLayout from "@/components/pageLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getCel } from "@/lib/_celActions";
import { Cellule, Person } from "@prisma/client";
import React from "react";
import { MdCalendarMonth, MdHouse } from "react-icons/md";
import { GoClock } from "react-icons/go";

import { FaMobileAlt } from "react-icons/fa";
import { BiMap } from "react-icons/bi";
import Link from "next/link";
import { auth } from "@/auth";
import CelUpdateBar from "@/components/cel/celUpdateBar";

type CelDetailsPageProps = {
  params: {
    celId: number;
  };
};

const CelDetailsPage = async ({ params }: CelDetailsPageProps) => {
  const session = await auth();
  const usr = session?.user;
  console.log("USR", usr);

  const res = await getCel(params.celId);
  const cel = await res?.data;

  //console.log("CEL:", cel);

  /*   let geolocs = [];
  geolocs.push({
    longitude: cel?.address?.longitude,
    latitude: cel?.address?.latitude,
  });
 */
  //console.log("GEOLOCS", geolocs);

  let cels = [];
  cels.push(cel);

  return (
    <PageLayout
      title="Détails d'une cellule d'impact"
      description="Cette page donne toutes les informations sur une cellule d'impact"
    >
      <div>
        <CustomBreadcrumb
          name={cel?.name as string}
          zoneName={cel?.zone?.name as string}
        />
        <div className="p-2 bg-gradient-to-l from-orange-300 to-transparent m-2 rounded-lg">
          <div className="flex items-center gap-2 mb-2 ">
            <p className="w-full flex justify-between font-semibold text-blue-800">
              <span>
                {cel?.name} ({cel?.persons.length} membre(s))
              </span>
              <Link
                href={`/cellules/${cel?.id}/newmbr`}
                className="p-2 rounded-full bg-blue-800 text-sm text-white"
              >
                Rejoindre
              </Link>
            </p>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <FaMobileAlt className="text-orange-600" />
            {cel?.persons &&
              cel?.persons?.map((person: Person) => (
                <div key={person.id}>
                  {person.mobile} ({person.firstname})
                </div>
              ))}
          </div>

          <div className="flex items-center max-md:items-start gap-2  ">
            <BiMap className="text-green-600" />
            <div className="flex max-md:flex-col md:gap-2 items-start">
              <p className="">
                {cel?.address?.street as string},{" "}
                {cel?.address?.number as string} {cel?.address?.box as string}
              </p>
              <p className="">
                {cel?.address?.postalCode as string}{" "}
                {cel?.address?.municipality as string}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className=" flex items-center gap-2 mb-2">
              <MdCalendarMonth className="text-blue-600" />
              <p>{cel?.days}</p>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <GoClock className="text-teal-600" />
              <p>{cel?.hours}</p>
            </div>
          </div>
          {usr && (
            <div className="flex justify-end">
              <CelUpdateBar usr={usr} cel={cel} />
            </div>
          )}
        </div>
        {/*         <div>
          {
            cel?.cellules.filter((cel: Cellule) => cel.statut == "ACTIF")
              .length
          }
          {zone?.cellules
            .filter((cel: Cellule) => cel.statut == "ACTIF")
            .map((cell: Cellule) => (
              <div className="shadow-md bg-white my-1 rounded-lg p-1">
                {cell.name}
              </div>
            ))}
        </div> */}
        <div className="p-2 max-h-1/3">
          <Map cels={cels} />
        </div>
        {/*       <SearchZone />
         */}{" "}
        {/*         <div className="max-sm:max-h-[600px] overflow-auto md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-3">
          {zones.map((zone) => (
            <ZoneItem zone={zone} />
          ))}
        </div> */}
      </div>
    </PageLayout>
  );
};

export default CelDetailsPage;

const CustomBreadcrumb = ({
  name,
  zoneName,
}: {
  name: string;
  zoneName: string;
}) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/zones">{zoneName}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/cellules">Cellules</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

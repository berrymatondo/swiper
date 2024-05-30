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
import { getZone } from "@/lib/_zoneActions";
import { Cellule, Person } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { BiMap } from "react-icons/bi";
import { FaMobileAlt } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { MdAddCircle, MdCalendarMonth, MdHouse } from "react-icons/md";

type ZoneDetailsPageProps = {
  params: {
    zoneId: number;
  };
};

const ZoneDetailsPage = async ({ params }: ZoneDetailsPageProps) => {
  const res = await getZone(params.zoneId);
  const zone = await res?.data;

  console.log("RES:", zone);

  return (
    <PageLayout
      title="Trouver une cellule d'impact"
      description="Cette page permet à toute personne de pouvoir trouver une cellule d'impact à proximité de sa résidence"
    >
      <div>
        <CustomBreadcrumb name={zone?.name as string} />

        <div
          className="text-end mx-2
        "
        >
          <Link
            className="p-1 gap-2 flex items-center justify-center  rounded-full bg-slate-300 my-2"
            href="/cellules"
          >
            <MdHouse className="text-orange-600" />{" "}
            <span className="text-xs">Vers les cellules</span>
          </Link>
        </div>

        {/*         <div className="flex items-center flex-col mx-1">
          <Link className=" underline italic " href="/cellules">
            Liste de cellules
          </Link>
          {zone?.cellules.map((cel: Cellule) => (y
            <Link
              href={`/cellules/${cel.id}`}
              className={cel.statut == "INACTIF" ? "text-red-600 text-xs" : ""}
            >
              {cel.name} ({cel.statut})
            </Link>
          ))}
        </div> */}
        <div className="grid md:grid-cols-2 max-md:mx-1 gap-2 max-md:gap-1 mb-2">
          {zone?.cellules
            /*             .filter((cel: Cellule) => cel.statut == "ACTIF")
             */ .map((cell: any) => (
              <Link
                key={cell.id}
                href={`/cellules/${cell.id}`}
                className="flex flex-col shadow-md bg-gradient-to-r from-blue-100 to-purple-300 my-1 rounded-lg p-1 "
              >
                <div className="p-2 ">
                  <div className="flex items-center  gap-2 mb-2 ">
                    <MdHouse />
                    <div
                      className={
                        cell.statut == "INACTIF" || cell.statut == "SUSPENDU"
                          ? "w-full flex justify-between font-semibold text-red-600"
                          : "w-full flex justify-between font-semibold text-blue-600"
                      }
                    >
                      <p className=" w-full flex justify-between items-center">
                        {cell?.name} {"("}
                        {cell?.persons.length} {")"}
                        <p>
                          <span className="text-xs">
                            {cell.statut == "INACTIF" ||
                            cell.statut == "SUSPENDU" ? (
                              <span className="bg-red-600 text-xs rounded-full text-white p-1">
                                {cell.statut}
                              </span>
                            ) : (
                              ""
                            )}
                          </span>
                          <Link
                            href={`/cellules/${cell.id}/newmbr`}
                            className="max-md:text-xs ml-2 p-1 px-2 rounded-full bg-blue-800 text-sm text-white"
                          >
                            Rejoindre
                          </Link>{" "}
                        </p>
                      </p>
                    </div>
                  </div>

                  <div className=" gap-2 mb-2">
                    {cell?.persons &&
                      cell?.persons?.map((person: Person) => (
                        <p className="flex items-center gap-2" key={person.id}>
                          <FaMobileAlt /> {person.mobile} ({person.firstname})
                        </p>
                      ))}
                  </div>

                  <div className="flex  items-start gap-2  ">
                    <BiMap />
                    <div className="flex max-md:flex-col md:gap-2 items-start">
                      <p>
                        {cell?.address?.street}, {cell?.address?.number}{" "}
                        {cell?.address?.box}
                      </p>
                      <p className="">
                        {cell?.address?.postalCode}{" "}
                        {cell?.address?.municipality}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className=" flex items-center gap-2 mb-2">
                      <MdCalendarMonth />
                      <p>{cell?.days}</p>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <GoClock />
                      <p>{cell?.hours}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <Map cels={zone?.cellules} />
      </div>
    </PageLayout>
  );
};

export default ZoneDetailsPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/zones">Zones</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

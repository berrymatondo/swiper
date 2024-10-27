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
import {
  MdAddCircle,
  MdCheckBox,
  MdFactCheck,
  MdNotAccessible,
  MdQuestionMark,
} from "react-icons/md";
import { Cellule } from "@prisma/client";
import CelItem from "@/components/cel/celItem";
import SearchCel from "@/components/searchCel";
import Map from "@/components/map/map";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import CelDetails from "@/components/cel/celDetails";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllCels } from "@/lib/_celActions";
import CelComplet from "@/components/cel/celComplet";
import ListCelComplet from "@/components/cel/listCelComplet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const DetailsPage = async () => {
  const session = await auth();
  const usr: any = session?.user;
  const role = usr?.role;
  //console.log("Session: ", role);

  const res = await getAllCels();
  const cellules = res?.data;

  //console.log("Cellules: ", cellules);

  if (role != "ADMIN" && role != "PILOTE")
    return <div>{"Vous n'avez pas les droits"}</div>;

  return (
    <PageLayout
      title="Liste des cellules d'impact"
      description="La liste de toutes les cellules d'impact"
    >
      <div className="">
        <CustomBreadcrumb
          name={`Choisissez une cellule près de chez vous! - ${
            cellules?.filter((cl: any) => cl.statut == "ACTIF").length
          }`}
        />

        <div className="p-1">
          <ScrollArea className="h-[600px]  rounded-md border">
            <div>
              <TableDemo cellules={cellules} />
              {/*               <ListCelComplet cellules={cellules} />
               */}{" "}
              {/*               {cellules?.map((cel: any) => (
                <CelComplet userSession={session} cel={cel} key={cel.id} />
        
              ))} */}
            </div>
          </ScrollArea>
        </div>
      </div>
    </PageLayout>
  );
};

export default DetailsPage;

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

type TableDemoProps = {
  cellules: any;
};

const TableDemo = ({ cellules }: TableDemoProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px]">Cellule</TableHead>
          <TableHead>Pilote</TableHead>
          <TableHead>Hôte</TableHead>
          <TableHead>Adresse</TableHead>
          <TableHead>Whatsapp</TableHead>
          {/*           <TableHead className="text-right">Statut</TableHead>
           */}{" "}
        </TableRow>
      </TableHeader>
      <TableBody>
        {cellules
          ?.filter((cl: any) => cl.statut == "ACTIF")
          .map((cel: any, index: number) => (
            <TableRow key={cel?.id}>
              <TableCell className="font-medium">
                <Badge className="bg-sky-600">
                  <Link className="text-white" href={`/cellules/${cel?.id}`}>
                    {cel?.name}
                  </Link>
                </Badge>
              </TableCell>
              <TableCell>
                {cel?.persons
                  .filter((pp: any) => pp?.isPilote == true)
                  .map((per: any, index: number) => (
                    <div key={index}>
                      <p>
                        {per.firstname}{" "}
                        <strong className="uppercase">{per.lastname}</strong>
                      </p>
                      <p>{per.mobile}</p>
                    </div>
                  ))}
              </TableCell>
              <TableCell>
                {cel.persons
                  .filter((pp: any) => pp?.isRespo == true)
                  .map((per: any, index: number) => (
                    <div key={index}>
                      <p>
                        {per?.firstname}{" "}
                        <strong className="uppercase">{per?.lastname}</strong>
                      </p>
                      <p>{per?.mobile}</p>
                    </div>
                  ))}
              </TableCell>
              <TableCell>
                {cel?.address?.street} {cel?.address?.number}{" "}
                {cel?.address?.box},{cel?.address?.postalCode}{" "}
                {cel?.address?.municipality}
              </TableCell>
              <TableCell className="text-right">
                {" "}
                {cel?.grpWhatsApp ? (
                  <MdCheckBox className="text-green-600" size={20} />
                ) : (
                  <MdQuestionMark className="text-red-600" size={20} />
                )}
              </TableCell>
              {/*               <TableCell>
                <Badge className={cel?.statut ? "bg-green-600" : "bg-red-600"}>
                  {cel?.statut}
                </Badge>
              </TableCell> */}
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

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
import {
  MdAdd,
  MdAddCircle,
  MdAddCircleOutline,
  MdCalendarMonth,
  MdHome,
  MdHouse,
} from "react-icons/md";
import { GoClock } from "react-icons/go";

import { FaMobileAlt } from "react-icons/fa";
import { BiMap } from "react-icons/bi";
import Link from "next/link";
import { auth } from "@/auth";
import CelUpdateBar from "@/components/cel/celUpdateBar";
import { getPersonsCel } from "@/lib/_personActions";
import CelMembers from "@/components/cel/celMembers";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { Badge } from "@/components/ui/badge";
import { IoLogoWhatsapp } from "react-icons/io";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getAllMeetingsByCel } from "@/lib/_meetingActions";
import MeetingItem from "@/components/meeting/meetingItem";
import Expor from "@/components/reports/expCel";

import EvangItem from "@/components/evang/evangItem";
import { getAllEvangsByCel } from "@/lib/_evangActions";
import CelGraphe from "@/components/graph/celGraph";
import ExportEva from "@/components/reports/expEva";
import EvaGraphe from "@/components/graph/evaGraph";
import MbrGraphe from "@/components/graph/mbrGraph";
import ExportMbr from "@/components/reports/expMbr";

type CelDetailsPageProps = {
  params: {
    celId: number;
  };
};

const CelDetailsPage = async ({ params }: CelDetailsPageProps) => {
  const session = await auth();
  const usr: any = session?.user;
  //console.log("ID", params.celId);

  const res = await getCel(params.celId);
  const cel = res?.data;

  const resu = await getPersonsCel(params.celId);
  const members = resu?.data;

  const reso = await getAllMeetingsByCel(params.celId);
  const meetings = reso?.data;

  const resoo = await getAllEvangsByCel(params.celId);
  const evangs = resoo?.data;

  //
  /* 
<TabsDemo
meetings={meetings}
name={cel?.name}
cel={cel}
members={members}
evangs={evangs}
usr={usr} */

  let cels = [];
  cels.push(cel);

  // MEETINGS
  //console.log("meetings", meetings);

  let tmp2: any = [];
  if (meetings)
    for (let i = 0; i < meetings?.length; i++) {
      tmp2.push({
        date: meetings[i].date,
        participants:
          meetings[i].nHom +
          meetings[i].nFem +
          meetings[i].nEnf +
          meetings[i].nIcc +
          meetings[i].nSta,
        datein:
          meetings[i].date.substring(0, 4) +
          meetings[i].date.substring(5, 7) +
          meetings[i].date.substring(8, 10),
      });
    }

  tmp2 = tmp2.sort((a: any, b: any) => a.datein - b.datein);
  //console.log("tmp2", tmp2);

  // EVANGS
  //console.log("meetings", evangs);

  let tmp3: any = [];
  if (evangs)
    for (let i = 0; i < evangs?.length; i++) {
      tmp3.push({
        date: evangs[i].date,
        gagnees: evangs[i].nGag,
        evangelisees: evangs[i].nEva,

        datein:
          evangs[i].date.substring(0, 4) +
          evangs[i].date.substring(5, 7) +
          evangs[i].date.substring(8, 10),
      });
    }

  tmp3 = tmp3.sort((a: any, b: any) => a.datein - b.datein);

  // MEMBRES
  //console.log("meetings", members);

  let tmp4: any = [];
  let eff = 0;
  let icc = 0;
  let star = 0;
  if (members) {
    eff = members?.length;
    tmp4.push({ cat: "effectif", nombre: eff, fill: "var(--color-effectif)" });
    icc = (members?.filter((mbr: any) => mbr?.isIcc == true)).length;
    tmp4.push({
      cat: "membreICC",
      nombre: icc,
      fill: "var(--color-membreICC)",
    });
    star = (members?.filter((mbr: any) => mbr?.isStar == true)).length;
    tmp4.push({ cat: "star", nombre: star, fill: "var(--color-star)" });
  }

  // tmp3 = tmp3.sort((a: any, b: any) => a.datein - b.datein);
  //console.log("tmp2", tmp4);
  //const taille = cel?.persons ? cel?.persons.length : 0;

  console.log("usr", usr);

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
        <p className=" text-center font-bold my-2 text-sky-600 text-xl">
          {" "}
          {cel?.name}
        </p>
        <div className="flex flex-col">
          <div className="flex max-md:flex-col">
            <div className="md:w-1/3 p-2 bg-gradient-to-l to-sky-100 from-transparent border-2 m-2 rounded-lg">
              <div className="flex items-center gap-2 mb-2 ">
                <p className="w-full flex justify-between font-semibold text-blue-800">
                  <span className="flex gap-2 items-center ">
                    {/*                 {cel?.name} ({cel?.persons.length} membre(s))
                     */}{" "}
                    <MdHome size={20} /> {cel?.name}
                  </span>
                </p>
              </div>

              {(usr?.role == "ADMIN" || usr?.role == "PILOTE") && (
                <div className="flex flex-col items-start">
                  {cel?.persons &&
                    cel?.persons
                      ?.filter((per: Person) => per.isPilote == true)
                      .map((person: Person) => (
                        <div
                          className="flex justify-start items-center gap-2"
                          key={person.id}
                        >
                          <FaMobileAlt className="text-orange-600" />{" "}
                          {person.mobile} ({person.firstname})
                        </div>
                      ))}
                </div>
              )}

              <div className="flex flex-col gap-2 mt-2">
                <div className="  rounded-lg text-sky-800 flex items-center max-md:items-start gap-2  ">
                  <BiMap size={20} className="text-green-600" />
                  <div className="font-semibold flex md:gap-2 items-start">
                    <p className="">
                      {cel?.address?.street as string}{" "}
                      {(usr?.role == "ADMIN" || usr?.role == "PILOTE") && (
                        <span>
                          {" "}
                          {cel?.address?.number as string},{" "}
                          {cel?.address?.box as string}{" "}
                        </span>
                      )}
                    </p>
                    <p className="">
                      {cel?.address?.postalCode as string}{" "}
                      {cel?.address?.municipality as string}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className=" flex items-center gap-2 mb-2">
                    <MdCalendarMonth size={20} className="text-blue-600" />
                    <p>{cel?.days}</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <GoClock size={20} className="text-teal-600" />
                    <p>{cel?.hours}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end w-full ">
                {cel?.grpWhatsApp ? (
                  <div className="flex flex-col justify-end">
                    <Badge className="my-4 border-green-600 hover:cursor-pointer max-md:text-xs  hover:text-white text-green-600 bg-transparent w-full  hover:bg-green-800 p-1">
                      {/*             <FaRegHandPointRight size={20} className="mr-2 text-yellow-200" />
                       */}{" "}
                      <IoLogoWhatsapp size={30} className="mr-2" />
                      <Link
                        target="_blank"
                        href={cel.grpWhatsApp}
                        className="font-semibold text-base"
                      >
                        Rejoindre
                      </Link>
                    </Badge>
                    {/*             <span className="text-xs text-center mt-1">
                le groupe WhatsApp
              </span> */}
                  </div>
                ) : (
                  <p className=" my-4 max-md:text-xs text-sm italic">
                    Pas de groupe Whatsapp disponible
                  </p>
                )}
              </div>
              {usr && (
                <div className=" flex items-center justify-end pt-4">
                  {/*                   <Link
                    href={`/cellules/${cel?.id}/newmbr`}
                    className="p-2 rounded-full bg-sky-800 text-sm text-white"
                  >
                    Ajouter un membre
                  </Link> */}

                  <CelUpdateBar usr={usr} cel={cel} />
                </div>
              )}
            </div>

            <div className="p-2 max-h-1/3 md:w-2/3">
              <Map
                cels={cels}
                //show={usr?.role != "ADMIN" && usr?.role != "PILOTE"}
                show={
                  usr?.role != "ADMIN" &&
                  usr?.role == "PILOTE" &&
                  usr.celluleId != cel?.id
                }
                haut={300}
              />
            </div>
          </div>

          <div className="p-2">
            {(usr?.role == "ADMIN" ||
              (usr?.role == "PILOTE" && usr.celluleId == cel?.id)) && (
              /*             <CelMembers members={members} />
               */
              <div className="w-full flex  max-md:flex-col gap-2 ">
                <div className=" w-full">
                  <TabsDemo
                    meetings={meetings}
                    name={cel?.name}
                    cel={cel}
                    members={members}
                    evangs={evangs}
                    usr={usr}
                    participants={tmp2}
                    gagnees={tmp3}
                    mbr={tmp4}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
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

type TabsDEmoProps = {
  name: any;
  meetings: any;
  evangs: any;
  cel: any;
  members: any;
  usr: any;
  participants: any;
  gagnees: any;
  mbr: any;
};
function TabsDemo({
  meetings,
  name,
  cel,
  members,
  evangs,
  usr,
  participants,
  gagnees,
  mbr,
}: TabsDEmoProps) {
  return (
    <Tabs defaultValue="evang" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">Cellules</TabsTrigger>
        <TabsTrigger value="evang">Evangélisation</TabsTrigger>
        <TabsTrigger value="password">Membres({members?.length})</TabsTrigger>
      </TabsList>
      <TabsContent className="flex max-md:flex-col gap-2" value="account">
        <div className="md:w-1/3 bg-blue-50 border-2 rounded-lg">
          <CelGraphe data={participants} />
        </div>
        <Card className="md:w-2/3">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Cellules de maison
              <div className="flex items-center gap-2">
                <Expor meetings={meetings} name={name} />
                <Link
                  href={{
                    pathname: `/cellules/${cel?.id}/meetings/new`,
                    query: { id: cel?.id, name: cel?.name },
                  }}
                >
                  <MdAddCircle size={40} className="text-sky-600" />
                </Link>{" "}
              </div>
            </CardTitle>
            <CardDescription>Tous les rapports de la cellule.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className=" max-sm:max-h-[600px] overflow-auto md:grid  md:gap-3">
              {meetings?.map((meet: any) => (
                <MeetingItem key={meet.id} meeting={meet} usr={usr} />
              ))}
            </div>
            {/*             <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div> */}
          </CardContent>
          {/*           <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
      <TabsContent className="flex max-md:flex-col gap-2" value="evang">
        <div className="md:w-1/3 bg-blue-50 border-2 rounded-lg">
          <EvaGraphe data={gagnees} />
        </div>
        <Card className="md:w-2/3">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              {"Sorties d'évangélisation"}
              <div className="flex items-center gap-2">
                <ExportEva evangs={evangs} name={name} />
                <Link
                  href={{
                    pathname: `/cellules/${cel?.id}/evangs/new`,
                    query: { id: cel?.id, name: cel?.name },
                  }}
                >
                  <MdAddCircle size={40} className="text-sky-600" />
                </Link>
              </div>
            </CardTitle>
            <CardDescription>Tous les rapports des sorties.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className=" max-sm:max-h-[600px] overflow-auto md:grid  md:gap-3">
              {evangs?.map((meet: any) => (
                <EvangItem key={meet.id} evang={meet} />
              ))}
            </div>
            {/*             <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="@peduarte" />
            </div> */}
          </CardContent>
          {/*           <CardFooter>
            <Button>Save changes</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
      <TabsContent className="flex max-md:flex-col gap-2" value="password">
        <div className="md:w-1/3 bg-blue-50 border-2 rounded-lg">
          <MbrGraphe data={mbr} />
        </div>
        <Card className="md:w-2/3">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              Membres ({members?.length})
              <div className="flex items-center gap-2">
                <ExportMbr members={members} name={name} />
                <Link
                  href={{
                    pathname: `/cellules/${cel?.id}/newmbr`,
                    query: { id: cel?.id, name: cel?.name },
                  }}
                >
                  <MdAddCircle size={40} className="text-sky-600" />
                </Link>{" "}
              </div>
            </CardTitle>
            <CardDescription>Tous les membres de la cellule.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {members?.map((mbr: any, index: number) => (
              <div
                key={index}
                className="flex gap-2 max-md:flex-col max-md:text-xs"
              >
                <p>
                  {index + 1}. {mbr?.firstname} <strong>{mbr?.lastname}</strong>{" "}
                </p>
                <p>{mbr?.mobile}</p>
              </div>
            ))}
            {/*             <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div> */}
          </CardContent>
          {/*           <CardFooter>
            <Button>Save password</Button>
          </CardFooter> */}
        </Card>
      </TabsContent>
    </Tabs>
  );
}

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
import { getAllCels, getCel } from "@/lib/_celActions";
import { Cellule, Person } from "@prisma/client";
import React from "react";
import {
  MdAdd,
  MdAddCircle,
  MdAddCircleOutline,
  MdCalendarMonth,
  MdHome,
  MdHouse,
  MdPeople,
  MdPerson,
  MdPolicy,
} from "react-icons/md";
import { GoClock } from "react-icons/go";

import { FaMobileAlt } from "react-icons/fa";
import { BiMap } from "react-icons/bi";
import Link from "next/link";
import { auth } from "@/auth";
import CelUpdateBar from "@/components/cel/celUpdateBar";
import { getAllPersons, getPersonsCel } from "@/lib/_personActions";
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
import {
  getAllGMeetings,
  getAllMeetings,
  getAllMeetingsByCel,
} from "@/lib/_meetingActions";
import MeetingItem from "@/components/meeting/meetingItem";
import { GiPoliceOfficerHead } from "react-icons/gi";
import ParticipationGraph from "@/components/graph/participation";
import { getAllEvangs } from "@/lib/_evangActions";
import EvangelisationGraph from "@/components/graph/evangelisation";
import NotAccess from "@/components/notAccess";
import ExportAllMeetings from "@/components/reports/expAllMeetings";
import MeetingsByDate from "@/components/meeting/meetingsByDate";

const DashboardPage = async () => {
  const session = await auth();
  const usr: any = session?.user;
  //console.log("ID", params.celId);

  const re = await getAllCels();
  const totcel = re?.data;

  const re1 = await getAllPersons();
  const totper = re1?.data;

  const re5 = await getAllMeetings();
  const totmeet = re5?.data;

  // Get distinct meetings dates
  const re5f = await getAllGMeetings();
  const meetDates = re5f?.data;

  //console.log("fff ", meetDates);

  const re6 = await getAllEvangs();
  const toteva = re6?.data;

  // console.log("totmeet ", totmeet);

  const totpil = re1?.data.filter((p: Person) => p.isPilote == true);
  const tothot = re1?.data.filter((p: Person) => p.isRespo == true);

  const res = await getCel(10);
  const cel = res?.data;

  const resu = await getPersonsCel(10);
  const members = resu?.data;

  const resur = await getAllPersons();
  const allMembers = resur?.data?.filter((mb: any) => mb.isGest == true);

  /*   const reso = await getAllMeetingsByCel(10);
  const meetings = reso?.data; */

  // console.log("CEL:", meetings);

  /*   let geolocs = [];
  geolocs.push({
    longitude: cel?.address?.longitude,
    latitude: cel?.address?.latitude,
  });
 */
  //console.log("allMembers", allMembers);

  let cels = [];
  cels.push(cel);

  const taille = cel?.persons ? cel?.persons.length : 0;

  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;

  //console.log("tot", year, month);
  //console.log("totcel", totcel);
  //console.log("totmeet", totmeet);

  let tmp: any = [];
  if (totcel)
    for (let i = 0; i < totcel?.length; i++) {
      /*       console.log(
        "i",
        i,
        totcel[i].createdAt.getFullYear() +
          "" +
          (totcel[i].createdAt.getMonth() + 1),

        (totcel[i].createdAt.getMonth() + 1).toString().length
      ); */

      let val =
        (totcel[i].createdAt.getMonth() + 1).toString().length > 1
          ? (totcel[i].createdAt.getMonth() + 1).toString()
          : "0" + (totcel[i].createdAt.getMonth() + 1).toString();

      // console.log("val", val);

      const ym = totcel[i].createdAt.getFullYear() + "" + val;
      let found = tmp.find((el: any) => el.date == ym);
      if (found) {
        // console.log("FOUND");

        found.count += 1;
      } else {
        // console.log("NOTTTT FOUND");
        tmp.push({ count: 1, date: ym });
      }
    }

  //console.log("TMP", tmp);

  // Participants per month
  let tmp2: any = [];
  if (totmeet)
    for (let i = 0; i < totmeet?.length; i++) {
      /*       console.log(
        "i",
        i,
        totmeet[i].date.substring(0, 4) + "" + totmeet[i].date.substring(5, 7)
      ); */

      const ym =
        totmeet[i].date.substring(0, 4) + "" + totmeet[i].date.substring(5, 7);

      let found = tmp2.find((el: any) => el.date == ym);
      if (found) {
        //  console.log("FOUND");

        found.count += totmeet[i].nHom + totmeet[i].nFem + totmeet[i].nEnf;
        /*           totmeet[i].nIcc +
          totmeet[i].nSta; */
        found.occ += 1;
      } else {
        //  console.log("NOTTTT FOUND");
        tmp2.push({
          count: totmeet[i].nHom + totmeet[i].nFem + totmeet[i].nEnf,
          /*             totmeet[i].nIcc +
            totmeet[i].nSta, */
          date: ym,
          occ: 1,
        });
      }
    }

  // console.log("TMP2 ", tmp2);
  const tmp3: any = [];
  for (let i = 0; i < tmp2.length && i < 6; i++) {
    const found = tmp.find((el: any) => el.date == tmp2[i].date);
    if (found) {
      tmp3.push({
        date: tmp2[i].date,
        dateout: tmp2[i].date.substring(4) + "-" + tmp2[i].date.substring(0, 4),
        nbrCel: found.count,
        nbrPar: tmp2[i].count,
        nbrRap: tmp2[i].occ,
      });
    } else {
      tmp3.push({
        date: tmp2[i].date,
        dateout: tmp2[i].date.substring(4) + "-" + tmp2[i].date.substring(0, 4),
        nbrCel: 0,
        nbrPar: tmp2[i].count,
        nbrRap: tmp2[i].occ,
      });
    }
  }

  // Evangélisés et gagnées
  let tmp4: any = [];
  if (toteva)
    for (let i = 0; i < toteva?.length; i++) {
      /*       console.log(
          "i",
          i,
          totmeet[i].date.substring(0, 4) + "" + totmeet[i].date.substring(5, 7)
        ); */

      const ym =
        toteva[i].date.substring(0, 4) + "" + toteva[i].date.substring(5, 7);

      let found = tmp4.find((el: any) => el.date == ym);
      if (found) {
        //  console.log("FOUND");

        (found.evangelisees += toteva[i].nEva),
          (found.gagnees += toteva[i].nGag);
        found.occ += 1;
      } else {
        //  console.log("NOTTTT FOUND");
        tmp4.push({
          evangelisees: toteva[i].nEva,
          gagnees: toteva[i].nGag,
          date: ym,
          occ: 1,
          dateout:
            toteva[i].date.substring(5, 7) +
            "-" +
            toteva[i].date.substring(0, 4),
        });
      }
    }

  //console.log("tmp4 ", tmp4);

  if (usr?.role != "ADMIN") return <NotAccess />;

  return (
    <PageLayout
      title="Détails d'une cellule d'impact"
      description="Cette page donne toutes les informations sur une cellule d'impact"
    >
      <div>
        <CustomBreadcrumb
          name={"Dashboard"}
          //   zoneName={cel?.zone?.name as string}
        />

        <div className="flex max-md:flex-col  md:justify-between">
          <div className="flex md:w-1/2">
            <div className="w-1/2 md:w-full p-4 bg-gradient-to-l to-sky-100 from-transparent border-2 m-1 md:my-2 rounded-lg">
              <p className="flex justify-between items-center">
                <span className="font-semibold">Cellules actives</span>
                <MdHome size={20} className="text-sky-600" />
              </p>
              <p className="flex justify-between items-baseline text-4xl font-semibold text-blue-800">
                {totcel?.filter((cel: any) => cel.statut == "ACTIF")?.length}
                <Link
                  className="font-thin text-sm text-black max-md:text-xs"
                  href="/cellules"
                >
                  voir les détails
                </Link>
              </p>
            </div>
            <div className="w-1/2 md:w-full p-4 bg-gradient-to-l to-sky-100 from-transparent border-2 m-1 md:my-2 rounded-lg">
              <p className="flex justify-between items-center">
                <span className="font-semibold">Membres</span>
                <MdPeople size={20} className="text-orange-600" />
              </p>
              <p className="flex justify-between items-baseline text-4xl font-semibold text-blue-800">
                {totper?.length}
                <Link
                  className="font-thin text-sm text-black max-md:text-xs"
                  href="/members"
                >
                  voir les détails
                </Link>
              </p>
            </div>
          </div>

          <div className="flex md:w-1/2">
            <div className="w-1/2 md:w-full p-4 bg-gradient-to-l to-sky-100 from-transparent border-2  m-1 md:my-2  rounded-lg">
              <p className="flex justify-between items-center">
                <span className="font-semibold">Pilotes</span>
                <GiPoliceOfficerHead size={20} className="text-purple-600" />
              </p>
              <p className="flex justify-between items-baseline text-4xl font-semibold text-blue-800">
                {totpil?.length}
                <Link
                  className="font-thin text-sm text-black max-md:text-xs"
                  href={`/members?pilote=true&hote=false`}
                >
                  voir les détails
                </Link>
              </p>
            </div>
            <div className="w-1/2 md:w-full p-4 bg-gradient-to-l to-sky-100 from-transparent border-2  m-1 md:my-2  rounded-lg">
              <p className="flex justify-between items-center">
                <span className="font-semibold">Hôtes</span>
                <MdPerson size={20} className="text-green-600" />
              </p>
              <p className="flex justify-between items-baseline text-4xl font-semibold text-blue-800">
                {tothot?.length}
                <Link
                  className="font-thin text-sm text-black max-md:text-xs"
                  href={`/members?pilote=false&hote=true`}
                >
                  voir les détails
                </Link>
              </p>
            </div>
          </div>

          {/*           <div className="md:w-1/3 p-2 bg-gradient-to-l to-sky-100 from-transparent border-2 m-2 rounded-lg">
            <div className="flex items-center gap-2 mb-2 ">
              <p className="w-full flex justify-between font-semibold text-blue-800">
                <span className="flex gap-2 items-center ">
   
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
                    {cel?.address?.street as string},{" "}
                    {(usr?.role == "ADMIN" || usr?.role == "PILOTE") && (
                      <span>
                        {" "}
                        {cel?.address?.number as string}{" "}
                        {cel?.address?.box as string}
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
            <div className="flex justify-between">
              <Link
                href={`/cellules/${cel?.id}/newmbr`}
                className="p-2 rounded-full bg-sky-800 text-sm text-white"
              >
                Devenir membre
              </Link>
              {cel?.grpWhatsApp && (
                <div className="flex flex-col">
                  <Badge className="border-green-600 hover:cursor-pointer max-md:text-xs  hover:text-white text-green-600 bg-transparent w-full  hover:bg-green-800 p-1">
     
                    <IoLogoWhatsapp size={30} className="mr-2" />
                    <Link
                      target="_blank"
                      href={cel.grpWhatsApp}
                      className="font-semibold text-base"
                    >
                      Rejoindre
                    </Link>
                  </Badge>

                </div>
              )}
            </div>
            {usr && (
              <div className="flex justify-end">
                <CelUpdateBar usr={usr} cel={cel} />
              </div>
            )}
          </div> */}

          {/*         <div className="p-2 max-h-1/3 md:w-2/3">
            <Map
              cels={cels}
              show={usr?.role != "ADMIN" && usr?.role != "PILOTE"}
              haut={300}
            />
          </div> */}
        </div>
        <div>
          {(usr?.role == "ADMIN" || usr?.role == "PILOTE") && (
            /*             <CelMembers members={members} />
             */ <div className="md:flex md:justify-between md:gap-4">
              {/*               <div className="md:hidden">
                <ParticipationGraph
                  meetings={tmp2}
                  persons={totper}
                  cellules={tmp}
                  data={tmp3}
                />
              </div> */}
              <TabsDemo
                meetings={totmeet}
                name={cel?.name}
                cel={cel}
                tmp={tmp}
                tmp2={tmp2}
                tmp3={tmp3}
                tmp4={tmp4}
                totper={totper}
                usr={usr}
                allMembers={allMembers}
                meetDates={meetDates}
              />
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default DashboardPage;

const CustomBreadcrumb = ({
  name,
  zoneName,
}: {
  name: string;
  zoneName?: string;
}) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        {/*         <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/zones">{zoneName}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/cellules">Cellules</BreadcrumbLink>
        </BreadcrumbItem> */}
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
  cel: any;
  tmp2: any;
  totper: any;
  tmp: any;
  tmp3: any;
  tmp4: any;
  usr: any;
  allMembers: any;
  meetDates: any;
};
function TabsDemo({
  meetings,
  name,
  cel,
  tmp,
  tmp2,
  tmp3,
  tmp4,
  totper,
  usr,
  allMembers,
  meetDates,
}: TabsDEmoProps) {
  // console.log("M", meetings);

  return (
    <div className="flex flex-col w-full">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Cellules</TabsTrigger>
          <TabsTrigger value="evang">Evangélisation</TabsTrigger>
          <TabsTrigger value="password">Coordination</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <div className="md:flex gap-2 justify-between ">
            <ParticipationGraph
              meetings={tmp2}
              persons={totper}
              cellules={tmp}
              data={tmp3}
            />
            <Card className=" md:w-3/4">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Rapports des cellules
                </CardTitle>
                <CardDescription>
                  Tous les rapports des cellules de maison.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className=" max-sm:max-h-[600px] overflow-auto md:grid  md:gap-3">
                  <MeetingsByDate dates={meetDates} usr={usr} />
                </div>

                {/*                 <ExportAllMeetings meetings={meetings} name={name} />

                <div className=" max-sm:max-h-[600px] overflow-auto md:grid  md:gap-3">
                  {meetings?.map((meet: any) => (
                    <MeetingItem key={meet.id} meeting={meet} usr={usr} />
                  ))}
                </div> */}
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
          </div>
        </TabsContent>
        <TabsContent value="evang">
          <div className="md:flex gap-2 justify-between">
            <EvangelisationGraph
              meetings={tmp2}
              persons={totper}
              cellules={tmp}
              data={tmp4}
            />
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Rapports évangélisation
                </CardTitle>
                <CardDescription>
                  {"Tous les rapports des sorties d'évangélisation."}
                </CardDescription>
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
          </div>
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Coordination</CardTitle>
              <CardDescription>
                Equipe de coordination des cellules.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {/*             <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div> */}
              {allMembers?.map((mbr: any, index: number) => (
                <div key={index} className="flex gap-2 max-md:text-xs">
                  <p>
                    {index + 1}. {mbr?.firstname}{" "}
                    <strong>{mbr?.lastname}</strong>{" "}
                  </p>
                  <p>{mbr?.mobile}</p>
                </div>
              ))}
            </CardContent>
            {/*         <CardFooter>
            <Button>Save password</Button>
          </CardFooter> */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

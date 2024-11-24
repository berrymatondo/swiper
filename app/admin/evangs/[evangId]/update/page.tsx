import { auth } from "@/auth";
import EvangForm from "@/components/evang/evangForm";
import MeetingForm from "@/components/meeting/meetingForm";
import NotAccess from "@/components/notAccess";
import PageLayout from "@/components/pageLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { getAllCels } from "@/lib/_celActions";
import { getAllZones } from "@/lib/_zoneActions";
import React from "react";

const EvangUpdatePage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const session = await auth();
  const usr: any = session?.user;

  const res = await getAllCels();
  const cellules = res?.data;

  const res2 = await getAllZones();
  const zones = res2?.data;

  //console.log("params: ", searchParams);

  // const res = await getZone(searchParams.zoneId);
  //const zone = await res?.data;
  //console.log("params.zoneId", params.zoneId);
  //console.log("ZONE", zones);

  if (usr?.role != "ADMIN" && usr?.role != "PILOTE") return <NotAccess />;

  return (
    <PageLayout
      title="Modifier un rapport"
      description="Cette page permet de modifier un raport"
    >
      <CustomBreadcrumb name="Modification rapport" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <EvangForm
          evangId={searchParams?.evangId}
          userSession={usr}
          cels={cellules}
          celId={searchParams?.celluleId}
          zones={zones}
          zoneId={searchParams?.zoneId}
          // name={searchParams?.name}
        />
      </div>
    </PageLayout>
  );
};

export default EvangUpdatePage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/evangs">{"Evangélisation"}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

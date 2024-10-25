import { auth } from "@/auth";
import MeetingForm from "@/components/meeting/meetingForm";
import MeetingFormDelete from "@/components/meeting/meetingFormDelete";
import PageLayout from "@/components/pageLayout";
import Title from "@/components/title";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ZoneForm from "@/components/zone/zoneForm";
import ZoneFormDelete from "@/components/zone/zoneFormDelete";
import { getAllCels } from "@/lib/_celActions";
import { getZone } from "@/lib/_zoneActions";
import React from "react";

const MeetingUpdatePage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  const session = await auth();
  const usr: any = session?.user;

  const res = await getAllCels();
  const cellules = await res?.data;
  //console.log("params: ", searchParams);

  // const res = await getZone(searchParams.zoneId);
  //const zone = await res?.data;
  //console.log("params.zoneId", params.zoneId);
  //console.log("ZONE", zone);

  return (
    <PageLayout
      title="Modifier un rapport"
      description="Cette page permet de modifier un raport"
    >
      <CustomBreadcrumb name="Modification rapport" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <MeetingForm
          meetingId={searchParams?.meetingId}
          userSession={usr}
          cels={cellules}
          celId={searchParams?.celluleId}
          // name={searchParams?.name}
        />
      </div>
    </PageLayout>
  );
};

export default MeetingUpdatePage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/meetings">Meetings</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

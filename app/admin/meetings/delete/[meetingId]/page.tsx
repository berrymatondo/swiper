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
import { getZone } from "@/lib/_zoneActions";
import React from "react";

const MeetingDeletePage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  // console.log("params: ", searchParams);

  // const res = await getZone(searchParams.zoneId);
  //const zone = await res?.data;
  //console.log("params.zoneId", params.zoneId);
  //console.log("ZONE", zone);

  return (
    <PageLayout
      title="Supprimerr un rapport"
      description="Cette page permet de supprimer un raport"
    >
      <CustomBreadcrumb name="Suppression rapport" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <MeetingFormDelete
          date={searchParams?.date}
          meetingId={searchParams?.meetingId}
          celluleId={searchParams?.celluleId}
          name={searchParams?.name}
        />
      </div>
    </PageLayout>
  );
};

export default MeetingDeletePage;

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

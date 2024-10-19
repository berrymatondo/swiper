import { auth } from "@/auth";
import MeetingForm from "@/components/meeting/meetingForm";
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
import React from "react";

const AddMeetingPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  //console.log("Paramsxxx", searchParams);
  const session = await auth();
  const usr: any = session?.user;
  const res = await getAllCels();
  const cellules = await res?.data;

  return (
    <PageLayout
      title="Nouveau rapport"
      description="Cette page permet de créer  un nouveau membre lié à une cellule d'impact"
    >
      <CustomBreadcrumb name={`Raport ${searchParams?.name}`} />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <MeetingForm
          cels={cellules}
          userSession={usr}
          celId={searchParams?.id}
        />
      </div>
    </PageLayout>
  );
};

export default AddMeetingPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
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

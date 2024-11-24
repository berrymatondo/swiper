import { auth } from "@/auth";
import NotAccess from "@/components/notAccess";
import PageLayout from "@/components/pageLayout";
import PersonForm from "@/components/person/personForm";
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

const AddMemberPage = async () => {
  const session = await auth();
  const usr: any = session?.user;
  const res = await getAllCels();
  const cellules = await res?.data;

  if (usr?.role != "ADMIN") return <NotAccess />;

  return (
    <PageLayout
      title="Nouveau nouveau membre"
      description="Cette page permet de créer  un nouveau membre lié à une cellule d'impact"
      usr={usr}
    >
      <CustomBreadcrumb name="Nouveau" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <PersonForm cels={cellules} userSession={usr} />
      </div>
    </PageLayout>
  );
};

export default AddMemberPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/members">Membres</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

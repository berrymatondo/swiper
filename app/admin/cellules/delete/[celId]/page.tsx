import { auth } from "@/auth";
import CelFormDelete from "@/components/cel/celFormDelete";
import NotAccess from "@/components/notAccess";
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
import { getCel } from "@/lib/_celActions";
import { getZone } from "@/lib/_zoneActions";
import React from "react";

type DeleteCelPageProps = {
  params: {
    celId: number;
  };
};

const DeleteCelPage = async ({ params }: DeleteCelPageProps) => {
  const res = await getCel(params.celId);
  const cel = await res?.data;
  //console.log("params.zoneId", params.zoneId);
  //console.log("ZONE", zone);

  const session = await auth();
  const usr: any = session?.user;
  if (usr?.role != "ADMIN" && usr?.role != "PILOTE") return <NotAccess />;

  return (
    <PageLayout
      title="Supprimer une cellule"
      description="Cette page permet de supprimer une cellule d'impact"
    >
      <CustomBreadcrumb name="Suppression cellule" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <CelFormDelete cel={cel} />
      </div>
    </PageLayout>
  );
};

export default DeleteCelPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/zones">Cellules</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

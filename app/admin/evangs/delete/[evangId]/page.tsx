import { auth } from "@/auth";
import EvangFormDelete from "@/components/evang/evangFormDelete";
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

import React from "react";

const EvangDeletePage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) => {
  // console.log("params: ", searchParams);

  // const res = await getZone(searchParams.zoneId);
  //const zone = await res?.data;
  //console.log("params.zoneId", params.zoneId);
  //console.log("ZONE", zone);

  const session = await auth();
  const usr: any = session?.user;
  if (usr?.role != "ADMIN" && usr?.role != "PILOTE") return <NotAccess />;

  return (
    <PageLayout
      title="Supprimerr un rapport"
      description="Cette page permet de supprimer un raport"
      usr={usr}
    >
      <CustomBreadcrumb name="Suppression rapport" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <EvangFormDelete
          date={searchParams?.date}
          evangId={searchParams?.evangId}
          celluleId={searchParams?.celluleId}
          place={searchParams?.place}
        />
      </div>
    </PageLayout>
  );
};

export default EvangDeletePage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/evangs">{"Evangélisations"}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

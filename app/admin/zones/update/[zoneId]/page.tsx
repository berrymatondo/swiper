import { auth } from "@/auth";
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
import { getAllPersons } from "@/lib/_personActions";
import { getZone } from "@/lib/_zoneActions";
import React from "react";

type UpdateZonePageProps = {
  params: {
    zoneId: number;
  };
};

const UpdateZonePage = async ({ params }: UpdateZonePageProps) => {
  const res = await getZone(params.zoneId);
  const zone = res?.data;

  const res1 = await getAllPersons();
  const persons = res1?.data;
  //console.log("params.zoneId", params.zoneId);
  //console.log("ZONE", zone); //
  const session = await auth();
  const usr: any = session?.user;
  if (usr?.role != "ADMIN") return <NotAccess />;

  return (
    <PageLayout
      title="Editer une zone"
      description="Cette page permet d'éditer une zone d'impact"
      usr={usr}
    >
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <ZoneForm zone={zone} persons={persons} />
      </div>
    </PageLayout>
  );
};

export default UpdateZonePage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/zones">Zones</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

import CelForm from "@/components/cel/celForm";
import PageLayout from "@/components/pageLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import ZoneForm from "@/components/zone/zoneForm";
import { getAddresses } from "@/lib/_adrActions";
import { getCel } from "@/lib/_celActions";
import { getAllZones, getZone } from "@/lib/_zoneActions";
import React from "react";

type UpdateCelPageProps = {
  params: {
    celId: number;
  };
};

const UpdateCelPage = async ({ params }: UpdateCelPageProps) => {
  const res = await getCel(params.celId);
  const cel = await res?.data;

  const res1 = await getAllZones();
  const allZones = await res1?.data;

  const res2 = await getAddresses();
  const allAddresses = await res2?.data;

  //console.log("params.zoneId", params.zoneId);
  //console.log("CEL", cel);

  return (
    <PageLayout
      title="Editer une cellule"
      description="Cette page permet d'éditer une cellule d'impact"
    >
      <CustomBreadcrumb name="Editer une cellule" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <CelForm cel={cel} allZones={allZones} addresses={allAddresses} />
      </div>
    </PageLayout>
  );
};

export default UpdateCelPage;

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

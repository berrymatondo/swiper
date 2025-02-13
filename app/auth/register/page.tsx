import { auth } from "@/auth";
import RegisterForm from "@/components/auth/registerForm";
import PageLayout from "@/components/pageLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getAllZones } from "@/lib/_zoneActions";
import React from "react";

const RagisterPage = async () => {
  const session = await auth();
  const usr: any = session?.user;

  if (usr?.role != "ADMIN") {
    return <div>{"Vous n'avez pas les autorisations nécessaires!"}</div>;
  }

  const res = await getAllZones();
  const zones = res?.data;

  return (
    <PageLayout
      title="Création compte utilisateur"
      description="cette page permet de créer un tulisateur pilote ou administrateur"
    >
      <CustomBreadcrumb name="Nouvel utilisateur" />

      <div className="max-w-[800px] mx-auto p-2">
        <RegisterForm zones={zones} />{" "}
      </div>
    </PageLayout>
  );
};

export default RagisterPage;

const CustomBreadcrumb = ({ name }: { name: string }) => {
  return (
    <Breadcrumb className=" p-2  bg-gray-100">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Accueil</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink href="/auth/users">Utilisateurs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="font-semibold">{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

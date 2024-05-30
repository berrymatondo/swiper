import PageLayout from "@/components/pageLayout";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import UserFormDelete from "@/components/user/userFormDelete";
import { getUser } from "@/lib/_authActions";

import React from "react";

type DeleteUserPageProps = {
  params: {
    userId: number;
  };
};

const DeleteUserPage = async ({ params }: DeleteUserPageProps) => {
  const res = await getUser(params.userId);
  const usr = await res?.data;
  //console.log("params.zoneId", params.zoneId);
  console.log("USR", usr);

  return (
    <PageLayout
      title="Supprimer utilisateur"
      description="Cette page permet de supprimer un utlisateur (pilote/ administrateur)"
    >
      <CustomBreadcrumb name="Suppression utilisateur" />
      <div className="max-w-[800px] mx-auto p-2 rounded-b-lg ">
        <UserFormDelete usr={usr} />
      </div>
    </PageLayout>
  );
};

export default DeleteUserPage;

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

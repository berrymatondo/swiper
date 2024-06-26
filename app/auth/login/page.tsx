import LoginForm from "@/components/auth/loginForm";
import PageLayout from "@/components/pageLayout";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const LoginPage = () => {
  return (
    <PageLayout
      title="Connexion"
      description="Cette page permet de se connecter en tant qu'administrateur ou pilote"
    >
      {" "}
      <CustomBreadcrumb name="Connexion" />
      <div className="max-w-[800px] mx-auto p-2">
        <LoginForm />
      </div>
    </PageLayout>
  );
};

export default LoginPage;

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

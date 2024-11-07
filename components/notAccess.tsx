import React from "react";
import Link from "next/link";

const NotAccess = () => {
  return (
    <div className="container flex flex-col gap-8 justify-center items-center mt-24">
      <p className="text-center rounded-xl p-4 bg-gray-200 ">
        {"Vous n'avez pas les droits pour accéder à cette page"}
      </p>
      <Link className="rounded-full  p-4 bg-sky-200 " href="/">
        {"Retourner à la page d'accueil"}
      </Link>
    </div>
  );
};

export default NotAccess;

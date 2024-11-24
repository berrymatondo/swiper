import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

const TranspilPage = async () => {
  const session = await auth();
  const usr: any = session?.user;

  if (usr?.role == "ADMIN" || usr?.role == "VISITOR") redirect(`/dashboard`);
  if (usr?.role != "PILOTE") redirect(`/cellules`);
  else redirect(`/cellules/${usr?.celluleId}`);
  return <div>TranspilPage</div>;
};

export default TranspilPage;

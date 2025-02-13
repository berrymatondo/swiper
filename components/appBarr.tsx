import { auth, signIn, signOut } from "@/auth";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import MobileNav from "./nav/mobile";
import NavMob from "./navMob";

const AppBar = async () => {
  const session = await auth();
  const usr: any = session?.user;

  //console.log("usr", usr);

  return (
    <div className="z-50 sticky top-0 gap-2 bg-white ">
      {session && session.user && (
        <div className="ml-auto">
          {session && session.user ? (
            <div>
              <div className="bg-gray-100 flex justify-between items-center p-2 md:container">
                <p>
                  <span className="text-sm">Welcome, </span>
                  {usr?.role == "PILOTE" && !usr?.zoneId && (
                    <span className="text-blue-600 text-sm font-semibold">
                      {usr?.role == "PILOTE" ? (
                        <Link href={`/cellules/${usr?.celluleId}`}>
                          {usr?.name}
                        </Link>
                      ) : (
                        session?.user?.name
                      )}
                    </span>
                  )}

                  {usr?.role != "ADMIN" && usr?.zoneId && (
                    <span className="text-blue-600 text-sm font-semibold">
                      {usr?.role != "ADMIN" && usr?.zoneId ? (
                        <Link href={`/zones/${usr?.zoneId}`}>{usr?.name}</Link>
                      ) : (
                        session?.user?.name
                      )}
                    </span>
                  )}
                </p>

                <div className="max-md:hidden">
                  <MobileNav usr={usr} />
                </div>

                <div className="flex gap-2 items-center">
                  <form
                    action={async () => {
                      "use server";
                      //await signOut();
                      await signOut({ redirectTo: "/", redirect: true });
                    }}
                  >
                    <button
                      className="m-1 p-1 text-xs text-white bg-red-600 rounded-full"
                      type="submit"
                    >
                      Se Déconnecter
                    </button>
                  </form>
                  <div className="sticky z-100 md:hidden">
                    <NavMob usr={usr} />
                  </div>
                </div>
              </div>
              {/*               <MobileNav />
               */}{" "}
            </div>
          ) : (
            <Link href="/auth/login">Sing IN</Link>
          )}
        </div>
      )}
    </div>
  );
};

export default AppBar;

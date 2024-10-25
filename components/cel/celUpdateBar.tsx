"use client";

import { useRouter } from "next/navigation";
import { BiEditAlt } from "react-icons/bi";
import { MdOutlineDeleteForever } from "react-icons/md";
import { Button } from "../ui/button";

type celUpdateBarProps = {
  usr: any;
  cel: any;
};

const CelUpdateBar = ({ usr, cel }: celUpdateBarProps) => {
  const router = useRouter();
  return (
    <div>
      <div className="md:hidden flex justify-between w-full gap-8">
        {usr?.role == "ADMIN" && (
          <MdOutlineDeleteForever
            className="text-red-400 bg-white rounded-full p-1"
            onClick={() => router.push(`/admin/cellules/delete/${cel.id}`)}
            size={30}
          />
        )}
        <BiEditAlt
          onClick={() => router.push(`/admin/cellules/update/${cel.id}`)}
          className="bg-blue-800 text-white rounded-full p-1"
          size={30}
        />{" "}
      </div>

      <div className="max-md:hidden flex justify-between w-full gap-8">
        {usr?.role == "ADMIN" && (
          <Button
            className="text-red-400 bg-white rounded-full"
            onClick={() => router.push(`/admin/cellules/delete/${cel.id}`)}
          >
            Supprimer
          </Button>
        )}

        {usr && (usr.role == "ADMIN" || usr.celluleId == cel.id) && (
          <Button
            onClick={() => router.push(`/admin/cellules/update/${cel.id}`)}
            className="bg-gray-600 text-white rounded-full"
          >
            Editer
          </Button>
        )}
      </div>
    </div>
  );
};

export default CelUpdateBar;

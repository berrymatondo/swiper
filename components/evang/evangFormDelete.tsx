"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { evangFormSchema } from "@/lib/schemas";
import { deleteEvang } from "@/lib/_evangActions";

type EvangFormDeleteProps = {
  evangId: any;
  celluleId: any;
  date: any;
  place: any;
};

const EvangFormDelete = ({
  evangId,
  celluleId,
  date,
  place,
}: EvangFormDeleteProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof evangFormSchema>>({
    resolver: zodResolver(evangFormSchema),
    defaultValues: {
      id: evangId ? evangId : undefined,
      date: date ? date : undefined,
      place: place ? place : " ",
    },
  });

  const procesForm = async (values: any) => {
    console.log("evangId,celluleId:", evangId, celluleId);

    const res = await deleteEvang(evangId, celluleId);

    if (!res) {
      console.log("Une erreur est srvenue...");
    }

    toast.success(
      `Le rapport du ${date} de la sortie à  ${place} a été supprimé avec succès.`,
      {
        description: new Date().toISOString().split("T")[0],
      }
    );

    router.push("/zones");
  };

  return (
    <div>
      <p className="text-center mb-4">
        {"Etes-vous sûr(e) de vouloir supprimer le rapport du "}
        {date.split("-").reverse().join("-")} {"de la sortie à "}
        <span className="font-semibold text-orange-600">{place}</span> {"?"}{" "}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(procesForm)}>
          <div className="flex justify-between items-center max-md:mt-8">
            <Button
              type="button"
              variant="secondary"
              className="text-red-600 max-md:mt-4"
              onClick={() => router.back()}
            >
              Annuler
            </Button>

            <Button
              onClick={async () => {
                // console.log("ICCCCC");
                await deleteEvang(evangId, celluleId);
                router.push(`/cellules/${celluleId}`);
              }}
              className="max-md:mt-4"
              type="button"
            >
              Confirmer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EvangFormDelete;

"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zoneFormSchema } from "@/lib/schemas";
import { z } from "zod";
import { toast } from "sonner";
import { deleteZone } from "@/lib/_zoneActions";

type ZoneFormDeleteProps = {
  zone: any;
};

const ZoneFormDelete = ({ zone }: ZoneFormDeleteProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof zoneFormSchema>>({
    resolver: zodResolver(zoneFormSchema),
    defaultValues: {
      id: zone?.id ? zone.id : undefined,
      name: zone?.name ? zone?.name : "",
      respoId: zone?.respoId ? zone?.respoId : undefined,
      status: zone?.status ? zone?.status : "INACTIF",
    },
  });

  const procesForm = async (values: z.infer<typeof zoneFormSchema>) => {
    // console.log("Value:", values);
    // console.log("Zone:", zone);

    const res = await deleteZone(zone.id);

    if (!res) {
      console.log("Une erreur est srvenue...");
    }

    /*     if (res!.error) {
      console.log(res!.error);
      return;
    } */

    toast.success(`La zone ${values.name} a été supprimée avec succès.`, {
      description: new Date().toISOString().split("T")[0],
    });

    router.push("/zones");
  };

  return (
    <div>
      <p className="text-center mb-4">
        {"Etes-vous sûr(e) de vouloir supprimer la zone "}{" "}
        <span className="font-semibold text-orange-600">{zone.name}</span> {"?"}{" "}
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

            <Button className="max-md:mt-4" type="submit">
              Confirmer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ZoneFormDelete;

"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { deleteCel } from "@/lib/_celActions";
import { deleteAddress } from "@/lib/_adrActions";

type AdrFormDeleteProps = {
  adr: any;
};

const AdrFormDelete = ({ adr }: AdrFormDeleteProps) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      id: adr?.id ? adr?.id : undefined,
      street: adr?.street ? adr?.street : "",
    },
  });

  const procesForm = async () => {
    const res = await deleteAddress(adr.id);

    if (!res) {
      console.log("Une erreur est srvenue...");
    }

    /*     if (res!.error) {
      console.log(res!.error);
      return;
    } */

    toast.success(`L'adresse hôte ${adr.street} a été supprimée avec succès.`, {
      description: new Date().toISOString().split("T")[0],
    });

    router.push("/addresses");
  };

  return (
    <div>
      <p className="text-center mb-4">
        {"Etes-vous sûr(e) de vouloir supprimer l'adresse "}{" "}
        <span className="font-semibold text-orange-600">{adr.street}</span>{" "}
        {"?"}{" "}
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

export default AdrFormDelete;

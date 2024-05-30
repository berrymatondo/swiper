"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { deleteCel } from "@/lib/_celActions";
import { deletePerson } from "@/lib/_personActions";

type PerFormDeleteProps = {
  per: any;
};

const PerFormDelete = ({ per }: PerFormDeleteProps) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      id: per?.id ? per.id : undefined,
      firstname: per?.firstname ? per?.firstname : "",
      lastname: per?.lastname ? per?.lastname : "",
    },
  });

  const procesForm = async () => {
    const res = await deletePerson(per.id);

    if (!res) {
      console.log("Une erreur est srvenue...");
    }

    /*     if (res!.error) {
      console.log(res!.error);
      return;
    } */

    toast.success(
      `La membre ${per.firstname} ${per.lastname} a été supprimé avec succès.`,
      {
        description: new Date().toISOString().split("T")[0],
      }
    );

    router.push("/members");
  };

  return (
    <div>
      <p className="text-center mb-4">
        {"Etes-vous sûr(e) de vouloir supprimer la zone "}{" "}
        <span className="font-semibold text-orange-600">
          {per.firstname} {per.lastname}
        </span>{" "}
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

export default PerFormDelete;

"use client";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { deleteZone } from "@/lib/_zoneActions";
import { meetingFormSchema } from "@/lib/schemas";
import { deleteMeeting } from "@/lib/_meetingActions";

type MeetingFormDeleteProps = {
  meetingId: any;
  celluleId: any;
  date: any;
  name: any;
};

const MeetingFormDelete = ({
  meetingId,
  celluleId,
  date,
  name,
}: MeetingFormDeleteProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof meetingFormSchema>>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      id: meetingId ? meetingId : undefined,
      //  name: meeting?.name ? meeting?.name : "",
      date: date ? date : undefined,
    },
  });

  const procesForm = async (values: z.infer<typeof meetingFormSchema>) => {
    // console.log("Value:", values);
    // console.log("Zone:", zone);

    const res = await deleteMeeting(meetingId, celluleId);

    if (!res) {
      console.log("Une erreur est srvenue...");
    }

    /*     if (res!.error) {
      console.log(res!.error);
      return;
    } */

    toast.success(
      `Le rapport du ${date} de la cellule  ${name} a été supprimé avec succès.`,
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
        {date.split("-").reverse().join("-")} {"de la cellule "}
        <span className="font-semibold text-orange-600">{name}</span> {"?"}{" "}
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

export default MeetingFormDelete;

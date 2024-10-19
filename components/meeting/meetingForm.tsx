"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import * as z from "zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { addZone, getAllZones, updateZone } from "@/lib/_zoneActions";
import { useRouter } from "next/navigation";
import { Cellule, Zone, ZonesStatuses } from "@prisma/client";
import { addCel, updateCel } from "@/lib/_celActions";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { meetingFormSchema } from "@/lib/schemas";
import { addMeeting, updateMeeting } from "@/lib/_meetingActions";
import { Textarea } from "../ui/textarea";

type PersonFormProps = {
  mbr?: any;
  cels?: any;
  celId?: any;
  userSession: any;
};

export const MeetingForm = ({
  cels,
  mbr,
  celId,
  userSession,
}: PersonFormProps) => {
  const router = useRouter();
  const [zones, setZones] = useState<any>();
  const [addresses, setAddresses] = useState<any>();

  //console.log("allZones:", allZones);
  //console.log("mbr:", mbr);
  //  console.log("cels:", cels);

  // console.log("Date:", new Date().toISOString().split("T")[0].toString());
  // console.log("celId", celId);
  //console.log("mbr", mbr);

  const form = useForm<z.infer<typeof meetingFormSchema>>({
    resolver: zodResolver(meetingFormSchema),
    defaultValues: {
      id: mbr?.id ? mbr.id : undefined,
      date: new Date().toISOString().split("T")[0].toString(),
      nHom: mbr?.nHom ? mbr?.nHom : "0",
      nFem: mbr?.nFem ? mbr?.nFem : "0",
      nEnf: mbr?.nEnf ? mbr?.nEnf : "0",
      nNew: mbr?.nNew ? mbr?.nNew : "0",
      celluleId: celId ? celId.toString() : "",
      notes: mbr?.notes ? mbr?.notes : "",
    },
  });

  /*   useEffect(() => {
    //   console.log("iciiiiiiii");

    const fetchZones = async () => {
      const res = await getAllZones();
      const data = await res?.data;

      // console.log("actions: ", data);

      setZones(data);
    };
    fetchZones();

     const fetchAddresses = async () => {
      const data = await getAddresses();
      //const data = res.json();

      //console.log("adresses: ", data);

      setAddresses(data);
    };
    fetchAddresses();
  }, []);
 */
  // Process Form

  /*   const icc = form.watch("isIcc");
  const star = form.watch("isStar");
  const pilote = form.watch("isPilote");
  const respo = form.watch("isRespo");
  const gest = form.watch("isGest"); */
  //const sel = form.watch("giId");

  const procesForm = async (values: z.infer<typeof meetingFormSchema>) => {
    //console.log("Value:", values);
    // console.log("Zone:", zone);

    let res;
    if (mbr) res = await updateMeeting(values);
    else res = await addMeeting(values);

    if (!res) {
      console.log("Une erreur est srvenue...");
    }

    if (res!.error) {
      console.log(res!.error);
      return;
    }

    if (mbr)
      toast.success(`Le rapport a été modifié avec succès.`, {
        description: new Date().toISOString().split("T")[0],
      });
    else
      toast.success(`Le rapport a été créé avec succès.`, {
        description: new Date().toISOString().split("T")[0],
      });

    // if (!mbr?.id && celId) {
    router.push(`/cellules/${celId}`);
    /*     } else {
      router.push("/members");
    } */
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(procesForm)}>
          <div className="grid gap-4 py-4">
            <div className="grid md:grid-cols-2 md:gap-4 ">
              {/*               <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Date du rapport"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le prénom"
                          type="text"
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              /> */}

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => {
                  return (
                    <FormItem className="w-1/2">
                      <FormLabel>{"Date du rapport "}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer la date"
                          type="date"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="celluleId"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Cellule </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={celId ? true : false}
                      >
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Sélectionner une cellule" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {cels?.map((cel: Cellule) => (
                            <SelectItem key={cel.id} value={cel.id.toString()}>
                              {cel.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="grid md:grid-cols-2 md:gap-4 ">
              <FormField
                control={form.control}
                name="nHom"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Hommes "}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le nombre d'hommes"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="nFem"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Femmes "}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le nombre de femmes"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="grid md:grid-cols-2 md:gap-4 ">
              <FormField
                control={form.control}
                name="nEnf"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Enfants"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le nombre d'enfants"
                          type="number"
                          step={1}
                          className=""
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="nNew"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Nouveaux "}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le nombre de nouveaux"
                          type="number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{"Notes "}</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Entrer le nombre de nouveaux"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
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
              Enregistrer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default MeetingForm;

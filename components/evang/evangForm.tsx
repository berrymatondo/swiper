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
import { useRouter } from "next/navigation";
import { Cellule, Zone } from "@prisma/client";

import { Textarea } from "../ui/textarea";
import { evangFormSchema } from "@/lib/schemas";
import { addEvang, getEvang, updateEvang } from "@/lib/_evangActions";

type EvangFormProps = {
  mbr?: any;
  cels?: any;
  zones?: any;
  celId?: any;
  zoneId?: any;
  evangId?: any;
  userSession: any;
};

export const EvangForm = ({
  cels,
  zones,
  mbr,
  celId,
  zoneId,
  evangId,
  userSession,
}: EvangFormProps) => {
  const router = useRouter();
  const [evang, setEvang] = useState<any>();

  //console.log("cels: ", cels);
  //console.log("zones:", zones);
  // console.log("cels:", cels);

  // console.log("Date:", new Date().toISOString().split("T")[0].toString());
  //console.log("celId", celId);
  //console.log("mbr ", mbr);

  const form = useForm<z.infer<typeof evangFormSchema>>({
    resolver: zodResolver(evangFormSchema),
    defaultValues: {
      id: mbr?.id ? mbr.id : undefined,
      date: new Date().toISOString().split("T")[0].toString(),
      place: mbr?.place ? mbr?.place : "",
      start: mbr?.start ? mbr?.start : "13h00",
      end: mbr?.end ? mbr?.end : "17h00",
      nPar: mbr?.nPar ? mbr?.nPar : "0",
      nEva: mbr?.nEva ? mbr?.nEva : "0",
      nGag: mbr?.nGag ? mbr?.nGag : "0",
      nCon: mbr?.nCon ? mbr?.nCon : "0",
      nInv: mbr?.nInv ? mbr?.nInv : "0",
      nVen: mbr?.nVen ? mbr?.nVen : "0",
      celluleId: celId ? celId.toString() : "",
      zoneId: zoneId ? zoneId.toString() : "",
      //zoneId: "33",
      notes: mbr?.notes ? mbr?.notes : "",
    },
  });

  useEffect(() => {
    const fetchMeeting = async () => {
      const res = await getEvang(evangId);
      const data = res?.data;

      console.log("Enag: ", data);
      //  console.log("meetingId:", meetingId);

      setEvang(data);

      form.setValue("id", evangId);
      form.setValue("date", data?.date as string);
      form.setValue("place", data?.place as string);
      form.setValue("start", data?.start as string);
      form.setValue("end", data?.end as string);
      form.setValue("celluleId", data?.celluleId?.toString());
      form.setValue("zoneId", data?.zoneId?.toString());
      form.setValue("nPar", data?.nPar ? data?.nPar.toString() : "0");
      form.setValue("nEva", data?.nEva ? data?.nEva.toString() : "0");
      form.setValue("nGag", data?.nGag ? data?.nGag.toString() : "0");
      form.setValue("nCon", data?.nCon ? data?.nCon.toString() : "0");
      form.setValue("nInv", data?.nInv ? data?.nInv.toString() : "0");
      form.setValue("nVen", data?.nVen ? data?.nVen.toString() : "0");
      form.setValue("notes", data?.notes?.toString());
    };
    if (evangId) fetchMeeting();
  }, [form, evangId]);

  //console.log("meetingId", meetingId);

  /* useEffect(() => {
    form.setValue("id", optIn?.id);
   form.setValue("code", pathname.split("/")[3]);
    form.setValue("valuationType", optIn?.valType);
    form.setValue("maturityDate", optIn?.maturityDate);
    form.setValue("issueDate", optIn?.issueDate);
    form.setValue("firstCouponDate", optIn?.firstCouponDate);
 
    form.setValue("modality", optIn?.modality.toString());
    form.setValue("couponRate", optIn?.couponRate.toString());
    form.setValue("couponBasis", optIn?.couponBasis.toString());

    form.setValue("maturity", optIn?.maturity?.toString());
    form.setValue("rating", optIn?.rating?.toString());
    form.setValue("notional", optIn?.notional?.toString());

    form.setValue("issuePrice", (optIn?.bondPrice * 100).toFixed(2).toString());
    form.setValue("obsPrice", (optIn?.bondPrice * 100).toFixed(2).toString());
    form.setValue("duration", optIn?.duration?.toFixed(2).toString());
    form.setValue("recovering", optIn?.recovering?.toString()); 
  }, [form]);*/

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

  const procesForm = async (values: z.infer<typeof evangFormSchema>) => {
    console.log(" Value: ", values);
    console.log("evangId :", evangId);
    // console.log("Zone:", zone);

    let res;
    if (evangId) res = await updateEvang(values, evangId);
    else res = await addEvang(values);

    if (!res) {
      console.log("Une erreur est srvenue...");
    }

    if (res!.error) {
      console.log(res!.error);
      return;
    }

    if (evangId)
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
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => {
                  return (
                    <FormItem className="hidden">
                      <FormLabel>{"Id"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le prénom"
                          type="text"
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

              <FormField
                control={form.control}
                name="zoneId"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Zone de la cellule </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Sélectionner une zone" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {zones?.map((zone: Zone) => (
                            <SelectItem
                              key={zone.id}
                              value={zone.id.toString()}
                            >
                              {zone.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {/*               <FormField
                control={form.control}
                name="zoneId"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Zone </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={zoneId ? true : false}
                      >
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Sélectionner une zone" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {zones?.map((cel: Zone) => (
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
              /> */}
            </div>
            <div className="grid md:grid-cols-2 md:gap-4 ">
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
                name="place"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Lieu "}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le lieu"
                          type="text"
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
                name="start"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"heure de Début "}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer l'heure de début"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="end"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Heure de fin "}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer l'heure de fin"
                          type="text"
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
                name="nPar"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Participants "}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le nombre de particiants"
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
                name="nEva"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Evangélisées "}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le nombre de personnes évangélisées"
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
                name="nGag"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Gagnées"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le nombre d'âmes gagnées"
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
                name="nCon"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Contacts "}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le nombre de contacts pris"
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
                name="nInv"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Invités"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le nombre d'invités"
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
                name="nVen"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Invités venus"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le nombre d'invités venus"
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
                        placeholder="Entrer une note si nécessaire"
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

export default EvangForm;

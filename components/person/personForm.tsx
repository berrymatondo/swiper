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
import { personFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { addZone, getAllZones, updateZone } from "@/lib/_zoneActions";
import { useRouter } from "next/navigation";
import { Cellule, Zone, ZonesStatuses } from "@prisma/client";
import { addCel, updateCel } from "@/lib/_celActions";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { addPerson, updatePerson } from "@/lib/_personActions";

type PersonFormProps = {
  mbr?: any;
  cels?: any;
  celId?: any;
};

export const PersonForm = ({ cels, mbr, celId }: PersonFormProps) => {
  const router = useRouter();
  const [zones, setZones] = useState<any>();
  const [addresses, setAddresses] = useState<any>();

  //console.log("allZones:", allZones);
  //console.log("mbr:", mbr);
  //  console.log("cels:", cels);

  const form = useForm<z.infer<typeof personFormSchema>>({
    resolver: zodResolver(personFormSchema),
    defaultValues: {
      id: mbr?.id ? mbr.id : undefined,
      firstname: mbr?.firstname ? mbr?.firstname : "",
      lastname: mbr?.lastname ? mbr?.lastname : "",
      email: mbr?.email ? mbr?.email : "",
      mobile: mbr?.mobile ? mbr?.mobile : "",
      celluleId: celId
        ? celId.toString()
        : mbr?.celluleId
        ? mbr?.celluleId.toString()
        : "",
      isIcc: mbr?.isIcc ? mbr?.isIcc : false,
      isStar: mbr?.isStar ? mbr?.isStar : false,
      isPilote: mbr?.isPilote ? mbr?.isPilote : false,
      isRespo: mbr?.isRespo ? mbr?.isRespo : false,
      isGest: mbr?.isGest ? mbr?.isGest : false,
      /*       id: cel?.id ? cel.id : undefined,
      name: cel?.name ? cel?.name : "",
      days: cel?.days ? cel?.days : "Tous les jeudis",
      hours: cel?.hours ? cel?.hours : "De 19h à 20h30",
      zoneId: cel?.zoneId.toString(),
           respoId: zone?.respoId ? zone?.respoId : undefined,
        status: cel?.statut ? cel?.statut : "INACTIF", */
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

  const icc = form.watch("isIcc");
  const star = form.watch("isStar");
  const pilote = form.watch("isPilote");
  const respo = form.watch("isRespo");
  const gest = form.watch("isGest");
  //const sel = form.watch("giId");

  const procesForm = async (values: z.infer<typeof personFormSchema>) => {
    //console.log("Value:", values);
    // console.log("Zone:", zone);

    let res;
    if (mbr) res = await updatePerson(values);
    else res = await addPerson(values);

    if (!res) {
      console.log("Une erreur est srvenue...");
    }

    if (res!.error) {
      console.log(res!.error);
      return;
    }

    if (mbr)
      toast.success(
        `Les données de  ${values.firstname}  ${values.lastname} a été modifiée avec succès.`,
        {
          description: new Date().toISOString().split("T")[0],
        }
      );
    else
      toast.success(
        `Le membre ${values.firstname}  ${values.lastname} a été créée avec succès.`,
        {
          description: new Date().toISOString().split("T")[0],
        }
      );

    if (!mbr?.id && celId) {
      router.push(`/cellules/${celId}`);
    } else {
      router.push("/members");
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(procesForm)}>
          <div className="grid gap-4 py-4">
            <div className="grid md:grid-cols-2 md:gap-4 ">
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Prénom"}</FormLabel>
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
              />
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Nom "}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le nom"
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
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Email"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer l'adresse email"
                          type="text"
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
                name="mobile"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Téléphone "}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le téléphone"
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
            </div>
            <div className="grid gap-2 md:grid-cols-2">
              <FormField
                control={form.control}
                name="isIcc"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <Label className="ml-2" htmlFor="isIcc">
                        Etes-vous un membre des églises ICC ?
                      </Label>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              {icc && (
                <FormField
                  control={form.control}
                  name="isStar"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <Label className="ml-2" htmlFor="isStar">
                          Etes-vous un(e) S.T.A.R ?
                        </Label>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}

              {!celId && icc && (
                <FormField
                  control={form.control}
                  name="isPilote"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <Label className="ml-2" htmlFor="isStar">
                          {"Etes-vous pilote d'une celle d'impact ?"}
                        </Label>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}

              {!celId && icc && (
                <FormField
                  control={form.control}
                  name="isRespo"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <Label className="ml-2" htmlFor="isStar">
                          {"Etes-vous hôte d'une cellule d'impact ?"}
                        </Label>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}

              {!celId && icc && star && (
                <FormField
                  control={form.control}
                  name="isGest"
                  render={({ field }) => {
                    return (
                      <FormItem className="w-full">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <Label className="ml-2" htmlFor="isStar">
                          Etes-vous membre du MCI (MGI) ?
                        </Label>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              )}
            </div>
            {/*             {zones?.length > 0 && (
             */}{" "}
            {/*             <FormField
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
                        {allZones.map((zone: Zone) => (
                          <SelectItem key={zone.id} value={zone.id.toString()}>
                            {zone.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}
            {/*             )}
             */}
            {/*               <FormField
                control={form.control}
                name="addressId"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Adresse de la cellule d'impact"} </FormLabel>
                      <Select onValueChange={field.onChange}>
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Sélectionner un secteur" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {addresses.map((address: Address) => (
                            <SelectItem
                              key={address.id}
                              value={address.id.toString()}
                            >
                              {address.street}, {address.number}{" "}
                              {address.postalCode} {address.municipality}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
 */}
            {/*             <FormField
              control={form.control}
              name="days"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{"Jours de la cellule"}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Entrer les jours de la cellule"
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
              name="hours"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{"Heures de la cellule"}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Entrer les heures de la cellule"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}
            {/*             {cel && (
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Statut de la cellule </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger id="framework">
                          <SelectValue placeholder="Sélectionner une zone" />
                        </SelectTrigger>
                        <SelectContent position="popper">
            
                          {Object.values(ZonesStatuses)
                            ? Object.values(ZonesStatuses).map(
                                (status: any) => (
                                  <SelectItem key={status} value={status}>
                                    {status}
                                  </SelectItem>
                                )
                              )
                            : null}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )} */}
            {/*             <FormField
              control={form.control}
              name="status"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Statut de la zone </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Sélectionner une zone" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {Object.values(ZonesStatuses)
                          ? Object.values(ZonesStatuses).map((status: any) => (
                              <SelectItem key={status} value={status}>
                                {status}
                              </SelectItem>
                            ))
                          : null}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}
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

export default PersonForm;

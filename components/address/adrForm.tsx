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
import { adrFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

import { addAddress, setGeoLoc, updateAddress } from "@/lib/_adrActions";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";

type AdrFormProps = {
  adr?: any;
  allZones?: any;
};

export const AdrForm = ({ adr, allZones }: AdrFormProps) => {
  const router = useRouter();
  const [zones, setZones] = useState<any>();
  const [addresses, setAddresses] = useState<any>();

  //console.log("allZones:", allZones);
  //console.log("adr:", adr.id);

  const form = useForm<z.infer<typeof adrFormSchema>>({
    resolver: zodResolver(adrFormSchema),
    defaultValues: {
      id: adr?.id ? adr.id.toString() : undefined,
      street: adr?.street ? adr?.street : "",
      number: adr?.number ? adr?.number : "",
      box: adr?.box ? adr?.box : "",
      postalCode: adr?.postalCode ? adr?.postalCode : "",
      city: adr?.city ? adr?.city : "",
      municipality: adr?.municipality ? adr?.municipality : "",
      country: adr?.country ? adr?.country : "",
      latitude: adr?.latitude ? adr?.latitude : "",
      longitude: adr?.longitude ? adr?.longitude : "",
      hide: adr?.hide ? adr?.hide : false,
      /*       respoId: zone?.respoId ? zone?.respoId : undefined,
       */
      //status: cel?.statut ? cel?.statut : "INACTIF",
    },
  });

  const hide = form.watch("hide");

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
  const procesForm = async (values: z.infer<typeof adrFormSchema>) => {
    //console.log("Value:", values);
    // console.log("Zone:", zone);

    let res;

    if (adr) res = await updateAddress(values);
    else res = await addAddress(values);

    if (!res) {
      console.log("Une erreur est srvenue...");
    }

    if (res!.error) {
      console.log(res!.error);
      return;
    }

    // Set GeoLoc
    const geoLoc = await setGeoLoc(res?.data);
    //console.log("LOG:", geoLoc?.data);

    if (!geoLoc) {
      toast.warning(
        "Aucune géo localisation pour cette adresse, veuillez contacter un administrateur."
      );
    }

    /*     if (adr)
      toast.success(
        `L'adresse sur ${values.street} a été modifiée avec succès.`,
        {
          description: new Date().toISOString().split("T")[0],
        }
      );
    else
      toast.success(`L'adresse sur ${values.street} a été créée avec succès.`, {
        description: new Date().toISOString().split("T")[0],
      }); */

    router.push("/addresses");
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(procesForm)}>
          <div className="grid gap-4 py-4">
            <div className="flex max-md:flex-col justify-between gap-4 max-md:gap-2">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>{"Avenue / Rue"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer l'avenue, rue"
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
                name="number"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>{"Numéro"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le numéro"
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
                name="box"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>{"Boîte"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer la boîte"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex max-md:flex-col justify-between gap-4  max-md:gap-2">
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>{"Code Postal"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le code postal"
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
                name="municipality"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>{"Commune/Municipalité"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer la commune"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex max-md:flex-col justify-between gap-4  max-md:gap-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>{"Ville"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le nom de la ville"
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
                name="country"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>{"Pays "}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer le nom du pays"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex max-md:flex-col justify-between gap-4  max-md:gap-2">
              <FormField
                control={form.control}
                name="longitude"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>{"Longitude"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer la longitude"
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
                name="latitude"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>{"Latitude "}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Entrer la latitude"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
            <div className="flex max-md:flex-col justify-between gap-4  max-md:gap-2">
              <FormField
                control={form.control}
                name="hide"
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
                        Cacher mon adresse ?
                      </Label>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
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

export default AdrForm;

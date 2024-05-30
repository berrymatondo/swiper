"use client";
import React from "react";
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
import { zoneFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { addZone, updateZone } from "@/lib/_zoneActions";
import { useRouter } from "next/navigation";
import { Zone, ZonesStatuses } from "@prisma/client";

type ZoneFormProps = {
  zone?: any;
};

export const ZoneForm = ({ zone }: ZoneFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof zoneFormSchema>>({
    resolver: zodResolver(zoneFormSchema),
    defaultValues: {
      id: zone?.id ? zone.id : undefined,
      name: zone?.name ? zone?.name : "",
      respoId: zone?.respoId ? zone?.respoId : undefined,
      status: zone?.statut ? zone?.statut : "INACTIF",
    },
  });

  // Process Form
  const procesForm = async (values: z.infer<typeof zoneFormSchema>) => {
    // console.log("Value:", values);
    // console.log("Zone:", zone);

    let res;
    if (zone) res = await updateZone(values);
    else res = await addZone(values);

    if (!res) {
      console.log("Une erreur est srvenue...");
    }

    if (res!.error) {
      console.log(res!.error);
      return;
    }

    if (zone)
      toast.success(`La zone ${values.name} a été modifiée avec succès.`, {
        description: new Date().toISOString().split("T")[0],
      });
    else
      toast.success(`La zone ${values.name} a été créée avec succès.`, {
        description: new Date().toISOString().split("T")[0],
      });

    router.push("/zones");
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(procesForm)}>
          <div className="grid gap-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{"Nom de la zone"}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Entrer le nom la zone"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {zone && (
              <FormField
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
                          {/*                         <SelectItem className="text-red-600" value="00">
                          {"Aucun statut"}
                        </SelectItem> */}
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
            )}
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

export default ZoneForm;

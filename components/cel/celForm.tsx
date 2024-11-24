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
import { celFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { addZone, getAllZones, updateZone } from "@/lib/_zoneActions";
import { useRouter } from "next/navigation";
import { Address, Zone, ZonesStatuses } from "@prisma/client";
import { addCel, updateCel } from "@/lib/_celActions";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";

type CelFormProps = {
  cel?: any;
  allZones?: any;
  addresses?: any;
  usr?: any;
};

export const CelForm = ({ cel, allZones, addresses, usr }: CelFormProps) => {
  const router = useRouter();
  const [zones, setZones] = useState<any>();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  //console.log("allZones:", allZones);
  //console.log("cel:", cel);
  //console.log("cel?.addressId:", cel?.addressId);

  const form = useForm<z.infer<typeof celFormSchema>>({
    resolver: zodResolver(celFormSchema),
    defaultValues: {
      id: cel?.id ? cel.id : undefined,
      name: cel?.name ? cel?.name : "",
      days: cel?.days ? cel?.days : "Tous les jeudis",
      hours: cel?.hours ? cel?.hours : "De 19h à 20h30",
      grpWhatsApp: cel?.grpWhatsApp ? cel?.grpWhatsApp : "",
      ban: cel?.ban ? cel?.ban : "",
      zoneId: cel?.zoneId?.toString(),
      addressId: cel?.addressId ? cel?.addressId.toString() : "",
      /*       respoId: zone?.respoId ? zone?.respoId : undefined,
       */ status: cel?.statut ? cel?.statut : "INACTIF",
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
  const procesForm = async (values: z.infer<typeof celFormSchema>) => {
    //  console.log("Value: ", values);
    // console.log("Zone:", zone);

    let res;
    if (cel) res = await updateCel(values);
    else res = await addCel(values);

    if (!res) {
      console.log("Une erreur est srvenue...");
    }

    if (res!.error) {
      console.log(res!.error);
      return;
    }

    if (cel)
      toast.success(`La cellule ${values.name} a été modifiée avec succès.`, {
        description: new Date().toISOString().split("T")[0],
      });
    else
      toast.success(`La cellule ${values.name} a été créée avec succès.`, {
        description: new Date().toISOString().split("T")[0],
      });

    router.push("/cellules");
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
                    <FormLabel>{"Nom de la cellule"}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Entrer le nom la cellule"
                        type="text"
                        disabled={usr?.role == "ADMIN" ? false : true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/*             {zones?.length > 0 && (
             */}{" "}
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
                      disabled={usr?.role == "ADMIN" ? false : true}
                    >
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Sélectionner une zone" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {allZones?.map((zone: Zone) => (
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
            />
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
            <FormField
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
            />
            {cel && (
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
                        disabled={usr?.role == "ADMIN" ? false : true}
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
            {/*             {addresses && (
              <FormField
                control={form.control}
                name="addressId"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>{"Adresse de la cellule d'impact"} </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
            )} */}
            {/*             <FormField
              control={form.control}
              name="addressId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Adresse combo</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-[200px] justify-between"
                        >
                          {value
                            ? addresses.find(
                                (framework: any) => framework.value === value
                              )?.label
                            : "Selectionner une adresse..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search framework..." />
                          <CommandList>
                            <CommandEmpty>No framework found.</CommandEmpty>
                            <CommandGroup>
                              {addresses.map((framework: Address) => (
                                <CommandItem
                                  key={framework.id}
                                  value={framework.street}
                                  onSelect={(currentValue) => {
                                    setValue(
                                      currentValue === value ? "" : currentValue
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      value === framework.street
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {framework.street}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}
            <FormField
              control={form.control}
              name="addressId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Adresse de la cellule </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={usr?.role == "ADMIN" ? false : true}
                    >
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Sélectionner une adresse" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        {addresses?.map((adr: Address) => (
                          <SelectItem key={adr.id} value={adr.id.toString()}>
                            {adr.street}, {adr.number} {adr.postalCode}{" "}
                            {adr.municipality}
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
              name="grpWhatsApp"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{"Groupe WhatsApp"}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Entrer le groupe WhatsApp"
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
              name="ban"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{"Bannière"}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Entrer le lien de la bannière"
                        type="text"
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

export default CelForm;

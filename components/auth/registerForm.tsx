"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { RegisterSchema } from "@/lib/schemas";
import { registerUser, updateUser } from "@/lib/_authActions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Cellule } from "@prisma/client";
import { getAllCels } from "@/lib/_celActions";
import { useRouter } from "next/navigation";
import { log } from "console";

type RegisterFormProps = {
  usr?: any;
  cels?: any;
};

const RegisterForm = ({ usr }: RegisterFormProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cels, setCels] = useState<any>();

  console.log("usr: ", usr);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      id: usr?.id ? usr.id : undefined,
      username: usr ? usr.username : "",
      //email: "",
      password: usr ? "******" : "",
      confirmPassword: usr ? "******" : "",
      /*       isClient: false,*/
      isAdmin: usr?.role == "ADMIN" ? true : false,
      celluleId: usr?.celluleId ? usr?.celluleId.toString() : "",
    },
  });
  useEffect(() => {
    const fetchCels = async () => {
      const res = await getAllCels();
      const data = await res?.data;

      setCels(data);

      //console.log("data celes: ", data);
    };
    fetchCels();
  }, []);

  //const client = form.watch("isClient");
  const admin = form.watch("isAdmin");

  const procesForm = async (values: z.infer<typeof RegisterSchema>) => {
    setLoading(true);
    console.log("Value: ", values);
    console.log("usr: ", usr);

    // const result = await registerUser(values);
    let res;
    if (usr) res = await updateUser(values);
    else res = await registerUser(values);

    // console.log("result registerForm:", result);
    //console.log("result registerForm:", result?.success);

    /*     if (result?.success) {
      //console.log({ data: result.data });
      toast.success("Utilisateur créé avec succès");
      form.reset();
      //  return;
    } else {
      //console.log(result?.error);
      toast.error(JSON.stringify(result?.error));
    } */

    /*     const res = await addGiAction(values);

    if (!res) {
      console.log("Une erreur est sub...");
    }

    if (res!.error) {
      //console.log(res!.error);
      return;
    }

    toast.success("Groupe d'impact créé avec succès.", {
      description: new Date().toISOString().split("T")[0],
    });
    setOpen(false); */

    console.log("res:", res);

    if (!res) {
      console.log("Une erreur est srvenue...");
    }

    if (res?.error) {
      //console.log(res?.error);
      setLoading(false);
      toast.error(` ${res?.error}`, {
        description: new Date().toISOString().split("T")[0],
      });
      return;
    }

    if (usr)
      toast.success(
        `Les données de l'utilisateur ${values.username} ont été modifiées avec succès.`,
        {
          description: new Date().toISOString().split("T")[0],
        }
      );
    else
      toast.success(
        `L'utilisateur ${values.username}  a été créée avec succès.`,
        {
          description: new Date().toISOString().split("T")[0],
        }
      );

    setLoading(false);
    router.push("/auth/users");

    /*     setLoading(false);
    router.push("/auth/users"); */
  };

  return (
    <div
    /*       headerLabel={
        client
          ? "Créer un nouveau compte client"
          : "Créer un nouveau compte agent"
      }
      backButtonLabel="J'ai déjà un compte ?"
      title="Nouveau compte"
      backButtonHref="/auth/login" */
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(procesForm)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{"Nom d'utilisateur"}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Entrer le nom de l'utilisateur"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/*             <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{"Email"}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Entrer une adresse mail"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{"Mot de passe"}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Entrer un mot de passe"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>{"Confirmation mot de passe"}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Confirmer le mot de passe"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/*             <FormField
              control={form.control}
              name="isClient"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label className="ml-2" htmlFor="isClient">
                      Compte client ?{" "}
                      <span className="text-red-600">
                        {client ? "OUI" : "NON"}
                      </span>
                    </Label>

                    <FormMessage />
                  </FormItem>
                );
              }}
            /> */}

            <FormField
              control={form.control}
              name="celluleId"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Cellule</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
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
              name="isAdmin"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      {/*                       <Input
                        {...field}
                        placeholder="Confirmer le mot de passe"
                        type="password"
                      /> */}
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label className="ml-2" htmlFor="isAdmin">
                      Administrateur ?{" "}
                      <span className="text-red-600">
                        {admin
                          ? "OUI  (Création compte administrateur)"
                          : "NON (Création compte pilote)"}
                      </span>
                    </Label>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <Button type="submit" className="w-full">
            {loading ? "En cours de traitemnt ..." : "Enregistrer"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;

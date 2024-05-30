import * as z from "zod";

export const personFormSchema = z.object({
  id: z.number().optional(),
  firstname: z.string().min(1, {
    message: "Le prénom est obligatoire",
  }),
  lastname: z.string().min(1, {
    message: "Le nom est obligatoire",
  }),
  email: z.string().email(),
  mobile: z.string().min(1, {
    message: "Le numéro de téléphone est obligatoire",
  }),
  isIcc: z.boolean().default(false),
  isStar: z.boolean().default(false),
  isPilote: z.boolean().default(false),
  isRespo: z.boolean().default(false),
  isGest: z.boolean().default(false),
  celluleId: z.string().optional(),
  addressId: z.string().optional(),
});

export const zoneFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: "Le nom du secteur est obligatoire",
  }),
  status: z.string(),
  respoId: z.number().optional(),
});

export const celFormSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: "Le nom de la cellule est obligatoire",
  }),
  hours: z.string().min(1, {
    message: "Indiquez le jour de la réunion",
  }),
  days: z.string().min(1, {
    message: "Indiquez le début et la fin du la réunion",
  }),
  status: z.string(),

  zoneId: z.string().optional(),
  addressId: z.string().optional(),
});

export const adrFormSchema = z.object({
  id: z.string().optional(),
  /*   street: z.string().optional(),
  box: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  municipality: z.string().optional(),
  number: z.string().optional(),
  longitude: z.string().optional(),
  latitude: z.string().optional(), */
  street: z.string().min(1, {
    message: "Le nom de la rue est obligatoire",
  }),
  number: z.string().min(1, {
    message: "Le numéro est obligatoire",
  }),
  box: z.string().optional(),
  municipality: z.string().min(1, {
    message: "La commune  est obligatoire",
  }),
  postalCode: z.string().min(1, {
    message: "Le code postal est obligatoire",
  }),
  city: z.string().min(1, {
    message: "Le nom de la ville est obligatoire",
  }),
  country: z.string().min(1, {
    message: "Le nom du pays est obligatoire",
  }),

  longitude: z.string().optional(),
  latitude: z.string().optional(),
});

export const cadrFormSchema = z.object({
  id: z.number().optional(),
  street: z.string().min(1, {
    message: "La rue/avenue est obligatoire",
  }),
  number: z.string().min(1, {
    message: "La rue/avenue est obligatoire",
  }),
  box: z.string().min(1, {
    message: "La rue/avenue est obligatoire",
  }),
  municipality: z.string().min(1, {
    message: "La rue/avenue est obligatoire",
  }),
  postalCode: z.string().min(1, {
    message: "La rue/avenue est obligatoire",
  }),
  city: z.string().min(1, {
    message: "La rue/avenue est obligatoire",
  }),
  country: z.string().min(1, {
    message: "La rue/avenue est obligatoire",
  }),
  longitude: z.string().min(1, {
    message: "La rue/avenue est obligatoire",
  }),
  latitude: z.string().min(1, {
    message: "La rue/avenue est obligatoire",
  }),
});

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: "Le nom d'utilisateur est obligatoire",
  }),
  password: z.string().min(1, { message: "Le mot de pass est obligatoire" }),
});

export const RegisterSchema = z
  .object({
    //email: z.string().email(),
    id: z.number().optional(),
    username: z.string().min(1, {
      message: "Le nom est obligatoire",
    }),
    /*     isClient: z.boolean(),*/
    celluleId: z.string().optional(),
    isAdmin: z.boolean(),
    password: z.string().min(6, {
      message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
    confirmPassword: z.string().min(6, {
      message: "Le mot de passe doit contenir au moins 6 caractères",
    }),
  })
  .refine(
    (data) => {
      return data.password === data.confirmPassword;
    },
    {
      message: "Les mots de passe doivent correspondre",
      path: ["confirmPassword"],
    }
  );

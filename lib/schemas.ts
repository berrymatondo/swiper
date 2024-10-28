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

  grpWhatsApp: z.string().optional(),
  status: z.string(),

  zoneId: z.string().optional(),
  addressId: z.string().optional(),
});

export const meetingFormSchema = z.object({
  id: z.string().optional(),
  date: z.string().min(1, {
    message: "La date du rapport est obligatoire",
  }),
  nHom: z.string().min(1, {
    message: "Le nomdre d'hommes est obligatoire",
  }),
  nFem: z.string().min(1, {
    message: "Le nomdre de femmes est obligatoire",
  }),

  nEnf: z.string().min(1, {
    message: "Le nomdre d'enfants est obligatoire",
  }),

  nNew: z.string().min(1, {
    message: "Le nomdre de nouveaux est obligatoire",
  }),
  nIcc: z.string().min(1, {
    message: "Le nomdre de membres ICC est obligatoire",
  }),

  nSta: z.string().min(1, {
    message: "Le nomdre de star est obligatoire",
  }),

  notes: z.string().optional(),

  celluleId: z.string().optional(),
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
  grpWhatsApp: z.string().optional(),
  hide: z.boolean().default(false),
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

export const evangFormSchema = z.object({
  id: z.string().optional(),
  place: z.string().min(1, {
    message: "Le lieu de l'évangélisation est obligatoire",
  }),
  date: z.string().min(1, {
    message: "La date de l'évangélisation est obligatoire",
  }),
  start: z.string().min(1, {
    message: "L'heure de début de l'évangélisation est obligatoire",
  }),
  end: z.string().min(1, {
    message: "L'heure de fin de l'évangélisation est obligatoire",
  }),
  nPar: z.string().min(1, {
    message: "Le nomdre de participants est obligatoire",
  }),
  nEva: z.string().min(1, {
    message: "Le nomdre de personnes évangélisées est obligatoire",
  }),
  nGag: z.string().min(1, {
    message: "Le nomdre d'âmes gagnées est obligatoire",
  }),
  nCon: z.string().min(1, {
    message: "Le nomdre de contacts pris est obligatoire",
  }),
  nInv: z.string().min(1, {
    message: "Le nomdre d'invités est obligatoire",
  }),
  nVen: z.string().min(1, {
    message: "Le nomdre d'invités venus est obligatoire",
  }),

  notes: z.string().optional(),

  celluleId: z.string().optional(),
  zoneId: z.string().optional(),
});

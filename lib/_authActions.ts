"use server";

import { z } from "zod";
import { LoginSchema, RegisterSchema, zoneFormSchema } from "./schemas";
import prisma from "./prisma";
import bcrypt from "bcrypt";
import { signIn, signOut } from "auth";
import { revalidatePath } from "next/cache";
import { ZonesStatuses } from "@prisma/client";

type Inputs2 = z.infer<typeof RegisterSchema>;

export const registerUser = async (data: Inputs2) => {
  //console.log("registerUser", data);

  const result = RegisterSchema.safeParse(data);

  if (result.success) {
    const { username, isAdmin, password, confirmPassword, celluleId } =
      result.data;

    console.log(
      "{email,name,isAdmin,  password, confirmPassword, celluleID }",
      //email,
      username,
      isAdmin,
      password,
      confirmPassword,
      celluleId
    );

    try {
      //const session = await auth();

      //console.log("SESSION", session);

      const foundUser = await prisma.user.findUnique({
        where: {
          username: data.username,
        },
      });

      if (foundUser) return { error: "Ce nom d'utilisateur est déjà utilisé" };

      // Hash password
      const hashedPassword = await bcrypt.hash(data.password, 12);

      //const userTmp: any = session?.user;

      // console.log("DATA", data);

      const user = await prisma.user.create({
        data: {
          username: data.username,
          //email: data.email,
          password: hashedPassword,
          role: data.isAdmin ? "ADMIN" : "PILOTE",
          celluleId: data.celluleId ? +data.celluleId : null,
          // userId: userTmp ? (userTmp.id ? parseInt(userTmp.id) : null) : null,
        },
      });

      return { success: true, data: user };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

//UPDATE USER
// UPDATE USER
export const updateUser = async (data: Inputs2) => {
  // console.log("update PERSONNNNNN:", data);

  const resut = RegisterSchema.safeParse(data);
  if (resut.success) {
    let test = data.password;

    if (test == "******") {
      try {
        const foundUser = await prisma.user.findUnique({
          where: {
            username: data.username,
            NOT: {
              id: data.id,
            },
          },
        });

        // console.log("foundUser:", foundUser);

        if (foundUser) return { error: "Cet utilisateur existe déjà" };

        // Hash password
        // const hashedPassword = await bcrypt.hash("wwwwww", 12);

        console.log("data:", data);

        const usr = await prisma.user.update({
          where: {
            id: data.id,
          },
          data: {
            username: data.username,
            celluleId: data?.celluleId ? +data?.celluleId : null,
            //password: hashedPassword,
            role: data.isAdmin ? "ADMIN" : "PILOTE",

            //statut: data.status as CelStatuses,
            /*           respoId: data.respoId ? +data.respoId : undefined,
             */
          },
        });
        // console.log("xxxxxxxxxxxxxxxxxxx");

        // console.log("usrusr:", usr);

        revalidatePath("/auth/users");

        return {
          success: true,
          data: usr,
        };
      } catch (error) {}
    } else {
      try {
        const foundUser = await prisma.user.findUnique({
          where: {
            username: data.username,
            NOT: {
              id: data.id,
            },
          },
        });

        //console.log("foundUser:", foundUser);

        if (foundUser) return { error: "Cet utilisateur existe déjà" };

        const hashedPassword = await bcrypt.hash(data.password, 12);
        const person = await prisma.user.update({
          where: {
            id: data.id ? +data.id : undefined,
          },
          data: {
            username: data.username,
            celluleId: data?.celluleId ? +data?.celluleId : undefined,
            role: data.isAdmin ? "ADMIN" : "PILOTE",
            password: hashedPassword,

            //statut: data.status as CelStatuses,
            /*           respoId: data.respoId ? +data.respoId : undefined,
             */
          },
        });

        revalidatePath("/auth/users");

        return {
          success: true,
          data: person,
        };
      } catch (error) {}
    }
  } else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
};

// GET SPECIFIC USER
export const getUser = async (userId: number) => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {

  // console.log("zoneId: " + zoneId);

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: +userId,
      },
    });

    //  revalidatePath("/zones");

    return {
      success: true,
      data: user,
    };
  } catch (error) {}
}; /* else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
}; */

// DELETE USER
export const deleteUser = async (userId: number) => {
  try {
    const user = await prisma.user.delete({
      where: {
        id: +userId,
      },
    });

    revalidatePath("/auth/users");

    return {
      success: true,
      data: user,
    };
  } catch (error) {}
};

type Inputs = z.infer<typeof LoginSchema>;

export const loginlogin = async (data: Inputs) => {
  console.log("data", data);

  const result = LoginSchema.safeParse(data);

  if (result.success) {
    try {
      const foundUser = await prisma.user.findUnique({
        where: {
          username: data.username,
        },
      });

      console.log("foundUser", foundUser);

      if (!foundUser) return { error: "Cet utilisateur n'existe pas" };

      const checkPass = await bcrypt.compare(data.password, foundUser.password);

      console.log("checkPass:", checkPass);

      if (!checkPass) {
        return { error: "Le mot de passe n'est pas correct" };
      }

      // return { success: true, data: data };
    } catch (error) {}
  } else {
    return { success: false, error: result.error.format() };
  }

  console.log("Call sinin", data);

  const res = await signIn("credentials", {
    ...data,
    redirectTo: "/cellules",
  });

  console.log("RESSSS", res);
};

export const logoutUser = async () => {
  console.log("SORTIEEEEEEEEEEEEEEEEEEEEE");

  await signOut();
};

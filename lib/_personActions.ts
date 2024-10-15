"use server";

import { z } from "zod";
import { personFormSchema } from "./schemas";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";

type Inputs = z.infer<typeof personFormSchema>;

// ADD NEW PERSON
export const addPerson = async (data: Inputs) => {
  console.log("new person:", data);

  const resut = personFormSchema.safeParse(data);
  if (resut.success) {
    try {
      const person = await prisma.person.create({
        data: {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          mobile: data.mobile,
          isIcc: data.isIcc,
          isStar: data.isStar,
          isPilote: data.isPilote,
          // isGest: data.isGest,
          isRespo: data.isRespo,
          celluleId: data.celluleId ? +data.celluleId : undefined,
          addressId: data.addressId ? +data.addressId : undefined,
        },
      });

      revalidatePath("/persons");

      return {
        success: true,
        data: person,
      };
    } catch (error) {}
  } else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
};

// UPDATE PERSON
export const updatePerson = async (data: Inputs) => {
  // console.log("update PERSONNNNNN:", data);

  const resut = personFormSchema.safeParse(data);
  if (resut.success) {
    try {
      const person = await prisma.person.update({
        where: {
          id: data.id,
        },
        data: {
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          mobile: data.mobile,
          celluleId: data?.celluleId ? +data?.celluleId : undefined,
          isIcc: data.isIcc,
          isStar: data.isStar,
          isPilote: data.isPilote,
          isRespo: data.isRespo,
          //isGest: data.isGest,
          //statut: data.status as CelStatuses,
          /*           respoId: data.respoId ? +data.respoId : undefined,
           */
        },
      });

      revalidatePath("/members");

      return {
        success: true,
        data: person,
      };
    } catch (error) {}
  } else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
};

// GET SPECIFIC PERSON
export const getPerson = async (personId: number) => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {

  // console.log("zoneId: " + zoneId);

  try {
    const person = await prisma.person.findUnique({
      where: {
        id: +personId,
      },
    });

    //  revalidatePath("/zones");

    return {
      success: true,
      data: person,
    };
  } catch (error) {}
}; /* else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
}; */

// DELETE PERSON
export const deletePerson = async (personId: number) => {
  try {
    const person = await prisma.person.delete({
      where: {
        id: +personId,
      },
    });

    revalidatePath("/members");

    return {
      success: true,
      data: person,
    };
  } catch (error) {}
};

// Get all persons
export const getAllPersons = async () => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {
  try {
    const persons = await prisma.person.findMany();

    revalidatePath("/members");

    return {
      success: true,
      data: persons,
    };
  } catch (error) {}
};

// GET PERSONS OF SPECIF CELLULE
export const getPersonsCel = async (celId: number) => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {

  // console.log("zoneId: " + zoneId);

  try {
    const persons = await prisma.person.findMany({
      where: {
        celluleId: +celId,
      },
    });

    //  revalidatePath("/zones");

    return {
      success: true,
      data: persons,
    };
  } catch (error) {}
};

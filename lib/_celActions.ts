"use server";

import { z } from "zod";
import { celFormSchema } from "./schemas";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { CelStatuses } from "@prisma/client";

type Inputs = z.infer<typeof celFormSchema>;

// ADD NEW CELLULE
export const addCel = async (data: Inputs) => {
  // console.log("new cel:", data);

  const resut = celFormSchema.safeParse(data);
  if (resut.success) {
    try {
      const cel = await prisma.cellule.create({
        data: {
          name: data.name,
          days: data.days,
          hours: data.hours,
          grpWhatsApp: data.grpWhatsApp,
          ban: data.ban,

          zoneId: data.zoneId ? +data.zoneId : undefined,
          addressId: data.addressId ? +data.addressId : undefined,
        },
      });

      revalidatePath("/persons");

      return {
        success: true,
        data: cel,
      };
    } catch (error) {}
  } else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
};

// Get all cellules
export const getAllCels = async () => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {
  try {
    const cels = await prisma.cellule.findMany({
      include: {
        address: true,
        persons: true,
        zone: {
          include: {
            evang: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    //revalidatePath("/cellules");
    // console.log("cels", cels);

    return {
      success: true,
      data: cels,
    };
  } catch (error) {}
};

// Get all cellules
export const getAllFilterCels = async (search: any) => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {

  if (search) {
    try {
      const cels = await prisma.cellule.findMany({
        //  take: take,
        //  skip: skip,
        include: {
          address: true,
          zone: true,
          persons: true,
        },
        where: {
          OR: [
            {
              address: {
                postalCode: { contains: search as string, mode: "insensitive" },
              },
            },
            {
              address: {
                street: { contains: search as string, mode: "insensitive" },
              },
            },
            {
              address: {
                municipality: {
                  contains: search as string,
                  mode: "insensitive",
                },
              },
            },
            {
              address: {
                number: { contains: search as string, mode: "insensitive" },
              },
            },
            {
              address: {
                country: { contains: search as string, mode: "insensitive" },
              },
            },
            { name: { contains: search as string, mode: "insensitive" } },
          ],
        },
        orderBy: {
          name: "asc",
        },
      });

      revalidatePath("/cellules");

      return {
        success: true,
        data: cels,
      };
    } catch (error) {}
  } else {
    try {
      const cels = await prisma.cellule.findMany({
        //  take: take,
        //  skip: skip,
        include: {
          address: true,
          zone: true,
          persons: true,
        },
        /*         where: {
          OR: [
            {
              address: {
                postalCode: { contains: search as string, mode: "insensitive" },
              },
            },
            {
              address: {
                street: { contains: search as string, mode: "insensitive" },
              },
            },
            {
              address: {
                municipality: {
                  contains: search as string,
                  mode: "insensitive",
                },
              },
            },
            {
              address: {
                number: { contains: search as string, mode: "insensitive" },
              },
            },
            {
              address: {
                country: { contains: search as string, mode: "insensitive" },
              },
            },
            { name: { contains: search as string, mode: "insensitive" } },
          ],
        }, */
        orderBy: {
          name: "asc",
        },
      });

      revalidatePath("/cellules");

      return {
        success: true,
        data: cels,
      };
    } catch (error) {}
  }
};

// UPDATE CELLULE
export const updateCel = async (data: Inputs) => {
  // console.log("update zonezz:", data);

  const resut = celFormSchema.safeParse(data);
  if (resut.success) {
    try {
      const cel = await prisma.cellule.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          days: data.days,
          hours: data.hours,
          grpWhatsApp: data.grpWhatsApp,
          ban: data.ban,
          zoneId: data?.zoneId ? +data?.zoneId : undefined,
          addressId: data?.addressId ? +data?.addressId : undefined,
          statut: data.status as CelStatuses,
          /*           respoId: data.respoId ? +data.respoId : undefined,
           */
        },
      });

      revalidatePath("/cellules");

      return {
        success: true,
        data: cel,
      };
    } catch (error) {}
  } else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
};

// GET SPECIFIC CELLULE
export const getCel = async (celId: number) => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {

  // console.log("zoneId: " + zoneId);

  try {
    const cel = await prisma.cellule.findUnique({
      where: {
        id: +celId,
      },
      include: {
        zone: true,
        address: true,
        persons: true,
      },
    });

    //  console.log("CEL vaut:", cel);

    //  revalidatePath("/zones");

    return {
      success: true,
      data: cel,
    };
  } catch (error) {}
}; /* else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
}; */

// GET PILOTES
// GET PILOTES
// GET SPECIFIC CELLULE
export const getCelPilotes = async (celId: number) => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {

  // console.log("zoneId: " + zoneId);

  try {
    const pilotes = await prisma.person.findMany({
      where: {
        AND: [{ id: +celId }, { isPilote: true }],
      },
      /*       include: {
        zone: true,
        address: true,
      }, */
    });

    //console.log("Pilotes vaut:", pilotes);

    //  revalidatePath("/zones");

    return {
      success: true,
      data: pilotes,
    };
  } catch (error) {}
};

// GET ALL PILOTES
export const getAllPilotes = async (celId: number) => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {

  // console.log("zoneId: " + zoneId);

  try {
    const pilotes = await prisma.person.findMany({
      where: {
        isPilote: true,
      },
      include: {
        cellule: true,
      },
    });

    //console.log("All Pilotes:", pilotes);

    //  revalidatePath("/zones");

    return {
      success: true,
      data: pilotes,
    };
  } catch (error) {}
};

// DELETE ZONE
export const deleteCel = async (celId: number) => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {

  // console.log("zoneId: " + zoneId);

  try {
    const cel = await prisma.cellule.delete({
      where: {
        id: +celId,
      },
    });

    revalidatePath("/cellules");

    return {
      success: true,
      data: cel,
    };
  } catch (error) {}
};

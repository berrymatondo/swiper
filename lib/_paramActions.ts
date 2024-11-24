"use server";

import { z } from "zod";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { paramSchema } from "./schemas";

type Inputs = z.infer<typeof paramSchema>;

// UPDATE parama
export const addParam = async (data: Inputs) => {
  //console.log("update zone:", data);

  const resut = paramSchema.safeParse(data);
  if (resut.success) {
    try {
      const zone = await prisma.parametre.create({
        data: {
          label: data.label ? data.label : "x",
          isActive: data.isActive,
        },
      });

      revalidatePath("/meetings");

      return {
        success: true,
        data: zone,
      };
    } catch (error) {}
  } else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
};

// UPDATE parama
export const updateParam = async (data: Inputs) => {
  //console.log("update zone:", data);

  const resut = paramSchema.safeParse(data);
  if (resut.success) {
    try {
      const zone = await prisma.parametre.update({
        where: {
          id: data.id ? +data.id : undefined,
        },
        data: {
          isActive: data.isActive,
        },
      });

      revalidatePath("/meetings");

      return {
        success: true,
        data: zone,
      };
    } catch (error) {}
  } else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
};

// GET ALL ZONES
export const getAllParameters = async () => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {
  try {
    const zones = await prisma.parametre.findMany();

    revalidatePath("/meetings");

    return {
      success: true,
      data: zones,
    };
  } catch (error) {}
}; /* else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
}; */

// GET SPECIFIC PARA
export const getParam = async (zoneId: number) => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {

  // console.log("zoneId: " + zoneId);

  try {
    const zone = await prisma.parametre.findUnique({
      where: {
        id: +zoneId,
      },
    });

    return {
      success: true,
      data: zone,
    };
  } catch (error) {}
};

// GET SPECIFIC PARA
export const getParamByLabel = async (label: string) => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {

  // console.log("zoneId: " + zoneId);

  try {
    const zone = await prisma.parametre.findUnique({
      where: {
        label: label,
      },
    });

    return {
      success: true,
      data: zone,
    };
  } catch (error) {}
};

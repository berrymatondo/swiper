"use server";

import { z } from "zod";
import { zoneFormSchema } from "./schemas";
import { prisma } from "./prisma";
import { revalidatePath } from "next/cache";
import { ZonesStatuses } from "@prisma/client";

type Inputs = z.infer<typeof zoneFormSchema>;

// ADD NEW ZONE
export const addZone = async (data: Inputs) => {
  // console.log("new zone:", data);

  const resut = zoneFormSchema.safeParse(data);
  if (resut.success) {
    try {
      const zone = await prisma.zone.create({
        data: {
          name: data.name,
          respoId: data.respoId ? +data.respoId : undefined,
        },
      });

      revalidatePath("/zones");

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

// UPDATE ZONE
export const updateZone = async (data: Inputs) => {
  //console.log("update zone:", data);

  const resut = zoneFormSchema.safeParse(data);
  if (resut.success) {
    try {
      const zone = await prisma.zone.update({
        where: {
          id: data.id,
        },
        data: {
          name: data.name,
          statut: data.status as ZonesStatuses,
          respoId: data.respoId ? +data.respoId : undefined,
        },
      });

      revalidatePath("/zones");

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
export const getAllZones = async () => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {
  try {
    const zones = await prisma.zone.findMany();

    revalidatePath("/zones");

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

// GET SPECIFIC ZONE
export const getZone = async (zoneId: number) => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {

  // console.log("zoneId: " + zoneId);

  try {
    const zone = await prisma.zone.findUnique({
      include: {
        cellules: {
          include: { persons: true, address: true },
        },
        _count: {
          select: { cellules: true },
        },
      },
      where: {
        id: +zoneId,
      },
    });

    //  revalidatePath("/zones");
    console.log("ZZZZZZ", zone);

    return {
      success: true,
      data: zone,
    };
  } catch (error) {}
}; /* else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
}; */

// DELETE ZONE
export const deleteZone = async (zoneId: number) => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {

  // console.log("zoneId: " + zoneId);

  try {
    const zone = await prisma.zone.delete({
      where: {
        id: +zoneId,
      },
    });

    revalidatePath("/zones");

    return {
      success: true,
      data: zone,
    };
  } catch (error) {}
};

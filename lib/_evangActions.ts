"use server";

import { z } from "zod";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { evangFormSchema } from "./schemas";

type Inputs = z.infer<typeof evangFormSchema>;

// ADD NEW MEETING REPORT
export const addEvang = async (data: Inputs) => {
  // console.log("new cel:", data);

  const resut = evangFormSchema.safeParse(data);
  if (resut.success) {
    try {
      const meeting = await prisma.evang.create({
        data: {
          date: data?.date ? data?.date : " ",
          place: data.place,
          start: data.start,
          end: data.end,
          nPar: +data.nPar,
          nEva: +data.nEva,
          nGag: +data.nGag,
          nCon: +data.nCon,
          nInv: +data.nInv,
          nVen: +data.nVen,
          celluleId: data.celluleId ? +data.celluleId : undefined,
          zoneId: data.zoneId ? +data.zoneId : undefined,
          notes: data.notes,
        },
      });

      revalidatePath(`/evangs/${data.celluleId ? +data.celluleId : undefined}`);

      return {
        success: true,
        data: meeting,
      };
    } catch (error) {}
  } else {
    return {
      success: false,
      error: resut.error.format(),
    };
  }
};

// Get all evangs
export const getAllEvangs = async () => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {
  try {
    const cels = await prisma.evang.findMany({
      include: {
        cellule: true,
      },
    });

    revalidatePath("/evangs");

    return {
      success: true,
      data: cels,
    };
  } catch (error) {}
};

// Get all evangs by Cel
export const getAllEvangsByCel = async (celluledId: number) => {
  // console.log("celluledId", celluledId);

  try {
    const cel = await prisma.evang.findMany({
      where: {
        celluleId: +celluledId,
      },
      include: {
        cellule: true,
        zone: true,
      },
      orderBy: { date: "asc" },
    });

    return {
      success: true,
      data: cel,
    };
  } catch (error) {}
};

// UPDATE EVANG
export const updateEvang = async (data: Inputs, evangId: number) => {
  //console.log("update zone:", data);
  //console.log("update meetingId:", meetingId);

  const resut = evangFormSchema.safeParse(data);
  if (resut.success) {
    try {
      const cel = await prisma.evang.update({
        where: {
          id: +evangId,
        },
        data: {
          date: data?.date ? data?.date : " ",
          place: data.place,
          start: data.start,
          end: data.end,
          nPar: +data.nPar,
          nEva: +data.nEva,
          nGag: +data.nGag,
          nCon: +data.nCon,
          nInv: +data.nInv,
          nVen: +data.nVen,
          celluleId: data.celluleId ? +data.celluleId : undefined,
          zoneId: data.zoneId ? +data.zoneId : undefined,
          notes: data.notes,
        },
      });

      revalidatePath(`/evangs/${data.celluleId ? +data.celluleId : undefined}`);

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

// GET SPECIFIC EVANG
export const getEvang = async (evangId: number) => {
  try {
    const cel = await prisma.evang.findUnique({
      where: {
        id: +evangId,
      },
      include: {
        cellule: true,
        zone: true,
      },
    });

    return {
      success: true,
      data: cel,
    };
  } catch (error) {}
};

export const getEvangsByDate = async (date: string) => {
  try {
    const cel = await prisma.evang.findMany({
      where: {
        date: date,
      },
      include: {
        cellule: true,
        zone: true,
      },
    });

    return {
      success: true,
      data: cel,
    };
  } catch (error) {}
};

// DELETE Evang
export const deleteEvang = async (evangId: number, celluledId: number) => {
  try {
    const cel = await prisma.evang.delete({
      where: {
        id: +evangId,
      },
    });

    revalidatePath(`/evangs/${celluledId}`);

    return {
      success: true,
      data: cel,
    };
  } catch (error) {}
};

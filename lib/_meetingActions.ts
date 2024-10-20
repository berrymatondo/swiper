"use server";

import { z } from "zod";
import prisma from "./prisma";
import { revalidatePath } from "next/cache";
import { meetingFormSchema } from "./schemas";

type Inputs = z.infer<typeof meetingFormSchema>;

// ADD NEW MEETING REPORT
export const addMeeting = async (data: Inputs) => {
  console.log("new cel:", data);

  const resut = meetingFormSchema.safeParse(data);
  if (resut.success) {
    try {
      const meeting = await prisma.meeting.create({
        data: {
          date: data?.date ? data?.date : " ",
          nHom: +data.nHom,
          nFem: +data.nFem,
          nEnf: +data.nEnf,
          nNew: +data.nNew,
          celluleId: data.celluleId ? +data.celluleId : undefined,
          notes: data.notes,
        },
      });

      revalidatePath(
        `/meetings/${data.celluleId ? +data.celluleId : undefined}`
      );

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

// Get all meetings
export const getAllMeetings = async () => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {
  try {
    const cels = await prisma.cellule.findMany();

    revalidatePath("/cellules");

    return {
      success: true,
      data: cels,
    };
  } catch (error) {}
};

// Get all meetings by Cel
export const getAllMeetingsByCel = async (celluledId: number) => {
  // console.log("celluledId", celluledId);

  try {
    const cel = await prisma.meeting.findMany({
      where: {
        celluleId: +celluledId,
      },
      include: {
        cellule: true,
      },
      orderBy: { date: "asc" },
    });

    return {
      success: true,
      data: cel,
    };
  } catch (error) {}
};

// UPDATE CELLULE
export const updateMeeting = async (data: Inputs) => {
  //console.log("update zone:", data);

  const resut = meetingFormSchema.safeParse(data);
  if (resut.success) {
    try {
      const cel = await prisma.meeting.update({
        where: {
          id: data.id,
        },
        data: {
          date: data?.date ? data?.date : " ",
          nHom: +data.nHom,
          nFem: +data.nFem,
          nEnf: +data.nEnf,
          nNew: +data.nNew,
          celluleId: data.celluleId ? +data.celluleId : undefined,
          notes: data.notes,
        },
      });

      revalidatePath(
        `/meetings/${data.celluleId ? +data.celluleId : undefined}`
      );

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

// GET SPECIFIC MEETING
export const getMeeting = async (meetingId: number) => {
  try {
    const cel = await prisma.meeting.findUnique({
      where: {
        id: +meetingId,
      },
      include: {
        cellule: true,
      },
    });

    return {
      success: true,
      data: cel,
    };
  } catch (error) {}
};

export const getMeetingsByDate = async (date: string) => {
  try {
    const cel = await prisma.meeting.findMany({
      where: {
        date: date,
      },
      include: {
        cellule: true,
      },
    });

    return {
      success: true,
      data: cel,
    };
  } catch (error) {}
};

// DELETE MEETING
export const deleteMeeting = async (meetingId: number, celluledId: number) => {
  //const resut = zoneFormSchema.safeParse(data);
  //if (resut.success) {

  // console.log("zoneId: " + zoneId);

  try {
    const cel = await prisma.meeting.delete({
      where: {
        id: +meetingId,
      },
    });

    revalidatePath(`/meetings/${celluledId}`);

    return {
      success: true,
      data: cel,
    };
  } catch (error) {}
};

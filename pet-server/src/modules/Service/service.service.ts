import { prisma } from "../../lib/prisma";

const createServiceIntoDB = async (payload: any, userId: string) => {
  const sitterProfile = await prisma.sitterProfiles.findUnique({
    where: {
      sitterId: userId,
    },
  });
  if (!sitterProfile) {
    throw new Error("Sitter Profile not found");
  }

  const result = await prisma.service.create({
    data: { ...payload, sitterId: sitterProfile.id },
  });
  return result;
};

const getAllServiceIntoDB = async () => {
  const result = await prisma.service.findMany({
    include: {
      sitter: true,
    },
  });

  return result;
};

const getSingleServiceIntoDB = async (petId: string) => {
  const result = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });

  return result;
};

export const serviceService = {
  // Add service methods here
  createServiceIntoDB,
  getAllServiceIntoDB,
  getSingleServiceIntoDB,
};

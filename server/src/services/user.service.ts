import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


// ======================================================
// GET USER BY ID
// ======================================================

export const getUserById = async (
  userId: string
) => {
  return prisma.user.findUnique({
    where: {
      id: userId,
    },

    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      createdAt: true,
    },
  });
};


// ======================================================
// UPDATE USER PROFILE
// ======================================================

export const updateUser = async (
  userId: string,
  data: {
    name: string;
    email: string;
  }
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      name: data.name,
      email: data.email,
    },

    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
};


// ======================================================
// UPDATE PASSWORD
// ======================================================

export const updateUserPassword = async (
  userId: string,
  hashedPassword: string
) => {
  return prisma.user.update({
    where: {
      id: userId,
    },

    data: {
      password: hashedPassword,
    },

    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });
};
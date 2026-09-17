import prisma from "../config/prisma";

// ======================================================
// CREATE JOB
// ======================================================

export const createJob = async (
  data: {
    company: string;
    position: string;
    location: string;
    salary?: string;
    status?: string;
    jobLink?: string;
    notes?: string;
    resume?: string;
  },
  userId: string
) => {

  console.log("========== CREATE JOB ==========");
  console.log("USER ID RECEIVED:", userId);

  // Check whether this user actually exists
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  console.log("USER FOUND:", user);

  if (!user) {
    throw new Error(
      `User not found in database. userId: ${userId}`
    );
  }

  return await prisma.job.create({
    data: {
      company: data.company,
      position: data.position,
      location: data.location,
      salary: data.salary,
      status: data.status || "Applied",
      jobLink: data.jobLink,
      notes: data.notes,
      resume: data.resume,
      userId,
    },
  });
};


// ======================================================
// GET JOBS
// Search + Status + Sorting + Pagination
// ======================================================

export const getJobs = async (
  userId: string,
  search?: string,
  status?: string,
  page: number = 1,
  limit: number = 10,
  sort?: string
) => {

  const skip = (page - 1) * limit;

  // --------------------------------------------
  // FILTERS
  // --------------------------------------------

  const where: any = {
    userId,
  };


  // Search company OR position

  if (search) {

    where.OR = [
      {
        company: {
          contains: search,
          mode: "insensitive",
        },
      },

      {
        position: {
          contains: search,
          mode: "insensitive",
        },
      },
    ];

  }


  // Status filter

  if (status) {
    where.status = status;
  }


  // --------------------------------------------
  // SORTING
  // --------------------------------------------

  let orderBy: any = {
    createdAt: "desc",
  };


  if (sort === "company") {

    orderBy = {
      company: "asc",
    };

  } else if (sort === "position") {

    orderBy = {
      position: "asc",
    };

  } else if (sort === "status") {

    orderBy = {
      status: "asc",
    };

  } else if (sort === "oldest") {

    orderBy = {
      createdAt: "asc",
    };

  }


  // --------------------------------------------
  // GET JOBS
  // --------------------------------------------

  const jobs = await prisma.job.findMany({
    where,
    skip,
    take: limit,
    orderBy,
  });


  // --------------------------------------------
  // TOTAL COUNT
  // --------------------------------------------

  const total = await prisma.job.count({
    where,
  });


  return {
    jobs,
    total,
    page,
    totalPages: Math.ceil(
      total / limit
    ),
  };
};
// ======================================================
// GET SINGLE JOB
// ======================================================

export const getJobById = async (
  id: string,
  userId: string
) => {

  return await prisma.job.findFirst({
    where: {
      id,
      userId,
    },
  });

};


// ======================================================
// UPDATE JOB
// ======================================================

export const updateJob = async (
  id: string,
  userId: string,
  data: {
    company?: string;
    position?: string;
    location?: string;
    salary?: string;
    status?: string;
    jobLink?: string;
    notes?: string;
  }
) => {

  const job = await prisma.job.findFirst({
    where: {
      id,
      userId,
    },
  });


  if (!job) {
    return null;
  }


  return await prisma.job.update({
    where: {
      id,
    },

    data,
  });

};


// ======================================================
// DELETE JOB
// ======================================================

export const deleteJob = async (
  id: string,
  userId: string
) => {

  const job = await prisma.job.findFirst({
    where: {
      id,
      userId,
    },
  });


  if (!job) {
    return null;
  }


  await prisma.job.delete({
    where: {
      id,
    },
  });


  return job;
};
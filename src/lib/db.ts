import client from "@/lib/prisma";
import { STATUS } from "@prisma/client";

const getOrCreateUser = async (email: string) => {
  const user = await client.user.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      email,
    },
    include: {
      results: true,
    },
  });

  return user;
};

const checkLimit = async (email: string) => {
  try {
    const user = await getOrCreateUser(email);

    if (!user) {
      return false;
    }

    const { results } = user;

    const lastHour = new Date();
    lastHour.setHours(lastHour.getHours() - 1);

    const lastHourResults = results.filter((result) => {
      return new Date(result.created_at) > lastHour;
    });

    if (lastHourResults.length >= 10) {
      return false;
    }

    return { remaining: 3 - lastHourResults.length };
  } catch (error) {
    console.error(error);
  }
};

interface ResultInput {
  original_image: string;
  neutral: string;
  target: string;
  email: string;
}

interface Result {
  id: string;
  email: string;
}

const createResult = async ({
  original_image,
  neutral,
  target,
  email,
}: ResultInput): Promise<Result> => {
  const user = await getOrCreateUser(email);

  const result = await client.result.create({
    data: {
      original_image,
      neutral,
      target,
      User: {
        connect: {
          email,
        },
      },
    },
  });

  return {
    id: result.id,
    email: user.email,
  };
};

interface ResultUpdate {
  id: string;
  status: STATUS;
  result_image: string;
}

const updateResult = async ({
  id,
  status,
  result_image,
}: ResultUpdate): Promise<Result> => {
  const result = await client.result.update({
    where: {
      id,
    },
    data: {
      status,
      result_image,
    },
    include: {
      User: true,
    },
  });

  return {
    id: result.id,
    email: result.User ? result.User.email : "",
  };
};

interface QueryInput {
  id: string;
}

const queryResult = async ({ id }: QueryInput) => {
  const result = await client.result.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const deleteOldResults = async () => {
  const results = await client.result.findMany({
    where: {
      created_at: {
        lte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      },
    },
  });

  const ids = results.map((result) => result.id);

  await client.result.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
};

export {
  checkLimit,
  getOrCreateUser,
  createResult,
  updateResult,
  queryResult,
  deleteOldResults,
};

import { deleteOldResults } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

const SECRET = process.env.SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { secret } = req.query;

  if (secret != SECRET) {
    res.status(401).json({ message: "Invalid secret" });
  }

  try {
    await deleteOldResults();

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default handler;

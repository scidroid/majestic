import type { NextApiRequest, NextApiResponse } from "next";
import { queryResult } from "@/lib/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id }: any = req.query;

  try {
    const result = await queryResult({ id });

    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default handler;

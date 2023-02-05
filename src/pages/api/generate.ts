import type { NextApiRequest, NextApiResponse } from "next";
import { checkLimit, createResult, updateResult } from "@/lib/db";
import generate from "@/lib/generate";

interface Input {
  original_image: string;
  neutral: string;
  target: string;
  email: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { original_image, neutral, target, email }: Input = req.body;

    if (!original_image || !neutral || !target || !email) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const limit = await checkLimit(email);

    if (!limit) {
      return res.status(429).json({ message: "Too many requests" });
    }

    const result = await createResult({
      original_image,
      neutral,
      target,
      email,
    });

    await generate(
      {
        input: original_image,
        neutral,
        target,
        manipulation_strength: 4.1,
        disentanglement_threshold: 0.25,
      },
      result.id
    );

    await updateResult({
      id: result.id,
      status: "PROCESSING",
      result_image: "",
    });

    res.status(200).json({
      id: result.id,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default handler;

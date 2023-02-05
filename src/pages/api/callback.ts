import type { NextApiRequest, NextApiResponse } from "next";
import { updateResult } from "@/lib/db";
import sendReadyEmail from "@/lib/mail";

const SECRET = process.env.SECRET;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token, secret }: any = req.query;
    const { output }: any = req.body;

    if (secret != SECRET) {
      console.log("Unauthorized");
      res.status(401).json({ error: "Unauthorized" });
    }

    if (!token || !output) {
      console.log("Missing token or output");
      res.status(400).json({ error: "Missing token or output" });
    }

    const result = await updateResult({
      id: token,
      status: "DONE",
      result_image: output,
    });

    console.log("Sending email");

    await sendReadyEmail({
      email: result.email,
      token: token,
    });

    res.status(200).end({
      message: "Success",
      result,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default handler;

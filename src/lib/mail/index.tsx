import { Resend } from "resend";
import Ready from "./Ready";

interface Input {
  email: string;
  token: string;
}

const KEY = process.env.RESEND_API_KEY as string;

const resend = new Resend(KEY);

const sendReadyEmail = async ({ email, token }: Input) =>
  await resend.sendEmail({
    from: "majestic@scidroid.co",
    to: email,
    subject: "Your Majestic results are ready",
    react: <Ready token={token} />,
  });

export default sendReadyEmail;

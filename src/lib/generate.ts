interface Input {
  input: string;
  neutral: string;
  target: string;
  manipulation_strength: number;
  disentanglement_threshold: number;
}

interface Output {
  type: string;
  title: string;
  format: string;
}

const URL = "https://api.replicate.com/v1/predictions";
const MODEL_VERSION = process.env.REPLICATE_MODEL_VERSION;
const TOKEN = process.env.REPLICATE_TOKEN;
const SITE_URL = process.env.URL;
const SECRET = process.env.SECRET;

const generate = async (input: Input, token: string): Promise<Output> => {
  const request = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${TOKEN}`,
    },
    body: JSON.stringify({
      version: MODEL_VERSION,
      input,
      webhook_completed: `${SITE_URL}/api/callback?token=${token}&secret=${SECRET}`,
    }),
  });

  const response = await request.json();

  if (!request.ok) {
    console.error(response);
    throw new Error(response.error);
  }

  return response.output;
};

export default generate;

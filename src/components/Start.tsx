import { useRouter } from "next/router";
import React, { useState } from "react";
import Upload from "./Upload";

const Start: React.FC = () => {
  const { push } = useRouter();

  const [image, setImage] = useState<string | undefined>(undefined);
  const [neutral, setNeutral] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!image || !neutral || !target || !email) return;

    setStatus("loading");

    const request = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        original_image: image,
        neutral,
        target,
        email,
      }),
    });

    const response = await request.json();

    if (request.ok) {
      push(`/${response.id}`);
    } else {
      setStatus("idle");
    }
  };

  return (
    <section className="m-8 p-2 w-full bg-white rounded-xl shadow-xl">
      {status == "idle" ? (
        <div className="flex justify-between">
          <Upload value={image} setValue={setImage} />
          {image && (
            <form
              onSubmit={handleSubmit}
              className="ml-2 mr-2 flex flex-col justify-between w-full"
            >
              <label className="flex flex-col mb-1">
                <span className="font-bold text-xl">Describe the image</span>
                <span className="font-regular text-gray-600">
                  Write a little description about the image to get context.
                </span>
                <input
                  type="text"
                  value={neutral}
                  onChange={(e) => setNeutral(e.target.value)}
                  placeholder="A face..."
                  required
                  className="mt-2 border border-gray-200 rounded-lg text-lg h-12 p-1 outline-none"
                />
              </label>
              <label className="flex flex-col my-1">
                <span className="font-bold text-xl">Describe the result</span>
                <span className="font-regular text-gray-600">
                  Write about how do you want to transform this image.
                </span>
                <input
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="A face with a hat..."
                  required
                  className="mt-2 border border-gray-200 rounded-lg text-lg h-12 p-1 outline-none"
                />
              </label>
              <label className="flex flex-col mt-1">
                <span className="font-bold text-xl">Your email</span>
                <span className="font-regular text-gray-600">
                  This can take some time, so when done we will notify you.
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.org"
                  required
                  className="mt-2 border border-gray-200 rounded-lg text-lg h-12 p-1 outline-none"
                />
              </label>
              <button
                className="h-12 border border-gray-200 rounded-lg my-2 hover:bg-gray-200 hover:shadow-sm transition-all"
                type="submit"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      ) : (
        <h2 className="text-center font-bold text-4xl">Loading</h2>
      )}
    </section>
  );
};

export default Start;

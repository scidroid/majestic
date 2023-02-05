import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR, { type Fetcher } from "swr";

interface Pool {
  id: string;
  original_image: string;
  result_image: string;
  neutral: string;
  target: string;
  status: string;
  created_at: string;
}

const fetcher: Fetcher<Pool> = (url: string) =>
  fetch(url).then((res) => res.json());

const Result: NextPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const { isLoading, data } = useSWR<Pool>(`/api/pool?id=${id}`, fetcher);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="font-black text-7xl text-center">Result</h1>
      <div className="m-8 flex flex-wrap items-center justify-around w-full">
        <Image
          src={data?.original_image || ""}
          alt="Picture of a girl with long hair"
          width={400}
          height={400}
          className="shadow-xl w-60 h-full object-cover rounded-xl border-8 border-white"
        />
        <p className="shadow-xl p-4 bg-white font-black text-2xl text-center w-60 rounded-xl">
          {data?.neutral} {"->"} {data?.target}
        </p>
        {data && data.status == "DONE" ? (
          <Image
            src={data?.result_image || ""}
            alt="The result image"
            width={400}
            height={400}
            className="shadow-full w-60 h-full object-cover rounded-xl border-8 border-white"
          />
        ) : (
          <p className="shadow-xl p-4 bg-white font-black text-2xl text-center w-60 rounded-xl">
            {data && data.status == "PROCESSING" ? "Processing..." : "Failed"}
          </p>
        )}
      </div>
      <p className="text-center text-gray-500">
        {data?.created_at || "Unknown"}
        </p>
    </div>
  );
};

export default Result;

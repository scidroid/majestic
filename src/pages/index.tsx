import Example from "@/components/Example";
import Start from "@/components/Start";
import type { NextPage } from "next";
import Balancer from "react-wrap-balancer";

const Home: NextPage = () => {
  return (
    <main className="flex flex-col items-center justify-around mb-8">
      <Example />
      <div>
        <h1 className="font-black text-7xl text-center">
          <Balancer>Edit your selfies in seconds</Balancer>
        </h1>
        <p className="font-regular text-xl text-center text-gray-600 mt-8">
          <Balancer>
            Edit your selfies with AI effortlessly. Just upload a selfie, enter
            a prompt and get a result.
          </Balancer>
        </p>
      </div>
      <Start />
    </main>
  );
};

export default Home;

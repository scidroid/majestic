import Image from "next/image";
import React from "react";

const Example: React.FC = () => {
  return (
    <div className="m-8 flex flex-wrap items-center justify-around w-full">
      <Image
        src="/in.jpeg"
        alt="Picture of a girl with long hair"
        width={400}
        height={400}
        className="shadow-xl w-60 h-60 object-cover rounded-xl border-8 border-white rotate-6"
      />
      <p className="shadow-xl p-4 bg-white font-black text-2xl text-center w-60 rounded-xl rotate-2">
        A face with a bowlcut
      </p>
      <Image
        src="/out.jpg"
        alt="The image of the girl but now with a short haircut"
        width={400}
        height={400}
        className="shadow-xl w-60 h-60 object-cover rounded-xl border-8 border-white -rotate-6"
      />
    </div>
  );
};

export default Example;

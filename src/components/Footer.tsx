import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="m-8">
      <p className="text-center font-regular text-xl text-gray-600">
        By{" "}
        <a
          href="https://beta.scidroid.co/"
          className="underline hover:no-underline"
        >
          Juan Almanza
        </a>
      </p>
    </footer>
  );
};

export default Footer;

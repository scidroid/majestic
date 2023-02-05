import { Container } from "@react-email/container";
import { Hr } from "@react-email/hr";
import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import React from "react";

type Props = {
  token: string;
};

const Ready: React.FC<Props> = ({ token }) => {
  const URL = process.env.URL;

  return (
    <Html lang="en">
      <Text>Hello!</Text>
      <Text>
        Your Majestic results are ready. this link is valid for the next 24
        hours.
      </Text>
      <Text>
        You can view them at{" "}
        <a href={`${URL}/${token}`}>
          {URL}/{token}
        </a>
      </Text>
      <Hr />
      <Container>
        <Text style={{ fontWeight: "bold" }}>Juan Almanza,</Text>
        <Text>hi@scidroid.co</Text>
      </Container>
    </Html>
  );
};

export default Ready;

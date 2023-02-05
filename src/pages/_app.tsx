import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Inter } from "@next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Majestic</title>
        <meta name="description" content="Generate images" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="flex flex-col items-center justify-between min-h-screen">
        <div className="max-w-4xl">
          <Header />
          <main className={inter.className}>
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;

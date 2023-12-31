import Head from "next/head";
import { useEffect } from "react";
import { useHeader } from "~/hooks/useHeader";
import type { PageProps } from "~/types";

const Page = ({ title = "404 - Not found" }: PageProps) => {
  const [, setHeader] = useHeader();

  useEffect(() => {
    setHeader(title);
  }, [title, setHeader]);

  return (
    <>
      <Head>
        <title>404 - Not found</title>
      </Head>
      <main className="container mx-auto p-2">
        <h1>404</h1>
        <p>Page not found</p>
      </main>
    </>
  );
};

export default Page;

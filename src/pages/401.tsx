import Head from "next/head";
import { useEffect } from "react";
import { useHeader } from "~/hooks/useHeader";
import type { PageProps } from "~/types";

const Page = ({ title = "401 - Unauthorized" }: PageProps) => {
  const [, setHeader] = useHeader();

  useEffect(() => {
    setHeader(title);
  }, [title, setHeader]);

  return (
    <>
      <Head>
        <title>401 - Unauthorized</title>
      </Head>
      <main className="container mx-auto p-2">
        <h1>401</h1>
        <p>You do not have access to view this page.</p>
      </main>
    </>
  );
};

export default Page;

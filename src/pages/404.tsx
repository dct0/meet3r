import type { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useHeader } from "~/hooks/useHeader";
import type { PageProps } from "~/types";
import { requireAuth } from "~/utils/requireAuth";

const Page = ({ title }: PageProps) => {
  const [, setHeader] = useHeader();

  useEffect(() => {
    setHeader(title);
  }, [title, setHeader]);

  return (
    <main className="container mx-auto p-2">
      <h1>404</h1>
      <p>Page not found</p>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await requireAuth(context, (session) => ({
    props: { session, title: "404 - Not found" },
  }));
};

export default Page;

import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useHeader } from "~/hooks/useHeader";
import type { PageProps } from "~/types";
import { api } from "~/utils/api";
import { requireAuth } from "~/utils/requireAuth";

const Page = ({ title }: PageProps) => {
  const [, setHeader] = useHeader();
  const router = useRouter();
  const { data: userData } = api.user.get.useQuery({
    id: router.query.id as string,
  });

  useEffect(() => {
    setHeader(title);
  }, [title, setHeader]);

  return (
    <main className="container mx-auto p-2">
      <h1>Profile</h1>
      <p>Profile page</p>
      {userData?.email}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await requireAuth(context, (session) => {
    return {
      props: { session, title: "Profile" },
    };
  });
};

export default Page;

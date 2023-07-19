import type { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useHeader } from "~/hooks/useHeader";
import type { PageProps } from "~/types";
import { api } from "~/utils/api";
import { requireAuth } from "~/utils/requireAuth";

const Page = ({ title }: PageProps) => {
  const [, setHeader] = useHeader();
  const { data: sessionData } = useSession();
  const { data: userData } = api.user.get.useQuery(
    {
      id: sessionData?.user?.id ?? "",
    },
    {
      enabled: !!sessionData?.user?.id,
    }
  );

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
      props: { session, title: "Your Profile" },
    };
  });
};

export default Page;

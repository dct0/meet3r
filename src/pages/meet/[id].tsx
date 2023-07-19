import type { Meet } from "@prisma/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSideProps } from "next";
import { useEffect } from "react";
import superjson from "superjson";
import { useHeader } from "~/hooks/useHeader";
import { appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import type { PageProps } from "~/types";
import { api } from "~/utils/api";
import { requireAuth } from "~/utils/requireAuth";

interface MeetPageProps extends PageProps {
  id: Meet["id"];
}

const Page = ({ id }: MeetPageProps) => {
  const [, setHeader] = useHeader();
  const { data: meet } = api.meet.get.useQuery({ id });

  useEffect(() => {
    setHeader(meet?.name ?? "");
  }, [setHeader, meet?.name]);

  return (
    <main className="container mx-auto p-2">
      <h1 className="text-2xl font-bold">{meet?.name}</h1>
      <p className="text-lg">{meet?.description}</p>
      <p className="text-md">{meet?.location}</p>
      <p className="text-md">
        {meet?.allowedDates.map((d) => d.toLocaleString())}
      </p>
      <p className="text-md">{meet?.createdById}</p>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return await requireAuth(context, async (session) => {
    const helpers = createServerSideHelpers({
      router: appRouter,
      ctx: createInnerTRPCContext({
        session,
      }),
      transformer: superjson,
    });

    const meet = await helpers.meet.get.fetch({
      id: context.params?.id as string,
    });

    if (!meet) {
      return {
        notFound: true,
      };
    }

    return {
      props: { session, id: meet.id },
    };
  });
};

export default Page;

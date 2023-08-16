import type { Meet } from "@prisma/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";
import superjson from "superjson";
import Badge from "~/components/ui/Badge";
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
    <>
      <Head>
        <title>{meet && `${meet.name} - Meet3r`}</title>
      </Head>
      <main className="container mx-auto p-2">
        <article className="flex bg-base-100 shadow">
          <aside className="field-container-aside-l basis-1/4 bg-base-200 p-4">
            <p className="text-lg">{meet?.description}</p>
            <p className="text-md">{meet?.location}</p>
            <ul className="flex flex-wrap gap-1">
              {meet?.allowedDates.map((d) => (
                <li key={d.getTime()}>
                  <Badge className="badge-secondary">
                    {d.toLocaleString()}
                  </Badge>
                </li>
              ))}
            </ul>
            <p className="text-md">{meet?.createdById}</p>
          </aside>
          <div className="field-container-aside-r flex-1 p-4">Timetable</div>
        </article>
      </main>
    </>
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

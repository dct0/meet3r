import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  PreviewData,
} from "next";
import type { Session } from "next-auth";
import { getSession } from "next-auth/react";
import type { ParsedUrlQuery } from "querystring";

export const requireAuth = async (
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  callback: (
    session: Session
  ) => GetServerSidePropsResult<{ [key: string]: unknown }>
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return callback(session);
};

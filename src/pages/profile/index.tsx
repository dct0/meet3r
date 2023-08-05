import type { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import MeetItem from "~/components/profile/MeetItem";
import { useHeader } from "~/hooks/useHeader";
import type { PageProps } from "~/types";
import { api } from "~/utils/api";
import { requireAuth } from "~/utils/requireAuth";

const fallbackAvatarUrl = "/assets/default-avatar.png";

const Page = ({ title }: PageProps) => {
  const [, setHeader] = useHeader();
  const { data: sessionData } = useSession();
  const { data: meetsData } = api.meet.list.useQuery({});

  const user = sessionData!.user;

  const [avatarUrl, setAvatarUrl] = useState(user.image ?? "");

  useEffect(() => {
    setHeader(title);
  }, [title, setHeader]);

  useEffect(() => {
    setAvatarUrl(sessionData?.user.image ?? "");
  }, [sessionData?.user.image]);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <main className="container mx-auto flex flex-col">
        <header className="mx-2 my-4 flex items-center gap-4 overflow-hidden">
          <Image
            className="mask mask-squircle"
            src={avatarUrl}
            width={96}
            height={96}
            priority
            alt="Your profile picture"
            onLoadingComplete={(result) =>
              result.naturalHeight === 0 && setAvatarUrl(fallbackAvatarUrl)
            }
            onError={() => setAvatarUrl(fallbackAvatarUrl)}
          />
          <div>
            <h1 className="text-4xl font-extrabold leading-tight">
              {user.name}
            </h1>
            <h2 className="text-xl font-semibold">{user.email}</h2>
            <p>{`Joined ${new Date(user.createdAt).toLocaleDateString()}`}</p>
          </div>
        </header>
        <div className="divider my-0 h-auto" role="separator" />
        <section role="feed">
          <ul>
            {meetsData?.map((meet) => (
              <>
                <MeetItem key={meet.id} {...meet} />
                <div className="divider my-0 h-auto" role="separator" />
              </>
            ))}
            <li className="text-center">Show more</li>
          </ul>
        </section>
      </main>
    </>
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

import type { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useHeader } from "~/hooks/useHeader";
import type { PageProps } from "~/types";
import { api } from "~/utils/api";
import { requireAuth } from "~/utils/requireAuth";

const fallbackAvatarUrl = "/assets/default-avatar.png";

const mockMeets = [
  {
    id: "1",
    name: "Meet 1",
    description: "Meet 1 description",
    location: "Meet 1 location",
    allowedDates: [new Date()],
    createdById: "1",
  },
  {
    id: "2",
    name: "Meet 2",
    description: "Meet 2 description",
    location: "Meet 2 location",
    allowedDates: [new Date()],
    createdById: "1",
  },
  {
    id: "3",
    name: "Meet 3",
    description: "Meet 3 description",
    location: "Meet 3 location",
    allowedDates: [new Date()],
    createdById: "1",
  },
  {
    id: "4",
    name: "Meet 4",
    description: "Meet 4 description",
    location: "Meet 4 location",
    allowedDates: [new Date()],
    createdById: "1",
  },
];

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
      <main className="container mx-auto flex flex-col p-2">
        <header className="mt-4 flex items-center gap-4 overflow-hidden">
          <Image
            className="mask mask-squircle"
            src={avatarUrl}
            width={128}
            height={128}
            priority
            alt="Your profile picture"
            onLoadingComplete={(result) => {
              if (result.naturalHeight === 0) {
                setAvatarUrl(fallbackAvatarUrl);
              }
            }}
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
        <div className="divider" role="separator" />
        <section className="field-container p-4" role="feed">
          <ul>
            {mockMeets?.map((meet) => (
              <article key={meet.id}>
                <h3>{meet.name}</h3>
                <li>{meet.description}</li>
                <li>{meet.location}</li>
                <li>{meet.createdById}</li>
                <div className="divider" role="separator" />
              </article>
            ))}
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

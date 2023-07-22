import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  const { data: sessionData } = useSession();
  return (
    <>
      <Head>
        <title>meet3r</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Mee<span className="text-[hsl(280,100%,70%)]">T3</span>r
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/meet/create"
            >
              <h3 className="text-2xl font-bold">Create a Meet →</h3>
              <div className="text-lg">
                Create a new meet and invite your friends to vote on the best
                time to meet.
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="/profile"
            >
              <h3 className="text-2xl font-bold">View profile →</h3>
              <div className="text-lg">See your meets.</div>
            </Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center justify-center gap-4">
              <p className="text-center text-2xl text-white">
                {sessionData && (
                  <span>
                    Logged in as{" "}
                    <code className="rounded bg-black bg-opacity-50 p-1">
                      {sessionData.user?.name}
                    </code>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

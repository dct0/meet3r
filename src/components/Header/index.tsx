import { signIn, signOut, useSession } from "next-auth/react";
import { useHeader } from "~/hooks/useHeader";
import dynamic from "next/dynamic";
import Link from "next/link";

const ThemeDropdownWithNoSSR = dynamic(() => import("./ThemeDropdown"), {
  ssr: false,
});

const Header = () => {
  const { data: sessionData } = useSession();
  const [header] = useHeader();

  return (
    <header className="sticky top-0 z-10">
      <nav className="navbar rounded-box flex justify-evenly bg-base-300">
        <div className="flex-1">
          <Link
            className="btn-ghost rounded-btn btn text-lg font-bold"
            href="/"
          >
            meet3r
          </Link>
        </div>
        <h1 className="text-xl font-extrabold">{header}</h1>
        <div className="flex flex-1 justify-end">
          <ThemeDropdownWithNoSSR />
          <div className="flex items-stretch">
            <button
              className="btn-ghost rounded-btn btn"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sign out" : "Sign in"}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

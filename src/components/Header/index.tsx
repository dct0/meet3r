import { signIn, signOut, useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useHeader } from "~/hooks/useHeader";

const ThemeDropdownWithNoSSR = dynamic(() => import("./ThemeDropdown"), {
  ssr: false,
});

const Header = () => {
  const { data: sessionData } = useSession();
  const [header] = useHeader();

  return (
    <header className="sticky top-0 z-10">
      <nav className="navbar flex justify-between rounded-none bg-base-300">
        <div className="btn-ghost rounded-btn btn">
          <Link className="text-lg font-bold" href="/">
            <h2>
              <span className="hidden sm:inline">meet3r</span>{" "}
              <span>&#128034;</span>
            </h2>
          </Link>
        </div>
        <h1 className="text-md font-extrabold sm:text-xl">{header}</h1>
        <div className="flex justify-end">
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

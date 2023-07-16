import clsx from "clsx";
import { useEffect } from "react";
import { BsPalette2 } from "react-icons/bs";
import { useLocalStorage } from "usehooks-ts";
import { useHeader } from "~/hooks/useHeader";

export const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
] as const;

export type Theme = (typeof themes)[number];

const Header = () => {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");
  const [header] = useHeader();

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header>
      <nav className="navbar rounded-box flex justify-evenly bg-base-300">
        <div className="flex-1 px-2">
          <a className="text-lg font-bold">meet3r</a>
        </div>
        <h1 className="text-xl font-extrabold">{header}</h1>
        <div className="flex flex-1 justify-end px-2">
          <div className="flex items-stretch">
            <a className="btn-ghost rounded-btn btn">[Login]</a>
            <div className="dropdown-end dropdown">
              <button tabIndex={0} className="btn-ghost rounded-btn btn">
                <BsPalette2 />
                Theme
              </button>
              <menu
                tabIndex={0}
                className="dropdown-content menu rounded-box z-[1] mt-4 flex h-96 w-96 flex-col bg-base-100 p-2 shadow"
              >
                {themes.map((item, i) => (
                  <li key={i}>
                    <a
                      className={clsx("capitalize", { active: item === theme })}
                      onClick={() => setTheme(item)}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </menu>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

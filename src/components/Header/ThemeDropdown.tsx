import clsx from "clsx";
import { useEffect } from "react";
import { BsPalette2 } from "react-icons/bs";
import { useLocalStorage } from "usehooks-ts";

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

const ThemeDropdown = () => {
  const [theme, setTheme] = useLocalStorage<Theme>("theme", "light");

  useEffect(() => {
    document.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);

  return (
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
  );
};

export default ThemeDropdown;

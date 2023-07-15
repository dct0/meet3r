import { createContext, useState } from "react";
import type { PropsWithChildren } from "react";

export const HeaderContext = createContext([
  "",
  (_header: string) => {
    return;
  },
] as [string, (header: string) => void]);

export const HeaderProvider = (props: PropsWithChildren) => {
  const state = useState<string>("");

  return (
    <HeaderContext.Provider value={state}>
      {props.children}
    </HeaderContext.Provider>
  );
};

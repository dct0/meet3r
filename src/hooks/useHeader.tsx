import { createContext, useContext, useState } from "react";
import type { PropsWithChildren } from "react";

const HeaderContext = createContext([
  "",
  (_header: string) => {
    return;
  },
] as [string, (header: string) => void]);

const HeaderProvider = (props: PropsWithChildren) => {
  const state = useState<string>("");

  return (
    <HeaderContext.Provider value={state}>
      {props.children}
    </HeaderContext.Provider>
  );
};

const useHeader = () => {
  return useContext(HeaderContext);
};

export { HeaderProvider, useHeader };

import { Provider, createStore } from "jotai";
import { DevTools } from "jotai-devtools";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import { HeaderProvider } from "~/hooks/useHeader";
import "~/styles/globals.css";
import { api } from "~/utils/api";

import dynamic from "next/dynamic";

const HeaderWithNoSSR = dynamic(() => import("../components/ui/Header"), {
  ssr: false,
});

const customStore = createStore();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Provider store={customStore}>
      <DevTools store={customStore} />
      <SessionProvider session={session}>
        <HeaderProvider>
          <HeaderWithNoSSR />
          <Component {...pageProps} />
        </HeaderProvider>
      </SessionProvider>
    </Provider>
  );
};

export default api.withTRPC(MyApp);

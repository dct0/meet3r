import { Provider, createStore } from "jotai";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import Header from "~/components/Header";
import { HeaderProvider } from "~/hooks/useHeader";
import "~/styles/globals.css";
import { api } from "~/utils/api";

const customStore = createStore();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <Provider store={customStore}>
      <SessionProvider session={session}>
        <HeaderProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <Component {...pageProps} />
          </div>
        </HeaderProvider>
      </SessionProvider>
    </Provider>
  );
};

export default api.withTRPC(MyApp);

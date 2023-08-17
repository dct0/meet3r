import { Provider, createStore } from "jotai";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppType } from "next/app";
import { ErrorBoundary } from "react-error-boundary";
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
            <ErrorBoundary fallbackRender={() => <p>Fail</p>}>
              <Component {...pageProps} />
            </ErrorBoundary>
          </div>
        </HeaderProvider>
      </SessionProvider>
    </Provider>
  );
};

export default api.withTRPC(MyApp);

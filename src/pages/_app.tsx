import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { HeaderProvider } from "~/contexts/HeaderContext";
import "~/styles/globals.css";
import { api } from "~/utils/api";

import dynamic from "next/dynamic";

const HeaderWithNoSSR = dynamic(() => import("../components/ui/Header"), {
  ssr: false,
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <HeaderProvider>
        <HeaderWithNoSSR />
        <Component {...pageProps} />
      </HeaderProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);

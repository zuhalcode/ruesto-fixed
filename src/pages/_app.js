import "@styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";

import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "src/store";

export default function App({ Component, pageProps, session }) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <SessionProvider session={session}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </SessionProvider>
    </PersistGate>
  );
}

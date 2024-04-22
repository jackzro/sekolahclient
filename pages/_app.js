import "../styles/globals.css";
import "react-datepicker/dist/react-datepicker.css";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "context/AuthContext";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      {/* <SessionProvider session={session} refetchInterval={1 * 60}> */}
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={5000} closeOnClick />
      </AuthProvider>
      {/* </SessionProvider> */}
    </QueryClientProvider>
  );
}

export default MyApp;

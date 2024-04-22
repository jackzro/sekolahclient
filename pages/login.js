import Head from "next/head";
import Image from "next/image";
import Logo from "../assets/images/ykb-logo.png";
import LoginForm from "../components/form/LoginForm";
// import { signIn, useSession, getCsrfToken } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { checkAuth } from "@helpers/auth";
import { AuthContext } from "@context/AuthContext";
import { pathByUnit } from "@helpers/help";

export default function Login() {
  const { signIn, user } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const notifyError = (message) =>
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      toastId: "notifyError",
    });
  // const { data: session, status } = useSession();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/");
  //   }
  // }, [status]);

  useEffect(() => {
    if (checkAuth()) {
      router.push("/");
    } else {
      setIsLoaded(true);
    }
  }, []);

  const handleSubmit = async (data) => {
    try {
      await signIn(data);
      // router.push("/");
    } catch (error) {
      console.log(error);
      notifyError("Your email or password is wrong !!!");
    }
    // try {
    // const res = await signIn("credentials", {
    //   email,
    //   password,
    //   callbackUrl: `${window.location.origin}`,
    //   redirect: false,
    // });
    // if (res?.error) {
    //   toast(res.error);
    // }
    // } catch (error) {}
  };

  if (!isLoaded) return <></>;

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="flex flex-col h-screen bg-white">
        <div className="flex items-center px-4 py-4 mb-8 space-x-6 border-b">
          <Image src={Logo} width="35" height="38" />
          <p className="text-3xl font-bold text-gray-600">Payment System</p>
        </div>
        <div>
          <LoginForm onHandleSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  if (ctx.req.cookies["nextauth.user"] === undefined) {
    return {
      props: {
        isAuthenticated: false,
      },
    };
  }
  const user = JSON.parse(await ctx.req.cookies["nextauth.user"]);
  if (user.role !== "admin" && user.role !== "fotocopy") {
    return {
      redirect: {
        destination: pathByUnit(user.role), //usually the login page
        permanent: false,
      },
    };
  }
  if (user.role === "fotocopy") {
    return {
      redirect: {
        destination: "/fotocopy", //usually the login page
        permanent: false,
      },
    };
  }
  return {
    redirect: {
      destination: "/", //usually the login page
      permanent: false,
    },
  };
};

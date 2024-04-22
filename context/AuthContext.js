import React, { useEffect, useState, createContext } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router from "next/router";
import { loginRequest } from "@services/auth";
import { pathByUnit } from "@helpers/help";
import {
  ROLE_ADMIN,
  ROLE_SD,
  ROLE_SMA,
  ROLE_SMP,
  ROLE_TK,
} from "@constants/role";
export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const isAuthenticated = () => {
    const { "nextauth.token": token } = parseCookies();
    return token;
  };

  const isAdmin = () => user?.role === ROLE_ADMIN;
  const isTk = () => user?.role === ROLE_TK;
  const isSd = () => user?.role === ROLE_SD;
  const isSmp = () => user?.role === ROLE_SMP;
  const isSma = () => user?.role === ROLE_SMA;

  async function signIn({ email, password }) {
    try {
      const response = await loginRequest({ email, password });
      const { token, payload } = response;
      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 1,
        path: "/",
      });
      setCookie(undefined, "nextauth.user", JSON.stringify(payload), {
        maxAge: 60 * 60 * 1,
        path: "/",
      });
      setUser(payload);

      if (payload.role === "admin") {
        Router.push("/");
      } else if (payload.role === "fotocopy") {
        Router.push("/fotocopy");
      } else {
        Router.push(pathByUnit(payload.role));
      }
    } catch (error) {
      throw error;
    }
  }

  function logout() {
    destroyCookie(undefined, "nextauth.token", { path: "/" });
    destroyCookie(undefined, "nextauth.user", { path: "/" });
    Router.push("/login");
  }

  useEffect(() => {
    const { "nextauth.user": userData } = parseCookies();
    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      // failed parse
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        isAuthenticated,
        isAdmin,
        isTk,
        isSd,
        isSmp,
        isSma,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

"use client";

import { useSetStore } from "@/contexts/storeContext";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRequest } from "@/hooks/useRequest";
import { userPrivateInfoAPI } from "@/api/auth";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const setStore = useSetStore();

  const { execute: getUserPrivateInfo } = useRequest(userPrivateInfoAPI);

  useEffect(() => {
    const isLoggedIn = Cookies.get("is_logged_in") === "1";

    if (isLoggedIn) {
      setStore({ auth: { user: null, isLoading: true, isLoggedIn: true } });

      getUserPrivateInfo()
        .then(({ data }) => {
          setStore({
            auth: { isLoading: false, isLoggedIn: true, user: data.data },
          });
        })
        .catch((reason) => {
          if (reason.response.status === 401) {
            setStore({
              auth: { isLoading: false, isLoggedIn: false, user: null },
            });
          }
        });
    }
  }, []);

  return children;
};

export default AuthProvider;

"use client";

import { axiosInstance } from "@/lib/axios";
import { getTranslations } from "@/lib/translation";
import { Params } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const AxiosInterceptor = ({ children }: { children: React.ReactNode }) => {
  const params = useParams<Params>();

  const { t } = getTranslations(["errors"], params);

  useEffect(() => {
    const id = axiosInstance.interceptors.response.use(
      (res) => res,
      (err) => {
        toast.error(t(`errors.${err.response.data.error}`));
        
        return Promise.reject(err);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(id);
    };
  }, []);

  return children;
};

export default AxiosInterceptor;

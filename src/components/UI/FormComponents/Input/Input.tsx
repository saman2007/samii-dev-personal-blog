"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useFormContext, useFormState } from "react-hook-form";
import FieldError from "../FieldError/FieldError";
import { getTranslations } from "@/lib/translation";
import { useParams } from "next/navigation";
import { Params, YupErrorMessage } from "@/types/types";

const InputUI = ({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-text-primary placeholder:text-text-secondary selection:bg-green selection:text-semi-white dark:bg-semi-white/10 bg-transparent border-border h-9 w-full min-w-0 rounded-md border  px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-green focus-visible:ring-green/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-red/20 dark:aria-invalid:ring-red/40 aria-invalid:border-red",
        className
      )}
      {...props}
    />
  );
};

const InputRHF = ({
  name,
  ...props
}: React.ComponentProps<"input"> & { name: string }) => {
  const { register } = useFormContext();
  const { errors } = useFormState({ name });

  const params = useParams<Params>();
  const { t } = getTranslations(["yupErrors"], params);

  const error = errors[name]?.message as YupErrorMessage | string | undefined;

  return (
    <>
      <InputUI
        aria-invalid={!!error}
        {...props}
        {...register(name, {
          onBlur: props?.onBlur,
          onChange: props?.onChange,
        })}
      />
      <FieldError
        error={
          typeof error === "object"
            ? t(`yupErrors.${error.key}`, error.data)
            : error
        }
      />
    </>
  );
};

export { InputUI, InputRHF };

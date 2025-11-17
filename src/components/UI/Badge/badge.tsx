import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-green focus-visible:ring-green/50 focus-visible:ring-[3px] aria-invalid:ring-green/20 dark:aria-invalid:ring-green/40 aria-invalid:border-green transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-green text-semi-white [a&]:hover:bg-green/90",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  iconLeft?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, iconLeft, ...props }, ref) => {
    return (
      <div className={cn("relative w-full", iconLeft && "pl-9")}> 
        {iconLeft && (
          <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
            {iconLeft}
          </span>
        )}
        <input
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
            iconLeft && "pl-8",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
Input.displayName = "Input";

export default Input;

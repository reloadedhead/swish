import { cloneElement } from "react";
import type { DetailedHTMLProps, HTMLProps } from "react";
import cn from "classnames";

type Props = {
  label?: string;
  hideLabel?: boolean;
  startIcon?: JSX.Element;
  error?: string | null;
} & DetailedHTMLProps<HTMLProps<HTMLInputElement>, HTMLInputElement>;

export default function Input({
  label,
  hideLabel,
  name,
  startIcon,
  error,
  ...rest
}: Props) {
  return (
    <div className="w-full">
      <label
        className="block text-sm font-medium text-gray-700 dark:text-gray-600"
        htmlFor={`input-${name}`}
      >
        <span className={cn(hideLabel && "sr-only")}>{label}</span>
      </label>
      <div
        className={cn(
          !hideLabel && "mt-2",
          "group relative rounded-md dark:bg-slate-700 dark:highlight-white/10 dark:focus-within:bg-transparent"
        )}
      >
        {startIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            {cloneElement(startIcon, {
              className: cn(
                error && "stroke-red-600",
                "h-5 w-5 group-focus-within:stroke-indigo-500"
              ),
            })}
          </div>
        )}
        <input
          className={cn(
            startIcon && "pl-10",
            error && "ring-red-600 dark:ring-2",
            "appearance-none px-2 w-full text-sm leading-6 bg-transparent text-slate-900 placeholder:text-slate-400 rounded-md py-2 ring-2 ring-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-2 dark:ring-0"
          )}
          name={name}
          id={`input-${name}`}
          {...rest}
        />
      </div>
      {error && <span className="text-sm text-red-600">{error}</span>}
    </div>
  );
}

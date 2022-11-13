import type {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from "react";
import cn from "classnames";

type Variant = "primary" | "secondary";

type Props = {
  variant?: Variant;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const VariantStyles: Record<Variant, string> = {
  primary:
    "text-white bg-indigo-600 hover:bg-indigo-500 border border-transparent",
  secondary:
    "ring-1 ring-slate-200 hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white",
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  ...rest
}: PropsWithChildren<Props>) {
  return (
    <button
      {...rest}
      type={type}
      className={cn(
        "flex items-center py-2 px-3 text-sm font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
        VariantStyles[variant]
      )}
    >
      {children}
    </button>
  );
}

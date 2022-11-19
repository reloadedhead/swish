import type { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = {
  label: string;
  hideLabel?: boolean;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function Toggle({ label, hideLabel, ...rest }: Props) {
  return (
    <label
      className="flex items-center cursor-pointer relative"
      aria-label={label}
    >
      <input
        type="checkbox"
        id="toggle-example"
        className="sr-only"
        {...rest}
      />
      <div className="toggle-bg bg-gray-200 dark:bg-slate-500 border-2 border-gray-200 dark:border-slate-500 h-6 w-11 rounded-full"></div>
      <span
        hidden={hideLabel}
        className="ml-3 text-gray-900 text-sm font-medium"
      >
        {label}
      </span>
    </label>
  );
}

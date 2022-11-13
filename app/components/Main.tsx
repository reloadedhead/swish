import type { PropsWithChildren } from "react";

export default function Main({ children }: PropsWithChildren) {
  return (
    <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">{children}</main>
  );
}

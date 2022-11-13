import type { PropsWithChildren } from "react";

export default function Main({ children }: PropsWithChildren) {
  return <main className="p-2">{children}</main>;
}

import type { LinksFunction } from "@remix-run/node";
import Main from "~/components/Main";
import animation from "~/styles/animation.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: animation },
];

export default function Index() {
  return (
    <Main>
      <div className="pt-20 pb-32 sm:pt-48 sm:pb-40">
        <h1 className="text-4xl font-bold tracking-tight text-center sm:text-6xl">
          <span className="swish-underline swish-underline-black animate-bounce">
            Swish
          </span>{" "}
          your playlists from{" "}
          <span className="underline underline-offset-8 decoration-red-600 dark:text-white">
            YouTube
          </span>{" "}
          to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Apple Music
          </span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 text-center">
          No ads. No sign-up. No bullshit.
        </p>
      </div>
    </Main>
  );
}

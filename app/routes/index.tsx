import { json, redirect } from "@remix-run/node";
import { LinkIcon } from "@heroicons/react/24/outline";
import { Form, useActionData, useTransition } from "@remix-run/react";
import type { ActionArgs, LinksFunction } from "@remix-run/node";

import Input from "~/components/Input";
import Main from "~/components/Main";
import Button from "~/components/Button";
import animation from "~/styles/animation.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: animation },
];

type ActionData = {
  playlistUrl?: string | null;
};

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const playlistUrl = formData.get("playlistUrl");

  const errors: ActionData = { playlistUrl: null };

  if (typeof playlistUrl !== "string" || playlistUrl.length === 0) {
    errors.playlistUrl = "A playlist URL is required";
    return json<ActionData>(errors);
  }

  try {
    const url = new URL(playlistUrl);
    const playlistId = url.searchParams.get("list");

    if (playlistId === null) {
      errors.playlistUrl = "This is not a playlist URL";
      return json<ActionData>(errors);
    }

    return redirect(`/playlist/${playlistId}`);
  } catch (error) {
    return json<ActionData>({ playlistUrl: "This is not a URL!" });
  }
}

export default function Index() {
  const errors = useActionData<ActionData>();
  const { state } = useTransition();

  return (
    <Main>
      <div className="flex flex-col items-center">
        <div className="pt-20 pb-32 sm:pt-48 sm:pb-20">
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
        <Form
          className="w-2/3 flex space-x-2 items-top justify-center"
          method="post"
        >
          <div className="w-2/3">
            <Input
              name="playlistUrl"
              label="Playlist url"
              hideLabel
              placeholder="Enter a YouTube playlist link..."
              startIcon={<LinkIcon />}
              error={errors?.playlistUrl}
            />
          </div>
          <Button type="submit" disabled={state === "submitting"}>
            {state === "submitting" ? "Searching..." : "Search"}
          </Button>
        </Form>
      </div>
    </Main>
  );
}

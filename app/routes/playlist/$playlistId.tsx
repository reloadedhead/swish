import { Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import invariant from "tiny-invariant";
import type { LoaderFunction } from "@remix-run/node";

import youtube from "~/services/youtube";
import type { PlaylistItem } from "~/types/youtube";
import Main from "~/components/Main";
import Toggle from "~/components/Toggle";
import Button from "~/components/Button";

type LoaderData = {
  videos: PlaylistItem[];
};

export const loader: LoaderFunction = async ({ params }) => {
  const { playlistId } = params;

  invariant(playlistId !== undefined, "Playlist ID is required");

  const response = await youtube.getPlaylistItems(playlistId);

  const videos = response.items.map(({ snippet, id }) => ({
    title: snippet.title,
    thumbnail: snippet.thumbnails.default.url,
    id,
    playlistId: snippet.playlistId,
    description: snippet.description,
  }));

  return json<LoaderData>({ videos });
};

export default function Playlist() {
  const { videos } = useLoaderData<LoaderData>();
  return (
    <Main>
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Playlist overview
        </h1>
        <Button>Sync</Button>
      </div>
      <div className="overflow-x-auto sm:overflow-y-auto relative shadow-md rounded-lg max-h-96 mt-2">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="py-3 px-6">#</th>
              <th className="py-3 px-6">Title</th>
              <th className="py-3 px-6">Sync?</th>
            </tr>
          </thead>
          <tbody className="dark:bg-gray-800">
            {videos.map((video, index) => (
              <tr className="border-b dark:border-gray-700" key={video.id}>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {index + 1}
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}&list=${video.playlistId}`}
                    className="text-indigo-500 hover:underline"
                  >
                    {video.title}
                  </a>
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <Toggle
                    name={video.id}
                    label={"sync"}
                    hideLabel
                    defaultChecked
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Main>
  );
}

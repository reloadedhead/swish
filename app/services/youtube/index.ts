import type { PlaylistItemsResponse } from "./types";

class YouTube {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  /**
   * Retrieves a {@link https://developers.google.com/youtube/v3/docs/playlistItems#resource-representation playlist items} object by id.
   * @param playlistId the id of the playlist items to retrieve.
   * @returns playlist items.
   */
  public async getPlaylistItems(
    playlistId: string
  ): Promise<PlaylistItemsResponse> {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("maxResults", "200");
    url.searchParams.set("playlistId", playlistId);
    url.searchParams.set("key", this.key);

    return await (await fetch(url)).json();
  }
}

export default new YouTube(process.env.YOUTUBE_API_KEY!);

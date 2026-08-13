/**
 * Extracts a YouTube video ID from any common URL shape
 * (watch?v=, youtu.be/, embed/), or null if the input isn't a recognizable
 * YouTube link.
 */
export function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.slice(1) || null;
    }

    if (parsed.hostname.includes("youtube.com")) {
      if (parsed.pathname === "/watch") {
        return parsed.searchParams.get("v");
      }
      if (parsed.pathname.startsWith("/embed/")) {
        return parsed.pathname.replace("/embed/", "") || null;
      }
    }

    return null;
  } catch {
    return null;
  }
}

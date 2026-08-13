"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Maximize } from "lucide-react";

interface YouTubePlayerProps {
  videoId: string;
  watchUrl: string;
  title: string;
}

interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  destroy: () => void;
}

interface YTPlayerEvent {
  data: number;
}

interface YTNamespace {
  Player: new (
    el: HTMLElement,
    config: {
      videoId: string;
      playerVars: Record<string, number>;
      events: {
        onReady: () => void;
        onStateChange: (event: YTPlayerEvent) => void;
        onError: (event: YTPlayerEvent) => void;
      };
    }
  ) => YTPlayer;
  PlayerState: { PLAYING: number; ENDED: number };
}

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiLoadPromise: Promise<YTNamespace> | null = null;

function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT) return Promise.resolve(window.YT);
  if (apiLoadPromise) return apiLoadPromise;

  apiLoadPromise = new Promise((resolve) => {
    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousCallback?.();
      resolve(window.YT!);
    };
    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(script);
  });

  return apiLoadPromise;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

// Native controls (title bar, share/watch-later icons, related-video
// popups, YouTube logo) are disabled via controls: 0; we render our own
// minimal play/pause + seek + fullscreen bar on top instead.
export function YouTubePlayer({ videoId, watchUrl, title }: YouTubePlayerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);

  useEffect(() => {
    let cancelled = false;

    loadYouTubeApi().then((YT) => {
      if (cancelled || !hostRef.current) return;

      playerRef.current = new YT.Player(hostRef.current, {
        videoId,
        playerVars: {
          controls: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          disablekb: 1,
          fs: 0,
        },
        events: {
          onReady: () => {
            setIsReady(true);
            setDuration(playerRef.current?.getDuration() ?? 0);
          },
          onStateChange: (event) => {
            const playing = event.data === YT.PlayerState.PLAYING;
            setIsPlaying(playing);
            if (event.data === YT.PlayerState.ENDED) setCurrentTime(playerRef.current?.getDuration() ?? 0);
          },
          // Error codes 101/150: the video owner has disabled embedding.
          onError: () => setHasError(true),
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy?.();
      playerRef.current = null;
    };
  }, [videoId]);

  useEffect(() => {
    if (isPlaying && !isScrubbing) {
      pollRef.current = setInterval(() => {
        if (playerRef.current) setCurrentTime(playerRef.current.getCurrentTime());
      }, 250);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [isPlaying, isScrubbing]);

  if (hasError) {
    return (
      <div className="flex aspect-video flex-col items-center justify-center gap-3 bg-brand-navy p-8 text-center text-white/80">
        <p className="text-sm">This video can&apos;t be played here — its owner has disabled embedding.</p>
        <a
          href={watchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md bg-brand-orange px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
        >
          Watch on YouTube
        </a>
      </div>
    );
  }

  function togglePlay() {
    if (!playerRef.current) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
  }

  function handleSeekChange(value: number) {
    setCurrentTime(value);
  }

  function handleSeekCommit(value: number) {
    playerRef.current?.seekTo(value, true);
    setIsScrubbing(false);
  }

  function handleFullscreen() {
    wrapperRef.current?.requestFullscreen?.();
  }

  return (
    <div ref={wrapperRef} className="group relative aspect-video bg-brand-navy">
      <div ref={hostRef} className="absolute inset-0 h-full w-full" />

      {isReady && (
        <>
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
            className="absolute inset-0 flex h-full w-full items-center justify-center text-white"
          >
            {!isPlaying && (
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-orange/90 shadow-lg transition-transform duration-200 hover:scale-105">
                <Play size={28} className="ml-1" fill="currentColor" />
              </span>
            )}
          </button>

          <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/80 to-transparent px-3 pb-2 pt-6 opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-within:opacity-100">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10"
            >
              {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>

            <span className="w-10 shrink-0 text-xs text-white">{formatTime(currentTime)}</span>

            <input
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={currentTime}
              onChange={(e) => {
                setIsScrubbing(true);
                handleSeekChange(Number(e.target.value));
              }}
              onMouseUp={(e) => handleSeekCommit(Number((e.target as HTMLInputElement).value))}
              onTouchEnd={(e) => handleSeekCommit(Number((e.target as HTMLInputElement).value))}
              aria-label="Seek"
              className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/30 accent-brand-orange"
            />

            <span className="w-10 shrink-0 text-xs text-white">{formatTime(duration)}</span>

            <button
              type="button"
              onClick={handleFullscreen}
              aria-label="Fullscreen"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white hover:bg-white/10"
            >
              <Maximize size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

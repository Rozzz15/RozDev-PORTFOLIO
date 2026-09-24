import { useEffect, useRef } from "react";

interface LazyAutoplayVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

/**
 * Plays a muted, looping video only while it is (near) the viewport.
 * Videos here are 40–100MB, so this avoids decoding several at once and
 * stops playback once the card scrolls off-screen.
 */
export function LazyAutoplayVideo({ src, poster, className }: LazyAutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;      // Start fully deferred; the observer decides when to load & play.
    video.preload = "none";

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.preload !== "auto") video.preload = "auto";
          video.play().catch(() => {
            // Ignore autoplay rejections (e.g. until the user interacts).
          });
        } else {
          video.pause();
          // Stop the browser from buffering the (very large) file in the background.
          video.preload = "metadata";
        }
      },
      { rootMargin: "150px 0px", threshold: 0.01 }
    );
    io.observe(video);

    return () => {
      io.disconnect();
      video.pause();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      loop
      muted
      playsInline
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      className={className}
    />
  );
}

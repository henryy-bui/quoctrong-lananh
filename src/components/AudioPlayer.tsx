import { useEffect, useState } from "react";
import { bgm } from "../audio";
import "./AudioPlayer.css";

export default function AudioPlayer() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = bgm;

    const events = ["pointerdown", "keydown", "touchstart", "scroll"] as const;

    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, tryPlay));
    };

    const tryPlay = () => {
      audio
        .play()
        .then(() => {
          setPlaying(true);
          cleanup();
        })
        .catch(() => {
          /* still blocked: wait for next interaction */
        });
    };

    tryPlay();
    events.forEach((e) =>
      window.addEventListener(e, tryPlay, { passive: true }),
    );

    return () => {
      cleanup();
      audio.pause();
    };
  }, []);

  function toggle() {
    const audio = bgm;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play();
      setPlaying(true);
    }
  }

  return (
    <>
      <button
        className={`audio-btn ${playing ? "playing" : "paused"}`}
        onClick={toggle}
        aria-label={playing ? "Tắt nhạc" : "Bật nhạc"}
        title={playing ? "Tắt nhạc" : "Bật nhạc"}
      >
        <span className="audio-icon">♪</span>
        <span className="audio-bars" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
      </button>
    </>
  );
}

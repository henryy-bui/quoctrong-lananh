import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Lightbox, { type LightboxPhoto } from "./Lightbox";
import { GALLERY_IMAGES } from "../data/gallery.generated";
import "./Gallery.css";

// Photos are discovered automatically: drop files into
// public/images/optimized/ and `scripts/optimize-images.mjs` (run before
// `yarn dev` / `yarn build`) resizes them, makes thumbnails and regenerates
// this manifest with each photo's real dimensions.
const PHOTOS: LightboxPhoto[] = GALLERY_IMAGES.map((img, i) => ({
  bg: img.src,
  thumb: img.thumb,
  label: `Khoảnh khắc ${i + 1}`,
  aspectRatio: `${img.width} / ${img.height}`,
}));

/** Fade the photo in once its bytes have arrived (also covers cached images). */
function markLoaded(img: HTMLImageElement | null) {
  if (img?.complete && img.naturalWidth > 0) img.classList.add("is-loaded");
}

// Matches the `@media (max-width: 640px)` breakpoint in Gallery.css —
// keep the two in sync so the JS carousel and the CSS slide layout
// activate together.
const MOBILE_QUERY = "(max-width: 640px)";

export default function Gallery() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () =>
      typeof window !== "undefined" && window.matchMedia(MOBILE_QUERY).matches
  );
  const slideRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Watch the mobile breakpoint so resizing across it tears down /
  // re-mounts the carousel logic cleanly (no stale observers, no pager
  // hanging around in the DOM on desktop).
  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY);
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // Track which slide is centered. Only runs on mobile — desktop uses
  // the masonry grid layout where active-state has no meaning. We don't
  // reset activeIndex when leaving mobile because every consumer is
  // already gated on `isMobile`, so the stale value is unread.
  useEffect(() => {
    if (!isMobile) return;
    const container = slideRef.current;
    if (!container) return;
    const items = itemRefs.current.filter((x): x is HTMLButtonElement => !!x);
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let bestRatio = 0;
        let bestIdx = -1;
        entries.forEach((entry) => {
          if (entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestIdx = items.indexOf(entry.target as HTMLButtonElement);
          }
        });
        if (bestIdx >= 0 && bestRatio >= 0.6) {
          setActiveIndex(bestIdx);
        }
      },
      { root: container, threshold: [0.4, 0.6, 0.8, 1] }
    );

    items.forEach((it) => observer.observe(it));
    return () => observer.disconnect();
  }, [isMobile]);

  const scrollToIndex = (i: number) => {
    itemRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const close = () => setOpenIndex(null);
  const prev = () =>
    setOpenIndex((i) =>
      i === null ? i : (i - 1 + PHOTOS.length) % PHOTOS.length
    );
  const next = () =>
    setOpenIndex((i) => (i === null ? i : (i + 1) % PHOTOS.length));

  return (
    <section
      className="gallery-bg"
      ref={sectionRef}
      id="gallery"
      data-wipe="up"
    >
      <div className="section" style={{ textAlign: "center" }}>
        <div className="reveal">
          <span className="section-label">Khoảnh Khắc</span>
          <h2 className="section-title">Cùng Nhau Lưu Giữ</h2>
          <div className="section-divider" />
        </div>

        <div className="gallery-grid" ref={slideRef}>
          {PHOTOS.map((p, i) => (
            <button
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              type="button"
              className={`gallery-item reveal reveal-delay-${
                (i % 3) + 1
              } reveal-zoom${
                isMobile && activeIndex === i ? " is-active" : ""
              }`}
              style={{ aspectRatio: p.aspectRatio }}
              aria-label={`Mở ảnh: ${p.label}`}
              onClick={() => setOpenIndex(i)}
            >
              <img
                ref={markLoaded}
                className="gallery-img"
                src={p.thumb ?? p.bg}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                onLoad={(e) => e.currentTarget.classList.add("is-loaded")}
              />
              <div className="gallery-overlay">
                <span className="gallery-heart">♥</span>
              </div>
              <span className="gallery-frame" aria-hidden="true" />
            </button>
          ))}
        </div>

        {isMobile && (
          <div className="gallery-pager">
            <div
              className="gallery-dots"
              role="tablist"
              aria-label="Điều hướng ảnh"
            >
              {PHOTOS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-label={`Đi đến ảnh ${i + 1}`}
                  className={`gallery-dot${
                    activeIndex === i ? " is-active" : ""
                  }`}
                  onClick={() => scrollToIndex(i)}
                />
              ))}
            </div>
            <span className="gallery-counter" aria-hidden="true">
              <span className="gallery-counter-num">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span className="gallery-counter-sep">/</span>
              <span className="gallery-counter-total">
                {String(PHOTOS.length).padStart(2, "0")}
              </span>
            </span>
          </div>
        )}
      </div>

      <Lightbox
        photos={PHOTOS}
        index={openIndex}
        onClose={close}
        onPrev={prev}
        onNext={next}
      />
    </section>
  );
}

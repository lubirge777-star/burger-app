import { useEffect, useState } from "react";

/**
 * Samples the border pixels of an image and returns the median color as a CSS string.
 * Used to make the hero's CSS backdrop match the flat background baked into the
 * burger photograph, so the composite is seamless regardless of JPEG drift.
 */
export function useSampledColor(src: string, fallback: string): string {
  const [color, setColor] = useState(fallback);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.decoding = "async";
    img.src = src;

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const w = (canvas.width = 64);
        const h = (canvas.height = 64);
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, w, h);

        // Sample points along the outer border, avoiding the bottom-centre where drips may land
        const points: Array<[number, number]> = [];
        for (let i = 2; i < w - 2; i += 4) {
          points.push([i, 2]); // top edge
          if (i < w * 0.3 || i > w * 0.7) points.push([i, h - 3]); // bottom edge corners
        }
        for (let j = 2; j < h - 2; j += 4) {
          points.push([2, j]); // left edge
          points.push([w - 3, j]); // right edge
        }

        const r: number[] = [];
        const g: number[] = [];
        const b: number[] = [];
        for (const [x, y] of points) {
          const d = ctx.getImageData(x, y, 1, 1).data;
          r.push(d[0]);
          g.push(d[1]);
          b.push(d[2]);
        }
        const median = (arr: number[]) => {
          const s = [...arr].sort((a, z) => a - z);
          return s[Math.floor(s.length / 2)];
        };
        if (!cancelled) setColor(`rgb(${median(r)} ${median(g)} ${median(b)})`);
      } catch {
        /* Canvas tainted or unavailable — keep the brand fallback */
      }
    };

    return () => {
      cancelled = true;
    };
  }, [src, fallback]);

  return color;
}

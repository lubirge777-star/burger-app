import { useCallback, useRef, useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type FoodCutoutProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "onLoad"> & {
  src: string;
  /** Adds the shadow to the extracted foreground, not to a rectangular image box. */
  shadow?: boolean;
};

const cutoutCache = new Map<string, Promise<string>>();
const MAX_EDGE = 1400;
const BACKGROUND_TOLERANCE = 58;
const EDGE_FEATHER = 52;

function median(values: number[]) {
  values.sort((a, b) => a - b);
  return values[Math.floor(values.length / 2)] ?? 255;
}

function getEdgeColor(data: Uint8ClampedArray, width: number, height: number) {
  const channels: [number[], number[], number[]] = [[], [], []];
  const step = Math.max(1, Math.floor(Math.min(width, height) / 180));
  const add = (index: number) => {
    channels[0].push(data[index]);
    channels[1].push(data[index + 1]);
    channels[2].push(data[index + 2]);
  };

  // Use a few pixels of the perimeter to average out JPEG edge noise.
  for (let x = 0; x < width; x += step) {
    for (let y = 0; y < 3; y++) {
      add((y * width + x) * 4);
      add(((height - 1 - y) * width + x) * 4);
    }
  }
  for (let y = 3; y < height - 3; y += step) {
    for (let x = 0; x < 3; x++) {
      add((y * width + x) * 4);
      add((y * width + width - 1 - x) * 4);
    }
  }

  return [median(channels[0]), median(channels[1]), median(channels[2])] as const;
}

function colorDistance(data: Uint8ClampedArray, index: number, background: readonly number[]) {
  const dr = data[index] - background[0];
  const dg = data[index + 1] - background[1];
  const db = data[index + 2] - background[2];
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

/**
 * Removes a uniform backdrop connected to an image's outer edge. A perimeter flood-fill
 * protects similarly colored food details in the center; a short alpha ramp softens JPEG edges.
 */
function extractForeground(image: HTMLImageElement, source: string): Promise<string> {
  const cached = cutoutCache.get(source);
  if (cached) return cached;

  const task = new Promise<string>((resolve) => {
    try {
      const scale = Math.min(1, MAX_EDGE / Math.max(image.naturalWidth, image.naturalHeight));
      const width = Math.max(1, Math.round(image.naturalWidth * scale));
      const height = Math.max(1, Math.round(image.naturalHeight * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) {
        resolve(source);
        return;
      }

      context.drawImage(image, 0, 0, width, height);
      const frame = context.getImageData(0, 0, width, height);
      const { data } = frame;
      const total = width * height;
      const background = getEdgeColor(data, width, height);
      const removed = new Uint8Array(total);
      const queue = new Int32Array(total);
      let read = 0;
      let write = 0;

      const addIfBackground = (index: number) => {
        if (removed[index] || colorDistance(data, index * 4, background) > BACKGROUND_TOLERANCE) return;
        removed[index] = 1;
        queue[write++] = index;
      };

      // Seed the complete perimeter, then flood-fill only matching connected pixels.
      for (let x = 0; x < width; x++) {
        addIfBackground(x);
        addIfBackground((height - 1) * width + x);
      }
      for (let y = 1; y < height - 1; y++) {
        addIfBackground(y * width);
        addIfBackground(y * width + width - 1);
      }

      while (read < write) {
        const index = queue[read++];
        const x = index % width;
        if (x > 0) addIfBackground(index - 1);
        if (x + 1 < width) addIfBackground(index + 1);
        if (index >= width) addIfBackground(index - width);
        if (index + width < total) addIfBackground(index + width);
      }

      // Clear the background, feathering only the one-pixel boundary of the cutout.
      for (let index = 0; index < total; index++) {
        const offset = index * 4;
        if (removed[index]) {
          data[offset + 3] = 0;
          continue;
        }

        const x = index % width;
        const edgeNeighbor =
          (x > 0 && removed[index - 1]) ||
          (x + 1 < width && removed[index + 1]) ||
          (index >= width && removed[index - width]) ||
          (index + width < total && removed[index + width]);
        if (!edgeNeighbor) continue;

        const distance = colorDistance(data, offset, background);
        if (distance < BACKGROUND_TOLERANCE + EDGE_FEATHER) {
          const alpha = Math.max(0, (distance - BACKGROUND_TOLERANCE) / EDGE_FEATHER);
          data[offset + 3] = Math.round(data[offset + 3] * alpha);
        }
      }

      context.putImageData(frame, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    } catch {
      // If canvas extraction is blocked, the original image remains available.
      resolve(source);
    }
  });

  cutoutCache.set(source, task);
  return task;
}

/** Transparent foreground extraction for the flat-background food photography. */
export function FoodCutout({ src, alt = "", className, shadow = true, onError, ...props }: FoodCutoutProps) {
  const [transparentSrc, setTransparentSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const processing = useRef(false);

  const handleLoad = useCallback(
    (image: HTMLImageElement) => {
      if (transparentSrc || processing.current) return;
      processing.current = true;
      void extractForeground(image, src).then((result) => {
        setTransparentSrc(result);
        setReady(true);
      });
    },
    [src, transparentSrc],
  );

  return (
    <img
      {...props}
      src={transparentSrc ?? src}
      alt={alt}
      onLoad={(event) => handleLoad(event.currentTarget)}
      onError={(event) => {
        setReady(true);
        onError?.(event);
      }}
      className={cn(
        "food-cutout transition-[opacity,filter,transform] duration-500",
        shadow && "food-cutout-shadow",
        !ready && "opacity-0",
        className,
      )}
    />
  );
}
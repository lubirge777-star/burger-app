import { useSyncExternalStore } from "react";

/** Tiny global store: flips to true once the preloader curtain lifts. */
let ready = false;
const listeners = new Set<() => void>();

export function setAppReady() {
  if (ready) return;
  ready = true;
  listeners.forEach((l) => l());
}

export function useAppReady() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => ready,
    () => ready,
  );
}

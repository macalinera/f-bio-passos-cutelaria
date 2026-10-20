const mods = import.meta.glob<{ default: { url: string } }>("../assets/photos/*.asset.json", {
  eager: true,
});

const map: Record<number, string> = {};
for (const [path, mod] of Object.entries(mods)) {
  const n = Number(path.match(/(\d+)\.jpg\.asset\.json$/)?.[1]);
  if (n) map[n] = mod.default.url;
}

export const photo = (n: number) => map[n];

export const COLLECTION = [5, 3, 10, 28, 16, 30];
export const MORE = [2, 4, 6, 7, 8, 9, 11, 17, 20, 38, 1];
export const TABLE_FEATURED = [22, 15, 37, 27, 34];
export const TABLE_MORE = [12, 13, 14, 18, 19, 21, 23, 24, 25, 26, 29, 31, 32, 33, 35, 36];

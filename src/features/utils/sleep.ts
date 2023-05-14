export async function sleep(ms: number | string) {
  return await new Promise((r) => setTimeout(r, +ms));
}

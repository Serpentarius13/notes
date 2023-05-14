export function getFromLocalStorage<T>(key: string): T | undefined {
  if (typeof localStorage === "undefined") return;
  return JSON.parse(localStorage.getItem(key) ?? "") as T;
}

export function setToLocalStorage(
  key: string,
  value: unknown
): void | undefined {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function isKeyExistInLocalStorage(key: string): boolean | undefined {
  if (typeof localStorage === "undefined") return;
  return !!localStorage.getItem(key);
}

export function removeFromLocalStorage(key: string): void | undefined {
  if (typeof localStorage === "undefined") return;
  localStorage.removeItem(key);
}

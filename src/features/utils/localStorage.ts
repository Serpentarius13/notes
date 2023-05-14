export function getFromLocalStorage<T>(key: string): T {
  return JSON.parse(localStorage.getItem(key) ?? "") as T;
}

export function setToLocalStorage(key: string, value: unknown) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function isKeyExistInLocalStorage(key: string): boolean {
  return !!localStorage.getItem(key);
}

export function removeFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}

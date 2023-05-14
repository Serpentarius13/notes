export function makeUnauthorizedError() {
  return new Response("Unauthorized", { status: 401 });
}

export function makeNotEnoughDataError(text: string) {
  return new Response(text, { status: 422 });
}

export function makeBadRequestError(text: string) {
  return new Response(text, { status: 400 });
}

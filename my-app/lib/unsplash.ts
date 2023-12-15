import { createApi } from "unsplash-js";

// Had to add '!' to make errors go away
export const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,
  fetch: fetch,
});

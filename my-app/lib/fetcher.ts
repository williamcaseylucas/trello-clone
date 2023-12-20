// makes fetching easy for us
export const fetcher = (url: string) => fetch(url).then((res) => res.json());

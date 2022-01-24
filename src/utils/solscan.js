import { stringify } from "querystring";

export async function solscanFetch(path, query) {
  const { data } = await fetch(
    `https://api.solscan.io/${path}?${stringify(query)}`
  ).then((r) => r.json());
  return data;
}

export async function publicSolscanFetch(path) {
  const result = await fetch(`https://public-api.solscan.io/${path}`).then(
    (r) => r.json()
  );
  return result;
}

export function parseTextFile(ticketsTextFile) {
  return ticketsTextFile
    .split("\n")
    .slice(2)
    .map((l) => {
      const [pos, number, ticket, hash] = l.split("|").map((t) => t.trim());
      return { pos, number, ticket, hash };
    });
}

export function getId(number) {
  return `ticket-${number}`;
}

export function trimHash(hash) {
  return `${hash.substr(0, 4)}...${hash.substr(hash.length - 4, 4)}`;
}

export function hashUrl(hash) {
  return `https://solscan.io/token/${hash}`;
}

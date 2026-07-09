// Pure + server-safe. Shared by ContentPage and BlogPostView so nav links === element ids.
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, " and ")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "") // strip accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Collision-safe unique id within one page/post.
export function uniqueSlug(text: string, seen: Set<string>): string {
  const base = slugify(text) || "section";
  let id = base;
  let n = 2;
  while (seen.has(id)) id = `${base}-${n++}`;
  seen.add(id);
  return id;
}

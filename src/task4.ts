// Задача 4. Иммутабельные операции с массивом тегов

export function addTag(tags: readonly string[], tag: string): string[] {
  return tags.includes(tag) ? [...tags] : [...tags, tag];
}

export function removeTag(tags: readonly string[], tag: string): string[] {
  return tags.filter((existing) => existing !== tag);
}

export function mergeTags(
  first: readonly string[],
  second: readonly string[],
): string[] {
  return [...new Set([...first, ...second])];
}

const original: readonly string[] = ["ts", "node", "ts", "Node"];
const other: readonly string[] = ["node", "js", "TS"];

console.log("addTag новый:     ", addTag(original, "npm"));
console.log("addTag существует:", addTag(original, "node"));
console.log("removeTag:        ", removeTag(original, "ts"));
console.log("mergeTags:        ", mergeTags(original, other));

console.log("Исходные массивы не изменились:");
console.log("original:", original);
console.log("other:   ", other);

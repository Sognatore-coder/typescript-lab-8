// Задача 9. Условные и сопоставленные типы: DeepReadonly и deepFreeze

export type DeepReadonly<T> = T extends readonly (infer Item)[]
  ? readonly DeepReadonly<Item>[]
  : T extends object
    ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
    : T;

export function deepFreeze<T>(obj: T): DeepReadonly<T> {
  if (typeof obj === "object" && obj !== null) {
    const children: unknown[] = Object.values(obj);
    for (const child of children) {
      deepFreeze(child);
    }
    Object.freeze(obj);
  }
  return obj as DeepReadonly<T>;
}


const config = deepFreeze({
  name: "app",
  version: 1,
  server: { host: "localhost", ports: [80, 443] },
  users: [
    { id: 1, tags: ["admin", "dev"] },
    { id: 2, tags: ["guest"] },
  ],
  note: null,
});

console.log("config:", JSON.stringify(config));
console.log("config заморожен:        ", Object.isFrozen(config));
console.log("server заморожен:        ", Object.isFrozen(config.server));
console.log("server.ports заморожен:  ", Object.isFrozen(config.server.ports));
console.log("users заморожен:         ", Object.isFrozen(config.users));
console.log("users[0] заморожен:      ", Object.isFrozen(config.users[0]));
console.log("users[0].tags заморожен: ", Object.isFrozen(config.users[0]?.tags));

// Недопустимые присваивания:
// config.name = "other";
// ^ Ошибка типов: поле name доступно только для чтения (readonly).
// config.server.host = "example.com";
// ^ Ошибка типов: readonly применяется и к вложенным объектам.
// config.server.ports.push(8080);
// ^ Ошибка типов: у readonly-массива нет метода push.
// config.users[0].id = 5;
// ^ Ошибка типов: элементы массива — тоже DeepReadonly, поле id только для чтения.

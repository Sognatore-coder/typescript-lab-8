// Задача 8. Интерфейс Repository и класс MemoryRepository

export interface Repository<T extends { id: string }> {
  create(item: T): T;
  findById(id: string): T | undefined;
  update(id: string, changes: Partial<Omit<T, "id">>): T | undefined;
  delete(id: string): boolean;
}

export class MemoryRepository<T extends { id: string }> implements Repository<T> {
  private readonly items = new Map<string, T>();

  create(item: T): T {
    if (this.items.has(item.id)) {
      throw new Error(`Сущность с id "${item.id}" уже существует`);
    }
    this.items.set(item.id, item);
    return item;
  }

  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  update(id: string, changes: Partial<Omit<T, "id">>): T | undefined {
    const existing = this.items.get(id);
    if (existing === undefined) {
      return undefined;
    }
    // id берём из существующей записи последним, чтобы его нельзя было сменить.
    const updated: T = { ...existing, ...changes, id: existing.id };
    this.items.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }
}

interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
}

const books = new MemoryRepository<Book>();

console.log("create:  ", books.create({ id: "b1", title: "Dune", author: "F. Herbert", year: 1965 }));
console.log("findById:", books.findById("b1"));
console.log("update:  ", books.update("b1", { year: 1966, title: "Dune (2nd ed.)" }));
console.log("после update:", books.findById("b1"));

try {
  books.create({ id: "b1", title: "Другая книга", author: "Неизвестен", year: 2000 });
} catch (error) {
  if (error instanceof Error) {
    console.log("Повторный id ->", error.message);
  } else {
    throw error;
  }
}

console.log("findById (нет записи):", books.findById("missing"));
console.log("update (нет записи): ", books.update("missing", { year: 1 }));
console.log("delete (есть):       ", books.delete("b1"));
console.log("delete (уже удалена): ", books.delete("b1"));
console.log("findById после delete:", books.findById("b1"));


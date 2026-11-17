// Задача 1. Функции и перегрузки: formatInput

import { devNull } from "node:os";

export function formatInput(value: number): string;
export function formatInput(value: string): string;
export function formatInput(value: Date): string;
export function formatInput(value: number | string | Date): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  switch (typeof value) {
    case "number":
      return value.toFixed(2);
    case "string":
      return value.trim();
    default: {
      const unreachable: never = value;
      throw new Error(`Неподдерживаемое значение: ${String(unreachable)}`);
    }
  }
}

console.log("number:", formatInput(3.14159));
console.log("number:", formatInput(42));
console.log("string:", `[${formatInput("привет, TypeScript")}]`);
console.log("Date:  ", formatInput(new Date("2024-03-15T10:30:00Z")));




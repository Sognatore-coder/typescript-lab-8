// Задача 7. Разбиение массива на блоки

export function chunkArray<T>(items: readonly T[], chunkSize: number): T[][] {
  if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
    throw new RangeError(
      `Размер блока должен быть положительным целым числом, получено: ${chunkSize}`,
    );
  }
  const chunks: T[][] = [];
  for (let start = 0; start < items.length; start += chunkSize) {
    chunks.push(items.slice(start, start + chunkSize));
  }
  return chunks;
}

const numbers: readonly number[] = [1, 2, 3, 4, 5, 6, 7];
console.log("Числа по 3:   ", chunkArray(numbers, 3));
console.log("Строки по 2:  ", chunkArray(["a", "b", "c", "d"], 2));
console.log("Пустой массив:", chunkArray([], 3));
console.log("Исходный не изменился:", numbers);

for (const badSize of [0, -2, 1.5, Number.NaN, Number.POSITIVE_INFINITY]) {
  try {
    chunkArray(numbers, badSize);
  } catch (error) {
    if (error instanceof RangeError) {
      console.log(`RangeError (${badSize}): ${error.message}`);
    } else {
      throw error;
    }
  }
}

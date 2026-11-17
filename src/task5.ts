// Задача 5. Pipeline и обобщённые перегрузки

export function applyPipeline<A, B>(input: A, step1: (value: A) => B): B;
export function applyPipeline<A, B, C>(
  input: A,
  step1: (value: A) => B,
  step2: (value: B) => C,
): C;
export function applyPipeline<A, B, C, D>(
  input: A,
  step1: (value: A) => B,
  step2: (value: B) => C,
  step3: (value: C) => D,
): D;
export function applyPipeline(
  input: unknown,
  ...steps: Array<(value: never) => unknown>
): unknown {
  return steps.reduce<unknown>(
    (current, step) => (step as (value: unknown) => unknown)(current),
    input,
  );
}


const result3 = applyPipeline(
  5,
  (n) => n * 2,
  (n) => `Результат: ${n}`,
  (s) => s.toUpperCase(),
);
console.log("Три шага:  ", result3);

const result2 = applyPipeline(
  "  hello  ",
  (s) => s.trim(),
  (s) => s.length,
);
console.log("Два шага:  ", result2);

const result1 = applyPipeline([3, 1, 2], (arr) => arr.length);
console.log("Один шаг:  ", result1);


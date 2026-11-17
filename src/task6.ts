// Задача 6. Reduce: суммы по статусам

export type Invoice = { id: string; amount: number; status: "paid" | "free" };

export function sumByStatus(invoices: readonly Invoice[]): {
  paid: number;
  free: number;
} {
  return invoices.reduce(
    (totals, invoice) => ({
      ...totals,
      [invoice.status]: totals[invoice.status] + invoice.amount,
    }),
    { paid: 0, free: 0 },
  );
}

const invoices: readonly Invoice[] = [
  { id: "inv-1", amount: 100, status: "paid" },
  { id: "inv-2", amount: 50, status: "free" },
  { id: "inv-3", amount: 200.5, status: "paid" },
  { id: "inv-4", amount: 25, status: "free" },
];
console.log("Смешанный набор:", sumByStatus(invoices));
console.log("Пустой массив:  ", sumByStatus([]));
console.log("Входные данные не изменены:", invoices.length, invoices[0]);

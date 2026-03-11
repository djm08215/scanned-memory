import { ReceiptEntry } from "./types";
import { receipts as sampleReceipts } from "@/data/receipts";

const STORAGE_KEY = "scanned-memory-receipts";

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function getReceipts(): ReceiptEntry[] {
  if (!isClient()) return sampleReceipts;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Initialize with sample data
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleReceipts));
      return sampleReceipts;
    }
    return JSON.parse(raw) as ReceiptEntry[];
  } catch {
    return sampleReceipts;
  }
}

export function getReceipt(id: string): ReceiptEntry | null {
  const receipts = getReceipts();
  return receipts.find((r) => r.id === id) ?? null;
}

export function saveReceipt(receipt: ReceiptEntry): void {
  if (!isClient()) return;
  try {
    const receipts = getReceipts();
    const idx = receipts.findIndex((r) => r.id === receipt.id);
    if (idx >= 0) {
      receipts[idx] = receipt;
    } else {
      receipts.unshift(receipt);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(receipts));
  } catch {
    // ignore
  }
}

export function deleteReceipt(id: string): void {
  if (!isClient()) return;
  try {
    const receipts = getReceipts();
    const filtered = receipts.filter((r) => r.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch {
    // ignore
  }
}

export function clearAll(): void {
  if (!isClient()) return;
  localStorage.removeItem(STORAGE_KEY);
}

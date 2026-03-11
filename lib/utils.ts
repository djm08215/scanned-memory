import { EmotionTag } from "./types";

export function formatKRW(amount: number): string {
  return amount.toLocaleString("ko-KR") + "원";
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateShort(dateStr: string): string {
  // e.g. "2026-03-10" -> "26.03.10"
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  return `${parts[0].slice(2)}.${parts[1]}.${parts[2]}`;
}

export const emotionConfig: Record<
  EmotionTag,
  { label: string; labelKo: string; color: string; bg: string }
> = {
  joy: {
    label: "joy",
    labelKo: "기쁨",
    color: "#7c5c00",
    bg: "#fff3c4",
  },
  anxious: {
    label: "anxious",
    labelKo: "불안",
    color: "#7a1f1f",
    bg: "#fde8e8",
  },
  relieved: {
    label: "relieved",
    labelKo: "안도",
    color: "#1a5c3a",
    bg: "#d4f0e3",
  },
  lonely: {
    label: "lonely",
    labelKo: "외로움",
    color: "#2c3a7c",
    bg: "#dde4f8",
  },
  nostalgic: {
    label: "nostalgic",
    labelKo: "그리움",
    color: "#5c2d7a",
    bg: "#eaddf7",
  },
  calm: {
    label: "calm",
    labelKo: "고요함",
    color: "#2a4a4a",
    bg: "#d8eeed",
  },
};

export function generateId(): string {
  return `receipt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function truncate(str: string, n: number): string {
  if (str.length <= n) return str;
  return str.slice(0, n) + "…";
}

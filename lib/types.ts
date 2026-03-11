export type EmotionTag =
  | "joy"
  | "anxious"
  | "relieved"
  | "lonely"
  | "nostalgic"
  | "calm";

export interface ReceiptItem {
  name: string;
  price: number;
  annotation?: string;
}

export interface ReceiptLocation {
  lat: number;
  lng: number;
  address: string;
}

export interface ReceiptDiary {
  title: string;
  entry: string;
  emotion: EmotionTag[];
  people: string[];
  weather?: string;
}

export interface ReceiptEntry {
  id: string;
  store: string;
  date: string;
  time: string;
  total: number;
  currency: string;
  items: ReceiptItem[];
  location: ReceiptLocation;
  receiptImage?: string;
  diary: ReceiptDiary;
  createdAt: string;
}

"use client";

import { ReceiptItem } from "@/lib/types";

interface ItemEditorProps {
  items: ReceiptItem[];
  onChange: (items: ReceiptItem[]) => void;
}

export default function ItemEditor({ items, onChange }: ItemEditorProps) {
  const updateItem = (index: number, field: keyof ReceiptItem, value: string | number) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  const addItem = () => {
    onChange([...items, { name: "", price: 0 }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            type="text"
            value={item.name}
            onChange={(e) => updateItem(index, "name", e.target.value)}
            placeholder="항목명"
            className="flex-1 bg-white/5 border border-white/10 rounded-[2px] px-3 py-2 text-[#f4efe5] font-mono text-sm placeholder-white/20 focus:outline-none focus:border-[#d8342d]/50"
          />
          <input
            type="number"
            value={item.price || ""}
            onChange={(e) => updateItem(index, "price", Number(e.target.value))}
            placeholder="가격"
            className="w-28 bg-white/5 border border-white/10 rounded-[2px] px-3 py-2 text-[#f4efe5] font-mono text-sm placeholder-white/20 focus:outline-none focus:border-[#d8342d]/50"
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="text-white/30 hover:text-[#d8342d] font-mono text-sm transition-colors w-7 shrink-0"
            aria-label="remove item"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="text-[#f4efe5]/40 hover:text-[#f4efe5] font-mono text-[0.7rem] tracking-[0.15em] uppercase transition-colors mt-1 flex items-center gap-2"
      >
        <span className="text-[#d8342d]">+</span> 항목 추가
      </button>
    </div>
  );
}

"use client";

import { EmotionTag } from "@/lib/types";
import { emotionConfig } from "@/lib/utils";

interface EmotionTagSelectorProps {
  selected: EmotionTag[];
  onChange: (tags: EmotionTag[]) => void;
}

const allEmotions: EmotionTag[] = ["joy", "anxious", "relieved", "lonely", "nostalgic", "calm"];

export default function EmotionTagSelector({ selected, onChange }: EmotionTagSelectorProps) {
  const toggle = (tag: EmotionTag) => {
    if (selected.includes(tag)) {
      onChange(selected.filter((t) => t !== tag));
    } else {
      onChange([...selected, tag]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {allEmotions.map((tag) => {
        const cfg = emotionConfig[tag];
        const active = selected.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            className="emotion-badge cursor-pointer transition-all border"
            style={{
              backgroundColor: active ? cfg.bg : "transparent",
              color: active ? cfg.color : "#6d675f",
              borderColor: active ? cfg.color + "66" : "rgba(109,103,95,0.3)",
            }}
          >
            {cfg.labelKo} / {cfg.label}
          </button>
        );
      })}
    </div>
  );
}

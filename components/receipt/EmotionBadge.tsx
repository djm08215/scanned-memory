import { EmotionTag } from "@/lib/types";
import { emotionConfig } from "@/lib/utils";

interface EmotionBadgeProps {
  emotion: EmotionTag;
  showKorean?: boolean;
  size?: "sm" | "md";
}

export default function EmotionBadge({
  emotion,
  showKorean = true,
  size = "md",
}: EmotionBadgeProps) {
  const cfg = emotionConfig[emotion];
  return (
    <span
      className="emotion-badge"
      style={{
        backgroundColor: cfg.bg,
        color: cfg.color,
        fontSize: size === "sm" ? "0.58rem" : "0.65rem",
      }}
    >
      {showKorean ? cfg.labelKo : cfg.label}
    </span>
  );
}

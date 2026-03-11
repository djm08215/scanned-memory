"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ReceiptEntry, EmotionTag } from "@/lib/types";
import { getReceipts } from "@/lib/store";
import { emotionConfig } from "@/lib/utils";
import ReceiptCard from "@/components/receipt/ReceiptCard";

const allEmotions: EmotionTag[] = ["joy", "anxious", "relieved", "lonely", "nostalgic", "calm"];

export default function ArchivePage() {
  const [receipts, setReceipts] = useState<ReceiptEntry[]>([]);
  const [search, setSearch] = useState("");
  const [activeEmotions, setActiveEmotions] = useState<EmotionTag[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setReceipts(getReceipts());
    setMounted(true);
  }, []);

  const toggleEmotion = (tag: EmotionTag) => {
    setActiveEmotions((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered = useMemo(() => {
    let list = receipts;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.store.toLowerCase().includes(q) ||
          r.diary.title.toLowerCase().includes(q) ||
          r.location.address.toLowerCase().includes(q)
      );
    }
    if (activeEmotions.length > 0) {
      list = list.filter((r) =>
        activeEmotions.some((e) => r.diary.emotion.includes(e))
      );
    }
    return list;
  }, [receipts, search, activeEmotions]);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-[#e9e1d4] pt-16">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-[#d8342d] text-[0.6rem] tracking-[0.35em] uppercase mb-2">
                SCANNED MEMORY
              </p>
              <h1 className="text-[#1a1a1a] text-4xl font-mono font-bold tracking-wide">
                ARCHIVE
              </h1>
              <p className="text-[#1a1a1a]/50 text-sm font-mono mt-1">
                아카이브 — 기억들의 목록
              </p>
            </div>
            <div className="text-right">
              <p className="text-[#1a1a1a]/35 text-[0.65rem] font-mono tracking-[0.2em]">
                총 {receipts.length}건의 영수증
              </p>
              <p className="text-[#1a1a1a]/50 text-[0.65rem] font-mono tracking-[0.15em]">
                {filtered.length}건 표시 중
              </p>
            </div>
          </div>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#1a1a1a]/35 font-mono text-sm">
              /
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="가게 이름, 일기 제목으로 검색..."
              className="w-full bg-[#1a1a1a]/6 border border-[#1a1a1a]/15 rounded-[2px] pl-8 pr-4 py-3 text-[#1a1a1a] font-mono text-sm placeholder-[#1a1a1a]/35 focus:outline-none focus:border-[#d8342d]/50 transition-colors"
            />
          </div>

          {/* Emotion filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-[#1a1a1a]/40 font-mono text-[0.6rem] tracking-[0.2em] uppercase self-center mr-1">
              감정
            </span>
            {allEmotions.map((tag) => {
              const cfg = emotionConfig[tag];
              const active = activeEmotions.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleEmotion(tag)}
                  className="emotion-badge cursor-pointer transition-all border"
                  style={{
                    backgroundColor: active ? cfg.bg : "transparent",
                    color: active ? cfg.color : "rgba(26,26,26,0.4)",
                    borderColor: active ? cfg.color + "66" : "rgba(26,26,26,0.15)",
                    fontSize: "0.6rem",
                  }}
                >
                  {cfg.labelKo}
                </button>
              );
            })}
            {activeEmotions.length > 0 && (
              <button
                onClick={() => setActiveEmotions([])}
                className="text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70 font-mono text-[0.6rem] tracking-[0.1em] uppercase transition-colors ml-1"
              >
                초기화
              </button>
            )}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-[#1a1a1a]/15 mb-8" />

        {/* Receipt grid */}
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-[#1a1a1a]/40 font-mono text-sm tracking-[0.2em]">
              검색 결과가 없습니다
            </p>
            <p className="text-[#1a1a1a]/30 font-mono text-[0.7rem] mt-2">
              NO RECEIPTS FOUND
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((receipt, i) => (
              <ReceiptCard key={receipt.id} receipt={receipt} index={i} />
            ))}
          </div>
        )}

        {/* Upload CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="border-t border-[#1a1a1a]/10 pt-10">
            <p className="text-[#1a1a1a]/35 font-mono text-[0.65rem] tracking-[0.25em] uppercase mb-4">
              새 영수증 추가하기
            </p>
            <a
              href="/upload"
              className="inline-block border border-[#d8342d]/50 text-[#d8342d] font-mono text-[0.7rem] tracking-[0.25em] uppercase px-6 py-3 hover:bg-[#d8342d] hover:text-white transition-all rounded-[2px]"
            >
              UPLOAD →
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

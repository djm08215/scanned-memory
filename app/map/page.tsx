"use client";

import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ReceiptEntry, EmotionTag } from "@/lib/types";
import { getReceipts } from "@/lib/store";
import { emotionConfig } from "@/lib/utils";

// Dynamic import for Leaflet (no SSR)
const MemoryMap = dynamic(() => import("@/components/map/MemoryMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-[#e9e1d4]">
      <p className="text-[#1a1a1a]/40 font-mono text-sm tracking-[0.3em]">
        MAP LOADING
        <span className="dot-bounce ml-2">
          <span /><span /><span />
        </span>
      </p>
    </div>
  ),
});

const allEmotions: EmotionTag[] = ["joy", "anxious", "relieved", "lonely", "nostalgic", "calm"];

export default function MapPage() {
  const [receipts, setReceipts] = useState<ReceiptEntry[]>([]);
  const [mounted, setMounted] = useState(false);
  const [activeEmotions, setActiveEmotions] = useState<EmotionTag[]>([]);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);

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
    if (activeEmotions.length > 0) {
      list = list.filter((r) =>
        activeEmotions.some((e) => r.diary.emotion.includes(e))
      );
    }
    if (dateFrom) {
      list = list.filter((r) => r.date >= dateFrom);
    }
    if (dateTo) {
      list = list.filter((r) => r.date <= dateTo);
    }
    return list;
  }, [receipts, activeEmotions, dateFrom, dateTo]);

  const inputCls =
    "w-full bg-[#1a1a1a]/6 border border-[#1a1a1a]/15 rounded-[2px] px-2 py-1.5 text-[#1a1a1a] font-mono text-xs placeholder-[#1a1a1a]/35 focus:outline-none focus:border-[#d8342d]/50 transition-colors";

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 bg-[#e9e1d4] pt-16">
      {/* Full screen map */}
      <div className="absolute inset-0 top-16">
        <MemoryMap receipts={filtered} />
      </div>

      {/* Filter toggle button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={() => setPanelOpen(!panelOpen)}
        className="absolute top-20 left-4 z-[1000] bg-[#e9e1d4]/90 border border-[#1a1a1a]/20 text-[#1a1a1a] font-mono text-[0.6rem] tracking-[0.2em] uppercase px-3 py-2 rounded-[2px] hover:border-[#d8342d]/50 transition-colors backdrop-blur"
      >
        {panelOpen ? "닫기 ×" : "필터 ≡"}
      </motion.button>

      {/* Filter panel */}
      <motion.div
        initial={{ x: -280 }}
        animate={{ x: panelOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute top-20 left-4 z-[999] w-64 bg-[#e9e1d4]/95 border border-[#1a1a1a]/15 rounded-[3px] backdrop-blur overflow-hidden"
        style={{ top: "calc(4rem + 3rem)" }}
      >
        <div className="p-4 space-y-5">
          <div>
            <p className="text-[#d8342d] font-mono text-[0.6rem] tracking-[0.25em] uppercase mb-2">
              MEMORY MAP
            </p>
            <p className="text-[#1a1a1a]/50 font-mono text-[0.65rem]">
              {filtered.length} / {receipts.length} 기억 표시 중
            </p>
          </div>

          {/* Date filter */}
          <div>
            <p className="text-[#1a1a1a]/50 font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-2">
              날짜 범위
            </p>
            <div className="space-y-2">
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                placeholder="시작"
                className={inputCls}
              />
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                placeholder="끝"
                className={inputCls}
              />
            </div>
          </div>

          {/* Emotion filter */}
          <div>
            <p className="text-[#1a1a1a]/50 font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-2">
              감정 필터
            </p>
            <div className="flex flex-wrap gap-1.5">
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
                      fontSize: "0.58rem",
                    }}
                  >
                    {cfg.labelKo}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reset */}
          {(activeEmotions.length > 0 || dateFrom || dateTo) && (
            <button
              onClick={() => { setActiveEmotions([]); setDateFrom(""); setDateTo(""); }}
              className="w-full text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70 font-mono text-[0.6rem] tracking-[0.2em] uppercase transition-colors"
            >
              필터 초기화
            </button>
          )}

          {/* Legend */}
          <div>
            <p className="text-[#1a1a1a]/50 font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-2">
              범례
            </p>
            <div className="space-y-1.5">
              {allEmotions.map((tag) => {
                const cfg = emotionConfig[tag];
                return (
                  <div key={tag} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full border shrink-0"
                      style={{ background: cfg.bg, borderColor: cfg.color }}
                    />
                    <span
                      className="font-mono text-[0.62rem]"
                      style={{ color: cfg.color }}
                    >
                      {cfg.labelKo}
                    </span>
                  </div>
                );
              })}
              <div className="flex items-center gap-2 mt-2 pt-2 border-t border-[#1a1a1a]/10">
                <div className="w-8 border-t border-dashed border-[#d8342d]/50" />
                <span className="text-[#1a1a1a]/40 font-mono text-[0.6rem]">같은 날 이동 경로</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom receipt count */}
      <div className="absolute bottom-6 right-6 z-[1000]">
        <div className="bg-[#e9e1d4]/80 border border-[#1a1a1a]/15 backdrop-blur rounded-[2px] px-3 py-2">
          <p className="text-[#1a1a1a]/55 font-mono text-[0.6rem] tracking-[0.2em]">
            {filtered.length}개의 기억이 지도에 있습니다
          </p>
        </div>
      </div>
    </div>
  );
}

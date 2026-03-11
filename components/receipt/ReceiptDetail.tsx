"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { ReceiptEntry } from "@/lib/types";
import EmotionBadge from "./EmotionBadge";
import { formatKRW, formatDate } from "@/lib/utils";
import { deleteReceipt } from "@/lib/store";

interface ReceiptDetailProps {
  receipt: ReceiptEntry;
}

export default function ReceiptDetail({ receipt }: ReceiptDetailProps) {
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    deleteReceipt(receipt.id);
    router.push("/archive");
  };

  return (
    <div className="min-h-screen bg-[#e9e1d4] pt-16">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8"
        >
          <button
            onClick={() => router.push("/archive")}
            className="text-[#1a1a1a]/55 hover:text-[#1a1a1a] font-mono text-[0.7rem] tracking-[0.2em] uppercase transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>ARCHIVE 로 돌아가기</span>
          </button>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT: Receipt image / visual */}
          <motion.div
            className="lg:w-[40%]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="sticky top-24">
              {receipt.receiptImage ? (
                <div className="paper-texture receipt-shadow rounded-[4px] overflow-hidden">
                  <div
                    className="h-3 w-full"
                    style={{
                      backgroundImage: "radial-gradient(circle at 50% 100%, #e9e1d4 5px, transparent 5px)",
                      backgroundSize: "16px 12px",
                      backgroundRepeat: "repeat-x",
                    }}
                  />
                  <Image
                    src={receipt.receiptImage}
                    alt={receipt.store}
                    width={600}
                    height={1200}
                    className="w-full h-auto object-contain"
                  />
                  <div
                    className="h-3 w-full"
                    style={{
                      backgroundImage: "radial-gradient(circle at 50% 0%, #e9e1d4 5px, transparent 5px)",
                      backgroundSize: "16px 12px",
                      backgroundRepeat: "repeat-x",
                    }}
                  />
                </div>
              ) : (
                /* Stylized receipt if no image */
                <div className="paper-texture receipt-shadow rounded-[4px] overflow-hidden font-mono">
                  <div
                    className="h-3 w-full"
                    style={{
                      backgroundImage: "radial-gradient(circle at 50% 100%, #e9e1d4 5px, transparent 5px)",
                      backgroundSize: "16px 12px",
                      backgroundRepeat: "repeat-x",
                    }}
                  />
                  <div className="px-6 py-8">
                    <div className="text-center mb-6">
                      <h2 className="text-[#171717] text-lg font-bold tracking-wider uppercase">
                        {receipt.store}
                      </h2>
                      <p className="text-[#6d675f] text-[0.65rem] tracking-[0.2em] mt-1">
                        {receipt.date} {receipt.time}
                      </p>
                    </div>
                    <div className="border-t border-dashed border-[#171717]/20 mb-4" />
                    {receipt.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-[0.75rem] text-[#171717] py-1 cursor-default"
                        onMouseEnter={() => setHoveredItem(i)}
                        onMouseLeave={() => setHoveredItem(null)}
                      >
                        <span className="flex-1">{item.name}</span>
                        <span>{item.price.toLocaleString()}</span>
                        {hoveredItem === i && item.annotation && (
                          <motion.span
                            initial={{ opacity: 0, x: 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="absolute right-6 text-[0.6rem] text-[#d8342d] italic"
                          >
                            ← {item.annotation}
                          </motion.span>
                        )}
                      </div>
                    ))}
                    <div className="border-t border-dashed border-[#171717]/20 mt-4 mb-4" />
                    <div className="flex justify-between text-[#171717] font-bold text-sm">
                      <span>TOTAL</span>
                      <span>{formatKRW(receipt.total)}</span>
                    </div>
                    {/* Barcode visual */}
                    <div className="mt-8 mb-2">
                      <div className="flex justify-center gap-[1px]">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <div
                            key={i}
                            className="bg-[#171717]"
                            style={{
                              width: i % 3 === 0 ? "2px" : "1px",
                              height: i % 5 === 0 ? "28px" : "22px",
                            }}
                          />
                        ))}
                      </div>
                      <p className="text-center text-[0.55rem] text-[#6d675f] tracking-[0.3em] mt-1">
                        {receipt.id.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div
                    className="h-3 w-full"
                    style={{
                      backgroundImage: "radial-gradient(circle at 50% 0%, #e9e1d4 5px, transparent 5px)",
                      backgroundSize: "16px 12px",
                      backgroundRepeat: "repeat-x",
                    }}
                  />
                </div>
              )}
            </div>
          </motion.div>

          {/* RIGHT: Metadata + diary */}
          <motion.div
            className="lg:w-[60%] space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Store / date header */}
            <div>
              <p className="text-[#d8342d] text-[0.65rem] tracking-[0.3em] uppercase mb-2">
                STORE → 그날의 배경
              </p>
              <h1 className="text-[#1a1a1a] text-3xl font-bold tracking-wide font-mono">
                {receipt.store}
              </h1>
              <p className="text-[#1a1a1a]/55 text-sm font-mono mt-1">
                {receipt.location.address}
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-[#1a1a1a]/15" />

            {/* Time + total */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[#d8342d] text-[0.6rem] tracking-[0.25em] uppercase mb-1">
                  TIME → 잊고 싶지 않은 시각
                </p>
                <p className="text-[#1a1a1a] font-mono text-xl">
                  {receipt.date}
                </p>
                <p className="text-[#1a1a1a]/60 font-mono text-sm">
                  {receipt.time}
                </p>
              </div>
              <div>
                <p className="text-[#d8342d] text-[0.6rem] tracking-[0.25em] uppercase mb-1">
                  TOTAL → 오늘의 밀도
                </p>
                <p className="text-[#1a1a1a] font-mono text-xl">
                  {formatKRW(receipt.total)}
                </p>
                <p className="text-[#1a1a1a]/50 font-mono text-xs">
                  {receipt.currency}
                </p>
              </div>
            </div>

            {/* Items */}
            <div>
              <p className="text-[#d8342d] text-[0.6rem] tracking-[0.25em] uppercase mb-3">
                ITEMS → 하루를 구성한 파편
              </p>
              <div className="space-y-2">
                {receipt.items.map((item, i) => (
                  <motion.div
                    key={i}
                    className="relative flex justify-between items-center py-2 px-3 rounded-[3px] cursor-default"
                    style={{ backgroundColor: "rgba(26,26,26,0.04)" }}
                    whileHover={{ backgroundColor: "rgba(26,26,26,0.08)" }}
                    onMouseEnter={() => setHoveredItem(i)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    <span className="text-[#1a1a1a]/80 font-mono text-sm">{item.name}</span>
                    <span className="text-[#1a1a1a]/60 font-mono text-sm">
                      {item.price.toLocaleString()}원
                    </span>
                    {hoveredItem === i && item.annotation && (
                      <motion.span
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-5 left-3 text-[0.6rem] text-[#d8342d] italic font-mono"
                      >
                        — {item.annotation}
                      </motion.span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#1a1a1a]/15" />

            {/* Diary */}
            <div>
              <p className="text-[#d8342d] text-[0.6rem] tracking-[0.25em] uppercase mb-2">
                DIARY → 그날의 온도
              </p>
              <h2 className="text-[#1a1a1a] text-xl font-mono font-bold mb-4">
                {receipt.diary.title}
              </h2>
              <p className="text-[#1a1a1a]/60 font-mono text-sm leading-loose whitespace-pre-wrap">
                {receipt.diary.entry}
              </p>
            </div>

            {/* Emotion tags */}
            <div>
              <p className="text-[#d8342d] text-[0.6rem] tracking-[0.25em] uppercase mb-2">
                EMOTION → 감정의 층위
              </p>
              <div className="flex flex-wrap gap-2">
                {receipt.diary.emotion.map((e) => (
                  <EmotionBadge key={e} emotion={e} showKorean />
                ))}
              </div>
            </div>

            {/* Weather / people */}
            {(receipt.diary.weather || receipt.diary.people?.length > 0) && (
              <div className="flex gap-6">
                {receipt.diary.weather && (
                  <div>
                    <p className="text-[#1a1a1a]/40 text-[0.6rem] tracking-[0.2em] uppercase mb-1">
                      날씨
                    </p>
                    <p className="text-[#1a1a1a]/60 font-mono text-sm">
                      {receipt.diary.weather}
                    </p>
                  </div>
                )}
                {receipt.diary.people?.length > 0 && (
                  <div>
                    <p className="text-[#1a1a1a]/40 text-[0.6rem] tracking-[0.2em] uppercase mb-1">
                      함께한 사람
                    </p>
                    <p className="text-[#1a1a1a]/60 font-mono text-sm">
                      {receipt.diary.people.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Divider */}
            <div className="border-t border-[#1a1a1a]/15" />

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={handleDelete}
                className={`font-mono text-[0.7rem] tracking-[0.15em] uppercase px-4 py-2 rounded-[2px] border transition-all ${
                  confirmDelete
                    ? "border-red-500 text-red-400 bg-red-500/10"
                    : "border-[#1a1a1a]/20 text-[#1a1a1a]/50 hover:border-[#1a1a1a]/40 hover:text-[#1a1a1a]/70"
                }`}
              >
                {confirmDelete ? "정말 삭제할까요?" : "삭제"}
              </button>
              {confirmDelete && (
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="font-mono text-[0.7rem] tracking-[0.15em] uppercase px-4 py-2 rounded-[2px] border border-[#1a1a1a]/15 text-[#1a1a1a]/50 hover:text-[#1a1a1a]/70 transition-colors"
                >
                  취소
                </button>
              )}
            </div>

            {/* Created at */}
            <p className="text-[#1a1a1a]/35 text-[0.6rem] font-mono tracking-wider">
              기록됨: {new Date(receipt.createdAt).toLocaleString("ko-KR")}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

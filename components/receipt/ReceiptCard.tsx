"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReceiptEntry } from "@/lib/types";
import EmotionBadge from "./EmotionBadge";
import { formatKRW, formatDateShort, truncate } from "@/lib/utils";

interface ReceiptCardProps {
  receipt: ReceiptEntry;
  index: number;
}

export default function ReceiptCard({ receipt, index }: ReceiptCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
    >
      <Link href={`/diary/${receipt.id}`} className="block group">
        <div className="receipt-card paper-texture receipt-shadow relative overflow-hidden rounded-[4px]">
          {/* Perforated top */}
          <div
            className="h-3 w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 100%, #e9e1d4 5px, transparent 5px)",
              backgroundSize: "16px 12px",
              backgroundRepeat: "repeat-x",
            }}
          />

          <div className="px-4 py-3">
            {/* Header row */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-[0.6rem] text-[#6d675f] tracking-[0.2em] uppercase mb-1">
                  {formatDateShort(receipt.date)} · {receipt.time}
                </p>
                <h3 className="text-[#171717] font-mono text-sm font-bold tracking-wide truncate group-hover:text-[#d8342d] transition-colors">
                  {receipt.store}
                </h3>
              </div>
              <div className="text-right ml-3 shrink-0">
                <p className="text-[#171717] font-mono text-sm font-bold">
                  {formatKRW(receipt.total)}
                </p>
                <p className="text-[0.58rem] text-[#6d675f] tracking-wider">
                  {receipt.items.length}개 항목
                </p>
              </div>
            </div>

            {/* Dashed divider */}
            <div className="receipt-dashed mb-3" />

            {/* Items preview */}
            <div className="mb-3 space-y-0.5">
              {receipt.items.slice(0, 3).map((item, i) => (
                <div key={i} className="flex justify-between text-[0.68rem] font-mono text-[#6d675f]">
                  <span className="truncate flex-1 mr-2">{item.name}</span>
                  <span className="shrink-0">{item.price.toLocaleString()}</span>
                </div>
              ))}
              {receipt.items.length > 3 && (
                <p className="text-[0.6rem] text-[#6d675f]/60 font-mono">
                  + {receipt.items.length - 3}개 더
                </p>
              )}
            </div>

            {/* Dashed divider */}
            <div className="receipt-dashed mb-3" />

            {/* Diary excerpt */}
            <div className="mb-3">
              <p className="text-[0.62rem] text-[#6d675f] tracking-[0.15em] uppercase mb-1">
                {receipt.diary.title}
              </p>
              <p className="text-[0.72rem] text-[#171717]/80 font-mono leading-relaxed">
                {truncate(receipt.diary.entry, 60)}
              </p>
            </div>

            {/* Emotion tags */}
            <div className="flex flex-wrap gap-1">
              {receipt.diary.emotion.map((e) => (
                <EmotionBadge key={e} emotion={e} size="sm" />
              ))}
            </div>
          </div>

          {/* Perforated bottom */}
          <div
            className="h-3 w-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 0%, #e9e1d4 5px, transparent 5px)",
              backgroundSize: "16px 12px",
              backgroundRepeat: "repeat-x",
            }}
          />

          {/* Location */}
          <div className="px-4 pb-2 pt-0">
            <p className="text-[0.58rem] text-[#6d675f]/60 font-mono truncate">
              {receipt.location.address}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

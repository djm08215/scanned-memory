"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ReceiptEntry } from "@/lib/types";
import { getReceipt } from "@/lib/store";
import ReceiptDetail from "@/components/receipt/ReceiptDetail";
import { motion } from "framer-motion";

export default function DiaryPage() {
  const params = useParams();
  const id = params?.id as string;
  const [receipt, setReceipt] = useState<ReceiptEntry | null | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const found = getReceipt(id);
      setReceipt(found);
    }
  }, [id]);

  // Loading
  if (receipt === undefined) {
    return (
      <div className="min-h-screen bg-[#e9e1d4] flex items-center justify-center">
        <p className="text-[#1a1a1a]/40 font-mono text-sm tracking-[0.3em]">
          LOADING
          <span className="dot-bounce ml-2">
            <span /><span /><span />
          </span>
        </p>
      </div>
    );
  }

  // Not found
  if (!receipt) {
    return (
      <div className="min-h-screen bg-[#e9e1d4] flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-[#d8342d] font-mono text-[0.6rem] tracking-[0.3em] uppercase mb-4">
            404
          </p>
          <h2 className="text-[#1a1a1a] font-mono text-2xl mb-3">
            영수증을 찾을 수 없습니다
          </h2>
          <p className="text-[#1a1a1a]/50 font-mono text-sm mb-8">
            이 기억은 이미 사라졌거나 존재하지 않습니다
          </p>
          <a
            href="/archive"
            className="text-[#d8342d] font-mono text-[0.7rem] tracking-[0.2em] uppercase hover:opacity-70 transition-opacity"
          >
            ← ARCHIVE 로 돌아가기
          </a>
        </motion.div>
      </div>
    );
  }

  return <ReceiptDetail receipt={receipt} />;
}

"use client";

import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadDropzoneProps {
  onFileSelected: (file: File, previewUrl: string) => void;
  previewUrl?: string;
  isDecoding?: boolean;
}

export default function UploadDropzone({ onFileSelected, previewUrl, isDecoding }: UploadDropzoneProps) {
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    onFileSelected(file, url);
  }, [onFileSelected]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-[4px] transition-all duration-200 overflow-hidden ${
        dragging
          ? "border-[#d8342d] bg-[#d8342d]/8"
          : "border-[#1a1a1a]/25 hover:border-[#1a1a1a]/50 bg-[#f4efe5]/60"
      }`}
      style={{ minHeight: "200px" }}
    >
      <AnimatePresence mode="wait">
        {previewUrl ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="receipt preview"
              className={`w-full max-h-[400px] object-contain ${isDecoding ? "decode-effect" : ""}`}
            />
            {isDecoding && (
              <motion.div
                initial={{ top: "0%" }}
                animate={{ top: ["0%", "100%"] }}
                transition={{ duration: 1.2, ease: "linear", repeat: Infinity }}
                className="absolute left-0 right-0 h-[2px] bg-[#d8342d] shadow-[0_0_8px_rgba(216,52,45,0.8)]"
                style={{ position: "absolute" }}
              />
            )}
            {isDecoding && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <p className="text-[#d8342d] font-mono text-sm tracking-[0.3em] uppercase">
                  DECODING
                  <span className="dot-bounce ml-2">
                    <span /><span /><span />
                  </span>
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.label
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full min-h-[200px] cursor-pointer px-6 py-8"
            htmlFor="receipt-upload"
          >
            {/* Receipt icon */}
            <div className="mb-4 opacity-40">
              <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
                <rect x="2" y="2" width="36" height="56" rx="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" className="text-[#1a1a1a]" />
                <line x1="8" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="1" className="text-[#1a1a1a]" />
                <line x1="8" y1="22" x2="32" y2="22" stroke="currentColor" strokeWidth="1" className="text-[#1a1a1a]" />
                <line x1="8" y1="28" x2="24" y2="28" stroke="currentColor" strokeWidth="1" className="text-[#1a1a1a]" />
                <line x1="8" y1="40" x2="32" y2="40" stroke="currentColor" strokeWidth="1.5" className="text-[#1a1a1a]" />
              </svg>
            </div>
            <p className="text-[#1a1a1a]/60 font-mono text-sm tracking-[0.15em]">
              영수증 이미지를 드롭하거나
            </p>
            <p className="text-[#1a1a1a]/40 font-mono text-[0.7rem] tracking-[0.1em] mt-1">
              클릭하여 업로드
            </p>
            <p className="text-[#1a1a1a]/30 font-mono text-[0.6rem] mt-3 tracking-wider">
              JPG, PNG, WEBP 지원
            </p>
          </motion.label>
        )}
      </AnimatePresence>

      <input
        id="receipt-upload"
        type="file"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
        onChange={handleChange}
      />
    </div>
  );
}

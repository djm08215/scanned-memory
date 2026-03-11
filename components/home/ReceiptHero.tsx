"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import ScannerCursor from "./ScannerCursor";
import ScanFlash from "./ScanFlash";

const BAR_PATTERN = [
  2,1,3,1,2,2,1,2,3,1,1,3,2,1,2,1,3,2,1,1,
  2,3,1,2,1,3,1,1,2,2,1,3,2,1,2,1,1,3,2,1,
  3,1,2,2,1,1,2,3,1,2,
];

function Divider({ style = "dashed" }: { style?: "dashed" | "solid" }) {
  return (
    <div
      className={`w-full ${
        style === "solid"
          ? "border-t border-[#1a1a1a]"
          : "border-t border-dashed border-[#b8b3a8]"
      }`}
    />
  );
}

function Row({
  left,
  right,
  muted,
  bold,
  small,
}: {
  left: string;
  right: string;
  muted?: boolean;
  bold?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={`flex justify-between ${small ? "text-[11px]" : "text-[13px]"} ${
        muted ? "text-[#9d9890]" : "text-[#1a1a1a]"
      } ${bold ? "font-bold" : ""}`}
    >
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}

export default function ReceiptHero() {
  const router = useRouter();
  const [scanned, setScanned] = useState(false);
  const [flash, setFlash] = useState(false);
  const [barcodeHovered, setBarcodeHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const panRangeRef = useRef(600);

  /* Measure receipt height vs viewport to determine pan range */
  useEffect(() => {
    const measure = () => {
      if (!receiptRef.current) return;
      const receiptH = receiptRef.current.offsetHeight + 28; // +28 for perforated edges
      const viewportH = window.innerHeight;
      const topMargin = 32;
      const bottomMargin = 32;
      panRangeRef.current = Math.max(
        0,
        receiptH - viewportH + topMargin + bottomMargin
      );
    };
    measure();
    const t = setTimeout(measure, 150);
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Subtle tilt on mouse move */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltY = useSpring(useTransform(mouseX, [-400, 400], [-1, 1]), {
    stiffness: 80,
    damping: 20,
  });
  const tiltX = useSpring(useTransform(mouseY, [-400, 400], [1, -1]), {
    stiffness: 80,
    damping: 20,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseX.set(e.clientX - window.innerWidth / 2);
    mouseY.set(e.clientY - window.innerHeight / 2);
  };

  /*
   * Vertical pan: receipt starts with its top at 32px from viewport top.
   * As scroll goes 0→1, we translate it upward by panRange so the bottom
   * (barcode) becomes visible.
   */
  const receiptY = useTransform(scrollYProgress, (p) => 32 - p * panRangeRef.current);

  const handleScan = () => {
    if (scanned) return;
    setScanned(true);
    setBarcodeHovered(true);
    const audio = new Audio("/sounds/beep.mp3");
    audio.volume = 0.7;
    audio.play().catch(() => {});
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
      router.push("/archive");
    }, 700);
  };

  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <div ref={containerRef} style={{ height: "320vh" }}>
      {/* ── Sticky viewport ── */}
      <div
        className="sticky top-0 h-screen hide-native-cursor overflow-hidden flex justify-center"
        style={{ background: "#d8342d", alignItems: "flex-start" }}
        onMouseMove={handleMouseMove}
      >
        <ScannerCursor />
        <ScanFlash active={flash} />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.18)_100%)]" />

        {/* Grain */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          }}
        />

        {/* ── Receipt ── */}
        <motion.div
          style={{
            y: receiptY,
            rotateX: tiltX,
            rotateY: tiltY,
            transformPerspective: 1000,
            width: 420,
            filter:
              "drop-shadow(0 24px 60px rgba(0,0,0,0.35)) drop-shadow(0 4px 16px rgba(0,0,0,0.15))",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Perforated top */}
          <div
            style={{
              height: 14,
              backgroundImage:
                "radial-gradient(circle at 50% 100%, #d8342d 7px, transparent 7px)",
              backgroundSize: "18px 14px",
              backgroundRepeat: "repeat-x",
              backgroundColor: "#faf6ed",
            }}
          />

          {/* Receipt body — ref here to measure height */}
          <div
            ref={receiptRef}
            className="bg-[#faf6ed] px-8"
            style={{ fontFamily: "'Courier New', Courier, monospace", color: "#1a1a1a" }}
          >
            {/* Header */}
            <div className="pt-5 pb-4 text-center">
              <p className="text-[10px] tracking-[0.55em] text-[#9d9890] uppercase mb-3">
                ◆ RECEIPT ◆
              </p>
              <p className="text-[30px] font-black tracking-tight leading-none">
                영수증 일기
              </p>
              <p className="text-[11px] tracking-[0.5em] text-[#9d9890] uppercase mt-1">
                Scanned Memory
              </p>
            </div>
            <Divider />

            {/* Store info */}
            <div className="py-3 space-y-[6px]">
              <Row left="점포" right="일상 / EVERYDAY LIFE" />
              <Row left="날짜" right="2026-03-11" muted />
              <Row left="시각" right="지금 / RIGHT NOW" muted />
              <Row left="영수번호" right="#00001" muted small />
            </div>
            <Divider />

            {/* Description */}
            <div className="py-4 text-[13px] leading-[1.85] text-[#3a3a3a]">
              <p>영수증은 소비를 증명하지만,</p>
              <p>동시에 시간을 남긴다.</p>
              <p className="mt-2 text-[#9d9890]">A receipt proves a transaction,</p>
              <p className="text-[#9d9890]">but it also leaves behind time.</p>
            </div>
            <Divider />

            {/* What it archives */}
            <div className="py-3 text-[13px] leading-[1.85]">
              <p className="text-[10px] tracking-[0.3em] text-[#9d9890] uppercase mb-2">
                이 웹은 기록합니다
              </p>
              <p>버려지는 영수증을 스캔해</p>
              <p>날짜, 장소, 품목, 금액을 읽고</p>
              <p>그 영수증에 얽힌 하루의</p>
              <p>감정과 기억을 일기로 남깁니다.</p>
              <p className="mt-2 text-[#9d9890]">The ephemeral becomes an archive.</p>
            </div>
            <Divider />

            {/* Items */}
            <div className="py-3">
              <div className="flex justify-between text-[10px] tracking-[0.25em] text-[#9d9890] uppercase mb-2">
                <span>구분 / ITEM</span>
                <span>수량</span>
              </div>
              {[
                ["오늘의 기억", "Memory of Today", "1"],
                ["하루의 이동", "Movement Trace", "1"],
                ["감정의 흔적", "Emotional Record", "1"],
                ["도시의 지도", "City Cartography", "1"],
              ].map(([kr, en, qty], i) => (
                <div key={i} className="mb-[8px]">
                  <div className="flex justify-between text-[13px]">
                    <span>{kr}</span>
                    <span>{qty}</span>
                  </div>
                  <div className="text-[11px] text-[#9d9890]">{en}</div>
                </div>
              ))}
            </div>
            <Divider />

            {/* Totals */}
            <div className="py-3 space-y-[5px]">
              <Row left="소계 / SUBTOTAL" right="기억들" muted />
              <Row left="부가 / TAX" right="흔적들" muted />
              <div className="pt-2">
                <Divider style="solid" />
              </div>
              <div className="pt-1">
                <Row left="합계 / TOTAL" right="당신의 하루" bold />
              </div>
            </div>
            <Divider />

            {/* Closing message */}
            <div className="py-4 text-center text-[13px] leading-[1.9]">
              <p>모든 영수증은 하나의 흔적이다.</p>
              <p>버려진 종이 위에 남은 하루.</p>
              <p className="mt-2 text-[#9d9890]">Scan the receipt.</p>
              <p className="text-[#9d9890]">Recover the day.</p>
            </div>
            <Divider />

            {/* Scan instruction */}
            <div className="py-3 text-center text-[11px] tracking-[0.22em] uppercase text-[#9d9890]">
              커서를 바코드 위로 이동하세요
              <br />
              <span className="text-[9px]">Move cursor over the barcode to enter</span>
            </div>

            {/* Barcode */}
            <div
              className="pb-5 cursor-none"
              onMouseEnter={handleScan}
              onMouseOver={() => setBarcodeHovered(true)}
              onMouseLeave={() => !scanned && setBarcodeHovered(false)}
            >
              <div
                className="relative bg-white border border-[#ddd9d2] overflow-hidden"
                style={{ height: 76 }}
              >
                <div className="absolute inset-x-3 inset-y-2 flex items-stretch gap-[1.5px]">
                  {BAR_PATTERN.map((w, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 bg-[#1a1a1a]"
                      style={{ width: w * 2.8, height: "100%" }}
                    />
                  ))}
                </div>
                {(barcodeHovered || scanned) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] bg-red-500 pointer-events-none"
                    style={{ boxShadow: "0 0 14px rgba(239,68,68,0.95)" }}
                  />
                )}
              </div>
              <p className="text-center text-[9px] tracking-[0.25em] mt-1 text-[#9d9890]">
                8 80123 45678 9
              </p>
            </div>
          </div>

          {/* Perforated bottom */}
          <div
            style={{
              height: 14,
              backgroundImage:
                "radial-gradient(circle at 50% 0%, #d8342d 7px, transparent 7px)",
              backgroundSize: "18px 14px",
              backgroundRepeat: "repeat-x",
              backgroundColor: "#faf6ed",
            }}
          />
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-center text-white/75"
        >
          <p className="text-[8px] tracking-[0.5em] uppercase mb-3">Scroll</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="text-base"
          >
            ↓
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

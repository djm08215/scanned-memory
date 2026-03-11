"use client";

import { useEffect, useState } from "react";

export default function ScannerCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed z-[9999] hidden md:block"
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="h-6 w-16 rounded border-2 border-neutral-900 bg-white/20 backdrop-blur-sm">
        <div className="mx-1 mt-[9px] h-[2px] bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.85)]" />
      </div>
    </div>
  );
}
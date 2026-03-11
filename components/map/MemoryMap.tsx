"use client";

import { useEffect, useRef, useState } from "react";
import { ReceiptEntry, EmotionTag } from "@/lib/types";
import { emotionConfig, formatKRW } from "@/lib/utils";


interface MemoryMapProps {
  receipts: ReceiptEntry[];
}

export default function MemoryMap({ receipts }: MemoryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstanceRef = useRef<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Inject Leaflet CSS
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.crossOrigin = "";
      document.head.appendChild(link);
    }

    // Dynamic import of Leaflet (SSR safe)
    import("leaflet").then((L) => {
      if (!mapRef.current || mapInstanceRef.current) return;

      // Initialize map centered on Seoul
      const map = L.map(mapRef.current, {
        center: [37.5665, 126.978],
        zoom: 12,
        zoomControl: false,
      });

      // Voyager tile layer (warm, natural tones)
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution: "&copy; OpenStreetMap &copy; CartoDB",
          maxZoom: 19,
        }
      ).addTo(map);

      // Custom zoom control
      L.control.zoom({ position: "bottomright" }).addTo(map);

      // Group receipts by date for route lines
      const byDate: Record<string, ReceiptEntry[]> = {};
      receipts.forEach((r) => {
        if (!byDate[r.date]) byDate[r.date] = [];
        byDate[r.date].push(r);
      });

      // Draw route lines for same-day receipts
      Object.values(byDate).forEach((dayReceipts) => {
        if (dayReceipts.length < 2) return;
        const sorted = [...dayReceipts].sort((a, b) => a.time.localeCompare(b.time));
        const latlngs = sorted.map((r) => [r.location.lat, r.location.lng] as [number, number]);
        L.polyline(latlngs, {
          color: "#d8342d",
          weight: 1.5,
          opacity: 0.4,
          dashArray: "4 4",
        }).addTo(map);
      });

      // Red pin icon
      const redPinIcon = L.icon({
        iconUrl: "/images/pngwing.com.png",
        iconSize: [40, 60],
        iconAnchor: [20, 58],
        popupAnchor: [0, -62],
      });

      // Add receipt pins
      receipts.forEach((receipt) => {
        const emotionBadges = receipt.diary.emotion.map((e: EmotionTag) => {
          const ec = emotionConfig[e];
          return `<span style="background:${ec.bg};color:${ec.color};font-size:0.55rem;padding:2px 6px;letter-spacing:0.1em;text-transform:uppercase;">${ec.labelKo}</span>`;
        }).join("");

        const popupContent = `
          <div style="font-family:'Courier New',monospace;min-width:180px;">
            <div style="background:#d8342d;padding:8px 12px;font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:white;">
              ${receipt.date} · ${receipt.time}
            </div>
            <div style="padding:10px 12px;background:#f4efe5;">
              <div style="font-weight:bold;font-size:0.8rem;color:#171717;margin-bottom:4px;">${receipt.store}</div>
              <div style="font-size:0.65rem;color:#6d675f;margin-bottom:6px;">${receipt.location.address}</div>
              <div style="font-size:0.7rem;color:#171717;margin-bottom:6px;font-style:italic;">&ldquo;${receipt.diary.title}&rdquo;</div>
              <div style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:8px;">${emotionBadges}</div>
              <div style="font-weight:bold;font-size:0.8rem;color:#171717;border-top:1px dashed rgba(23,23,23,0.2);padding-top:6px;">${formatKRW(receipt.total)}</div>
              <a href="/diary/${receipt.id}" style="display:block;margin-top:8px;text-align:center;font-size:0.6rem;letter-spacing:0.15em;text-transform:uppercase;color:#d8342d;text-decoration:none;border-top:1px solid rgba(23,23,23,0.1);padding-top:6px;">자세히 보기 →</a>
            </div>
          </div>
        `;

        const marker = L.marker([receipt.location.lat, receipt.location.lng], { icon: redPinIcon });
        marker.addTo(map);
        marker.bindPopup(popupContent, { maxWidth: 240, className: "receipt-popup" });
        marker.on("click", () => marker.openPopup());
      });

      mapInstanceRef.current = map;
      setReady(true);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-full">
      <div
        ref={mapRef}
        className="w-full h-full"
        style={{ filter: "none" }}
      />
      {!ready && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#e9e1d4]">
          <p className="text-[#1a1a1a]/40 font-mono text-sm tracking-[0.3em]">
            MAP LOADING
            <span className="dot-bounce ml-2">
              <span /><span /><span />
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

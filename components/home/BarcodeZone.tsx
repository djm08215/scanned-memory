interface BarcodeZoneProps {
  onScan: () => void;
  scanned: boolean;
}

export default function BarcodeZone({ onScan, scanned }: BarcodeZoneProps) {
  return (
    <div
      onMouseEnter={() => {
        if (!scanned) onScan();
      }}
      className="absolute bottom-[6%] left-[18%] h-[8%] w-[64%]"
      aria-label="barcode-zone"
    >
      <div
        className={`absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)] transition-opacity duration-150 ${
          scanned ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
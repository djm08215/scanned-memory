interface ScanFlashProps {
  active: boolean;
}

export default function ScanFlash({ active }: ScanFlashProps) {
  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[60] bg-white transition-opacity duration-200 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "HOME", labelKo: "홈" },
  { href: "/archive", label: "ARCHIVE", labelKo: "아카이브" },
  { href: "/upload", label: "UPLOAD", labelKo: "업로드" },
  { href: "/map", label: "MAP", labelKo: "지도" },
  { href: "/about", label: "ABOUT", labelKo: "소개" },
];

export default function Navigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#2a2420]/88 backdrop-blur border-b border-white/8">
      {/* Logo */}
      <Link href="/" className="flex flex-col leading-none group">
        <span className="text-[#d8342d] text-[0.65rem] tracking-[0.25em] uppercase font-mono group-hover:opacity-80 transition-opacity">
          SCANNED
        </span>
        <span className="text-[#f4efe5] text-[0.65rem] tracking-[0.25em] uppercase font-mono group-hover:opacity-80 transition-opacity">
          MEMORY
        </span>
      </Link>

      {/* Links */}
      <div className="flex items-center gap-6">
        {links.map((link) => {
          const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${active ? "active" : ""} hidden sm:block`}
            >
              {link.label}
            </Link>
          );
        })}
        {/* Mobile: only show icons / short labels */}
        <div className="flex sm:hidden items-center gap-4">
          {links.slice(1).map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${active ? "active" : ""} text-[0.6rem]`}
              >
                {link.label.slice(0, 3)}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Right: receipt count indicator */}
      <div className="text-[#f4efe5]/30 text-[0.6rem] tracking-[0.2em] uppercase font-mono hidden md:block">
        영수증 일기
      </div>
    </nav>
  );
}

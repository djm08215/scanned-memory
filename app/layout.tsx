import "./globals.css";
import type { Metadata } from "next";
import Navigation from "@/components/Navigation";

export const metadata: Metadata = {
  title: "영수증 일기 / Scanned Memory",
  description:
    "버려지는 영수증을 하루의 기억과 도시의 이동 흔적으로 다시 읽는 인터랙티브 웹 아카이브",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}

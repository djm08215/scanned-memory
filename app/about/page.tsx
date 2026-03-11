"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function Section({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#e9e1d4] pt-16">
      <div className="max-w-3xl mx-auto px-6 py-16">

        {/* Hero */}
        <Section className="mb-20">
          <p className="text-[#d8342d] text-[0.6rem] tracking-[0.35em] uppercase mb-4">
            ABOUT THIS PROJECT
          </p>
          <h1 className="text-[#1a1a1a] text-5xl font-mono font-bold leading-tight mb-6">
            영수증 일기
          </h1>
          <p className="text-[#1a1a1a]/55 text-xl font-mono leading-relaxed">
            Scanned Memory
          </p>
          <p className="text-[#1a1a1a]/50 text-sm font-mono mt-3 leading-loose">
            버려지는 영수증을 하루의 기억과<br />
            도시의 이동 흔적으로 다시 읽는<br />
            인터랙티브 웹 아카이브
          </p>
        </Section>

        {/* Divider */}
        <div className="border-t border-[#1a1a1a]/15 mb-20" />

        {/* Why receipts? */}
        <Section className="mb-16">
          <div className="flex items-start gap-6">
            <div className="shrink-0 w-px self-stretch bg-[#d8342d]/40" />
            <div>
              <p className="text-[#d8342d] text-[0.6rem] tracking-[0.3em] uppercase mb-4">
                01 / 왜 영수증인가
              </p>
              <h2 className="text-[#1a1a1a] text-2xl font-mono font-bold mb-5">
                Why receipts?
              </h2>
              <div className="space-y-4 text-[#1a1a1a]/65 font-mono text-sm leading-loose">
                <p>
                  영수증은 대개 버려진다. 지갑 구석에서 구겨지거나, 영수증함에 쌓이다가 사라진다.
                  하지만 그 작은 종이에는 하루가 담겨 있다. 어디에 있었는지, 무엇을 샀는지,
                  몇 시였는지.
                </p>
                <p>
                  Receipts are discarded. Crumpled in wallets or piled in drawers
                  until they disappear. But each small piece of paper holds a day —
                  where you were, what you bought, what time it was.
                </p>
                <p>
                  영수증은 기억의 좌표다. 감정이 없는 기록이지만, 그 위에 기억을 얹으면
                  가장 정직한 일기가 된다.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Receipt visual element */}
        <Section className="mb-16">
          <div className="paper-texture receipt-shadow rounded-[4px] overflow-hidden max-w-xs mx-auto font-mono">
            <div
              className="h-3 w-full"
              style={{
                backgroundImage: "radial-gradient(circle at 50% 100%, #e9e1d4 5px, transparent 5px)",
                backgroundSize: "16px 12px",
                backgroundRepeat: "repeat-x",
              }}
            />
            <div className="px-6 py-6 text-[#171717]">
              <p className="text-center text-[0.6rem] tracking-[0.3em] uppercase text-[#6d675f] mb-4">
                EVERYDAY OBJECTS
              </p>
              <div className="border-t border-dashed border-[#171717]/20 mb-4" />
              {[
                { ko: "기억의 좌표", en: "coordinates of memory" },
                { ko: "하루의 밀도", en: "density of a day" },
                { ko: "도시의 이동", en: "movement through the city" },
                { ko: "버려진 시간들", en: "discarded moments" },
              ].map(({ ko, en }) => (
                <div key={ko} className="flex justify-between text-[0.72rem] py-1 border-b border-[#171717]/8">
                  <span>{ko}</span>
                  <span className="text-[#6d675f] text-[0.62rem]">{en}</span>
                </div>
              ))}
              <div className="border-t border-dashed border-[#171717]/20 mt-4 mb-2" />
              <p className="text-center text-[0.65rem] text-[#6d675f]">영수증 일기 / Scanned Memory</p>
            </div>
            <div
              className="h-3 w-full"
              style={{
                backgroundImage: "radial-gradient(circle at 50% 0%, #e9e1d4 5px, transparent 5px)",
                backgroundSize: "16px 12px",
                backgroundRepeat: "repeat-x",
              }}
            />
          </div>
        </Section>

        {/* Why diary + map? */}
        <Section className="mb-16">
          <div className="flex items-start gap-6">
            <div className="shrink-0 w-px self-stretch bg-[#d8342d]/40" />
            <div>
              <p className="text-[#d8342d] text-[0.6rem] tracking-[0.3em] uppercase mb-4">
                02 / 일기와 지도
              </p>
              <h2 className="text-[#1a1a1a] text-2xl font-mono font-bold mb-5">
                Why diary + map?
              </h2>
              <div className="space-y-4 text-[#1a1a1a]/65 font-mono text-sm leading-loose">
                <p>
                  일기는 시간의 기록이고, 지도는 공간의 기록이다.
                  영수증은 그 둘을 동시에 담고 있는 유일한 물건이다.
                </p>
                <p>
                  A diary records time; a map records space.
                  A receipt is the only object that holds both simultaneously.
                </p>
                <p>
                  한 사람이 하루 동안 서울을 어떻게 이동했는지,
                  그 궤적이 감정과 어떻게 겹치는지를 보고 싶었다.
                  도시는 우리가 걸어다닌 감정의 지형도다.
                </p>
                <p>
                  I wanted to see how a person moved through Seoul in a day —
                  how that trajectory overlaps with emotion.
                  The city is a topographic map of feelings we walked through.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* What does this want to record? */}
        <Section className="mb-16">
          <div className="flex items-start gap-6">
            <div className="shrink-0 w-px self-stretch bg-[#d8342d]/40" />
            <div>
              <p className="text-[#d8342d] text-[0.6rem] tracking-[0.3em] uppercase mb-4">
                03 / 이 웹이 기록하고 싶은 것
              </p>
              <h2 className="text-[#1a1a1a] text-2xl font-mono font-bold mb-5">
                What does this web want to record?
              </h2>
              <div className="space-y-4 text-[#1a1a1a]/65 font-mono text-sm leading-loose">
                <p>
                  대단한 일이 아니어도 된다. 편의점에서 산 라면,
                  면접 전에 마신 아메리카노, 엄마랑 간 동대문.
                  이 웹은 그 작고 평범한 것들을 기록하고 싶다.
                </p>
                <p>
                  It doesn&apos;t have to be a big event. Instant noodles from a
                  convenience store. An Americano before an interview.
                  A market visit with your mother.
                  This web wants to record those small, ordinary things.
                </p>
                <p>
                  그것들이 모이면 어떤 사람의 하루가 되고,
                  하루가 모이면 한 시절이 된다.
                  영수증 일기는 그 시절을 잃지 않기 위한 방법이다.
                </p>
                <p>
                  Together they become someone&apos;s day.
                  Days become a season.
                  Scanned Memory is a way of not losing that season.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Divider */}
        <div className="border-t border-[#1a1a1a]/15 mb-16" />

        {/* How to use */}
        <Section className="mb-16">
          <p className="text-[#d8342d] text-[0.6rem] tracking-[0.3em] uppercase mb-6">
            사용 방법 / HOW TO USE
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                step: "01",
                title: "영수증 스캔",
                en: "Scan a receipt",
                desc: "영수증 이미지를 업로드하거나 직접 정보를 입력하세요.",
              },
              {
                step: "02",
                title: "일기 작성",
                en: "Write a diary",
                desc: "그날의 감정, 상황, 함께한 사람을 기록하세요.",
              },
              {
                step: "03",
                title: "아카이브 탐색",
                en: "Browse the archive",
                desc: "감정 태그와 검색으로 과거의 기억을 다시 꺼내보세요.",
              },
              {
                step: "04",
                title: "지도에서 보기",
                en: "View on map",
                desc: "서울 위에 펼쳐진 당신의 하루들을 지도로 봐보세요.",
              },
            ].map(({ step, title, en, desc }) => (
              <div
                key={step}
                className="bg-[#1a1a1a]/6 border border-[#1a1a1a]/10 rounded-[3px] p-4"
              >
                <p className="text-[#d8342d] font-mono text-[0.6rem] tracking-[0.25em] mb-2">
                  {step}
                </p>
                <h3 className="text-[#1a1a1a] font-mono text-sm font-bold mb-1">
                  {title}
                </h3>
                <p className="text-[#1a1a1a]/40 font-mono text-[0.65rem] mb-2">{en}</p>
                <p className="text-[#1a1a1a]/55 font-mono text-[0.7rem] leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <Section className="text-center">
          <div className="border-t border-[#1a1a1a]/15 pt-12">
            <p className="text-[#1a1a1a]/35 font-mono text-[0.65rem] tracking-[0.25em] uppercase mb-6">
              지금 시작하기
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <a
                href="/archive"
                className="border border-[#1a1a1a]/20 text-[#1a1a1a]/60 font-mono text-[0.7rem] tracking-[0.2em] uppercase px-6 py-3 hover:border-[#1a1a1a]/40 hover:text-[#1a1a1a] transition-all rounded-[2px]"
              >
                ARCHIVE →
              </a>
              <a
                href="/upload"
                className="bg-[#d8342d] text-white font-mono text-[0.7rem] tracking-[0.2em] uppercase px-6 py-3 hover:bg-[#c02a24] transition-all rounded-[2px]"
              >
                UPLOAD →
              </a>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-20 border-t border-[#1a1a1a]/10 pt-8 text-center">
          <p className="text-[#1a1a1a]/30 font-mono text-[0.6rem] tracking-[0.25em]">
            SCANNED MEMORY — 영수증 일기
          </p>
        </div>
      </div>
    </main>
  );
}

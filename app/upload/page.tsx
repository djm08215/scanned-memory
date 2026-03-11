"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ReceiptItem, EmotionTag } from "@/lib/types";
import { saveReceipt } from "@/lib/store";
import { generateId } from "@/lib/utils";
import UploadDropzone from "@/components/upload/UploadDropzone";
import ItemEditor from "@/components/upload/ItemEditor";
import EmotionTagSelector from "@/components/upload/EmotionTagSelector";

type Step = "upload" | "form";

export default function UploadPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("upload");
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isDecoding, setIsDecoding] = useState(false);

  // Form state
  const [store, setStore] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [items, setItems] = useState<ReceiptItem[]>([{ name: "", price: 0 }]);
  const [diaryTitle, setDiaryTitle] = useState("");
  const [diaryEntry, setDiaryEntry] = useState("");
  const [emotions, setEmotions] = useState<EmotionTag[]>([]);
  const [people, setPeople] = useState("");
  const [weather, setWeather] = useState("");
  const [saving, setSaving] = useState(false);

  const total = items.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleFileSelected = async (file: File, url: string) => {
    setPreviewUrl(url);
    setIsDecoding(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/ocr", { method: "POST", body: formData });
      if (res.ok) {
        const data = await res.json();
        if (data.store) setStore(data.store);
        if (data.date) setDate(data.date);
        if (data.time) setTime(data.time);
        if (data.address) setAddress(data.address);
        if (data.items && data.items.length > 0) {
          setItems(data.items.map((item: { name: string; price: number }) => ({
            name: item.name || "",
            price: typeof item.price === "number" ? item.price : 0,
          })));
        }
      }
    } catch {
      // OCR failed — continue without auto-fill
    } finally {
      setIsDecoding(false);
      setStep("form");
    }
  };

  const handleSkipUpload = () => {
    setStep("form");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!store || !date) return;

    setSaving(true);

    const receipt = {
      id: generateId(),
      store,
      date,
      time: time || "00:00",
      total,
      currency: "KRW",
      items: items.filter((i) => i.name),
      location: {
        lat: lat ? parseFloat(lat) : 37.5665,
        lng: lng ? parseFloat(lng) : 126.978,
        address: address || "Seoul, South Korea",
      },
      receiptImage: previewUrl || undefined,
      diary: {
        title: diaryTitle || `${store}의 기억`,
        entry: diaryEntry,
        emotion: emotions.length > 0 ? emotions : (["calm"] as EmotionTag[]),
        people: people ? people.split(",").map((p) => p.trim()).filter(Boolean) : ["alone"],
        weather: weather || undefined,
      },
      createdAt: new Date().toISOString(),
    };

    saveReceipt(receipt);

    setTimeout(() => {
      router.push("/archive");
    }, 500);
  };

  const inputCls =
    "w-full bg-[#1a1a1a]/6 border border-[#1a1a1a]/15 rounded-[2px] px-3 py-2.5 text-[#1a1a1a] font-mono text-sm placeholder-[#1a1a1a]/35 focus:outline-none focus:border-[#d8342d]/50 transition-colors";
  const labelCls = "block text-[#1a1a1a]/50 font-mono text-[0.6rem] tracking-[0.2em] uppercase mb-1.5";

  return (
    <main className="min-h-screen bg-[#e9e1d4] pt-16">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-[#d8342d] text-[0.6rem] tracking-[0.35em] uppercase mb-2">
            NEW ENTRY
          </p>
          <h1 className="text-[#1a1a1a] text-4xl font-mono font-bold tracking-wide">
            UPLOAD
          </h1>
          <p className="text-[#1a1a1a]/50 text-sm font-mono mt-1">
            영수증을 스캔하고 오늘의 기억을 기록하세요
          </p>
        </motion.div>

        {/* Step 1: Upload */}
        <AnimatePresence mode="wait">
          {step === "upload" && (
            <motion.div
              key="upload-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <UploadDropzone
                onFileSelected={handleFileSelected}
                previewUrl={previewUrl}
                isDecoding={isDecoding}
              />
              {!isDecoding && (
                <button
                  onClick={handleSkipUpload}
                  className="w-full text-[#1a1a1a]/40 hover:text-[#1a1a1a]/70 font-mono text-[0.65rem] tracking-[0.2em] uppercase transition-colors py-2"
                >
                  이미지 없이 계속하기 →
                </button>
              )}
            </motion.div>
          )}

          {step === "form" && (
            <motion.form
              key="form-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* Preview thumbnail */}
              {previewUrl && (
                <div className="flex gap-4 items-center p-3 bg-[#1a1a1a]/6 rounded-[3px] border border-[#1a1a1a]/15">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt="receipt"
                    className="w-16 h-24 object-cover rounded-[2px] opacity-80"
                  />
                  <div>
                    <p className="text-[#1a1a1a]/60 font-mono text-xs">영수증 이미지 첨부됨</p>
                    <button
                      type="button"
                      onClick={() => { setPreviewUrl(""); setStep("upload"); }}
                      className="text-[#1a1a1a]/40 hover:text-[#d8342d] font-mono text-[0.6rem] tracking-[0.1em] uppercase mt-1 transition-colors"
                    >
                      변경하기
                    </button>
                  </div>
                </div>
              )}

              {/* Section: Receipt Info */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="text-[#d8342d] font-mono text-[0.6rem] tracking-[0.25em] uppercase">
                    01 / 영수증 정보
                  </div>
                  <div className="flex-1 border-t border-[#1a1a1a]/15" />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>가게 이름 *</label>
                    <input
                      type="text"
                      value={store}
                      onChange={(e) => setStore(e.target.value)}
                      placeholder="Cafe Layered"
                      required
                      className={inputCls}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>날짜 *</label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>시각</label>
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>주소</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Seoul, South Korea"
                      className={inputCls}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>위도 (선택)</label>
                      <input
                        type="number"
                        step="any"
                        value={lat}
                        onChange={(e) => setLat(e.target.value)}
                        placeholder="37.5665"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>경도 (선택)</label>
                      <input
                        type="number"
                        step="any"
                        value={lng}
                        onChange={(e) => setLng(e.target.value)}
                        placeholder="126.978"
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section: Items */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="text-[#d8342d] font-mono text-[0.6rem] tracking-[0.25em] uppercase">
                    02 / 구매 항목
                  </div>
                  <div className="flex-1 border-t border-[#1a1a1a]/15" />
                </div>
                <ItemEditor items={items} onChange={setItems} />
                <div className="mt-4 flex justify-between items-center border-t border-dashed border-[#1a1a1a]/20 pt-3">
                  <span className="text-[#1a1a1a]/50 font-mono text-[0.7rem] tracking-[0.15em] uppercase">
                    합계
                  </span>
                  <span className="text-[#1a1a1a] font-mono text-base">
                    {total.toLocaleString()}원
                  </span>
                </div>
              </div>

              {/* Section: Diary */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="text-[#d8342d] font-mono text-[0.6rem] tracking-[0.25em] uppercase">
                    03 / 오늘의 일기
                  </div>
                  <div className="flex-1 border-t border-[#1a1a1a]/15" />
                </div>
                <div className="space-y-4">
                  <div>
                    <label className={labelCls}>일기 제목</label>
                    <input
                      type="text"
                      value={diaryTitle}
                      onChange={(e) => setDiaryTitle(e.target.value)}
                      placeholder="면접 끝난 오후"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>오늘 무슨 일이 있었나요</label>
                    <textarea
                      value={diaryEntry}
                      onChange={(e) => setDiaryEntry(e.target.value)}
                      placeholder="그날의 기억을 자유롭게 적어주세요..."
                      rows={5}
                      className={`${inputCls} resize-none leading-relaxed`}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>감정 태그</label>
                    <EmotionTagSelector selected={emotions} onChange={setEmotions} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelCls}>함께한 사람 (쉼표로 구분)</label>
                      <input
                        type="text"
                        value={people}
                        onChange={(e) => setPeople(e.target.value)}
                        placeholder="alone, J, mom"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>날씨</label>
                      <input
                        type="text"
                        value={weather}
                        onChange={(e) => setWeather(e.target.value)}
                        placeholder="cloudy, sunny, rainy..."
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="border-t border-[#1a1a1a]/15 pt-6">
                <button
                  type="submit"
                  disabled={saving || !store || !date}
                  className={`w-full py-4 font-mono text-sm tracking-[0.25em] uppercase rounded-[2px] transition-all ${
                    saving || !store || !date
                      ? "bg-[#1a1a1a]/8 text-[#1a1a1a]/35 cursor-not-allowed"
                      : "bg-[#d8342d] text-white hover:bg-[#c02a24]"
                  }`}
                >
                  {saving ? (
                    <span className="flex items-center justify-center gap-2">
                      저장 중
                      <span className="dot-bounce">
                        <span /><span /><span />
                      </span>
                    </span>
                  ) : (
                    "기억 저장하기 →"
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

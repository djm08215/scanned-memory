import { ReceiptEntry } from "@/lib/types";

export const receipts: ReceiptEntry[] = [
  {
    id: "receipt-001",
    store: "Cafe Layered",
    date: "2026-03-10",
    time: "14:32",
    total: 5800,
    currency: "KRW",
    items: [
      { name: "Americano", price: 4500, annotation: "너무 뜨거웠다" },
      { name: "Bagel", price: 1300, annotation: "반도 못 먹었다" },
    ],
    location: {
      lat: 37.5665,
      lng: 126.978,
      address: "Seoul, South Korea",
    },
    receiptImage: "/images/receipt-sample.png",
    diary: {
      title: "면접 끝난 오후",
      entry:
        "끝나고 바로 집에 가기 싫어서 카페에 앉아 있었다. 커피가 너무 뜨거웠고, 창문 쪽 빛이 이상하게 오래 기억에 남았다. 면접관이 마지막에 뭐라고 했는지 계속 되뇌었다. 결과는 이틀 뒤에 나온다고 했다.",
      emotion: ["anxious", "relieved"],
      people: ["alone"],
      weather: "cloudy",
    },
    createdAt: "2026-03-10T14:50:00Z",
  },
  {
    id: "receipt-002",
    store: "Night Convenience",
    date: "2026-03-08",
    time: "23:17",
    total: 9200,
    currency: "KRW",
    items: [
      { name: "Water", price: 1200 },
      { name: "Instant Noodles", price: 2800, annotation: "새벽 허기" },
      { name: "Snack", price: 5200 },
    ],
    location: {
      lat: 37.5512,
      lng: 126.9882,
      address: "Yongsan-gu, Seoul",
    },
    receiptImage: "/images/receipt-sample.png",
    diary: {
      title: "늦은 귀가",
      entry:
        "집에 들어가기 전에 편의점에 들렀다. 별일 없는 날 같았는데 이상하게 오래 남는다. 형광등 빛이 너무 밝았고 아르바이트 직원은 피곤해 보였다. 나도 마찬가지였다.",
      emotion: ["lonely", "nostalgic"],
      people: ["alone"],
      weather: "clear",
    },
    createdAt: "2026-03-08T23:30:00Z",
  },
  {
    id: "receipt-003",
    store: "Bookseller Moonlit",
    date: "2026-03-05",
    time: "16:45",
    total: 18500,
    currency: "KRW",
    items: [
      { name: "Small Things Like These", price: 13500, annotation: "오래 읽을 것 같다" },
      { name: "Bookmark set", price: 5000 },
    ],
    location: {
      lat: 37.5796,
      lng: 126.9770,
      address: "Jongno-gu, Seoul",
    },
    diary: {
      title: "책 한 권의 무게",
      entry:
        "별 기대 없이 들어간 서점이었다. 책 한 권을 집어 들고 첫 문장을 읽다가 그냥 사버렸다. 이런 날이 있다. 이유 없이 좋은 날.",
      emotion: ["calm", "joy"],
      people: ["alone"],
      weather: "sunny",
    },
    createdAt: "2026-03-05T17:00:00Z",
  },
  {
    id: "receipt-004",
    store: "Dongdaemun Market",
    date: "2026-02-28",
    time: "11:20",
    total: 32000,
    currency: "KRW",
    items: [
      { name: "Cotton fabric 2m", price: 18000 },
      { name: "Thread bundle", price: 5000 },
      { name: "Buttons", price: 4000 },
      { name: "Zipper", price: 5000 },
    ],
    location: {
      lat: 37.5665,
      lng: 127.009,
      address: "Dongdaemun-gu, Seoul",
    },
    diary: {
      title: "엄마와 함께",
      entry:
        "엄마가 서울에 올라와서 같이 동대문 시장을 돌아다녔다. 원단을 고르는 엄마 손이 이상하게 낯설었다. 점심엔 순대국밥을 먹었다. 집에 내려가는 버스를 배웅하고 나서 한참 서 있었다.",
      emotion: ["nostalgic", "lonely"],
      people: ["mom"],
      weather: "cold",
    },
    createdAt: "2026-02-28T12:00:00Z",
  },
  {
    id: "receipt-005",
    store: "Han River Convenience",
    date: "2026-02-22",
    time: "20:05",
    total: 14700,
    currency: "KRW",
    items: [
      { name: "Chicken skewers", price: 4500, annotation: "너무 맛있었다" },
      { name: "Canned beer x2", price: 5000 },
      { name: "Cup noodles", price: 1800 },
      { name: "Chips", price: 3400 },
    ],
    location: {
      lat: 37.5326,
      lng: 126.9943,
      address: "Yeouido Hangang Park, Seoul",
    },
    diary: {
      title: "한강에서 맥주",
      entry:
        "오랜만에 친구랑 한강에 나갔다. 바람이 많이 불었다. 우리가 왜 이렇게 오래 못 봤는지 대화는 거기서 끊겼다. 그냥 강만 오래 봤다. 그것으로 충분했다.",
      emotion: ["calm", "nostalgic"],
      people: ["J"],
      weather: "windy",
    },
    createdAt: "2026-02-22T20:30:00Z",
  },
  {
    id: "receipt-006",
    store: "GS25 Sinchon",
    date: "2026-02-15",
    time: "02:47",
    total: 7600,
    currency: "KRW",
    items: [
      { name: "Energy drink", price: 2200, annotation: "마감 때문에" },
      { name: "Triangle Kimbap", price: 1400 },
      { name: "Ramen", price: 4000 },
    ],
    location: {
      lat: 37.5597,
      lng: 126.9427,
      address: "Sinchon, Seodaemun-gu, Seoul",
    },
    diary: {
      title: "마감 전날 새벽",
      entry:
        "제출 마감이 6시간 남았다. 편의점 불빛이 너무 환해서 눈이 아팠다. 에너지 드링크를 마시면서 노트북 화면을 켜놓고 한참 아무것도 못 했다. 그냥 앉아 있다가 다시 일어났다.",
      emotion: ["anxious"],
      people: ["alone"],
      weather: "night",
    },
    createdAt: "2026-02-15T03:00:00Z",
  },
  {
    id: "receipt-007",
    store: "Therapy Coffee",
    date: "2026-02-10",
    time: "13:15",
    total: 12000,
    currency: "KRW",
    items: [
      { name: "Latte", price: 5500, annotation: "처음으로 혼자" },
      { name: "Croissant", price: 4500 },
      { name: "Water", price: 2000 },
    ],
    location: {
      lat: 37.5219,
      lng: 127.0221,
      address: "Gangnam-gu, Seoul",
    },
    diary: {
      title: "처음 혼자 간 카페",
      entry:
        "오늘 처음으로 아무도 없이 카페에 혼자 앉았다. 이상하게 울컥했다. 크루아상이 맛있었다. 음악이 좋았다. 이런 시간이 더 많아도 되겠다고 생각했다.",
      emotion: ["calm", "relieved"],
      people: ["alone"],
      weather: "sunny",
    },
    createdAt: "2026-02-10T13:45:00Z",
  },
  {
    id: "receipt-008",
    store: "Yongsan Electronics",
    date: "2026-01-30",
    time: "17:33",
    total: 89000,
    currency: "KRW",
    items: [
      { name: "USB-C Cable 2m", price: 15000 },
      { name: "SD Card 64GB", price: 22000 },
      { name: "Phone stand", price: 12000 },
      { name: "Thermal paste", price: 8000 },
      { name: "HDMI adapter", price: 32000 },
    ],
    location: {
      lat: 37.5298,
      lng: 126.9645,
      address: "Yongsan Electronics Market, Seoul",
    },
    diary: {
      title: "용산 나들이",
      entry:
        "고장난 노트북 수리는 결국 포기했다. 대신 이것저것 사다 보니 이만큼 썼다. 아저씨가 덤으로 멀티탭 주셨다. 기분이 묘했다. 집에 와서 다 꽂아봤다.",
      emotion: ["calm", "joy"],
      people: ["alone"],
      weather: "cold",
    },
    createdAt: "2026-01-30T18:00:00Z",
  },
];

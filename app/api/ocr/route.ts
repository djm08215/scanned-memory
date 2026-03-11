import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const mediaType = (file.type || "image/jpeg") as
      | "image/jpeg"
      | "image/png"
      | "image/gif"
      | "image/webp";

    const response = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: base64,
              },
            },
            {
              type: "text",
              text: `이 영수증 이미지를 분석하여 다음 정보를 JSON 형식으로 추출해주세요. 한국 영수증이지만 영어 영수증도 가능합니다.

반드시 다음 JSON 형식으로만 응답하세요 (다른 텍스트 없이):
{
  "store": "가게 이름",
  "date": "YYYY-MM-DD 형식의 날짜",
  "time": "HH:MM 형식의 시각 (24시간)",
  "address": "주소 (없으면 빈 문자열)",
  "items": [
    { "name": "품목명", "price": 가격(숫자) }
  ],
  "total": 총액(숫자)
}

- date는 반드시 YYYY-MM-DD 형식
- time은 반드시 HH:MM 형식 (24시간)
- price와 total은 원화 기준 숫자만 (쉼표, 원 기호 없이)
- 정보를 찾을 수 없으면 빈 문자열 또는 0으로
- items가 없으면 빈 배열 []`,
            },
          ],
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json({ error: "Failed to parse receipt" }, { status: 422 });
    }

    const data = JSON.parse(jsonMatch[0]);
    return NextResponse.json(data);
  } catch (err) {
    console.error("OCR error:", err);
    return NextResponse.json({ error: "OCR failed" }, { status: 500 });
  }
}

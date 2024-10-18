import OpenAI from "openai";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { question, apiKey } = await req.json();
  const openai = new OpenAI({
    apiKey: apiKey,
  });

  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content: question }],
    model: "gpt-3.5-turbo",
  });
  // @ts-ignore
  return NextResponse.json(completion.choices[0]?.message?.content);
}

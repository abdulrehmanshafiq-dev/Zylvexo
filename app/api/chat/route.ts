import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const AGENCY_NAME = process.env.NEXT_PUBLIC_AGENCY_NAME || "Zylvexo";

const SYSTEM_MESSAGE = `You are the AI assistant for ${AGENCY_NAME}, a premium digital agency specializing in Web Development, AI Automation, SEO, and Digital Marketing. We help businesses grow through technology. Be helpful, conversational, and professional. Keep responses under 150 words. For pricing or project specifics, always suggest booking a discovery call at our website. Services we offer: custom websites (React/Next.js), AI chatbots and automation, technical SEO, Meta and Google Ads. Typical timelines: websites 2-4 weeks, AI systems 4-8 weeks.`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "message is required" },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message must be under 500 characters" },
        { status: 400 }
      );
    }

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const recentHistory = Array.isArray(history) ? history.slice(-10) : [];

    const messages = [
      { role: "system" as const, content: SYSTEM_MESSAGE },
      ...recentHistory.map((h: { role: string; content: string }) => ({
        role: h.role as "user" | "assistant",
        content: h.content,
      })),
      { role: "user" as const, content: message },
    ];

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      max_tokens: 300,
      temperature: 0.7,
    });

    return NextResponse.json({
      reply: response.choices[0].message.content,
    });
  } catch {
    return NextResponse.json({
      reply: "I'm having a moment — try asking again shortly.",
    });
  }
}

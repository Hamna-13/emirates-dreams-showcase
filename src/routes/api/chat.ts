import { createFileRoute } from "@tanstack/react-router";

type Msg = { role: "system" | "user" | "assistant"; content: string };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const body = (await request.json()) as { messages?: Msg[] };
        if (!Array.isArray(body.messages)) {
          return new Response("messages required", { status: 400 });
        }

        const systemPrompt: Msg = {
          role: "system",
          content:
            "You are Amira, the AI concierge for Emirates Royale — a luxury real estate agency in the United Arab Emirates. " +
            "Help clients explore premium properties across Dubai, Abu Dhabi, Sharjah and Ras Al Khaimah: villas on Palm Jumeirah, penthouses in Downtown Dubai and Marina, mansions in Emirates Hills, and off-plan investments. " +
            "Answer questions about neighborhoods, pricing (in AED), Golden Visa eligibility, ROI, and the buying process for residents and international investors. " +
            "Be warm, elegant, concise (2-4 short paragraphs max). If asked to book a viewing, ask for name, preferred area, budget and contact.",
        };

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
          },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [systemPrompt, ...body.messages],
          }),
        });

        if (!res.ok) {
          const text = await res.text();
          return new Response(text || "AI gateway error", { status: res.status });
        }

        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const reply = data.choices?.[0]?.message?.content ?? "";
        return new Response(JSON.stringify({ reply }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

export function ChatWidget({ openSignal }: { openSignal?: number }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      content:
        "Marhaba — I'm Amira, your Emirates Royale concierge. Ask me about villas on Palm Jumeirah, Downtown penthouses, Golden Visa eligibility, or ROI on off-plan projects.",
    },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openSignal) setOpen(true);
  }, [openSignal]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, loading]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...msgs, { role: "user" as const, content: text }];
    setMsgs(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as { reply: string };
      setMsgs((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (e) {
      setMsgs((m) => [
        ...m,
        { role: "assistant", content: "Apologies — I'm briefly unavailable. Please try again shortly." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open chat with Amira"
          className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-royal text-primary-foreground shadow-gold ring-2 ring-gold/60 transition hover:scale-105"
          style={{ boxShadow: "var(--shadow-gold)" }}
        >
          <MessageCircle className="h-7 w-7 text-gold" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-gold animate-pulse" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-6 right-6 z-50 flex h-[600px] max-h-[85vh] w-[92vw] max-w-md flex-col overflow-hidden rounded-2xl border border-gold/30 bg-card shadow-luxe">
          <div className="flex items-center justify-between bg-royal px-5 py-4 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20 ring-1 ring-gold/60">
                <span className="font-display text-lg text-gold">A</span>
              </div>
              <div>
                <div className="font-display text-lg leading-tight">Amira</div>
                <div className="text-xs text-gold-soft/80">Emirates Royale Concierge</div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-full p-1 hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-background px-4 py-5">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                      : "max-w-[90%] whitespace-pre-wrap text-sm leading-relaxed text-foreground"
                  }
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin text-gold" /> Amira is typing…
              </div>
            )}
          </div>

          <div className="border-t border-border bg-card p-3">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                rows={1}
                placeholder="Ask about a villa, area or Golden Visa…"
                className="max-h-32 flex-1 resize-none rounded-lg border border-input bg-background px-3 py-2 text-sm focus:border-gold focus:outline-none"
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-royal text-gold ring-1 ring-gold/40 transition hover:brightness-110 disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

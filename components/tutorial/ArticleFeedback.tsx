"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

type State = "idle" | "submitting" | "success" | "error";

export default function ArticleFeedback() {
  const pathname = usePathname();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || !email.trim()) return;
    setState("submitting");

    try {
      const res = await fetch("https://formspree.io/f/xdawzrqb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          type: "article-feedback",
          page: pathname,
          message,
          email,
        }),
      });
      setState(res.ok ? "success" : "error");
      if (res.ok) { setMessage(""); setEmail(""); }
    } catch {
      setState("error");
    }
  }

  return (
    <div className="mt-10 mb-2 bg-gradient-to-br from-[#6367ff]/5 to-[#c9beff]/10 border-[1.5px] border-[#6367ff]/20 rounded-[14px] px-6 py-6">
      <h3 className="font-extrabold text-[#0f172a] mb-1">
        Have anything to say about this lesson?
      </h3>
      <p className="text-sm text-[#64748b] leading-relaxed mb-4">
        Your feedback helps improve these tutorials. If something was confusing
        or missing, let us know.
      </p>

      {state === "success" ? (
        <div className="flex items-start gap-3 text-sm">
          <span className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-[#4ade80]/20 mt-0.5">
            <svg className="w-3 h-3 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <p className="font-semibold text-[#0f172a] leading-relaxed">
            Thanks for the feedback! Your input helps make Codecraft tutorials better.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Message */}
          <textarea
            rows={3}
            value={message}
            onChange={(e) => { setMessage(e.target.value); if (state === "error") setState("idle"); }}
            placeholder="Share any thoughts, suggestions, or things that were unclear."
            className="w-full px-4 py-2.5 rounded-[10px] border-[1.5px] border-[#e5e7eb] bg-white text-sm text-[#0f172a] placeholder-[#94a3b8] outline-none transition-colors focus:border-[#6367ff] focus:shadow-[0_0_0_3px_rgba(99,103,255,0.1)] resize-none"
          />

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-[#64748b] mb-1.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2.5 rounded-[10px] border-[1.5px] border-[#e5e7eb] bg-white text-sm text-[#0f172a] placeholder-[#94a3b8] outline-none transition-colors focus:border-[#6367ff] focus:shadow-[0_0_0_3px_rgba(99,103,255,0.1)]"
            />
            <p className="mt-1.5 text-xs text-[#94a3b8]">
              We don&apos;t currently reply to feedback — but if we add that feature in the future, we&apos;ll reach out to you.
            </p>
          </div>

          {state === "error" && (
            <p className="text-xs font-semibold text-red-500">
              Something went wrong. Please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={state === "submitting" || !message.trim() || !email.trim()}
            className="inline-flex items-center gap-2 px-[18px] py-[10px] bg-[#6367ff] text-white text-sm font-bold rounded-[10px] hover:bg-[#5254e8] hover:shadow-[0_4px_16px_rgba(99,103,255,0.4)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state === "submitting" ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Sending…
              </>
            ) : (
              "Send Feedback"
            )}
          </button>
        </form>
      )}
    </div>
  );
}

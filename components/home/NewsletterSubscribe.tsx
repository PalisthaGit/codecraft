"use client";

import { useState } from "react";

type State = "idle" | "submitting" | "success" | "error";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setState("submitting");

    try {
      const res = await fetch("https://formspree.io/f/xdawzrqb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ type: "newsletter", email, page: "homepage" }),
      });
      setState(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch {
      setState("error");
    }
  }

  return (
    <section className="bg-gradient-to-br from-[#6367ff]/5 to-[#c9beff]/10 border-[1.5px] border-[#6367ff]/20 rounded-[14px] px-8 py-10 text-center">
      <h2 className="text-xl font-extrabold text-[#0f172a] tracking-tight mb-2">
        Stay updated with new tutorials
      </h2>
      <p className="text-sm text-[#64748b] leading-relaxed mb-6">
        Get notified when new coding lessons are published.
      </p>

      {state === "success" ? (
        <div className="flex items-center justify-center gap-3 text-sm">
          <span className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-[#4ade80]/20">
            <svg className="w-3 h-3 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <p className="font-semibold text-[#0f172a]">
            You&apos;re subscribed! We&apos;ll let you know when new tutorials are published.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => { setEmail(e.target.value); if (state === "error") setState("idle"); }}
            placeholder="Enter your email"
            className="flex-1 px-4 py-[10px] rounded-[10px] border-[1.5px] border-[#e5e7eb] bg-white text-sm text-[#0f172a] placeholder-[#94a3b8] outline-none transition-colors focus:border-[#6367ff] focus:shadow-[0_0_0_3px_rgba(99,103,255,0.1)]"
          />
          <button
            type="submit"
            disabled={state === "submitting" || !email.trim()}
            className="inline-flex items-center justify-center gap-2 px-[18px] py-[10px] bg-[#6367ff] text-white text-sm font-bold rounded-[10px] hover:bg-[#5254e8] hover:shadow-[0_4px_16px_rgba(99,103,255,0.4)] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {state === "submitting" ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Subscribing…
              </>
            ) : (
              "Subscribe"
            )}
          </button>
        </form>
      )}

      {state === "error" && (
        <p className="mt-3 text-xs font-semibold text-red-500">
          Something went wrong. Please try again.
        </p>
      )}
    </section>
  );
}

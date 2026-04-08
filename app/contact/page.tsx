"use client";

import { useState } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [formState, setFormState] = useState<FormState>("idle");

  function validate(): Errors {
    const e: Errors = {};
    if (!name.trim()) e.name = "Name is required.";
    if (!email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = "Please enter a valid email address.";
    }
    if (!message.trim()) e.message = "Message is required.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setFormState("submitting");

    try {
      const res = await fetch("https://formspree.io/f/xdawzrqb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setFormState("success");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  return (
    <div className="max-w-2xl">
      {/* Header */}
      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        Contact
      </span>
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-3">
        Contact CodingBanana
      </h1>
      <p className="text-[0.95rem] leading-[1.8] text-[#64748b] mb-8 max-w-md">
        Found a mistake in a lesson? Have a suggestion? We read every message
        and try to respond within 2–3 business days.
      </p>

      {/* Success state */}
      {formState === "success" ? (
        <div className="bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] border-l-4 border-l-[#4ade80] px-6 py-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-center">
          <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#4ade80]/15 mx-auto mb-4">
            <svg className="w-6 h-6 text-[#16a34a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-extrabold text-[#0f172a] mb-2">Message sent!</h2>
          <p className="text-sm text-[#64748b] leading-relaxed">
            Thanks! Your message has been sent. We&apos;ll get back to you soon.
          </p>
          <button
            onClick={() => setFormState("idle")}
            className="mt-6 inline-flex items-center px-[18px] py-[10px] bg-white text-[#0f172a] text-sm font-bold rounded-[10px] border-[1.5px] border-[#e5e7eb] hover:border-[#6367ff] hover:text-[#6367ff] transition-all duration-200"
          >
            Send another message
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          {/* Error banner */}
          {formState === "error" && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-[10px] px-4 py-3 mb-6 text-sm text-red-700">
              <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Something went wrong. Please try again or email us directly at{" "}
              <a href="mailto:hello@codecraft.dev" className="font-semibold underline ml-1">hello@codecraft.dev</a>.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-[#0f172a] mb-1.5">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors((prev) => ({ ...prev, name: undefined })); }}
                placeholder="Your name"
                className={`w-full px-4 py-2.5 rounded-[10px] border-[1.5px] text-sm text-[#0f172a] placeholder-[#94a3b8] bg-[#f8fafc] outline-none transition-colors focus:bg-white focus:border-[#6367ff] focus:shadow-[0_0_0_3px_rgba(99,103,255,0.1)] ${
                  errors.name ? "border-red-400" : "border-[#e5e7eb]"
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-500 font-semibold">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-[#0f172a] mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((prev) => ({ ...prev, email: undefined })); }}
                placeholder="you@example.com"
                className={`w-full px-4 py-2.5 rounded-[10px] border-[1.5px] text-sm text-[#0f172a] placeholder-[#94a3b8] bg-[#f8fafc] outline-none transition-colors focus:bg-white focus:border-[#6367ff] focus:shadow-[0_0_0_3px_rgba(99,103,255,0.1)] ${
                  errors.email ? "border-red-400" : "border-[#e5e7eb]"
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500 font-semibold">{errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-[#0f172a] mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => { setMessage(e.target.value); setErrors((prev) => ({ ...prev, message: undefined })); }}
                placeholder="What's on your mind?"
                className={`w-full px-4 py-2.5 rounded-[10px] border-[1.5px] text-sm text-[#0f172a] placeholder-[#94a3b8] bg-[#f8fafc] outline-none transition-colors focus:bg-white focus:border-[#6367ff] focus:shadow-[0_0_0_3px_rgba(99,103,255,0.1)] resize-none ${
                  errors.message ? "border-red-400" : "border-[#e5e7eb]"
                }`}
              />
              {errors.message && (
                <p className="mt-1.5 text-xs text-red-500 font-semibold">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={formState === "submitting"}
                className="inline-flex items-center gap-2 px-[18px] py-[10px] bg-[#6367ff] text-white text-sm font-bold rounded-[10px] hover:bg-[#5254e8] hover:shadow-[0_4px_16px_rgba(99,103,255,0.4)] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {formState === "submitting" ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

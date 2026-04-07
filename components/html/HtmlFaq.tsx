"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Will I actually learn HTML or just follow along?",
    a: "You will genuinely learn it. This is a structured course, which means every concept builds on the one before it, and every lesson has a challenge at the end where you apply what you learned with no help at all. If you can complete the challenge, you understood the concept. By the time you finish all eight lessons, HTML will actually be in your head because you used it, not just read about it.",
  },
  {
    q: "I have never written a line of code. Is this really for me?",
    a: "Yes, genuinely. This course was built for complete beginners who have never touched code before. We do not assume you know anything. Lesson one starts from what HTML actually is and builds up from there, one small step at a time. If you have never written a single tag in your life, you are exactly who this is for.",
  },
  {
    q: "Do I need to install anything?",
    a: "Nothing at all. The code editor is built right into each lesson. You open the page in your browser and you are ready to go. That is it.",
  },
  {
    q: "Does the course cover HTML forms, tables, links and images?",
    a: "Yes. The course covers all the core HTML concepts including headings, paragraphs, images, lists, tables, links, forms, and semantic structure. Every single one is used on a real project, not just shown in an isolated example.",
  },
  {
    q: "Is this free?",
    a: "Completely free. No account needed, no credit card, nothing. Open the first lesson and start building.",
  },
];

export default function HtmlFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((item, i) => (
        <div
          key={i}
          className="bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] shadow-[0_4px_12px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
          >
            <span className="font-bold text-[#0f172a] text-[0.95rem] leading-snug">
              {item.q}
            </span>
            <span
              className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-[#6367ff]/10 text-[#6367ff] font-black text-lg leading-none transition-transform duration-200"
              style={{ transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}
            >
              +
            </span>
          </button>
          {open === i && (
            <div className="px-6 pb-5 text-[0.93rem] text-[#374151] leading-[1.8]">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

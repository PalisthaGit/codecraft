"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do I need any experience to start this course?",
    a: "No. This course is built for absolute beginners. If you have never written a single line of code in your life, this is exactly the right place to start. We begin from zero and build up slowly, one concept at a time.",
  },
  {
    q: "How long does it take to learn HTML?",
    a: "With this course you can get through the basics in a weekend. Each lesson is short and focused. Most people complete the full course in a few days to a week depending on how much time they spend practicing.",
  },
  {
    q: "What will I have at the end?",
    a: "A real working Wikipedia-style portfolio page built entirely in HTML. Not a toy project. A real page with your name, your story, and your work on it. Something you can actually show people.",
  },
  {
    q: "Do I need to install anything?",
    a: "No. Everything runs in your browser. Open the site, start the lesson, write code, see the result. That is it.",
  },
  {
    q: "Is this course free?",
    a: "Yes. Every lesson, every exercise, every challenge. Free. Always.",
  },
  {
    q: "What can I build with just HTML?",
    a: "More than you think. HTML is the foundation of every single webpage on the internet. With just HTML you can build portfolio pages, personal websites, simple blog pages, and project showcases. Once you have HTML down, adding CSS and JavaScript on top becomes so much easier.",
  },
  {
    q: "I have tried learning HTML before and always gave up halfway. Will this be different?",
    a: "Yes. Because here you are not learning in isolation. Every concept connects to the real page you are building. You always know why you are learning something. You always see it working in front of you. That is what makes it stick.",
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

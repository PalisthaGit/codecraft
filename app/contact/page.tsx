import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Codecraft",
  description:
    "Get in touch with the Codecraft team. We'd love to hear your feedback, questions, or suggestions.",
};

const reasons = [
  {
    title: "Lesson Feedback",
    description:
      "Spotted an error, unclear explanation, or outdated code example? Let us know — accurate content is our top priority.",
  },
  {
    title: "Content Suggestions",
    description:
      "Is there a topic you'd like us to cover that we haven't yet? We're always looking for ideas to make Codecraft more useful.",
  },
  {
    title: "Advertising Enquiries",
    description:
      "For questions related to advertising on Codecraft, reach out via email and we'll respond as soon as possible.",
  },
];

export default function ContactPage() {
  return (
    <div className="max-w-2xl">
      {/* Header */}
      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        Contact
      </span>
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-3">
        Get in Touch
      </h1>
      <p className="text-[0.95rem] leading-[1.8] text-[#64748b] mb-10 max-w-md">
        Found a mistake? Have a suggestion? Just want to say hello? We'd love to
        hear from you.
      </p>

      {/* Reason cards */}
      <div className="space-y-3 mb-8">
        {reasons.map((r) => (
          <div
            key={r.title}
            className="bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] border-l-4 border-l-[#6367ff] px-6 py-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
          >
            <h2 className="font-extrabold text-[#0f172a] mb-1">{r.title}</h2>
            <p className="text-sm leading-[1.8] text-[#374151]">{r.description}</p>
          </div>
        ))}
      </div>

      {/* Email CTA */}
      <div className="bg-gradient-to-br from-[#6367ff]/5 to-[#c9beff]/20 border-[1.5px] border-[#6367ff]/20 rounded-[14px] px-6 py-8 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#64748b] mb-3">
          Send us an email
        </p>
        <a
          href="mailto:hello@codecraft.dev"
          className="text-xl font-extrabold text-[#6367ff] hover:text-[#5254e8] transition-colors"
        >
          hello@codecraft.dev
        </a>
        <p className="text-xs text-[#64748b] mt-3 leading-relaxed">
          We try to respond to all messages within 2–3 business days.
        </p>
      </div>
    </div>
  );
}

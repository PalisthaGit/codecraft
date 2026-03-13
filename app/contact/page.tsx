import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Codecraft",
  description:
    "Get in touch with the Codecraft team. We'd love to hear your feedback, questions, or suggestions.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        Contact
      </span>
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-4">
        Get in Touch
      </h1>
      <p className="text-[0.95rem] leading-[1.8] text-[#374151] mb-10">
        Found a mistake in a lesson? Have a suggestion for new content? Just
        want to say hello? We'd love to hear from you.
      </p>

      <div className="space-y-6 mb-10">
        <div className="bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <h2 className="font-extrabold text-[#0f172a] mb-1">
            Lesson Feedback
          </h2>
          <p className="text-sm text-[#64748b] leading-relaxed">
            If you spot an error, unclear explanation, or outdated code example
            in any lesson, please let us know. Accurate, high-quality content
            is our top priority.
          </p>
        </div>
        <div className="bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <h2 className="font-extrabold text-[#0f172a] mb-1">
            Content Suggestions
          </h2>
          <p className="text-sm text-[#64748b] leading-relaxed">
            Is there a topic you'd like us to cover that we haven't yet? We're
            always looking for ideas on how to make Codecraft more useful for
            beginners.
          </p>
        </div>
        <div className="bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] p-6 shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
          <h2 className="font-extrabold text-[#0f172a] mb-1">
            Advertising Enquiries
          </h2>
          <p className="text-sm text-[#64748b] leading-relaxed">
            For questions related to advertising on Codecraft, reach out via
            email and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#6367ff]/5 to-[#c9beff]/20 border-[1.5px] border-[#6367ff]/20 rounded-[14px] p-8 text-center">
        <p className="text-sm font-semibold text-[#64748b] mb-2">
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

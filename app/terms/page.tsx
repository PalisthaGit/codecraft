import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Codecraft",
  description:
    "Read Codecraft's terms of use to understand how you may use the content and services on our website.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    body: "By accessing or using Codecraft, you agree to be bound by these Terms of Use. If you do not agree, please do not use this website. We reserve the right to update these terms at any time — continued use of the site constitutes acceptance of any changes.",
  },
  {
    title: "Use of Content",
    body: "All content on Codecraft — text, code examples, and lesson materials — is provided for personal, educational, and non-commercial use. You are welcome to read, reference, and learn from our content freely. Code examples in lessons may be used in your own personal or commercial projects. You may not reproduce or republish our written content in bulk for commercial purposes without written permission.",
  },
  {
    title: "Intellectual Property",
    body: "The Codecraft name, logo, and all site content are the intellectual property of Codecraft and are protected by applicable copyright laws. Unauthorised use of any materials from this site may violate copyright, trademark, and other applicable laws.",
  },
  {
    title: "Disclaimer of Warranties",
    body: "Codecraft is provided 'as is' without any warranties, express or implied. Web technologies evolve quickly, and while we strive to keep our content current, some information may become outdated over time. We are not responsible for any errors or omissions, or for any outcomes resulting from the use of code examples on this site.",
  },
  {
    title: "Limitation of Liability",
    body: "To the fullest extent permitted by law, Codecraft and its contributors shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of or inability to use this website or its content.",
  },
  {
    title: "Advertising",
    body: "Codecraft displays advertisements through Google AdSense to help fund this free resource. Advertisements are clearly distinct from editorial content. We do not endorse any specific product or service advertised on this site.",
  },
  {
    title: "External Links",
    body: "This site may contain links to third-party websites for reference. Codecraft does not control or endorse the content of any external site and is not responsible for their availability or accuracy.",
  },
  {
    title: "Governing Law",
    body: "These Terms of Use shall be governed by and construed in accordance with applicable laws. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the relevant courts.",
  },
];

export default function TermsPage() {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        Legal
      </span>
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-3">
        Terms of Use
      </h1>
      <p className="text-sm text-[#64748b] mb-10">Last updated: March 2026</p>

      {/* Sections */}
      <div className="space-y-3">
        {sections.map((s, i) => (
          <div
            key={s.title}
            className="bg-white rounded-[14px] border-[1.5px] border-[#e5e7eb] px-6 py-5 shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-start gap-4">
              <span className="shrink-0 w-7 h-7 flex items-center justify-center rounded-full bg-[#6367ff]/10 text-[#6367ff] text-xs font-extrabold mt-0.5">
                {i + 1}
              </span>
              <div>
                <h2 className="font-extrabold text-[#0f172a] mb-1.5">{s.title}</h2>
                <p className="text-sm leading-[1.8] text-[#374151]">{s.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contact note */}
      <div className="mt-6 bg-[#f8fafc] border-[1.5px] border-[#e5e7eb] rounded-[14px] px-6 py-5">
        <p className="text-sm text-[#64748b] leading-relaxed">
          Questions about these terms?{" "}
          <a href="/contact" className="text-[#6367ff] font-semibold hover:underline">
            Contact us
          </a>{" "}
          and we'll get back to you.
        </p>
      </div>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — CodingBanana",
  description:
    "CodingBanana's privacy policy explains how we collect, use, and protect your data when you use our website.",
};

const sections = [
  {
    title: "Overview",
    body: "CodingBanana (\"we\", \"us\", or \"our\") is committed to protecting your privacy. This Privacy Policy explains what information we collect when you visit our website, how we use it, and what choices you have. By using this website, you agree to the practices described in this policy.",
  },
  {
    title: "Information We Collect",
    body: "CodingBanana does not require you to create an account or provide personal information to access our content. We may collect non-personally identifiable information automatically: pages viewed and time spent, browser type and operating system, referring website or search query, and general geographic region. This data is collected in aggregate and cannot be used to identify you personally.",
  },
  {
    title: "Cookies",
    body: "CodingBanana uses cookies — small text files stored on your device — to improve your experience and serve relevant advertisements. Cookies help us understand how visitors use our site so we can improve our content. You can control or disable cookies through your browser settings, though doing so may affect some site functionality.",
  },
  {
    title: "Google AdSense & Advertising",
    body: "CodingBanana uses Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to this and other websites. You may opt out of personalised advertising by visiting Google Ads Settings or aboutads.info. We do not control the content of advertisements shown on this site.",
  },
  {
    title: "Analytics",
    body: "We use analytics tools such as Google Analytics to understand how visitors interact with our content. This data is collected anonymously and used only to improve our website. We do not sell or share this data with third parties for marketing purposes.",
  },
  {
    title: "Third-Party Links",
    body: "Our website may contain links to external websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any external sites you visit.",
  },
  {
    title: "Children's Privacy",
    body: "CodingBanana is intended for general audiences and does not knowingly collect personal information from children under 13. If you believe we have inadvertently collected information from a child, please contact us so we can promptly delete it.",
  },
  {
    title: "Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date. Continued use of the website after changes are posted constitutes your acceptance of the updated policy.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        Legal
      </span>
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-3">
        Privacy Policy
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
          Questions about this Privacy Policy?{" "}
          <a href="/contact" className="text-[#6367ff] font-semibold hover:underline">
            Contact us
          </a>{" "}
          and we'll be happy to help.
        </p>
      </div>
    </div>
  );
}

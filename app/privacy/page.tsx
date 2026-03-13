import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Codecraft",
  description:
    "Codecraft's privacy policy explains how we collect, use, and protect your data when you use our website.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        Legal
      </span>
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-4">
        Privacy Policy
      </h1>
      <p className="text-[0.95rem] leading-[1.8] text-[#64748b] mb-10">
        Last updated: March 2026
      </p>

      <div className="space-y-8 text-[0.95rem] leading-[1.8] text-[#374151]">
        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Overview
          </h2>
          <p>
            Codecraft ("we", "us", or "our") is committed to protecting your
            privacy. This Privacy Policy explains what information we collect
            when you visit codecraft.dev, how we use it, and what choices you
            have. By using this website, you agree to the practices described
            in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Information We Collect
          </h2>
          <p>
            Codecraft does not require you to create an account or provide any
            personal information to access our content. However, we may
            collect certain non-personally identifiable information
            automatically when you visit our site:
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1">
            <li>Pages viewed and time spent on each page</li>
            <li>Browser type and operating system</li>
            <li>Referring website or search query</li>
            <li>General geographic location (country or region)</li>
          </ul>
          <p className="mt-3">
            This information is collected in aggregate and cannot be used to
            identify you personally.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Cookies
          </h2>
          <p>
            Codecraft uses cookies — small text files stored on your device —
            to improve your experience and to serve relevant advertisements.
            Cookies help us understand how visitors use our site so we can
            improve our content and structure.
          </p>
          <p className="mt-3">
            You can control or disable cookies through your browser settings.
            Note that disabling cookies may affect the functionality of some
            parts of this website.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Google AdSense and Advertising
          </h2>
          <p>
            Codecraft uses Google AdSense to display advertisements. Google
            AdSense uses cookies to serve ads based on your prior visits to
            this website and other sites. Google's use of advertising cookies
            enables it and its partners to serve ads based on your visit to
            our site and/or other sites on the Internet.
          </p>
          <p className="mt-3">
            You may opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6367ff] font-semibold hover:underline"
            >
              Google Ads Settings
            </a>
            . You can also opt out of third-party vendors' use of cookies by
            visiting{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6367ff] font-semibold hover:underline"
            >
              aboutads.info
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Analytics
          </h2>
          <p>
            We use analytics tools (such as Google Analytics) to understand
            how visitors interact with our content. This data is collected
            anonymously and used only to improve our website. We do not sell
            or share this data with third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Third-Party Links
          </h2>
          <p>
            Our website may contain links to external websites. We are not
            responsible for the privacy practices or content of those sites.
            We encourage you to review the privacy policies of any external
            sites you visit.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Children's Privacy
          </h2>
          <p>
            Codecraft is intended for general audiences and does not knowingly
            collect personal information from children under the age of 13. If
            you believe we have inadvertently collected information from a
            child, please contact us so we can promptly delete it.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated date. Continued use of
            the website after changes are posted constitutes your acceptance of
            the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Contact
          </h2>
          <p>
            If you have any questions about this Privacy Policy, please visit
            our{" "}
            <a
              href="/contact"
              className="text-[#6367ff] font-semibold hover:underline"
            >
              contact page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

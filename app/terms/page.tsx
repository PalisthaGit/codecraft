import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use — Codecraft",
  description:
    "Read Codecraft's terms of use to understand how you may use the content and services on our website.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        Legal
      </span>
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-4">
        Terms of Use
      </h1>
      <p className="text-[0.95rem] leading-[1.8] text-[#64748b] mb-10">
        Last updated: March 2026
      </p>

      <div className="space-y-8 text-[0.95rem] leading-[1.8] text-[#374151]">
        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Acceptance of Terms
          </h2>
          <p>
            By accessing or using Codecraft ("the Site"), you agree to be
            bound by these Terms of Use. If you do not agree to these terms,
            please do not use this website. We reserve the right to update
            these terms at any time, and your continued use of the Site
            constitutes acceptance of any changes.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Use of Content
          </h2>
          <p>
            All content on Codecraft — including text, code examples,
            illustrations, and lesson materials — is provided for personal,
            educational, and non-commercial use only. You are welcome to read,
            reference, and learn from our content freely.
          </p>
          <p className="mt-3">
            You may not reproduce, republish, sell, or redistribute our
            content in bulk or for commercial purposes without explicit written
            permission. Code examples in lessons are provided for learning
            purposes and may be used freely in your personal or commercial
            projects.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Intellectual Property
          </h2>
          <p>
            The Codecraft name, logo, and all site content are the intellectual
            property of Codecraft and are protected by applicable copyright
            laws. Unauthorized use of any materials from this site may violate
            copyright, trademark, and other applicable laws.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Disclaimer of Warranties
          </h2>
          <p>
            Codecraft is provided "as is" without any warranties, express or
            implied. We do not guarantee that the content is complete,
            accurate, or up to date. Web technologies evolve, and while we
            strive to keep our lessons current, some information may become
            outdated over time.
          </p>
          <p className="mt-3">
            We are not responsible for any errors or omissions in our content,
            or for any outcomes resulting from the use of code examples
            provided on this site.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Limitation of Liability
          </h2>
          <p>
            To the fullest extent permitted by law, Codecraft and its
            contributors shall not be liable for any direct, indirect,
            incidental, or consequential damages arising from your use of or
            inability to use this website or its content.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Advertising
          </h2>
          <p>
            Codecraft displays advertisements through Google AdSense to help
            fund the operation of this free resource. Advertisements are
            clearly distinct from editorial content. We do not endorse any
            specific product or service advertised on this site.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            External Links
          </h2>
          <p>
            This site may contain links to third-party websites. These links
            are provided for reference only. Codecraft does not control or
            endorse the content of any external site, and we are not
            responsible for their availability or accuracy.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Governing Law
          </h2>
          <p>
            These Terms of Use shall be governed by and construed in
            accordance with applicable laws. Any disputes arising from the use
            of this website shall be subject to the exclusive jurisdiction of
            the relevant courts.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Contact
          </h2>
          <p>
            If you have questions about these terms, please visit our{" "}
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

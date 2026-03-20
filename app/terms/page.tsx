import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use | CodingBanana',
  description: 'Terms of Use for CodingBanana — a free coding tutorial site teaching HTML, CSS, and JavaScript.',
}

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <span className="inline-flex items-center gap-2 bg-[#C9BEFF]/30 text-[#534AB7] text-xs font-semibold px-3 py-1 rounded-full mb-5 uppercase tracking-wide">
            Legal
          </span>
          <h1 className="text-4xl font-black text-[#0F172A] mb-3 leading-tight">
            Terms of Use
          </h1>
          <p className="text-[#64748B] text-base">
            Last updated: March 2026 &nbsp;·&nbsp; codingbanana.com
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-12 space-y-10">

        <div className="bg-[#C9BEFF]/20 border border-[#C9BEFF] rounded-2xl px-6 py-5">
          <p className="text-[#534AB7] font-semibold text-sm mb-1">The short version</p>
          <p className="text-[#0F172A] text-sm leading-relaxed">
            Use CodingBanana to learn freely. Don&apos;t copy and resell our content. Code examples are yours to use in your own projects. By using this site you also agree to our{' '}
            <a href="/privacy" className="text-[#6367FF] underline underline-offset-2">Privacy Policy</a>.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">1. Acceptance of Terms</h2>
          <p className="text-[#334155] leading-relaxed">
            By accessing or using CodingBanana (<span className="font-medium">codingbanana.com</span>), you agree to be bound by these Terms of Use. If you do not agree, please do not use this website. We reserve the right to update these terms at any time — continued use of the site constitutes acceptance of any changes.
          </p>
          <p className="text-[#334155] leading-relaxed mt-3">
            By using this site you also agree to our{' '}
            <a href="/privacy" className="text-[#6367FF] underline underline-offset-2">Privacy Policy</a>,
            which explains how we handle data collected via our newsletter and feedback forms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">2. Use of Content</h2>
          <p className="text-[#334155] leading-relaxed">
            All content on CodingBanana — text, code examples, and lesson materials — is provided for personal, educational, and non-commercial use. You are welcome to read, reference, and learn from our content freely.
          </p>
          <p className="text-[#334155] leading-relaxed mt-3">
            Code examples in lessons may be used in your own personal or commercial projects without attribution. You may not reproduce or republish our written lesson content in bulk for commercial purposes without written permission from CodingBanana.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">3. Intellectual Property</h2>
          <p className="text-[#334155] leading-relaxed">
            The CodingBanana name, logo, and all site content are the intellectual property of CodingBanana and are protected by applicable copyright laws. Unauthorised use of any materials from this site may violate copyright, trademark, and other applicable laws.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">4. Disclaimer of Warranties</h2>
          <p className="text-[#334155] leading-relaxed">
            CodingBanana is provided &apos;as is&apos; without any warranties, express or implied. Web technologies evolve quickly, and while we strive to keep our content current, some information may become outdated over time. We are not responsible for any errors or omissions, or for any outcomes resulting from the use of code examples on this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">5. Limitation of Liability</h2>
          <p className="text-[#334155] leading-relaxed">
            To the fullest extent permitted by law, CodingBanana and its contributors shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use of or inability to use this website or its content.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">6. Advertising</h2>
          <p className="text-[#334155] leading-relaxed">
            CodingBanana displays advertisements through Google AdSense to help fund this free resource. Advertisements are clearly distinct from editorial content. We do not endorse any specific product or service advertised on this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">7. External Links</h2>
          <p className="text-[#334155] leading-relaxed">
            This site may contain links to third-party websites for reference purposes. CodingBanana does not control or endorse the content of any external site and is not responsible for their availability or accuracy. We encourage you to review the terms and privacy policies of any external sites you visit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">8. Governing Law</h2>
          <p className="text-[#334155] leading-relaxed">
            These Terms of Use shall be governed by and construed in accordance with applicable laws. Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the relevant courts.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">9. Contact</h2>
          <p className="text-[#334155] leading-relaxed">
            Questions about these terms? Reach out and we will get back to you.
          </p>
          <div className="mt-4 bg-white border border-[#E2E8F0] rounded-xl px-5 py-4 inline-block">
            <p className="text-[#0F172A] font-medium">CodingBanana</p>
            <a href="mailto:codingbanana123@gmail.com" className="text-[#6367FF] underline underline-offset-2 text-sm">
              codingbanana123@gmail.com
            </a>
          </div>
          <p className="text-[#64748B] text-sm mt-3">
            We aim to respond within 5 business days.
          </p>
        </section>

        <div className="border-t border-[#E2E8F0] pt-8">
          <p className="text-[#94A3B8] text-sm text-center">
            CodingBanana · codingbanana.com · Terms of Use · Last updated March 2026
          </p>
        </div>

      </div>
    </div>
  )
}

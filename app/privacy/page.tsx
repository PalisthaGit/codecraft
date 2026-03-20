import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | CodingBanana',
  description: 'Privacy Policy for CodingBanana — a free coding tutorial site teaching HTML, CSS, and JavaScript.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">

      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <span className="inline-flex items-center gap-2 bg-[#C9BEFF]/30 text-[#534AB7] text-xs font-semibold px-3 py-1 rounded-full mb-5 uppercase tracking-wide">
            Legal
          </span>
          <h1 className="text-4xl font-black text-[#0F172A] mb-3 leading-tight">
            Privacy Policy
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
            CodingBanana does not require accounts to access content. We collect your email only if you choose to subscribe to our newsletter or submit feedback. We do not sell your data to anyone.
          </p>
        </div>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">1. Overview</h2>
          <p className="text-[#334155] leading-relaxed">
            CodingBanana (<span className="font-medium">codingbanana.com</span>) is a free coding tutorial platform that teaches HTML, CSS, and JavaScript to beginners. This Privacy Policy explains what information we collect, how we use it, and the choices you have.
          </p>
          <p className="text-[#334155] leading-relaxed mt-3">
            By using this website, you agree to the practices described in this policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">2. Information We Collect</h2>
          <p className="text-[#334155] leading-relaxed mb-3">
            We collect information in two ways — automatically when you browse, and directly when you choose to contact us or subscribe.
          </p>

          <p className="text-[#334155] font-semibold mb-2">Automatic (anonymous)</p>
          <ul className="space-y-1.5 text-[#334155] mb-5">
            {[
              'Pages viewed and time spent on each page',
              'Browser type and operating system',
              'Referring website or search query',
              'General geographic region (country or city level)',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6367FF] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-[#334155] font-semibold mb-2">Directly provided by you</p>
          <ul className="space-y-1.5 text-[#334155]">
            {[
              'Email address — if you subscribe to our newsletter',
              'Name, email address, and message — if you submit feedback',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#6367FF] shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-[#334155] leading-relaxed mt-3">
            All of the above is voluntary. You can use CodingBanana fully without providing any personal information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">3. Newsletter</h2>
          <p className="text-[#334155] leading-relaxed">
            If you choose to subscribe to our newsletter, we collect your email address to send you updates about new lessons and tutorials. We use Formspree to process newsletter sign-ups, which forwards submissions to our team email.
          </p>
          <p className="text-[#334155] leading-relaxed mt-3">
            We will never sell, rent, or share your email address with third parties. You can unsubscribe at any time by emailing us at{' '}
            <a href="mailto:codingbanana123@gmail.com" className="text-[#6367FF] underline underline-offset-2">
              codingbanana123@gmail.com
            </a>{' '}
            and we will remove you promptly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">4. Feedback</h2>
          <p className="text-[#334155] leading-relaxed">
            If you submit feedback through our feedback form, we collect your name, email address, and message. We use this information solely to read your feedback, improve our content, and reply to you if relevant.
          </p>
          <p className="text-[#334155] leading-relaxed mt-3">
            We may contact you using the email you provide if we make changes based on your feedback or need to follow up. We will not use your email for any other purpose and will not share it with third parties.
          </p>
          <p className="text-[#334155] leading-relaxed mt-3">
            Feedback forms are processed via Formspree and submitted directly to our team inbox. You can request deletion of your feedback at any time by emailing{' '}
            <a href="mailto:codingbanana123@gmail.com" className="text-[#6367FF] underline underline-offset-2">
              codingbanana123@gmail.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">5. Cookies</h2>
          <p className="text-[#334155] leading-relaxed">
            CodingBanana uses cookies — small text files stored on your device — to improve your experience and serve relevant advertisements. You can control or disable cookies through your browser settings at any time. Doing so may affect some site functionality, including the display of advertisements.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">6. Google AdSense &amp; Advertising</h2>
          <p className="text-[#334155] leading-relaxed">
            CodingBanana uses Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to this and other websites. This helps fund the free content we provide.
          </p>
          <p className="text-[#334155] leading-relaxed mt-3">
            You may opt out of personalised advertising by visiting{' '}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-[#6367FF] underline underline-offset-2">
              Google Ads Settings
            </a>{' '}
            or{' '}
            <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-[#6367FF] underline underline-offset-2">
              aboutads.info
            </a>.
            We do not control the content of advertisements shown on this site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">7. Analytics</h2>
          <p className="text-[#334155] leading-relaxed">
            We use Google Analytics to understand how visitors interact with our content. This data is collected anonymously and used only to improve our website and lessons. We do not sell or share this data with third parties for marketing purposes.
          </p>
          <p className="text-[#334155] leading-relaxed mt-3">
            Google Analytics is governed by{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#6367FF] underline underline-offset-2">
              Google&apos;s Privacy Policy
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">8. Third-Party Links</h2>
          <p className="text-[#334155] leading-relaxed">
            Our website may contain links to external websites such as documentation, tools, or resources. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any external sites you visit.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">9. Children&apos;s Privacy</h2>
          <p className="text-[#334155] leading-relaxed">
            CodingBanana is designed to be beginner-friendly for all ages. We do not knowingly collect personal information from children under 13. If a child submits their email via our newsletter or feedback forms, a parent or guardian may contact us to have it deleted immediately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">10. California Residents (CCPA)</h2>
          <p className="text-[#334155] leading-relaxed">
            If you are a California resident, you have the right to know what personal data we hold about you, request its deletion, and opt out of its sale. We do not sell personal information. If you subscribed to our newsletter or submitted feedback, you may request deletion of your data at any time by emailing{' '}
            <a href="mailto:codingbanana123@gmail.com" className="text-[#6367FF] underline underline-offset-2">
              codingbanana123@gmail.com
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">11. Do Not Track</h2>
          <p className="text-[#334155] leading-relaxed">
            CodingBanana honors Do Not Track signals. When a valid DNT signal is detected, we do not track, plant additional cookies, or use advertising tracking for that session.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">12. Changes to This Policy</h2>
          <p className="text-[#334155] leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated date at the top. If we make significant changes that affect how we use your personal data, we will notify newsletter subscribers by email. Continued use of CodingBanana after changes are posted constitutes your acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#0F172A] mb-3">13. Contact</h2>
          <p className="text-[#334155] leading-relaxed">
            If you have any questions about this Privacy Policy, want to unsubscribe, or want your data deleted, contact us at:
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
            CodingBanana · codingbanana.com · Privacy Policy · Last updated March 2026
          </p>
        </div>

      </div>
    </div>
  )
}

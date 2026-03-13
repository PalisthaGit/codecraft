import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Codecraft — Free Coding Tutorials for Beginners",
  description:
    "Codecraft is a free, beginner-friendly platform for learning HTML, CSS, and JavaScript. No experience needed — just clear lessons and real examples.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <span className="inline-block bg-[#6367ff]/10 text-[#6367ff] text-[0.72rem] font-bold tracking-[0.08em] uppercase px-3 py-1 rounded-full mb-4">
        About
      </span>
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight mb-4">
        About Codecraft
      </h1>
      <p className="text-[0.95rem] leading-[1.8] text-[#374151] mb-10">
        A free, beginner-friendly place to learn the fundamentals of web
        development.
      </p>

      <div className="space-y-8 text-[0.95rem] leading-[1.8] text-[#374151]">
        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            What is Codecraft?
          </h2>
          <p>
            Codecraft is a free learning platform designed for people who want
            to learn web development from scratch. We cover the three core
            technologies of the web — HTML, CSS, and JavaScript — with
            structured, easy-to-follow lessons that anyone can understand,
            regardless of prior experience.
          </p>
          <p className="mt-3">
            Every lesson is written in plain language. No jargon. No
            assumptions about what you already know. We start from the very
            beginning and build up your knowledge one concept at a time.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Who is it for?
          </h2>
          <p>
            Codecraft is built for absolute beginners — people who have never
            written a line of code and want to start building websites. It's
            also useful for people who learned a little coding in the past and
            want to go back and fill in the gaps.
          </p>
          <p className="mt-3">
            If you've ever looked at a web page and wondered how it was made,
            you're in the right place.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            How does it work?
          </h2>
          <p>
            Lessons are organized into tracks — HTML, CSS, and JavaScript.
            Each track takes you through the fundamentals of that language in a
            logical order. Start from lesson one and work your way through, or
            jump to any topic you need.
          </p>
          <p className="mt-3">
            Every lesson includes clear explanations, code examples you can
            study and copy, and tips that highlight the most important things
            to remember.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Is it really free?
          </h2>
          <p>
            Yes — completely free. No account required, no paywalls, no
            premium tiers. Codecraft is supported by ads that help keep the
            lights on. All content is freely available to everyone.
          </p>
        </section>

        <section>
          <h2 className="text-[1.2rem] font-extrabold text-[#0f172a] mb-3">
            Start learning
          </h2>
          <p>
            The best way to learn coding is to start. Pick a track below and
            dive in — you can always come back and review any lesson at any
            time.
          </p>
          <div className="flex flex-wrap gap-3 mt-5">
            <Link
              href="/html"
              className="inline-flex items-center gap-2 px-[18px] py-[10px] bg-[#6367ff] text-white text-sm font-bold rounded-[10px] hover:bg-[#5254e8] hover:shadow-[0_4px_16px_rgba(99,103,255,0.4)] transition-all duration-200"
            >
              Start with HTML
            </Link>
            <Link
              href="/"
              className="inline-flex items-center px-[18px] py-[10px] bg-white text-[#0f172a] text-sm font-bold rounded-[10px] border-[1.5px] border-[#e5e7eb] hover:border-[#6367ff] hover:text-[#6367ff] transition-all duration-200"
            >
              Browse All Lessons
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

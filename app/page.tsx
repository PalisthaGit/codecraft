import Link from "next/link";

const features = [
  {
    title: "Beginner Friendly",
    description:
      "Every concept is explained from scratch using plain language — no prior experience needed.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    title: "Structured Path",
    description:
      "Follow a clear, step-by-step curriculum from your first HTML tag all the way to JavaScript.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>
    ),
  },
  {
    title: "Learn by Doing",
    description:
      "Each lesson includes hands-on examples you can read, modify, and run yourself.",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
];

const tracks = [
  {
    title: "Getting Started",
    description:
      "Learn what coding is, why it matters, and set up everything you need to write your first line of code.",
    lessons: 2,
    href: "/tutorial/introduction",
    color: "bg-violet-50 border-violet-200",
    badge: "bg-violet-100 text-violet-700",
  },
  {
    title: "HTML Basics",
    description:
      "Understand how web pages are structured using HTML elements, documents, and forms.",
    lessons: 3,
    href: "/tutorial/html-structure",
    color: "bg-orange-50 border-orange-200",
    badge: "bg-orange-100 text-orange-700",
  },
  {
    title: "CSS Fundamentals",
    description:
      "Style your pages with CSS — control colors, spacing, layout, and more.",
    lessons: 3,
    href: "/tutorial/css-selectors",
    color: "bg-sky-50 border-sky-200",
    badge: "bg-sky-100 text-sky-700",
  },
  {
    title: "JavaScript",
    description:
      "Add interactivity to your pages by learning variables, functions, and DOM manipulation.",
    lessons: 3,
    href: "/tutorial/js-variables",
    color: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700",
  },
];

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-16">
      {/* Hero */}
      <section className="pt-6">
        <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-4">
          Free & beginner-friendly
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
          Learn to Code,
          <br />
          One Step at a Time
        </h1>
        <p className="mt-5 text-lg text-slate-600 max-w-xl">
          Codecraft breaks programming down into small, manageable lessons. No
          jargon. No overwhelm. Just clear explanations and real examples.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/tutorial/introduction"
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white text-sm font-semibold rounded-lg hover:bg-violet-700 transition-colors"
          >
            Start Learning
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
          <Link
            href="/tutorial/html-structure"
            className="inline-flex items-center px-6 py-3 bg-white text-slate-700 text-sm font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            Browse Lessons
          </Link>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 mb-6">
          Why Codecraft?
        </h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl border border-slate-200 p-5"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Learning Tracks */}
      <section>
        <h2 className="text-xl font-semibold text-slate-900 mb-6">
          Learning Tracks
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {tracks.map((track) => (
            <Link
              key={track.title}
              href={track.href}
              className={`group rounded-xl border p-5 transition-shadow hover:shadow-md ${track.color}`}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-semibold text-slate-900">{track.title}</h3>
                <span
                  className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-full ${track.badge}`}
                >
                  {track.lessons} lessons
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                {track.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-700 group-hover:gap-2 transition-all">
                Begin
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

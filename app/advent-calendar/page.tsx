import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advent Calendar | CodingBanana",
  description: "Advent Calendar on CodingBanana.",
};

export default function AdventCalendarPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <h1 className="text-[clamp(1.6rem,4vw,2.2rem)] font-black text-[#0f172a] leading-tight tracking-tight text-center">
        Advent Calendar
      </h1>
    </div>
  );
}

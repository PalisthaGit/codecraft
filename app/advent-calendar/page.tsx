import type { Metadata } from "next";
import AdventCalendarClient from "./AdventCalendarClient";

export const metadata: Metadata = {
  title: "Advent Calendar | CodingBanana",
  description: "Advent Calendar on CodingBanana.",
};

export default function AdventCalendarPage() {
  return <AdventCalendarClient />;
}

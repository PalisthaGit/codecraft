import { Metadata } from "next";

export const metadata: Metadata = {
  title: "HTML Compiler | CodingBanana",
  description: "Write and preview HTML code directly in your browser with the CodingBanana HTML compiler.",
};

export default function CompilerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

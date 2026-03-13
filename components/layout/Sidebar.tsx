import NavLinks from "@/components/navigation/NavLinks";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r border-[#e5e7eb]">
      <div className="flex items-center h-16 px-6 border-b border-[#e5e7eb] shrink-0">
        <span className="text-lg font-bold text-[#0f172a]">Codecraft</span>
      </div>
      <NavLinks />
    </aside>
  );
}

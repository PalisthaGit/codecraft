interface OutputBlockProps {
  content: string;
  label?: string;
}

export default function OutputBlock({
  content,
  label = "Output",
}: OutputBlockProps) {
  return (
    <div className="my-5 rounded-[10px] overflow-hidden border border-[#e5e7eb]">
      {/* Label bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-[#f8fafc] border-b border-[#e5e7eb]">
        <svg
          className="w-3.5 h-3.5 text-[#6367ff]"
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
        <span className="text-xs font-medium text-[#64748b] uppercase tracking-wider">
          {label}
        </span>
      </div>

      {/* Output content */}
      <pre className="bg-white text-[#0f172a] font-mono text-sm leading-relaxed px-5 py-4 overflow-x-auto whitespace-pre-wrap">
        {content}
      </pre>
    </div>
  );
}

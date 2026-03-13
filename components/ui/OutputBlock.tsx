interface OutputBlockProps {
  content: string;
  label?: string;
}

export default function OutputBlock({
  content,
  label = "Output",
}: OutputBlockProps) {
  return (
    <div className="-mt-4 mb-7 rounded-[10px] border border-[#6367ff]/20 bg-[#0a0f1e] px-5 py-4">
      {/* Label */}
      <div className="flex items-center gap-2 mb-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] shadow-[0_0_6px_#4ade80] shrink-0" />
        <span className="text-[0.7rem] font-bold tracking-[0.1em] uppercase text-[#4ade80]">
          {label}
        </span>
      </div>

      {/* Output */}
      <pre className="font-mono text-sm leading-relaxed text-[#a5f3c0] overflow-x-auto whitespace-pre-wrap">
        {content}
      </pre>
    </div>
  );
}

interface Props {
  src: string;
  title?: string;
  height?: number;
}

export default function CodePenEmbed({ src, title = "Try it yourself", height = 380 }: Props) {
  return (
    <div className="mt-8 mb-6">
      <h3 className="text-sm font-extrabold text-[#0f172a] uppercase tracking-wider mb-3">
        {title}
      </h3>
      <div className="rounded-[14px] border-[1.5px] border-[#e5e7eb] overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
        <iframe
          src={src}
          height={height}
          style={{ width: "100%" }}
          scrolling="no"
          frameBorder="no"
          loading="lazy"
          allowTransparency={true}
          allowFullScreen={true}
          title={title}
        />
      </div>
    </div>
  );
}

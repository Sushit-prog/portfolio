function SectionKicker({ command, index }: { command: string; index: string }) {
  return (
    <div className="mb-5 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-[#8AFF57]/55">
      <span className="text-[#CAFF3C]">{index}</span>
      <span className="h-px w-8 bg-[#8AFF57]/30" />
      <span>{command}</span>
    </div>
  );
}

export default SectionKicker;

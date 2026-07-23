type AccordionSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export function AccordionSection({
  title,
  children,
  defaultOpen = false,
}: AccordionSectionProps) {
  return (
    <details
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300"
      open={defaultOpen}
    >
      <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 text-sm font-semibold text-slate-900 outline-none transition group-open:bg-slate-50 focus:ring-4 focus:ring-inset focus:ring-slate-100">
        {title}
        <span
          aria-hidden="true"
          className="text-lg leading-none text-slate-400 transition group-open:rotate-45 group-open:text-slate-900"
        >
          +
        </span>
      </summary>
      <div className="border-t border-slate-100 p-4">{children}</div>
    </details>
  );
}

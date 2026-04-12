import { Construction } from "lucide-react";

export default function Placeholder({ title, description }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/40 p-12 text-center">
      <Construction className="h-10 w-10 text-[var(--color-muted-text)]" strokeWidth={1.5} />
      <h2 className="mt-4 font-serif text-xl font-semibold text-slate-100">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm text-[var(--color-muted-text)]">
        {description}
      </p>
      <p className="mt-4 text-xs uppercase tracking-wide text-blue-300">
        Coming next session
      </p>
    </div>
  );
}

import type { ReactNode } from "react";

interface KpiCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export function KpiCard({ title, subtitle, children, className = "" }: KpiCardProps) {
  return (
    <div
      className={`rounded-xl border border-surface-border bg-surface-raised p-5 shadow-sm ${className}`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
        {title}
      </p>
      {subtitle ? (
        <p className="text-sm text-zinc-400 mt-1 mb-3">{subtitle}</p>
      ) : (
        <div className="mb-3" />
      )}
      {children}
    </div>
  );
}

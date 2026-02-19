import { ReactNode } from "react";

export const SummaryCardicon = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900/5 text-slate-700 ring-1 ring-slate-200">
      {children}
    </div>
  );
};

export const SummaryCardTitle = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </p>
  );
};

export const SummaryCardValue = ({ children }: { children: ReactNode }) => {
  return <p className="text-2xl font-semibold text-slate-900">{children}</p>;
};

const SummaryCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="gap-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {children}
    </div>
  );
};

export default SummaryCard;

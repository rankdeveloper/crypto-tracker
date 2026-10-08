export default function Card_Shimmer() {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/65 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.5)] backdrop-blur-xl">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.8s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 animate-pulse rounded-full bg-slate-700/80" />
          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-slate-700/80 animate-pulse" />
            <div className="h-3 w-14 rounded bg-slate-700/70 animate-pulse" />
          </div>
        </div>
        <div className="h-6 w-12 rounded-full bg-slate-700/80 animate-pulse" />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-3 w-16 rounded bg-slate-700/70 animate-pulse" />
          <div className="h-8 w-28 rounded bg-slate-700/80 animate-pulse" />
        </div>

        <div className="flex items-center gap-2">
          <div className="h-7 w-20 rounded-full bg-slate-700/80 animate-pulse" />
          <div className="h-3 w-8 rounded bg-slate-700/70 animate-pulse" />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3">
          <div className="mb-2 h-3 w-20 rounded bg-slate-700/70 animate-pulse" />
          <div className="h-5 w-24 rounded bg-slate-700/80 animate-pulse" />
        </div>

        <div className="flex items-center justify-between border-t border-slate-800 pt-3">
          <div className="h-3 w-12 rounded bg-slate-700/70 animate-pulse" />
          <div className="h-3 w-20 rounded bg-slate-700/70 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

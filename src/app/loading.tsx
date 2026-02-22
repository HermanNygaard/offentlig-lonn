export default function Loading() {
  return (
    <div className="container">
      <div className="h-10 w-52 rounded bg-slate-200 dark:bg-slate-800 animate-pulse mt-1" />
      <div className="h-6 w-full max-w-lg rounded bg-slate-200 dark:bg-slate-800 animate-pulse mt-3" />
      <div className="h-10 w-full rounded bg-slate-200 dark:bg-slate-800 animate-pulse mt-6" />
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-5">
        <div className="h-48 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="h-48 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
        <div className="h-48 rounded bg-slate-200 dark:bg-slate-800 animate-pulse" />
      </div>
    </div>
  );
}

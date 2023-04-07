interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, children, ...props }: CardProps) {
  return (
    <div
      className={
        "relative h-72 rounded-lg border border-slate-200 bg-transparent p-4  shadow-md transition-shadow hover:shadow-lg dark:border-slate-700 dark:text-slate-50"
      }
      {...props}
    >
      <div className="flex flex-col justify-between space-y-4">
        <div className="space-y-2 ">{children}</div>
      </div>
    </div>
  );
}

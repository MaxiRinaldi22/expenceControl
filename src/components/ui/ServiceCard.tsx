export function ServiceCard({
    children,
    id,
    color,
  }: {
    children: React.ReactNode;
    id: number;
    color?: string;
  }) {
    return (
      <div
        key={id}
        style={{ borderColor: color }}
        className="flex h-12 w-full items-center justify-between rounded-xl border-l-2 bg-component-color px-5 py-3 text-sm font-semibold text-white"
      >
        {children}
      </div>
    );
  }
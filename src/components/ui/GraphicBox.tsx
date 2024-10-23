export function GraphicBox({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-96 w-full flex-col justify-between rounded-xl bg-component-color px-3 py-3 md:h-[41.75%] ">
        {children}
      </div>
    );
  }
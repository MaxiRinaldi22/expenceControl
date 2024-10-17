export function List({ children }: { children: React.ReactNode }) {
    return (
      <div
        className="flex h-[450px] w-full flex-col gap-1 overflow-y-auto md:h-full rounded-md" 
        style={{ scrollbarWidth: "thin", scrollbarColor: "#1F2D3D #243B55" }}
      >
        {children}
      </div>
    );
  }
  
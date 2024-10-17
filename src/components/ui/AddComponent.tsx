export function AddComponent({ children }: { children: React.ReactNode }) {
    return (
      <section className="absolute flex h-[92vh] w-full items-center justify-center bg-back-main-color p-6 md:w-[50%] md:px-44">
        <div className="flex h-[510px] w-full flex-col items-center justify-between gap-5 rounded-xl bg-component-color px-2 pt-2">
          {children}
        </div>
      </section>
    );
  }
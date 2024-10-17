import { Plus } from "../icons";

export function OpenButton({
  setOpen,
  text,
}: {
  text: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    setOpen(true);
  };

  return (
    <div className="flex h-full w-full items-center justify-center md:h-fit md:justify-end">
      <button
        onClick={handleClick}
        className="flex w-fit items-center justify-center rounded-md bg-[#FFC300] px-3 py-1 text-base font-semibold"
      >
        <Plus />
        <p className="text-sm">ADD A {text}</p>
      </button>
    </div>
  );
}

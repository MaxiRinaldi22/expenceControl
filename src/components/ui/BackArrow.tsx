import { BackArrowIcon } from "../icons";

export function BackArrow({
    setOpen,
  }: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    return (
      <div className="h-4 w-full">
        <button onClick={() => setOpen(false)}>
          <BackArrowIcon />
        </button>
      </div>
    );
  }
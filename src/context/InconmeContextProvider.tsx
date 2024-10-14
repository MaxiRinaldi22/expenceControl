import { createContext, useState } from "react";
import { InconmeContextType, StructureType } from "../services/types";

const InconmeContext = createContext<InconmeContextType | null>(null);

function InconmeContextProvider({ children }: { children: React.ReactNode }) {
  const [inconmes, setInconmes] = useState<StructureType[]>(
    localStorage.getItem("inconmes")
      ? JSON.parse(localStorage.getItem("inconmes") as string)
      : [],
  );

  localStorage.setItem("inconmes", JSON.stringify(inconmes));

  return (
    <InconmeContext.Provider value={{ inconmes, setInconmes }}>
      {children}
    </InconmeContext.Provider>
  );
}

export { InconmeContext, InconmeContextProvider };
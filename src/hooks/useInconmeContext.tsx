import { useContext } from "react";
import { InconmeContext } from "../context/InconmeContextProvider";

export default function useInconmeContext() {
    const context = useContext(InconmeContext);
    if (!context) {
        throw new Error(
            "useBalanceContext must be used within an BalanceContextProvider",
        );
    }
    return context;
}
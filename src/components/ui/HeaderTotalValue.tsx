import useBalanceContext from "../../hooks/useBalanceContext";
import { Coin } from "../icons";

export function HeaderTotalValue() {
    const { totalValue } = useBalanceContext();
  
    let showResult;
    if (totalValue >= 1000000) {
      showResult = (totalValue / 1000000).toFixed(1) + "M";
    } else if (totalValue >= 100000) {
      showResult = (totalValue / 1000).toFixed(1) + "K";
    } else {
      showResult = totalValue.toString();
    }
  
    return (
      <section className="flex h-[8vh] flex-col items-center justify-center rounded-bl-full rounded-br-full bg-[#3C5A73] px-20 md:px-44">
        <div className="flex items-center gap-2">
          <Coin />
          <p className="text-sm font-semibold text-white md:text-lg">Total:</p>
        </div>
        <h1 className="text-[20px] font-bold text-white md:text-2xl">
          ${showResult}
        </h1>
      </section>
    );
  }
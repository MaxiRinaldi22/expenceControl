import { GraphicBox, HeaderTotalValue, ServiceCard, TimeNavbar } from "../Components";
import BalanceGraphic from "./BalanceGraphic";
import {
  Bank,
  Bonus,
  Cafe,
  Education,
  Gift,
  Groceries,
  HandCoin,
  Helath,
  Home,
  Investemnt,
  Leisure,
  Question,
} from "../icons";
import { StructureType } from "../../services/types";
import useBalanceContext from "../../hooks/useBalanceContext";
import { useState } from "react";
import { useDateFilter } from "../../hooks/useDateFilter";

function Balance() {
  const { balance } = useBalanceContext();
  const [dateNav, setDateNav] = useState<"day" | "week" | "month" | "year">(
    "week",
  )

  const filteredBalance: StructureType[] = useDateFilter({ items: balance, dateNav })

  return (
    <section className="relative flex h-[92vh] flex-col items-center gap-3 bg-[#001D3D] p-3 pt-0 text-3xl">
      <HeaderTotalValue />
      <GraphicBox>
        <TimeNavbar dateNav={dateNav} setDateNav={setDateNav}/>
        <div className="flex h-full">
          <div className="h-full w-16">{/* EMPTY */}</div>
          <div className="flex h-full w-56 items-center justify-center text-white">
            <BalanceGraphic filteredBalance={filteredBalance}/>
          </div>
          <div className="h-full w-16">{/* EMPTY */}</div>
        </div>
      </GraphicBox>
      <div className="flex h-[420px] w-full flex-col gap-1 overflow-y-auto">
        {filteredBalance.map((inconm: StructureType, id: number) => (
          <ServiceCard
            key={id}
            id={id}
            color={inconm.type === "inconme" ? "green" : "red"}
          >
            <div className="flex items-center justify-center gap-2">
              <div
                style={{
                  background: inconm.type === "inconme" ? "green" : "red",
                }}
                className="rounded-full p-1"
              >
                {/* INCONM */}
                {inconm.category === "Paycheck" && <HandCoin width={22} />}
                {inconm.category === "Gift" && <Gift width={22} />}
                {inconm.category === "Interest" && <Bank width={22} />}
                {inconm.category === "Other" && <Question width={22} />}
                {inconm.category === 'Investment' && <Investemnt width={22} />}
                {inconm.category === 'Bonus' && <Bonus width={22} />}
                {/* EXPRESES */}
                {inconm.category === "Health" && <Helath width={22} />}
                {inconm.category === "Leisure" && <Leisure width={22} />}
                {inconm.category === "Home" && <Home width={22} />}
                {inconm.category === "Cafe" && <Cafe width={22} />}
                {inconm.category === "Education" && <Education width={22} />}
                {inconm.category === "Gifts" && <Gift width={22} />}
                {inconm.category === "Groceries" && <Groceries width={22} />}
              </div>
              <p className="text-base font-[400]">{inconm.category}</p>
            </div>
            <p className="text-base font-[500]">${inconm.amount}</p>
          </ServiceCard>
        ))}
      </div>
    </section>
  );
}

export default Balance;

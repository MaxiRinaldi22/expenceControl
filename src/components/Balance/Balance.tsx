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
import { GraphicBox } from "../ui/GraphicBox";
import { ServiceCard } from "../ui/ServiceCard";
import { TimeNavbar } from "../ui/TimeNavBar";
import { List } from "../ui/List";
import { HeaderTotalsValues } from "../ui/HeaderTotalsValues";
import { TimeGraphic } from "../ui/TimeGraphic";

function Balance() {
  const { balance } = useBalanceContext();
  const [dateNav, setDateNav] = useState<"day" | "week" | "month" | "year">(
    "week",
  );

  const filteredBalance: StructureType[] = useDateFilter({
    items: balance,
    dateNav,
  });

  return (
    <section className="relative flex flex-col items-center gap-3 bg-back-main-color p-3 pt-0 text-3xl md:max-h-screen md:w-[calc(100%-144px)] md:flex-row">
      <div className="flex h-full w-full flex-col gap-5 p-4 md:w-[50%] md:p-10 md:pr-5">
        <HeaderTotalsValues />

        <GraphicBox>
          <div className="block md:hidden">
            <TimeNavbar setDateNav={setDateNav} dateNav={dateNav} />
          </div>
          <div className="flex h-full w-full items-center justify-center text-white">
            <BalanceGraphic filteredBalance={filteredBalance} />
          </div>
        </GraphicBox>

        <section className="flex h-80 rounded-xl bg-component-color md:h-[41.75%] md:min-h-[41.75%]">
          <TimeGraphic filteredItems={filteredBalance} />
        </section>
      </div>

      <div className="flex w-full flex-col gap-5 px-4 md:h-full md:w-[50%] md:justify-start md:p-10 md:pl-5">
        <div className="hidden md:block">
          <TimeNavbar setDateNav={setDateNav} dateNav={dateNav} />
        </div>
        <List>
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
                  {inconm.category === "Investment" && (
                    <Investemnt width={22} />
                  )}
                  {inconm.category === "Bonus" && <Bonus width={22} />}
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
        </List>
      </div>
    </section>
  );
}

export default Balance;

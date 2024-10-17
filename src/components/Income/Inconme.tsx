import { useState } from "react";
import { Bank, Bonus, Gift, HandCoin, Investemnt, Question } from "../icons";
import IncomeGraphic from "./InconmeGraphic";
import AddIncome from "./AddInconme";
import useInconmeContext from "../../hooks/useInconmeContext";
import { StructureType } from "../../services/types";
import { useDateFilter } from "../../hooks/useDateFilter";
import { GraphicBox } from "../ui/GraphicBox";
import { ServiceCard } from "../ui/ServiceCard";
import { HeaderTotalValue } from "../ui/HeaderTotalValue";
import { TimeNavbar } from "../ui/TimeNavBar";
import { OpenButton } from "../ui/OpenButton";
import { HeaderTotalsValues } from "../ui/HeaderTotalsValues";
import { TimeGraphic } from "../ui/TimeGraphic";
import { List } from "../ui/List";

function Income() {
  const { inconmes } = useInconmeContext();
  const [open, setOpen] = useState(false);
  const [dateNav, setDateNav] = useState<"day" | "week" | "month" | "year">(
    "week",
  );

  const filteredInconmes: StructureType[] = useDateFilter({
    items: inconmes,
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
            <IncomeGraphic filteredInconmes={filteredInconmes} />
          </div>
        </GraphicBox>

        <section className="flex h-80 rounded-xl bg-component-color md:h-[41.75%]">
          <TimeGraphic filteredItems={filteredInconmes} />
        </section>
      </div>

      <div className="flex w-full flex-col gap-5 px-4 md:h-full md:w-[50%] md:justify-start md:p-10 md:pl-5">
        <div className="hidden md:block">
          <TimeNavbar setDateNav={setDateNav} dateNav={dateNav} />
        </div>

        <List>
          {filteredInconmes.map((incon: StructureType, id: number) => (
            // -> Camiar el ID por otra cosa
            <ServiceCard key={id} id={id} color={incon.backgroundColor}>
              <div className="flex items-center justify-center gap-2">
                <div
                  style={{ background: incon.backgroundColor }}
                  className="rounded-full p-1"
                >
                  {incon.category === "Paycheck" && <HandCoin width={22} />}
                  {incon.category === "Gift" && <Gift width={22} />}
                  {incon.category === "Interest" && <Bank width={22} />}
                  {incon.category === "Other" && <Question width={22} />}
                  {incon.category === "Investment" && <Investemnt width={22} />}
                  {incon.category === "Bonus" && <Bonus width={22} />}
                </div>
                <p className="text-base font-[400]">{incon.category}</p>
              </div>
              <p className="text-base font-[500]">${incon.amount}</p>
            </ServiceCard>
          ))}
        </List>
        <OpenButton setOpen={setOpen} text="INCOME" />
      </div>
      {open && <AddIncome setOpen={setOpen} />}
    </section>
  );
}

export default Income;

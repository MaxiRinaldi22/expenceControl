import { useState } from "react";
import { Bank, Bonus, Gift, HandCoin, Investemnt, Question } from "../icons";
import IncomeGraphic from "./InconmeGraphic";
import AddIncome from "./AddInconme";
import { GraphicBox, HeaderTotalValue, OpenButton, ServiceCard, TimeNavbar } from "../Components";
import useInconmeContext from "../../hooks/useInconmeContext";
import { StructureType } from "../../services/types";
import { useDateFilter } from "../../hooks/useDateFilter";

function Income() {
  const { inconmes } = useInconmeContext();
  const [open, setOpen] = useState(false);
  const [dateNav, setDateNav] = useState<"day" | "week" | "month" | "year">(
    "week",
  );

  const filteredInconmes: StructureType[] = useDateFilter({ items: inconmes, dateNav });

  return (
    <section className="relative flex h-[92vh] flex-col items-center gap-3 bg-[#001D3D] p-3 pt-0 text-3xl">
        <HeaderTotalValue />
          <GraphicBox>
            <TimeNavbar dateNav={dateNav} setDateNav={setDateNav} />
            <div className="flex h-full">
              <div className="h-full w-full">{/* EMPTY */}</div>

              <div className="flex h-full w-56 items-center justify-center text-white">
                <IncomeGraphic filteredInconmes={filteredInconmes} />
              </div>
              <OpenButton setOpen={setOpen} />
            </div>
          </GraphicBox>
          <div className="flex h-[420px] w-full flex-col gap-1 overflow-y-auto">
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
                    {incon.category === "Investment" && (
                      <Investemnt width={22} />
                    )}
                    {incon.category === "Bonus" && <Bonus width={22} />}
                  </div>
                  <p className="text-base font-[400]">{incon.category}</p>
                </div>
                <p className="text-base font-[500]">${incon.amount}</p>
              </ServiceCard>
            ))}
          </div>
       
    
      {open && <AddIncome setOpen={setOpen} />}
    </section>
  );
}

export default Income;

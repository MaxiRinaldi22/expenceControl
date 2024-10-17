import useBalanceContext from "../../hooks/useBalanceContext";
import useExpensesContext from "../../hooks/useExpensesContext";
import useInconmeContext from "../../hooks/useInconmeContext";
import { useShowResult } from "../../hooks/useShowResult";

export function HeaderTotalsValues() {
  const { totalExpensesValue } = useExpensesContext();
  const { totalInconmeValue } = useInconmeContext();
  const { totalValue } = useBalanceContext()
  
  const totalBalanceValue = useShowResult({
    inputNumber: totalValue,
  });
  const totalExpensesValueNumber = useShowResult({
    inputNumber: totalExpensesValue,
  });
  const totalInconmeValueNumber = useShowResult({
    inputNumber: totalInconmeValue,
  });

  const data = [
    {
      text: "Total Expenses",
      value: totalExpensesValueNumber,
    },
    {
      text: "Current Balance",
      value: totalBalanceValue,
    },
    {
      text: "Total Inconmes",
      value: totalInconmeValueNumber,
    },
  ];

  return (
    <section className="flex h-96 flex-col gap-5 rounded-md md:h-[16.5%] md:flex-row">
      {data.map((item) => (
        <div key={item.text} className="h-full w-full rounded-md border-2 border-[#3C5A73] bg-component-color">
          <div className="flex h-8 items-center justify-start bg-[#3C5A73] px-3">
            <h2 className="text-lg font-[400] text-white">{item.text}</h2>
          </div>
          <div className="flex h-[calc(100%-40px)] flex-col  px-3">
            <div className="h-[80%] flex items-center justify-start">
              <p className="text-3xl font-semibold text-white">${item.value}</p>
            </div>
            <div className="h-[20%]">
              {
                Number(item.value) > 0
                  ? upArrowIcon()
                  : downArrowIcon() /* Ver si funciona cuando tiene la letra M en el total */
              }
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

function downArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="rgba(255,0,0,1)"
    >
      <path d="M13.0001 16.1716L18.3641 10.8076L19.7783 12.2218L12.0001 20L4.22192 12.2218L5.63614 10.8076L11.0001 16.1716V4H13.0001V16.1716Z"></path>
    </svg>
  );
}

function upArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="rgba(0,255,0,1)"
    >
      <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z"></path>
    </svg>
  );
}

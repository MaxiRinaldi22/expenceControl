import { useState } from "react";

export function SelectDate({
    setDate,
  }: {
    setDate: React.Dispatch<React.SetStateAction<string>>;
  }) {
    const [customDate, setCustomDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(
      Array(3).fill(false),
    );
  
    const dateConst = new Date();
    const day: { text: string; value: string } = {
      text: `${dateConst.getDate()}/${dateConst.getMonth() + 1}`,
      value: `${dateConst.getFullYear()}-${dateConst.getMonth() + 1}-${dateConst.getDate()}`,
    };
  
    const yesterday: { text: string; value: string } = {
      text: `${dateConst.getDate() - 1}/${dateConst.getMonth() + 1}`,
      value: `${dateConst.getFullYear()}-${dateConst.getMonth() + 1}-${dateConst.getDate() - 1}`,
    };
  
    const last: { text: string; value: string } = {
      text: `${dateConst.getDate() - 2}/${dateConst.getMonth() + 1}`,
      value: `${dateConst.getFullYear()}-${dateConst.getMonth() + 1}-${dateConst.getDate() - 2}`,
    };
  
    const dateArray = [day, yesterday, last];
  
    const handleClickDate = ({ value, id }: { value: string; id: number }) => {
      setDate(value);
  
      setSelectedCategory(Array(7).fill(false));
      setSelectedCategory((prev) => {
        const newSelected = [...prev];
        newSelected[id] = !newSelected[id];
        return newSelected;
      });
    };
  
    const handleInputDate = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCustomDate(e.target.value);
      setDate(e.target.value);
    };
  
    const customDay = customDate.split("-")[2];
    const customMonth = customDate.split("-")[1];
    const customYear = customDate.split("-")[0];
  
    return (
      <div className="flex w-full justify-between px-1">
        <div className="flex gap-1">
          {customDate !== "" && (
            <p className="flex items-center rounded-md bg-[#001D3D] px-2 text-lg font-[500] text-white">
              {customDay}/{customMonth}/{customYear}
            </p>
          )}
          {dateArray.map((date, id) => (
            <button
              onClick={() => handleClickDate({ value: date.value, id })}
              key={id}
              className="rounded-md px-2 text-lg font-[500] text-white transition-transform duration-300 will-change-transform hover:scale-110"
              style={
                selectedCategory[id] && customDate === ""
                  ? { background: "#001D3D" }
                  : {}
              }
            >
              {customDate === "" && date.text}
            </button>
          ))}
        </div>
        <form
          action=""
          onSubmit={(e) => e.preventDefault()}
          className="flex items-center"
        >
          <input
            value={customDate}
            onChange={handleInputDate}
            type="date"
            className="w-5 cursor-pointer border-none bg-transparent text-lg font-[500] outline-none invert"
          />
        </form>
      </div>
    );
  }
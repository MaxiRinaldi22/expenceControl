export function AddInput({
  amount,
  setAmount,
}: {
  setAmount: React.Dispatch<React.SetStateAction<number | string>>;
  amount: number | string;
}) {
  return (
    <div className="w-44">
      <input
        className="w-full border-b-2 bg-component-color pb-1 text-center text-3xl font-[400] text-white focus:outline-none"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.valueAsNumber)}
        onFocus={() => setAmount("")}
      />
    </div>
  );
}

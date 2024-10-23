import { List } from "./List";

export function ListEskeleton() {
  const amount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    <List>
      {amount.map((item) => (
        <div
          key={item}
          className="flex h-12 w-full items-center justify-between rounded-xl bg-component-color px-5 py-3 text-sm font-semibold text-white"
        ></div>
      ))}
    </List>
  );
}

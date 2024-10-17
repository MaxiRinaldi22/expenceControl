export function useShowResult({
  inputNumber,
}: {
  inputNumber: number;
}): string {
    
  let showResult: string;
  if (inputNumber >= 1000000) {
    showResult = (inputNumber / 1000000).toFixed(1) + "M";
  } else {
    showResult = inputNumber.toString();
  }

  return showResult;
}

type SelectType = {
  value: string | number;
  label: string;
};

export function getLabelByValue(value: string | number | undefined, arr: SelectType[]) {
  if (!arr) {
    return;
  }
  const matchingPhase = arr.find((phase) => phase.value === value);

  return matchingPhase?.label;
}

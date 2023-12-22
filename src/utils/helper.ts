export function ConvertGenderText(value?: number) {
  switch (value) {
    case 0:
      return 'Nữ';
    case 1:
      return 'Nam';
  }
}

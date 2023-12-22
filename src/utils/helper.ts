export function ConvertGenderText(value: number | undefined): string {
  switch (value) {
    case 0:
      return 'Nữ';
    case 1:
      return 'Nam';
    default:
      return '';
  }
}

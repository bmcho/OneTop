export const colorByLevel = (level) => {
  switch (level) {
    case 0:
      return 'gray1';
    case 1:
    case 2:
      return 'green1';
    case 3:
    case 4:
    case 5:
    case 6:
      return 'orange2';
    default:
      return 'red1';
  }
};

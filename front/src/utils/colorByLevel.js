export const colorByLevel = (level) => {
  switch (parseInt(level)) {
    case 1:
    case 2:
      return 'green1';
    case 3:
    case 4:
    case 5:
    case 6:
      return 'orange2';
    case 7:
    case 8:
    case 9:
    case 10:
      return 'red1';
    default:
      return 'gray1';
  }
};

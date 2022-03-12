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

export const safeScoreCount = (ingredients) => {
  const scores = ingredients.map((ingredient) =>
    Math.max(
      ingredient.score
        .split('-')
        .filter((score) => score)
        .map((score) => parseInt(score))
    )
  );
  return scores.reduce((acc, score) => {
    switch (score) {
      case 0:
      case 1:
      case 2:
        return acc + 1;
      default:
        return acc;
    }
  }, 0);
};

export const normalScoreCount = (ingredients) => {
  const scores = ingredients.map((ingredient) =>
    Math.max(
      ingredient.score
        .split('-')
        .filter((score) => score)
        .map((score) => parseInt(score))
    )
  );
  return scores.reduce((acc, score) => {
    switch (score) {
      case 3:
      case 4:
      case 5:
      case 6:
        return acc + 1;
      default:
        return acc;
    }
  }, 0);
};

export const dangerScoreCount = (ingredients) => {
  const scores = ingredients.map((ingredient) =>
    Math.max(
      ingredient.score
        .split('-')
        .filter((score) => score)
        .map((score) => parseInt(score))
    )
  );
  return scores.reduce((acc, score) => {
    switch (score) {
      case 7:
      case 8:
      case 9:
      case 10:
        return acc + 1;
      default:
        return acc;
    }
  }, 0);
};

export const hashtagSplit = (hashtag) => {
  return hashtag
    .slice(1, hashtag.length - 1)
    .split(',')
    .map((e) => e.replace(/\'|\#/g, ''));
};

export const priceToString = (price) => {
  return price.toLocaleString('ko-KR') + '원';
};

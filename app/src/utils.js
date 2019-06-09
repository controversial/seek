/* eslint-disable import/prefer-default-export */

export function ordinal(num) {
  const ones = num % 10;
  const tens = Math.floor((num % 100) / 10);
  if (ones === 1 && tens !== 1) return `${num}st`;
  if (ones === 2 && tens !== 1) return `${num}nd`;
  if (ones === 3 && tens !== 1) return `${num}rd`;
  return `${num}th`;
}

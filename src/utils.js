/* eslint-disable max-len */
// convert 1000 into 1.000,00 €
export const convertToEuroFormat = (num, fractionDigits) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: fractionDigits }).format(num);

// remapps numbers to new ranges (4 between 0 and 10 to between 100 and 200 to 140)
export const mapNumberToNewRange = (num, inMin, inMax, outMin, outMax) => ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

// converts float numbers to integers with percentage sign
export const floatToPercentage = (num) => num.toString().replace(/(\d?\d?\d)\..*/, '$1%');

export const formatTargetValueToCSSWidth = (num, max) => {
  let adjusted = mapNumberToNewRange(num, 0, max * 1.1, 0, 100);
  if (adjusted > 100) adjusted = '100%';
  if (adjusted < 1) adjusted = '1%';
  return floatToPercentage(adjusted);
};

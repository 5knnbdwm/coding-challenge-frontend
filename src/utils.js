// eslint-disable-next-line import/prefer-default-export
export const convertToEuroFormat = (value, fractions) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: fractions }).format(value);

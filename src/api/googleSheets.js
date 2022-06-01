export const fetchOrders = async () => {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.VUE_APP_GOOGLE_SHEETS_ID}/values/Orders!A:D?key=${process.env.VUE_APP_GOOGLE_API_KEY}`);
  const { values } = await response.json();
  values.shift();

  const data = [];

  values.forEach((row) => {
    const splitDate = row[1].split('.').map((datePart) => Number(datePart));
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    data.push({
      id: Number(row[0]),
      orderDate: new Date(splitDate[2], splitDate[1], splitDate[0], 12),
      orderDateText: `${month[splitDate[1] - 1]} ${splitDate[2]}`,
      orderProduct: row[2],
      orderVolume: Number(row[3].replace(/\.|,/gm, '').replace(/\s?€/, '').replace(/\d\d$/, '')),
    });
  });

  return data;
};

export const fetchTargets = async () => {
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.VUE_APP_GOOGLE_SHEETS_ID}/values/Targets!A:B?key=${process.env.VUE_APP_GOOGLE_API_KEY}`);
  const { values } = await response.json();
  values.shift();

  const data = [];

  values.forEach((row) => {
    data.push({
      month: row[0],
      targetValue: row[1].replace(/\.|,/gm, '').replace(/\s?€/, '').replace(/\d\d$/, ''),
    });
  });

  return data;
};

exports.calTotalPrice = (data) => {
  let total = 0;
  data.map((val) => {
    const result = val.price * val.quantity;
    total = total + result;
  });
  return total;
};

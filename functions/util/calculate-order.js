exports.calTotalPrice = (data)=> {
  let total = 0;
  data.map((val) => {
    total = total + val.price;
  });
  return total;
};

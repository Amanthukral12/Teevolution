function addDecimals(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}

export function calcPrices(orderItems) {
  const itemsPrice = addDecimals(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  let shippingPrice = 0;

  if (itemsPrice === "0.00") {
    shippingPrice = 0;
  } else {
    shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);
  }

  const taxPrice = addDecimals(Number((0.18 * itemsPrice).toFixed(2)));

  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
}

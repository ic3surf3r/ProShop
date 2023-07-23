export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );

  // Calculate shipping price (If oreder is over €200 then free, else €20)
  state.shippingPrice = addDecimals(state.itemsPrice > 200 ? 0 : 20);

  // Calculate tax price (tax included in price cause europe is better)
  //   state.taxPrice = 0;

  // Calculate total price
  state.totalPrice = Number(state.itemsPrice) + Number(state.shippingPrice);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};

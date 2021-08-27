import { Grid } from "@material-ui/core";
import React from "react";
import shallow from "zustand/shallow";
import { CartItemModel, Grocery } from "../../shared/models/grocery";
import useStore, { GlobalState } from "../../state/items.state";
import { CartItem } from "../CartItem/CartItem";

export const Cart = () => {
  const { cartItems, totalCart }: GlobalState = useStore();

  return (
    <>
      {cartItems?.map((item: CartItemModel) => (
        <Grid key={item.id} item xs={6} sm={3}>
          <CartItem item={item} />
        </Grid>
      ))}
      Total amount: {totalCart}
    </>
  );
};
